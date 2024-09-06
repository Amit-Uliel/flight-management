import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
      // Query the database for the count of missions by each status
      const missions = await prisma.mission.groupBy({
        by: ['MissionStatus'],
        _count: {
          missionId: true,
        },
      });
  
      // Transform the data to the desired format for the chart
      const data = missions.map((mission) => ({
        name: mission.MissionStatus,
        value: mission._count.missionId,
      }));
  
      // Return the response with the data
      return NextResponse.json(data);
    } catch (error) {
      console.error('Failed to fetch mission status data:', error);
      return NextResponse.json({ error: 'Failed to fetch mission status data' }, { status: 500 });
    }
}