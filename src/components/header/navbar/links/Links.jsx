// styles import
import styles from './links.module.css';

// components import
import NavLink from "./navLink/NavLink";

// links for the navigation bar
export default function Links() {

    const links = [
        {
            title: "ראשי",
            path: "/dashboard",
        },
        {
            title: "לוח טיסות",
            path: "/flight-board",
        },
        {
            title: "חישוב דלק",
            path: "/fuel-calculator",
        },
        {
            title: "ציוד",
            path: "/equipment-managment",
        },
        {
            title: "היסטוריית טיסות",
            path: "/flight-history",
        },
    ];

    // temporary
    const session = true;
    const isAdmin = true;

  return (
    <div className={styles.links}>
        {links.map(link => (
            <NavLink item={link} key={link.title} />
        ))}
    </div>
  )
}
