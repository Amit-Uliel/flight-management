"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TableCell from "./tableCell/TableCell";
import styles from './tableRow.module.css';

function TableRow({ rowData }) {
    const router = useRouter();

    // states
    const [isDevoted, setIsDevoted] = useState(rowData.devoted);
    const [hovered, setHovered] = useState(false);
    const [isLanded, setIsLanded] = useState(rowData.landed);
    const [rowBackgroundColor, setRowBackgroundColor] = useState('');

    // handle edit click
    // redirect the user to the edit flight page
    const handleEditClick = () => {
        if(!isDevoted)
        {
            router.push(`/flight-board/edit/${rowData.id}`);
        }
    };  

    // handle the color change on the rows
    const getRowBackgroundColor = () => {
        if (isDevoted && isLanded) {
            return '#FF4949';
        } else if (isDevoted) {
            return '#2EC12F';
        }
    };

    // when the checkbox clicked -> will execute the color change of the row
    useEffect(() => {
        setRowBackgroundColor(getRowBackgroundColor());
    }, [isDevoted, isLanded]);

    // handle the checkbox click
    const toggleDevoted = () => {
        if(isDevoted && isLanded)
        {
            const confirmChange = window.confirm("Are you sure you want to change it to false?");
            if (!confirmChange) {
                return;
            }
        }
        setIsDevoted(!isDevoted);
        setIsLanded(false);
    };

    // handle the checkbox click
    const togglelanded = () => {
        if(isDevoted)
        {
            if (isLanded) {
                const confirmChange = window.confirm("Are you sure you want to change it to false?");
                if (!confirmChange) {
                    return;
                }
            }
            setIsLanded(!isLanded);
        }
        else{
            alert("מסור חייב להיות מסומן קודם");
        }
    };

    return (
        <tr 
            className={styles.row} 
            style={{ backgroundColor: rowBackgroundColor }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {Object.entries(rowData).map(([key, value]) => (
                <TableCell
                    key={key}
                    type={key === 'id' ? 'id' : key === 'devoted' || key === 'landed' ? 'checkbox' : undefined}
                    onClick={(key === 'id' && !isDevoted) ? handleEditClick : undefined}
                    hovered={key === 'id' ? hovered : undefined}
                    rowId={key === 'id' ? value : undefined}
                    onChange={key === 'devoted' ? toggleDevoted : key === 'landed' ? togglelanded : undefined}
                    checked={key === 'devoted' ? isDevoted : key === 'landed' ? isLanded : undefined}
                >
                    {value}
                </TableCell>
            ))}
        </tr>
    )
}

export default TableRow