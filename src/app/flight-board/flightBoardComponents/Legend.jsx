import styles from './styles/legend.module.css';

export default function Legend() {

    const colors = [
        {
            key: "gray",
            classStyle: "dotgray",
            description: "ברירת מחדל",
        },
        {
            key: "green",
            classStyle: "dotgreen",
            description: "מטוס מסור",
        },
        {
            key: "blue",
            classStyle: "dotblue",
            description: "מטוס באוויר",
        },
        {
            key: "red",
            classStyle: "dotred",
            description: "מטוס נחת",
        },
    ];

    return (
        <div className={styles.container}>
            {colors.map(color => (
                <div key={color.key}>
                    <span className={`${styles.dot} ${styles[color.classStyle]}`}></span>
                    <span>{color.description}</span>
                </div>
            ))}
        </div>
    )
}
