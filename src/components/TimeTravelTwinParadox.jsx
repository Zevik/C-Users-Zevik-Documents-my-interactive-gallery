import React, { useState, useEffect, useRef } from 'react';

/**
 * TimeTravelTwinParadox Component
 *
 * הסימולציה מציגה שני תאומים: איתן ודני. איתן נשאר על כדור הארץ, ודני טס בחללית במסע הלוך-חזור לכוכב מרוחק.
 * המשתמש שולט במהירות החללית של דני (באחוזים ממהירות האור).
 * במהלך המסע, מוצגים שעונים המציגים את הזמן החולף עבור איתן (על כדור הארץ) ועבור דני (בחללית).
 * גרף מציג את ההפרש בגילאים ביניהם כפונקציה של מהירות החללית.
 * המשתמש יכול לעצור את הסימולציה בכל רגע כדי לבחון את השעונים והגרף.
 * המטרה היא להבין שככל שמהירות החללית גבוהה יותר, כך ההפרש בגילאים גדול יותר, ולהמחיש את התארכות הזמן לפי תורת היחסות הפרטית.
 *
 * שיפורים:
 * - אנימציות ו transitions של Tailwind לשיפור חווית המשתמש.
 * - משוב ויזואלי משופר.
 * - עיצוב מודרני יותר.
 */
const TimeTravelTwinParadox = () => {
    const [speed, setSpeed] = useState(0); // מהירות כאחוז ממהירות האור (0-100)
    const [timeEitan, setTimeEitan] = useState(0); // הזמן שעובר עבור איתן
    const [timeDani, setTimeDani] = useState(0); // הזמן שעובר עבור דני
    const [isRunning, setIsRunning] = useState(false); // האם הסימולציה רצה
    const [ageDifferenceData, setAgeDifferenceData] = useState([]); // נתוני הפרש הגילאים עבור הגרף
    const [isResetting, setIsResetting] = useState(false); // מצב איפוס עבור אנימציה

    const earthClockRef = useRef(null);
    const spaceshipClockRef = useRef(null);

    // פונקציה לחישוב התארכות הזמן לפי תורת היחסות
    const calculateTimeDilation = (v) => {
        const vFraction = v / 100; // המרת אחוז לשבר
        const gamma = 1 / Math.sqrt(1 - vFraction * vFraction);
        return gamma;
    };

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                const gamma = calculateTimeDilation(speed);
                setTimeEitan((prevTime) => prevTime + 0.1); // הדמיית מעבר זמן כל 100ms עבור איתן
                setTimeDani((prevTime) => prevTime + 0.1 / gamma); // הדמיית מעבר זמן עבור דני, עם התחשבות בהתארכות הזמן

                // עדכון נתוני הפרש הגילאים עבור הגרף
                setAgeDifferenceData((prevData) => {
                    const newDataPoint = { speed: speed, difference: timeEitan - timeDani };
                    return [...prevData, newDataPoint];
                });

                // הוספת אפקטים ויזואליים לשעונים (אופציונלי)
                if (earthClockRef.current) {
                    earthClockRef.current.classList.add('animate-pulse');
                    setTimeout(() => earthClockRef.current.classList.remove('animate-pulse'), 200);
                }
                if (spaceshipClockRef.current) {
                    spaceshipClockRef.current.classList.add('animate-pulse');
                    setTimeout(() => spaceshipClockRef.current.classList.remove('animate-pulse'), 200);
                }

            }, 100);
        }

        // ניקוי האינטרוול כאשר הקומפוננטה מוסרת או כאשר הסימולציה נעצרת
        return () => clearInterval(intervalId);
    }, [isRunning, speed, timeEitan, timeDani]);


    // טיפול בשינוי מהירות החללית
    const handleSpeedChange = (e) => {
        setSpeed(parseFloat(e.target.value));
    };

    // טיפול בהפעלה/עצירה של הסימולציה
    const handleToggleSimulation = () => {
        setIsRunning(!isRunning);
    };

    // איפוס הסימולציה
    const resetSimulation = () => {
        setIsResetting(true); // הפעלת מצב איפוס עבור אנימציה
        setTimeout(() => {
            setTimeEitan(0);
            setTimeDani(0);
            setAgeDifferenceData([]);
            setIsResetting(false); // כיבוי מצב איפוס לאחר סיום האנימציה
        }, 500); // משך האנימציה (חצי שנייה)
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                מסע בזמן: פרדוקס התאומים
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו שני אחים תאומים. אחד נשאר על כדור הארץ, והשני טס בחללית במהירות עצומה. האם כשייפגשו שוב, יהיו באותו גיל? התשובה עשויה להפתיע אתכם...
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 transition-colors duration-300 hover:text-indigo-900">הדגמה אינטראקטיבית</h3>
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="speed" className="block text-gray-700 text-sm font-bold mb-2">
                        מהירות החללית (% ממהירות האור):
                    </label>
                    <div className="flex items-center space-x-3">
                        <input
                            type="range"
                            id="speed"
                            value={speed}
                            onChange={handleSpeedChange}
                            min="0"
                            max="99"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <span className="text-gray-700 font-medium">{speed}%</span>
                    </div>
                </div>

                <div className="mb-4 flex space-x-4 transition-all duration-300">
                    <button
                        onClick={handleToggleSimulation}
                        className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${isRunning ? 'bg-red-500 hover:bg-red-700' : ''}`}
                    >
                        {isRunning ? "עצור סימולציה" : "התחל סימולציה"}
                    </button>
                    <button
                        onClick={resetSimulation}
                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${isResetting ? 'animate-pulse' : ''}`}
                        disabled={isResetting}
                    >
                        {isResetting ? "מאפס..." : "אפס"}
                    </button>
                </div>

                <div className="flex space-x-4 items-center justify-center">
                    <div className="text-center">
                        <p className="font-bold text-lg text-green-600 mb-1">איתן (כדור הארץ):</p>
                        <div ref={earthClockRef} className="text-2xl font-mono text-gray-900 transition-opacity duration-300">
                            {timeEitan.toFixed(2)} <span className="text-sm">שנים</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg text-blue-600 mb-1">דני (חללית):</p>
                        <div ref={spaceshipClockRef} className="text-2xl font-mono text-gray-900 transition-opacity duration-300">
                            {timeDani.toFixed(2)} <span className="text-sm">שנים</span>
                        </div>
                    </div>
                </div>


                {/* גרף משופר המציג את ההפרש בגילאים לאורך זמן */}
                <div className="mt-8 w-full max-w-lg">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">הפרש גילאים לאורך זמן</h4>
                    <div className="relative h-52 w-full bg-gray-100 rounded overflow-hidden">
                        {ageDifferenceData.length === 0 ? (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                אין נתונים להצגה
                            </div>
                        ) : (
                            ageDifferenceData.map((dataPoint, index) => (
                                <div
                                    key={index}
                                    className="absolute bottom-0 transition-all duration-100"
                                    style={{
                                        left: `${(dataPoint.speed / 99) * 100}%`, // מיקום אופקי בהתאם למהירות
                                        width: '3px',
                                        height: `${Math.abs(dataPoint.difference) * 20}px`, // גובה בהתאם להפרש הגילאים
                                        backgroundColor: dataPoint.difference > 0 ? 'green' : 'blue', // צבע בהתאם למי מבוגר יותר
                                        opacity: 0.7,
                                    }}
                                >
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 text-xs text-gray-700 bg-white bg-opacity-75 rounded px-1 py-0.5 mb-1 hidden group-hover:block">
                                        {dataPoint.difference.toFixed(2)} שנים
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></div>
                        <div className="absolute left-0 top-0.5 h-full w-0.5 bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>0% מהירות האור</span>
                        <span>99% מהירות האור</span>
                    </div>
                    <p className="text-sm text-gray-500 text-center">גובה: הפרש גילאים (בקירוב)</p>
                </div>

            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>
                        <strong className="text-indigo-700">מהי תורת היחסות הפרטית?</strong>
                        <p>תורת היחסות הפרטית, שפותחה על ידי אלברט איינשטיין, מתארת את הקשר בין מרחב וזמן עבור גופים הנעים במהירות קבועה. היא מבוססת על שני עקרונות יסוד: חוקי הפיזיקה זהים בכל מערכות הייחוס האינרציאליות, ומהירות האור בריק זהה לכל הצופים, ללא תלות בתנועת המקור.</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">עקרון קביעות מהירות האור.</strong>
                        <p>אחד מעקרונות היסוד של תורת היחסות הפרטית הוא שמהירות האור בריק היא קבועה עבור כל הצופים, ללא קשר לתנועת המקור. זה אומר שאם תמדוד את מהירות האור הנפלטת מפנס נע או נייח, תקבל את אותה תוצאה.</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">התארכות זמן: הסבר מתמטי פשוט (ללא נגזרות או אינטגרלים מורכבים).</strong>
                        <p>כאשר גוף נע במהירות גבוהה יחסית לצופה, הזמן עובר לאט יותר עבור הגוף הנע ביחס לצופה הנייח. אפקט זה נקרא התארכות זמן. ניתן לחשב זאת באמצעות פקטור לורנץ (γ), שמחושב כך: γ = 1 / sqrt(1 - v²/c²), כאשר v היא מהירות הגוף ו-c היא מהירות האור.</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">מדוע פרדוקס התאומים הוא "פרדוקס" (ולמה הוא לא באמת פרדוקס)?</strong>
                        <p>הפרדוקס נובע מכך שמנקודת מבטו של התאום בחללית, נראה כאילו התאום על כדור הארץ הוא זה שנע, ולכן הזמן צריך לעבור לאט יותר עבורו. עם זאת, הסימטריה הזו נשברת בגלל שהתאום בחללית צריך להאיץ ולהאט כדי לחזור לכדור הארץ, מה שהופך את החוויה שלו לשונה.</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">האצה והאטה של החללית: חשיבות המעבר ממערכת ייחוס אינרציאלית אחת לאחרת.</strong>
                        <p>תורת היחסות הפרטית מתייחסת רק למערכות ייחוס אינרציאליות (מערכות הנעות במהירות קבועה). כאשר החללית מאיצה או מאטה, היא עוברת ממערכת ייחוס אחת לאחרת, והשינוי הזה משפיע על מדידת הזמן.</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">ניסויים אמיתיים שמוכיחים את התארכות הזמן (למשל, חלקיקים קוסמיים).</strong>
                        <p>ניסויים רבים אישרו את התארכות הזמן. לדוגמה, חלקיקי מיואון הנוצרים באטמוספירה העליונה אמורים להתפרק מהר מאוד, אך הם מגיעים לפני כדור הארץ בגלל התארכות הזמן הנובעת ממהירותם הגבוהה.</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">יישומים טכנולוגיים אפשריים (בעתיד הרחוק מאוד).</strong>
                        <p>הבנת תורת היחסות יכולה להוביל לפיתוח טכנולוגיות חדשות, כמו מערכות ניווט מדויקות יותר, מנועים מתקדמים לחלליות, ואולי אפילו שימוש מעשי במסע בזמן (אם כי זה עדיין בגדר תיאוריה).</p>
                    </li>
                    <li>
                        <strong className="text-indigo-700">שאלות נפוצות ותפיסות שגויות.</strong>
                        <p>אחת התפיסות השגויות הנפוצות היא שפרדוקס התאומים הוא באמת פרדוקס. בנוסף, ישנם אנשים שחושבים שהתארכות הזמן משפיעה רק על דברים קטנים כמו חלקיקים, ולא על בני אדם.</p>
                    </li>
                </ol>
            </section>
        </div>
    );
};

export default TimeTravelTwinParadox;