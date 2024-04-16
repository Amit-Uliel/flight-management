"use client"
import { useState , useEffect } from "react"
import styles from './calculator.module.css'

export default function Calculator() {

    const [pod, setPod] = useState('');
    const [niche, setNiche] = useState('');
    const [armament, setArmament] = useState('');
    const [generation, setGeneration] = useState('');
    const [fuelResult, setFuelResult] = useState('');

    const hasLettersPod = /[a-zA-Z]/.test(pod);
    const hasLettersNiche = /[a-zA-Z]/.test(niche);
    const hasLettersArmament = /[a-zA-Z]/.test(armament);
    const hasLettersGeneration = /[a-zA-Z]/.test(generation);

    useEffect(() => {
        // Convert input values to numbers (if they represent numeric values)
        const podValue = parseFloat(pod) || 0;
        const nicheValue = parseFloat(niche) || 0;
        const armamentValue = parseFloat(armament) || 0;
        const generationValue = parseFloat(generation) || 0;

        // Calculate the result by adding the input values
        let result = podValue + nicheValue + armamentValue + generationValue;

        // limit
        if(result >= 100_000_000){
            result = 100_000_000;
        }

        // Format the result with commas
        const formattedResult = result.toLocaleString();

        // Update the state with the calculated result
        setFuelResult(formattedResult);

    }, [pod, niche, armament, generation]);

    return (
        <>
            <div className={styles.div}>
                <span className={styles.resultDisplay}>{fuelResult}</span>
            </div>
            <div className={styles.verticalLine}></div>
            <form className={styles.formContainer}>
                <p 
                className={`${hasLettersPod ? styles.error : styles.hidden}`}
                >   יש אות במספר
                </p>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="פוד"
                    onChange= {(e) => setPod(e.target.value)}
                    value={pod}
                />
                <p 
                    className={`${hasLettersNiche ? styles.error : styles.hidden}`}
                >   יש לכם אות במספר
                </p>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="נישה"
                    onChange={(e) => setNiche(e.target.value)}
                    value={niche}
                />
                <p 
                    className={`${hasLettersArmament ? styles.error : styles.hidden}`}
                >   יש לכם אות במספר
                </p>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="חימוש"
                    onChange={(e) => setArmament(e.target.value)}
                    value={armament}
                />
                <p 
                    className={`${hasLettersGeneration ? styles.error : styles.hidden}`}
                >   יש לכם אות במספר
                </p>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="דור"
                    onChange={(e) => setGeneration(e.target.value)}
                    value={generation}
                />
            </form>
            
        </>
    );
}
