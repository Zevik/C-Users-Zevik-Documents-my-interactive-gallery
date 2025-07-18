import React, { useState, useEffect, useRef } from 'react';

const ThePowerOfBeliefPlaceboEffect = () => {
    // מצב התרחיש של המטופל
    const [patientScenario, setPatientScenario] = useState('כאב גב');
    // מצב סוג הטיפול (אמיתי או פלצבו)
    const [treatmentType, setTreatmentType] = useState('אמיתית');
    // מצב רמת השכנוע (1-10)
    const [persuasionLevel, setPersuasionLevel] = useState(5);
    // מצב רמת הכאב ההתחלתית (1-10)
    const [painLevel, setPainLevel] = useState(8);
    // מצב הזמן שעבר בסימולציה
    const [timeElapsed, setTimeElapsed] = useState(0);
    // מצב האם הסימולציה רצה
    const [simulationRunning, setSimulationRunning] = useState(false);
    // מצב התוצאות של הסימולציה
    const [results, setResults] = useState(null);

    // Ref לטיימר כדי למנוע עדכונים לא רצויים
    const intervalRef = useRef(null);

    useEffect(() => {
        // פונקציה להפעלת הטיימר
        if (simulationRunning) {
            intervalRef.current = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        } else {
            // עצירת הטיימר
            clearInterval(intervalRef.current);
        }

        // פונקציית ניקוי לעצירת הטיימר כשהקומפוננטה מתפרקת
        return () => clearInterval(intervalRef.current);
    }, [simulationRunning]);

    useEffect(() => {
        // חישוב התוצאות לאחר 10 שניות
        if (timeElapsed > 10) {
            setSimulationRunning(false); // עצירת הסימולציה

            let painReduction = 0;
            // חישוב הפחתת הכאב בהתאם לסוג הטיפול ורמת השכנוע
            if (treatmentType === 'פלצבו') {
                painReduction = persuasionLevel * 0.5;
            } else {
                painReduction = persuasionLevel * 0.8;
            }

            const finalPainLevel = Math.max(0, painLevel - painReduction); // רמת כאב סופית לא יכולה להיות שלילית
            // שמירת התוצאות
            setResults({ initialPain: painLevel, finalPain: finalPainLevel });
        }
    }, [timeElapsed, treatmentType, persuasionLevel, painLevel]);

    // פונקציה להפעלת הסימולציה
    const handleStartSimulation = () => {
        setTimeElapsed(0); // איפוס הזמן
        setSimulationRunning(true); // הפעלת הסימולציה
        setResults(null); // איפוס התוצאות
    };

    // פונקציה להחזרת צבע בהתאם לרמת הכאב
    const getPainLevelColor = (level) => {
        if (level <= 3) return 'bg-green-500';
        if (level <= 6) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-colors duration-300 hover:from-purple-100 hover:to-indigo-100" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                כוח האמונה: אפקט הפלצבו
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו שאתם מקבלים תרופה חדשה לכאב ראש חמור, והכאב חולף כלא היה. אבל מה אם התרופה הזו היא בעצם גלולת סוכר? האם זה אפשרי שהאמונה שלנו יכולה לרפא אותנו?
            </p>

            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-shadow duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 animate-bounce">הדגמה אינטראקטיבית</h3>

                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="patientScenario" className="block text-gray-700 text-sm font-bold mb-2">תרחיש מטופל:</label>
                    <div className="relative">
                        <select
                            id="patientScenario"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={patientScenario}
                            onChange={(e) => setPatientScenario(e.target.value)}
                        >
                            <option>כאב גב</option>
                            <option>מיגרנה</option>
                            <option>חרדה</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="treatmentType" className="block text-gray-700 text-sm font-bold mb-2">סוג טיפול:</label>
                    <div className="relative">
                        <select
                            id="treatmentType"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={treatmentType}
                            onChange={(e) => setTreatmentType(e.target.value)}
                        >
                            <option>אמיתית</option>
                            <option>פלצבו</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="persuasionLevel" className="block text-gray-700 text-sm font-bold mb-2">רמת שכנוע (1-10):</label>
                    <input
                        type="range"
                        id="persuasionLevel"
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                        value={persuasionLevel}
                        onChange={(e) => setPersuasionLevel(parseInt(e.target.value))}
                        min="1"
                        max="10"
                    />
                    <p className="text-center text-gray-600">{persuasionLevel}</p>
                </div>

                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="painLevel" className="block text-gray-700 text-sm font-bold mb-2">רמת כאב התחלתית (1-10):</label>
                    <input
                        type="range"
                        id="painLevel"
                        className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                        value={painLevel}
                        onChange={(e) => setPainLevel(parseInt(e.target.value))}
                        min="1"
                        max="10"
                    />
                    <p className="text-center text-gray-600">{painLevel}</p>
                </div>

                <button
                    className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${simulationRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={handleStartSimulation}
                    disabled={simulationRunning}
                >
                    {simulationRunning ? `רץ... ${timeElapsed} שניות` : 'התחל סימולציה'}
                </button>

                {results && (
                    <div className="mt-6 p-4 border rounded shadow-md animate-fade-in">
                        <h4 className="text-lg font-semibold mb-2">תוצאות:</h4>
                        <div className="flex items-center justify-between">
                            <p>רמת כאב התחלתית:</p>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getPainLevelColor(results.initialPain)}`}>{results.initialPain}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>רמת כאב סופית:</p>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getPainLevelColor(results.finalPain)}`}>{results.finalPain}</div>
                        </div>
                        <p>שיפור ברמת הכאב: {results.initialPain - results.finalPain}</p>
                    </div>
                )}
            </section>

            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-shadow duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p className="mb-2"><strong>מהו אפקט הפלצבו:</strong> אפקט הפלצבו הוא תופעה בה שיפור במצבו של אדם מתרחש כתוצאה מטיפול דמה, כמו גלולת סוכר, רק בגלל שאותו אדם מאמין שהטיפול יעיל.</p>
                <p className="mb-2"><strong>המנגנונים הנוירולוגיים:</strong> האמונה משפיעה על המוח על ידי שחרור אנדורפינים (משככי כאבים טבעיים) ויצירת ציפיות המשפיעות על תחושות הכאב והרווחה. הדמיה מוחית מראה פעילות משתנה באזורים הקשורים לתחושה, כאב ותגמול.</p>
                <p className="mb-2"><strong>גורמים המשפיעים על עוצמת הפלצבו:</strong></p>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>ציפיות:</strong> ככל שהציפייה לשיפור גדולה יותר, כך האפקט חזק יותר.</li>
                    <li><strong>הקשר הטיפולי:</strong> יחסי אמון בין המטפל למטופל מגבירים את האפקט.</li>
                    <li><strong>מאפייני התרופה:</strong> גלולות גדולות יותר, צבעוניות יותר, או כאלו הניתנות בזריקה, עשויות להיתפס כיעילות יותר.</li>
                </ul>
                <p className="mb-2"><strong>אתיקה ואפקט הפלצבו:</strong> שימוש באפקט הפלצבו צריך להיות זהיר ואתי, תוך הקפדה על שקיפות ואי-הטעיה של המטופל. יש לשקול את האיזון בין תועלת אפשרית לפגיעה אפשרית.</p>
                <p className="mb-2"><strong>מחקרים מרכזיים:</strong> מחקרים רבים הראו את יעילות הפלצבו במצבים כמו כאב, דיכאון, חרדה ומחלות מעי דלקתיות.</p>
                <p className="mb-2"><strong>מגבלות האפקט:</strong> פלצבו אינו יעיל לריפוי מחלות קשות או לטיפול בנזק פיזי משמעותי. הוא יכול להקל על סימפטומים, אך אינו מחליף טיפול רפואי אמיתי.</p>
            </section>
        </div>
    );
};

// Fade in animation
const fadeInKeyframes = `
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Style for the fade-in animation
const fadeInStyle = {
    animation: 'fade-in 0.5s ease-in-out',
};

// Animated fade-in component
const AnimateFadeIn = ({ children }) => (
    <div style={fadeInStyle}>{children}</div>
);

// Append fade-in keyframes to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = fadeInKeyframes;
document.head.appendChild(styleSheet);

export default ThePowerOfBeliefPlaceboEffect;