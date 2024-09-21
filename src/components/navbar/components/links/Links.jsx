import styles from './links.module.css';
import NavLink from "./navLink/NavLink";

// links for the navigation bar
export default function Links({ isAdmin }) {

    const links = isAdmin ? [
        {
            title: "ראשי",
            path: "/admin",
        },
        {
            title: "פעולות משתמש",
            path: "/admin/user-actions",
            dropdown: [
                { title: "רישום משתמש", path: "/admin/create-user" },
                { title: "עדכון משתמש", path: "/admin/update-user" },
                { title: "מחיקת משתמש", path: "/admin/delete-user" },
            ],
        },
        {
            title: "פעולות טייסת",
            path: "/admin/squadron-actions",
            dropdown: [
                { title: "יצירת טייסת", path: "/admin/create-squadron" },
                { title: "מחיקת טייסת", path: "/admin/delete-squadron" },
            ],
        },
    ] : [
        {
            title: "ראשי",
            path: "/dashboard",
        },
        {
            title: "טיסות",
            path: "/flights",
            dropdown: [
                { title: "לוח טיסות", path: "/flights/flight-board" },
                { title: "רישום טיסה", path: "/flights/register-flight" },
                { title: "היסטוריית טיסות", path: "/flights/flight-history" },
            ]
        },
        {
            title: "ציוד",
            path: "/equipment",
            dropdown: [
                { title: "ניהול ציוד", path: "/equipment/equipment-management"},
                { title: "מלאי ציוד", path: "/equipment/equipment-storage"},
            ]
        },
    ];

    return (
        <div className={styles.links}>
            {links.map(link => (
                <NavLink item={link} key={link.title} />
            ))}
        </div>
    )
}