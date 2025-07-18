import React, { useState, useEffect, useRef } from 'react';

const HerdImmunityTheCommunityShield = () => {
    const [immunityPercentage, setImmunityPercentage] = useState(50);
    const [infectionRate, setInfectionRate] = useState(0.1);
    const [population, setPopulation] = useState([]);
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [populationSize, setPopulationSize] = useState(200);
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null); // Reference for animation frame

    // עדכון גודל אוכלוסייה באופן דינמי
    useEffect(() => {
        resetPopulation();
    }, [immunityPercentage, populationSize]);

    // אפקט שמטפל בהרצת הסימולציה
    useEffect(() => {
        if (simulationRunning) {
            // הפעלת הסימולציה באמצעות requestAnimationFrame לקבלת אנימציה חלקה יותר
            const animate = () => {
                updateSimulation();
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            // עצירת הסימולציה
            cancelAnimationFrame(animationFrameRef.current);
        }

        return () => cancelAnimationFrame(animationFrameRef.current); // ניקוי האנימציה
    }, [simulationRunning, population, infectionRate]);

    // אתחול האוכלוסייה מחדש
    const resetPopulation = () => {
        const initialPopulation = [];
        for (let i = 0; i < populationSize; i++) {
            const vaccinated = Math.random() < immunityPercentage / 100;
            initialPopulation.push({
                id: i,
                x: Math.random() * 700 + 50,
                y: Math.random() * 350 + 50,
                vaccinated: vaccinated,
                infected: i === 0 ? true : false, // רק האדם הראשון נדבק בהתחלה
                recovered: false,
                newlyInfected: false, // מצב חדש לסימון הדבקה חדשה
            });
        }
        setPopulation(initialPopulation);
    };

    // עדכון מצב הסימולציה
    const updateSimulation = () => {
        setPopulation((prevPopulation) => {
            // מיפוי האוכלוסייה כדי לעדכן את מצב ההדבקה
            const newPopulation = prevPopulation.map((person) => {
                if (person.infected) {
                    return person; // אנשים נגועים נשארים נגועים
                }
                return person;
            });

            // זיהוי הדבקות חדשות
            const newlyInfected = newPopulation.map((person, index) => {
                if (person.infected) {
                    newPopulation.forEach((otherPerson, otherIndex) => {
                        if (index !== otherIndex && !otherPerson.vaccinated && !otherPerson.infected && !otherPerson.recovered) {
                            const distance = Math.sqrt(
                                Math.pow(person.x - otherPerson.x, 2) + Math.pow(person.y - otherPerson.y, 2)
                            );
                            if (distance < 15 && Math.random() < infectionRate) {
                                newPopulation[otherIndex] = { ...otherPerson, infected: true, newlyInfected: true }; // סימון כהדבקה חדשה
                            }
                        }
                    });
                }
                return person;
            });
            return newlyInfected;
        });
    };

    // ציור האוכלוסייה על הקנבס
    useEffect(() => {
        drawPopulation();
    }, [population]);

    const drawPopulation = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // ניקוי הקנבס לפני כל רינדור

        population.forEach((person) => {
            ctx.beginPath();
            ctx.arc(person.x, person.y, 7, 0, 2 * Math.PI); // הגדלת הרדיוס

            if (person.vaccinated) {
                ctx.fillStyle = 'green'; // ירוק למחוסנים
            } else if (person.infected) {
                ctx.fillStyle = 'red'; // אדום לנגועים
                if (person.newlyInfected) {
                    // אפקט הבהוב להדבקה חדשה
                    ctx.fillStyle = 'orange';
                }
            } else if (person.recovered) {
                ctx.fillStyle = 'blue'; // כחול למחלימים
            } else {
                ctx.fillStyle = 'white'; // לבן ללא מחוסנים/נגועים/מחלימים
            }

            ctx.fill();
            ctx.stroke();
        });
    };


    // טיפול בהפעלה/כיבוי של הסימולציה
    const handleSimulationToggle = () => {
        if (!simulationRunning) {
            resetPopulation(); // אתחול מחדש כאשר הסימולציה מתחילה
        }
        setSimulationRunning(!simulationRunning);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300 hover:scale-105" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                חסינות עדר: המגן הקהילתי
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו עולם שבו מחלה מדבקת מפסיקה להתפשט, למרות שלא כולם מחוסנים. איך זה ייתכן? התכוננו לגלות את הכוח המפתיע של חסינות עדר.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
                {/* TODO: בנה כאן את האינטראקציה המרכזית על פי קונספט האפליקציה. */}
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <p className="mb-4 text-center">שנו את אחוז האנשים המחוסנים באוכלוסייה וצפו בהשפעה על התפשטות המחלה.</p>

                <div className="w-full max-w-md">
                    <label htmlFor="immunitySlider" className="block text-gray-700 text-sm font-bold mb-2">
                        אחוז מחוסנים: <span className="font-semibold text-indigo-900">{immunityPercentage}%</span>
                    </label>
                    <input
                        type="range"
                        id="immunitySlider"
                        min="0"
                        max="100"
                        value={immunityPercentage}
                        onChange={(e) => setImmunityPercentage(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-300 hover:border-indigo-500"
                    />
                </div>

                <button
                    onClick={handleSimulationToggle}
                    className={`mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${simulationRunning ? 'bg-red-500 hover:bg-red-700' : ''}`}
                >
                    {simulationRunning ? 'עצור הדמיה' : 'התחל הדמיה'}
                </button>

                <canvas ref={canvasRef} width={800} height={400} className="mt-6 bg-gray-100 border border-gray-300 rounded-md shadow-md transition-all duration-300 hover:scale-105"></canvas>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                {/* TODO: כתוב כאן את ההסבר המפורט על סמך ראשי הפרקים. השתמש בתגיות p, ul, li, strong וכו'. */}
                <p className="mb-4">
                    <strong className="text-indigo-700">מהי חסינות עדר?</strong> חסינות עדר מתרחשת כאשר אחוז גדול מספיק באוכלוסייה חסין למחלה, מה שמקשה על התפשטות המחלה מאדם לאדם. זה מגן על אלו שאינם יכולים להתחסן.
                </p>

                <p className="mb-4">
                    <strong className="text-indigo-700">כיצד חיסונים תורמים לחסינות עדר?</strong> חיסונים הם דרך בטוחה ויעילה ליצור חסינות למחלות. כשאחוז גדול מספיק באוכלוסייה מתחסן, אנחנו יוצרים חסינות עדר.
                </p>

                <p className="mb-4">
                    <strong className="text-indigo-700">מהו 'סף חסינות העדר' וכיצד הוא מחושב עבור מחלות שונות?</strong> סף חסינות העדר הוא האחוז באוכלוסייה שצריך להיות חסין כדי להשיג חסינות עדר. הסף משתנה ממחלה למחלה ותלוי בגורמים כמו עד כמה המחלה מדבקת.
                </p>

                <p className="mb-4">
                    <strong className="text-indigo-700">מדוע חסינות עדר חשובה לאנשים שאינם יכולים להתחסן (תינוקות, אנשים עם מערכת חיסונית מוחלשת)?</strong> אנשים מסוימים, כמו תינוקות ואנשים עם מערכת חיסונית מוחלשת, אינם יכולים להתחסן. חסינות עדר מגנה עליהם על ידי הפחתת הסיכון שלהם לחשיפה למחלה.
                </p>

                <p className="mb-4">
                    <strong className="text-indigo-700">השפעת התנגדות לחיסונים על חסינות עדר.</strong> התנגדות לחיסונים יכולה להפחית את שיעורי החיסון, מה שמקשה על השגת חסינות עדר ומגדיל את הסיכון להתפרצויות מחלות.
                </p>

                <p className="mb-4">
                    <strong className="text-indigo-700">דוגמאות היסטוריות של חסינות עדר (למשל, אבעבועות שחורות).</strong> תוכניות חיסון מוצלחות הובילו למיגור מחלות כמו אבעבועות שחורות באמצעות חסינות עדר.
                </p>
            </section>
        </div>
    );
};

export default HerdImmunityTheCommunityShield;