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
            title: "חישוב דלק",
            path: "/fuel-calculator",
        },
        {
            title: "ציוד",
            path: "/equipment-managment",
        }
    ];

    return (
        <div className={styles.links}>
            {links.map(link => (
                <NavLink item={link} key={link.title} />
            ))}
        </div>
    )
}