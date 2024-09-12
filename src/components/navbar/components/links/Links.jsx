import styles from './links.module.css';
import NavLink from "./navLink/NavLink";

// links for the navigation bar
export default function Links() {

    const links = [
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