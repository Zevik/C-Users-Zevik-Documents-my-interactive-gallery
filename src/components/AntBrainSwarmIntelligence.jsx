import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

/**
 * AntBrainSwarmIntelligence Component
 *
 * המשתמש ייכנס לסימולציה של מושבת נמלים המחפשת מזון. המשתמש יוכל להגדיר את גודל המושבה, את פיזור מקורות המזון ואת עוצמת הפרמונים שהנמלים מפרישות.
 * המשתמש יראה כיצד הנמלים, בתחילה באופן אקראי, מתחילות לחקור את הסביבה. כאשר נמלה מוצאת מזון, היא חוזרת לשובך ומשאירה אחריה שובל פרמונים.
 * נמלים אחרות יעדיפו לעקוב אחר שובלי הפרמונים הקיימים, כאשר השובל החזק ביותר (הקצר ביותר) יקבל את רוב הנמלים ויסמן את הנתיב האופטימלי.
 * המשתמש יראה גרף המתאר את מספר הנמלים העוקבות אחר כל נתיב לאורך זמן.
 * המשתמש יוכל לבצע ניסויים שונים, כגון הוספת מכשול לנתיב המועדף, ולראות כיצד הנמלים מסתגלות ומוצאות נתיב חדש.
 * מטרת הסימולציה היא להמחיש כיצד באמצעות אינטראקציות מקומיות פשוטות, נחילי נמלים יכולים לפתור בעיות מורכבות של אופטימיזציה ללא תכנון מרכזי.
 */
const AntBrainSwarmIntelligence = () => {
    // משתני מצב (State) עבור גודל המושבה, מקורות מזון, עוצמת פרמונים, מצב הסימולציה ונתוני נתיב.
    const [colonySize, setColonySize] = useState(100);
    const [foodSources, setFoodSources] = useState(3);
    const [pheromoneStrength, setPheromoneStrength] = useState(0.5);
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [pathData, setPathData] = useState([[], [], []]); // מערך של מערכים - נתונים לכל נתיב

    const intervalIdRef = useRef(null); // Ref לשמירת ה-interval ID

    // אפקט צדדי (Effect) לטיפול בלוגיקת הסימולציה
    useEffect(() => {
        if (simulationRunning) {
            // אתחול נתוני הגרף כאשר הסימולציה מתחילה
            setPathData([[], [], []]);

            // הגדרת interval שמתעדכן כל שנייה
            intervalIdRef.current = setInterval(() => {
                // סימולציה פשוטה: כל נתיב מקבל ערך רנדומלי בין 0 ל-1
                setPathData(prevData => {
                    return prevData.map(path => [...path, Math.random()]);
                });
            }, 1000);

            // פונקציה לניקוי ה-interval כאשר הקומפוננטה לא מורכבת או כאשר הסימולציה נעצרת
            return () => clearInterval(intervalIdRef.current);
        }
    }, [simulationRunning]);

    // פונקציה להפעלת הסימולציה
    const handleStartSimulation = () => {
        setSimulationRunning(true);
    };

    // פונקציה לעצירת הסימולציה
    const handleStopSimulation = () => {
        setSimulationRunning(false);
    };

    // נתוני גרף - מוגדרים כאן כדי למנוע יצירה מחדש בכל רינדור
    const chartData = {
        labels: pathData[0].map((_, index) => `זמן ${index + 1}`), // תוויות ציר X
        datasets: [
            {
                label: 'נתיב 1',
                data: pathData[0],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'נתיב 2',
                data: pathData[1],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'נתיב 3',
                data: pathData[2],
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.4,
                fill: false,
            },
        ],
    };

    // אפשרויות גרף - מוגדרות כאן כדי למנוע יצירה מחדש בכל רינדור
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
            },
            title: {
                display: true,
                text: 'מספר נמלים העוקבות אחר כל נתיב לאורך זמן',
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'אחוז מהנמלים',
                    font: {
                        size: 14,
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'זמן (שניות)',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300 hover:scale-105" dir="rtl">
            {/* כותרת */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                המוח הנמלי: חוכמת ההמונים בטבע
            </h1>

            {/* תיאור קצר */}
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו לעצמכם מושבה של מיליוני נמלים הפועלות יחד בסנכרון מופתי, בונות קנים מורכבים ומוצאות את הנתיבים הקצרים ביותר למקורות מזון. איך יצורים כה קטנים ופשוטים מסוגלים להישגים כה מרשימים ללא מנהיג?
            </p>

            {/* אזור אינטראקציה עיקרי */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 animate-bounce">הדגמה אינטראקטיבית</h3>

                {/* גודל המושבה */}
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="colonySize" className="block text-gray-700 text-sm font-bold mb-2">גודל המושבה:</label>
                    <input
                        type="number"
                        id="colonySize"
                        value={colonySize}
                        onChange={(e) => setColonySize(parseInt(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-200 hover:shadow-md"
                    />
                </div>

                {/* מספר מקורות מזון */}
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="foodSources" className="block text-gray-700 text-sm font-bold mb-2">מספר מקורות מזון:</label>
                    <input
                        type="number"
                        id="foodSources"
                        value={foodSources}
                        onChange={(e) => setFoodSources(parseInt(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-200 hover:shadow-md"
                    />
                </div>

                {/* עוצמת פרמונים */}
                <div className="mb-6 w-full max-w-md">
                    <label htmlFor="pheromoneStrength" className="block text-gray-700 text-sm font-bold mb-2">עוצמת פרמונים:</label>
                    <input
                        type="number"
                        id="pheromoneStrength"
                        step="0.1"
                        value={pheromoneStrength}
                        onChange={(e) => setPheromoneStrength(parseFloat(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-200 hover:shadow-md"
                    />
                </div>

                {/* כפתור התחלה/עצירה עם אנימציה */}
                {!simulationRunning ? (
                    <button
                        onClick={handleStartSimulation}
                        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-500 rounded-full shadow-md group hover:border-indigo-300 hover:text-white hover:shadow-xl"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                        <span className="relative invisible">התחל סימולציה</span>
                        <span className="relative">התחל סימולציה</span>
                    </button>
                ) : (
                    <button
                        onClick={handleStopSimulation}
                        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group hover:border-red-300 hover:text-white hover:shadow-xl"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </span>
                        <span className="relative invisible">עצור סימולציה</span>
                        <span className="relative">עצור סימולציה</span>
                    </button>
                )}

                {/* גרף המציג את התקדמות הנמלים */}
                <div className="mt-8 w-full max-w-2xl">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-all duration-300 hover:shadow-xl">
                {/* כותרת הסבר מדעי */}
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center animate-pulse">
                    ההסבר המדעי
                </h2>
                {/* הסבר מפורט על אינטליגנציה קולקטיבית */}
                <p className="mb-4">
                    <strong>מהי אינטליגנציה קולקטיבית (Swarm Intelligence) והיכן היא באה לידי ביטוי בטבע?</strong>
                    <br />
                    אינטליגנציה קולקטיבית היא היכולת של קבוצה גדולה של יחידים פשוטים לפתור בעיות מורכבות באמצעות שיתוף פעולה ותקשורת מקומית, ללא תכנון מרכזי. ניתן לראות זאת במושבות נמלים, להקות ציפורים, נחילי דבורים, ועוד. התנהגות נחיל מתרחשת כאשר מספר גדול של סוכנים מקומיים מקיימים אינטראקציה זה עם זה ועם סביבתם. אינטראקציות אלו מובילות להופעת דפוסים גלובליים. דוגמאות לאינטליגנציית נחיל כוללות מושבות נמלים, להקות ציפורים, נחילי דבורים, מושבות חיידקים, דגיגים וכו'.
                </p>

                {/* עקרונות מפתח באינטליגנציה קולקטיבית */}
                <p className="mb-4">
                    <strong>עקרונות מפתח באינטליגנציה קולקטיבית: תקשורת עקיפה (סטיגמרגיה), חיזוק חיובי, אקראיות.</strong>
                    <br />
                    תקשורת עקיפה (סטיגמרגיה) מתרחשת כאשר יחידים בסביבה משנים אותה, ויחידים אחרים מגיבים לשינויים אלה. חיזוק חיובי מעודד התנהגויות מצליחות, בעוד שאקראיות מאפשרת גילוי פתרונות חדשים. סטיגמרגיה ממלאת תפקיד קריטי בכך שהיא מאפשרת לקבוצה להתארגן ולארגן את עצמה בצורה יעילה, למרות שכל פרט פועל באופן מקומי בלבד.
                </p>

                {/* שימוש בפרמונים לתקשורת */}
                <p className="mb-4">
                    <strong>כיצד נמלים ודבורים משתמשות בפרמונים כדי לתקשר ולמצוא מקורות מזון.</strong>
                    <br />
                    נמלים מפרישות פרמונים כדי לסמן נתיבים למקורות מזון. נמלים אחרות עוקבות אחרי שובלי הפרמונים, וככל שיותר נמלים עוקבות אחרי נתיב מסוים, כך הוא מתחזק. דבורים משתמשות בריקודים כדי לתקשר מיקום של מקורות צוף. מערכת הפרמונים של נמלים היא דוגמה מצוינת לאופן שבו תקשורת פשוטה יכולה להוביל לפתרונות מורכבים.
                </p>

                {/* מודלים מתמטיים לדימוי התנהגות נחיל */}
                <p className="mb-4">
                    <strong>מודלים מתמטיים המדמים את התנהגות הנחיל (למשל, אלגוריתם אופטימיזציית הנמלים).</strong>
                    <br />
                    ישנם מודלים מתמטיים, כגון אלגוריתם אופטימיזציית הנמלים (Ant Colony Optimization), המדמים את התנהגות הנחיל כדי לפתור בעיות אופטימיזציה מורכבות, כמו מציאת הנתיב הקצר ביותר בין נקודות. אלגוריתם אופטימיזציית הנמלים משמש לייעול בעיות דומות לנתיבי נסיעה של נמלים בטבע. האלגוריתם משמש למציאת פתרונות כמעט אופטימליים.
                </p>

                {/* יישומים של אינטליגנציה קולקטיבית */}
                <p className="mb-4">
                    <strong>יישומים של אינטליגנציה קולקטיבית בתחומים שונים: רובוטיקה, אופטימיזציה של רשתות, ניהול תנועה.</strong>
                    <br />
                    אינטליגנציה קולקטיבית משמשת ברובוטיקה ליצירת רובוטים הפועלים יחד כדי לבצע משימות, באופטימיזציה של רשתות תקשורת כדי לשפר את יעילותן, ובניהול תנועה כדי להפחית עומסי תנועה. רובוטים נחיליים יכולים לבצע משימות מורכבות, כולל תיאום וקבלת החלטות, גם כאשר יש להם יכולות תקשורת או חישה מוגבלות.
                </p>
            </section>
        </div>
    );
};

export default AntBrainSwarmIntelligence;