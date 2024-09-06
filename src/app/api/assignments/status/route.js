import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Get the current date and the date three months ago
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    // Query the database for the count of assignments grouped by month and status
    const assignments = await prisma.assignment.groupBy({
      by: ['status', 'takeOffTime'],
      _count: {
        assignmentId: true,
      },
      where: {
        takeOffTime: {
          gte: threeMonthsAgo, // greater than or equal to three months ago
          lte: currentDate,    // less than or equal to the current date
        },
      },
    });

    // Initialize data structure for storing counts
    const data = [];
    const statusCounts = {};

    // Populate statusCounts with data
    assignments.forEach((assignment) => {
      const month = assignment.takeOffTime.getMonth(); // Extract month (0 = January, 1 = February, etc.)
      const status = assignment.status;

      if (!statusCounts[month]) {
        // Initialize all statuses to 0 for each month
        statusCounts[month] = { SCHEDULED: 0, COMPLETED: 0, CANCELED: 0, ONGOING: 0 };
      }

      // Increment the count for the appropriate status
      statusCounts[month][status] += assignment._count.assignmentId;
    });

    // Convert the statusCounts object to an array for the chart
    for (let i = 0; i < 3; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
      const monthIndex = date.getMonth();
      const monthName = date.toLocaleString('default', { month: 'long' });

      data.unshift({
        month: monthName,
        SCHEDULED: statusCounts[monthIndex]?.SCHEDULED || 0,
        COMPLETED: statusCounts[monthIndex]?.COMPLETED || 0,
        CANCELED: statusCounts[monthIndex]?.CANCELED || 0,
        ONGOING: statusCounts[monthIndex]?.ONGOING || 0,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch assignment status data:', error);
    return NextResponse.json({ error: 'Failed to fetch assignment status data' }, { status: 500 });
  }
}