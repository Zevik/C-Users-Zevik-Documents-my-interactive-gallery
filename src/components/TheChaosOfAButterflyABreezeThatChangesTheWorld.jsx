import React, { useState, useEffect, useRef } from 'react';

const TheChaosOfAButterflyABreezeThatChangesTheWorld = () => {
    const [angle, setAngle] = useState(0);
    const [initialPath, setInitialPath] = useState([]);
    const [modifiedPath, setModifiedPath] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [isResetting, setIsResetting] = useState(false); // מצב עבור אנימציית איפוס
    const ballRef = useRef(null); // Reference עבור הכדור
    const containerRef = useRef(null); // Reference עבור ה container של המסלול
    const [trail, setTrail] = useState([]); // מצב עבור שובל הנקודות
    const trailMaxLength = 20; // אורך השובל המקסימלי
    const [showTrail, setShowTrail] = useState(true); // מצב תצוגת שובל

    //פונקציה לחישוב מסלול הכדור בהתבסס על זווית התחלתית
    const calculatePath = (initialAngle) => {
        const path = [];
        let x = 0;
        let y = 0;
        let currentAngle = initialAngle;

        for (let i = 0; i < 50; i++) {
            x += Math.cos(currentAngle * Math.PI / 180);
            y += Math.sin(currentAngle * Math.PI / 180);
            path.push({ x, y });

            // גבולות המסלול: כשהכדור פוגע בקצה המסלול, שנה כיוון
            if (x > 10) currentAngle = 180 - currentAngle;
            if (x < -10) currentAngle = 180 - currentAngle;
            if (y > 10) currentAngle = -currentAngle;
            if (y < -10) currentAngle = -currentAngle;
        }
        return path;
    };

    useEffect(() => {
        // חישוב המסלולים ההתחלתיים והמשתנים כאשר הזווית משתנה
        setInitialPath(calculatePath(0));
        setModifiedPath(calculatePath(angle));
    }, [angle]);

    useEffect(() => {
        // הוספת נקודה לשובל כל פעם שהמסלול משתנה
        if (modifiedPath.length > 0 && ballRef.current) {
            const ballRect = ballRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const x = ballRect.left - containerRect.left + ballRect.width / 2;
            const y = ballRect.top - containerRect.top + ballRect.height / 2;

            setTrail(prevTrail => {
                const newTrail = [...prevTrail, { x, y }];
                // שמירה על אורך השובל המקסימלי
                return newTrail.length > trailMaxLength ? newTrail.slice(1) : newTrail;
            });
        }
    }, [modifiedPath]);


    const handleAngleChange = (e) => {
        // שינוי הזווית בהתאם לערך הסליידר
        setAngle(parseFloat(e.target.value));
    };

    const handleReset = () => {
        // איפוס הזווית והשובל, עם אנימציה
        setIsResetting(true);
        setAngle(0);
        setShowComparison(false);
        setTrail([]); // מנקה את השובל
        setTimeout(() => {
            setIsResetting(false);
        }, 500); // משך האנימציה
    };

    const handleCompare = () => {
        // שינוי מצב ההשוואה
        setShowComparison(!showComparison);
    };

    const containerStyle = {
        width: '300px',
        height: '200px',
        border: '2px dashed #ccc',
        marginBottom: '10px',
        position: 'relative',
        overflow: 'hidden', // מסתיר חלקים מהכדור שיוצאים מגבולות הקונטיינר
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                הכאוס שבפרפר: משב רוח שמשנה עולם
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם נפנוף כנפי פרפר יכול לגרום לסופת טורנדו בצד השני של העולם? נשמע מופרך, נכון? תארו לעצמכם שההחלטה הקטנה ביותר שלכם היום תשנה את כל חייכם בעוד עשר שנים.
            </p>

            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <p className="mb-4">שנה את הזווית ההתחלתית של הכדור:</p>
                <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={angle}
                    onChange={handleAngleChange}
                    className="w-full mb-4 appearance-none h-2 bg-indigo-100 rounded-full outline-none cursor-pointer"
                />
                <p className="text-indigo-500 transition duration-300">זווית נוכחית: <span className="font-semibold">{angle.toFixed(1)}</span> מעלות</p>

                <div style={containerStyle} ref={containerRef}>
                    {/* שובל הנקודות */}
                    {showTrail && trail.map((point, index) => (
                        <div
                            key={index}
                            className="absolute rounded-full"
                            style={{
                                left: point.x,
                                top: point.y,
                                width: `${2 + index * 0.1}px`, // גודל גדל בהדרגה
                                height: `${2 + index * 0.1}px`,
                                backgroundColor: `rgba(102, 51, 153, ${0.2 + index * 0.05})`, // צבע דוהה בהדרגה
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                                transition: 'background-color 0.1s ease'
                            }}
                        ></div>
                    ))}
                    {/* הכדור */}
                    <div
                        ref={ballRef}
                        className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 shadow-md transition-all duration-100 transform-gpu"
                        style={{
                            left: `calc(50% + ${modifiedPath[modifiedPath.length - 1]?.x * 10}px)`,
                            top: `calc(50% + ${modifiedPath[modifiedPath.length - 1]?.y * 10}px)`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                </div>

                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={handleReset}
                        disabled={isResetting}
                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ${isResetting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isResetting ? 'מאפס...' : 'איפוס'}
                    </button>
                    <button
                        onClick={handleCompare}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        {showComparison ? 'הסתר השוואה' : 'השוואה'}
                    </button>
                    <button
                        onClick={() => setShowTrail(!showTrail)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        {showTrail ? 'הסתר שובל' : 'הצג שובל'}
                    </button>
                </div>

                {showComparison && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-inner">
                        <h4 className="text-lg font-semibold text-indigo-800 mb-2">השוואה בין מסלולים</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium text-gray-700">מסלול מקורי (0 מעלות):</p>
                                <ul className="list-disc pl-5">
                                    {initialPath.slice(0, 5).map((point, index) => (
                                        <li key={index} className="text-sm text-gray-600">X: {point.x.toFixed(2)}, Y: {point.y.toFixed(2)}</li>
                                    ))}
                                    <li>...</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">מסלול משונה ({angle.toFixed(1)} מעלות):</p>
                                <ul className="list-disc pl-5">
                                    {modifiedPath.slice(0, 5).map((point, index) => (
                                        <li key={index} className="text-sm text-gray-600">X: {point.x.toFixed(2)}, Y: {point.y.toFixed(2)}</li>
                                    ))}
                                    <li>...</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p><strong>מהי תורת הכאוס:</strong> תורת הכאוס עוסקת במערכות דינמיות לא-ליניאריות, כלומר מערכות שההתנהגות שלהן אינה פרופורציונלית לשינויים בתנאי ההתחלה. במערכות כאלה, שינויים קטנים בתנאים הראשוניים יכולים להוביל לתוצאות שונות בתכלית.</p>

                <p><strong>רגישות לתנאי התחלה:</strong> רגישות לתנאי התחלה היא אחד המאפיינים המרכזיים של מערכות כאוטיות. המשמעות היא ששינוי קטן מאוד בתנאים ההתחלתיים של המערכת יכול לגרום לשינויים עצומים בהתנהגות שלה לאורך זמן. דוגמה קלאסית היא מזג האוויר: שינוי קטן בטמפרטורה או בלחות במקום מסוים יכול להשפיע על מזג האוויר באזור אחר בעולם.</p>

                <p><strong>אפקט הפרפר:</strong> אפקט הפרפר הוא מטפורה המתארת את הרגישות לתנאי התחלה. השם נובע מהשאלה ההיפותטית "האם נפנוף כנפי פרפר בברזיל יכול לגרום לסופת טורנדו בטקסס?". הדוגמאות המפורסמות כוללות את מזג האוויר, שוק המניות, ותגובות כימיות.</p>

                <p><strong>מגבלות החיזוי:</strong> בשל הרגישות לתנאי התחלה, קשה מאוד לחזות את ההתנהגות של מערכות כאוטיות לאורך זמן. גם אם יש לנו מידע מדויק על תנאי ההתחלה, שגיאות קטנות במדידה או בחישוב יכולות להוביל לחיזויים שגויים לחלוטין. לכן, חיזוי מזג האוויר לטווח ארוך הוא משימה מאתגרת במיוחד.</p>

                <p><strong>שימושים מעשיים:</strong> למרות הקושי בחיזוי, תורת הכאוס רלוונטית לתחומים רבים, ביניהם:</p>
                <ul className="list-disc list-inside">
                    <li><strong>מטאורולוגיה:</strong> הבנת התנהגות מזג האוויר ושיפור מודלים לחיזוי.</li>
                    <li><strong>כלכלה:</strong> ניתוח התנהגות שוק המניות ומערכות כלכליות מורכבות.</li>
                    <li><strong>ביולוגיה:</strong> חקר דינמיקה של אוכלוסיות, התפשטות מחלות, ותפקוד מערכות ביולוגיות מורכבות.</li>
                    <li><strong>הנדסה:</strong> תכנון מערכות בקרה ובניית מודלים של זרימה טורבולנטית.</li>
                </ul>
            </section>
        </div>
    );
};

export default TheChaosOfAButterflyABreezeThatChangesTheWorld;