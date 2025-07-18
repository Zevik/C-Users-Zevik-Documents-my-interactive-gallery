import React, { useState, useEffect } from 'react';

/**
 * AntikytheraMechanism Component
 *
 * המשתמש יתפעל מודל תלת-ממדי אינטראקטיבי של מנגנון אנטיקיתרה. הוא יוכל לסובב גלגלי שיניים שונים ולראות כיצד הם משפיעים על תנועת המחוגים והחוגות. המשתמש יוכל לבחור תאריך (לפני 2000 שנה) ולראות כיצד המנגנון מחשב את מיקום השמש, הירח וכוכבי הלכת העיקריים. בנוסף, יוצגו אירועים אסטרונומיים כמו ליקויי חמה וליקויי ירח. התובנה העיקרית היא להבין את רמת התחכום והידע האסטרונומי של היוונים הקדמונים, ואת יכולתם לבנות מכשיר מורכב ומדויק כל כך.
 */
const AntikytheraMechanism = () => {
    // משתני state לניהול התאריך, מיקומי גרמי השמיים, אירועים אסטרונומיים ומצב טעינה.
    const [date, setDate] = useState(new Date());
    const [sunPosition, setSunPosition] = useState(null);
    const [moonPosition, setMoonPosition] = useState(null);
    const [planetPositions, setPlanetPositions] = useState({});
    const [astronomicalEvents, setAstronomicalEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCalculating, setIsCalculating] = useState(false); // מצב שמירת הטעינה

    // useEffect hook שמבצע סימולציה של חישובים אסטרונומיים כאשר התאריך משתנה.
    useEffect(() => {
        // פונקציה שמדמה קריאת API או חישוב מורכב.
        const simulateCalculation = () => {
            return new Promise(resolve => {
                setIsCalculating(true); // מתחילים את האנימציה
                setTimeout(() => {
                    // החלף בחישובים אמיתיים על סמך התאריך
                    const newSunPosition = { x: Math.sin(date.getTime()) * 50, y: Math.cos(date.getTime()) * 50 };
                    const newMoonPosition = { x: Math.cos(date.getTime()) * 30, y: Math.sin(date.getTime()) * 30 };
                    const newPlanetPositions = {
                        mars: { x: Math.sin(date.getTime() / 2) * 60, y: Math.cos(date.getTime() / 2) * 60 },
                        venus: { x: Math.cos(date.getTime() / 3) * 40, y: Math.sin(date.getTime() / 3) * 40 },
                    };
                    const newAstronomicalEvents = date.getDate() % 2 === 0 ? ["ליקוי חמה"] : ["ליקוי ירח"];

                    resolve({
                        sunPosition: newSunPosition,
                        moonPosition: newMoonPosition,
                        planetPositions: newPlanetPositions,
                        astronomicalEvents: newAstronomicalEvents,
                    });
                    setIsCalculating(false); // מסיימים את האנימציה
                }, 1500); // מדמה זמן חישוב של 1.5 שניות
            });
        };


        // פונקציה אסינכרונית שמבצעת את החישובים ומעדכנת את ה-state.
        const calculatePositions = async () => {
            setLoading(true);
            const results = await simulateCalculation();
            setSunPosition(results.sunPosition);
            setMoonPosition(results.moonPosition);
            setPlanetPositions(results.planetPositions);
            setAstronomicalEvents(results.astronomicalEvents);
            setLoading(false);
        };

        calculatePositions();


    }, [date]); // useEffect יופעל מחדש כאשר התאריך משתנה.

    // פונקציה שמטפלת בשינוי התאריך.
    const handleDateChange = (e) => {
        setDate(new Date(e.target.value));
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300 hover:scale-105" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                מנגנון אנטיקיתרה: מחשב העתיד מלפני 2000 שנה
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו לעצמכם שאתם ארכיאולוגים המגלים שרידים של מכונה מורכבת בת 2000 שנה. היא בנויה מגלגלי שיניים רבים, מחוגים וחוגות. מה יכולה להיות מטרת המכשיר המסתורי הזה, שנמצא בים ליד יוון?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 hover:shadow-2xl transition-shadow duration-300">
                {/* TODO: בנה כאן את האינטראקציה המרכזית על פי קונספט האפליקציה. */}
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="datePicker" className="block text-gray-700 text-sm font-bold mb-2">בחר תאריך:</label>
                    <input
                        type="date"
                        id="datePicker"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-300 hover:shadow-md"
                        onChange={handleDateChange}
                    />
                </div>
                <div className="w-full max-w-md">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 ${isCalculating ? '' : 'hidden'}`}></div>
                            <p className="ml-3 text-lg text-gray-700">טוען נתונים...</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-gray-700">מיקום השמש: <span className="font-medium text-green-600">{sunPosition ? `X: ${sunPosition.x.toFixed(2)}, Y: ${sunPosition.y.toFixed(2)}` : 'לא זמין'}</span></p>
                            <p className="text-gray-700">מיקום הירח: <span className="font-medium text-green-600">{moonPosition ? `X: ${moonPosition.x.toFixed(2)}, Y: ${moonPosition.y.toFixed(2)}` : 'לא זמין'}</span></p>
                            <p className="text-gray-700 font-bold">מיקומי כוכבי לכת:</p>
                            <ul className="list-disc list-inside">
                                {Object.entries(planetPositions).map(([planet, position]) => (
                                    <li key={planet} className="text-gray-700">
                                        <span className="font-medium">{planet}:</span> X: {position.x.toFixed(2)}, Y: {position.y.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-700">אירועים אסטרונומיים: <span className="font-medium text-red-600">{astronomicalEvents.join(', ')}</span></p>
                        </div>
                    )}
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                {/* TODO: כתוב כאן את ההסבר המפורט על סמך ראשי הפרקים. השתמש בתגיות p, ul, li, strong וכו'. */}
                <p className="mb-4"><strong className="text-indigo-700">מהו מנגנון אנטיקיתרה ואיך הוא התגלה?</strong></p>
                <p className="mb-4">מנגנון אנטיקיתרה הוא מכשיר מכני עתיק, שנמצא בשרידי ספינה טרופה ליד האי היווני אנטיקיתרה בשנת 1901. הוא נחשב למחשב האנלוגי העתיק ביותר הידוע.</p>
                <p className="mb-4"><strong className="text-indigo-700">תיאור מפורט של המבנה המכני של המנגנון (גלגלי שיניים, מחוגים, חוגות).</strong></p>
                <p className="mb-4">המנגנון מורכב ממערכת מורכבת של 30 גלגלי שיניים מברונזה, מחוגים וחוגות. הוא נועד לחזות אירועים אסטרונומיים.</p>
                <p className="mb-4"><strong className="text-indigo-700">הפונקציות האסטרונומיות של המנגנון: חישוב מיקום השמש, הירח וכוכבי הלכת.</strong></p>
                <p className="mb-4">המנגנון יכול לחשב את מיקום השמש, הירח וכוכבי הלכת העיקריים, ולחזות ליקויי חמה וירח.</p>
                <p className="mb-4"><strong className="text-indigo-700">תיארוך המנגנון והקשר שלו לתרבות היוונית העתיקה.</strong></p>
                <p className="mb-4">המנגנון תוארך לסביבות 205 לפני הספירה. הוא מייצג את הידע האסטרונומי המתקדם של התרבות היוונית העתיקה.</p>
                <p className="mb-4"><strong className="text-indigo-700">חשיבות המנגנון בהבנת ההיסטוריה של המדע והטכנולוגיה.</strong></p>
                <p className="mb-4">מנגנון אנטיקיתרה משנה את ההבנה שלנו לגבי היכולות הטכנולוגיות של היוונים הקדמונים ומדגיש את תרומתם להיסטוריה של המדע והטכנולוגיה.</p>
            </section>
        </div>
    );
};

export default AntikytheraMechanism;