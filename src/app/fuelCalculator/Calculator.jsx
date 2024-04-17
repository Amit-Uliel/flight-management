"use client"
import { useState , useEffect } from "react"
import styles from './calculator.module.css'

export default function Calculator() {

    const [pod, setPod] = useState('');
    const [niche, setNiche] = useState('');
    const [armament, setArmament] = useState('');
    const [generation, setGeneration] = useState('');
    const [fuelResult, setFuelResult] = useState('');
    const [activeInput, setActiveInput] = useState(null);

    // with mouse click on the numbers in the screen,
    // it will check what input has the focus on
    // and update the state
    const handleNumberClick = (number) => {
        if (activeInput === 'pod') {
            setPod(prevPod => prevPod + number);
        } else if (activeInput === 'niche') {
            setNiche(prevNiche => prevNiche + number);
        } else if (activeInput === 'armament') {
            setArmament(prevArmament => prevArmament + number);
        } else if (activeInput === 'generation') {
            setGeneration(prevGeneration => prevGeneration + number);
        }
    };

    // handle delete
    const handleDeleteClick = () => {
        if (activeInput === 'pod') {
            setPod(prevPod => prevPod.slice(0, -1));
        } else if (activeInput === 'niche') {
            setNiche(prevNiche => prevNiche.slice(0, -1));
        } else if (activeInput === 'armament') {
            setArmament(prevArmament => prevArmament.slice(0, -1));
        } else if (activeInput === 'generation') {
            setGeneration(prevGeneration => prevGeneration.slice(0, -1));
        }
    };

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
            <div className={styles.resultAndInputs}>    
                <div className={styles.resultDisplayContainer}>
                    <span className={styles.resultDisplay}>{fuelResult}</span>
                </div>
                <div className={styles.verticalLine}></div>
                <form className={styles.formContainer}>
                    <p className={`${hasLettersPod ? styles.error : styles.hidden}`}>   
                        יש אות במספר
                    </p>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="פוד"
                        onChange= {(e) => setPod(e.target.value)}
                        onFocus={() => setActiveInput('pod')}
                        value={pod}
                    />
                    <p className={`${hasLettersNiche ? styles.error : styles.hidden}`}>   
                        יש לכם אות במספר
                    </p>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="נישה"
                        onChange={(e) => setNiche(e.target.value)}
                        onFocus={() => setActiveInput('niche')}
                        value={niche}
                    />
                    <p className={`${hasLettersArmament ? styles.error : styles.hidden}`}>   
                        יש לכם אות במספר
                    </p>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="חימוש"
                        onChange={(e) => setArmament(e.target.value)}
                        onFocus={() => setActiveInput('armament')}
                        value={armament}
                    />
                    <p className={`${hasLettersGeneration ? styles.error : styles.hidden}`}>   
                        יש לכם אות במספר
                    </p>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="דור"
                        onChange={(e) => setGeneration(e.target.value)}
                        onFocus={() => setActiveInput('generation')}
                        value={generation}
                    />
                </form>
            </div>
            <div className={styles.numbersContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <button className={styles.numberButton} key={number} onClick={() => handleNumberClick(number)}>
                        {number}
                    </button>
                ))}
                <button className={`${styles.numberButton} ${styles.number0Button}`} onClick={() => handleNumberClick(0)}>
                    0
                </button>
                <button className={styles.deleteButton} onClick={handleDeleteClick}>
                    מחיקה
                </button>
            </div>
        </>
    );
}
