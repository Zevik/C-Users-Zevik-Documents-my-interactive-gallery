import React, { useState, useEffect, useRef } from 'react';

/**
 * PangolinSecretsArmorAndSurvival Component
 *
 * הסימולציה תציג פנגולין בסביבת המחיה הטבעית שלו, מוקף בנמלים וטורפים אפשריים. המשתמש יוכל לשלוט בפנגולין באמצעות לחצנים: "אכילה" (הפנגולין יאכל נמלים), "חיפוש מזון" (הפנגולין ינוע בסביבה), "סכנה" (יופיע טורף כמו נמר או צבוע). כאשר מופיעה סכנה, המשתמש יוכל ללחוץ על כפתור "התגוננות". אם המשתמש ילחץ בזמן, הפנגולין יתגלגל לכדור, והטורף יתייאש וילך. אם ילחץ מאוחר מדי, הטורף יתקוף (אנימציה קצרה) והמשתמש יקבל הסבר על חשיבות התגובה המהירה. המטרה היא להמחיש את מנגנון ההגנה הייחודי של הפנגולין ואת יעילותו.
 */
const PangolinSecretsArmorAndSurvival = () => {
    const [pangolinState, setPangolinState] = useState('idle'); // idle, foraging, eating, threatened, defending, attacked
    const [threatLevel, setThreatLevel] = useState(0); // 0: no threat, 1: low, 2: high
    const [message, setMessage] = useState('');
    const [forageProgress, setForageProgress] = useState(0);
    const [isForaging, setIsForaging] = useState(false);
    const [isEating, setIsEating] = useState(false);
    const [threatVisible, setThreatVisible] = useState(false); // מצב הראות של הטורף
    const [rolling, setRolling] = useState(false); // מצב התגלגלות
    const pangolinRef = useRef(null); // Reference ל-div של הפנגולין לאנימציות
    const [gameOver, setGameOver] = useState(false); // משתנה מצב לסיום המשחק

    // אפקטים צדדיים לטיפול במצבים שונים
    useEffect(() => {
        let timeoutId;
        // הודעות משתנות בהתאם למצב הפנגולין
        if (pangolinState === 'attacked') {
            setMessage('הפנגולין הותקף! תגובה מהירה חיונית להישרדות.');
            setGameOver(true); // משחק נגמר אם הותקף
        } else if (pangolinState === 'defending') {
            setMessage('הפנגולין התגלגל בהצלחה! הטורף התייאש והלך.');
        } else {
            setMessage('');
            setGameOver(false); // מאפס את מצב המשחק
        }

        // טיפול במצב "סכנה"
        if (pangolinState === 'threatened') {
            setThreatVisible(true); // הטורף מופיע
            timeoutId = setTimeout(() => {
                setThreatLevel(2);
            }, 3000); // העלאת רמת האיום לאחר 3 שניות

            return () => clearTimeout(timeoutId); // ניקוי הטיימר
        } else {
            setThreatVisible(false); // הטורף נעלם כשאין איום
        }
    }, [pangolinState]);

    useEffect(() => {
        let foragingInterval;

        // טיפול בתהליך חיפוש המזון
        if (isForaging) {
            setForageProgress(0);
            foragingInterval = setInterval(() => {
                setForageProgress((prevProgress) => {
                    const newProgress = prevProgress + 10;
                    if (newProgress >= 100) {
                        clearInterval(foragingInterval);
                        setIsForaging(false);
                        setPangolinState('idle');
                        return 0;
                    }
                    return newProgress;
                });
            }, 300);
        } else {
            clearInterval(foragingInterval);
        }

        return () => clearInterval(foragingInterval);
    }, [isForaging]);

    // פונקציות לטיפול בפעולות המשתמש
    const handleEat = () => {
        setIsEating(true);
        setPangolinState('eating');
        setTimeout(() => {
            setPangolinState('idle');
            setIsEating(false);
        }, 2000);
    };

    const handleForage = () => {
        setIsForaging(true);
        setPangolinState('foraging');
    };

    const handleThreat = () => {
        setThreatLevel(1);
        setPangolinState('threatened');
    };

    const handleDefend = () => {
        setRolling(true); // הפנגולין מתחיל להתגלגל
        setTimeout(() => {
            setRolling(false); // הפסקת ההתגלגלות לאחר זמן קצר
            if (threatLevel === 1) {
                setPangolinState('defending');
                setThreatLevel(0);
            } else if (threatLevel === 2) {
                setPangolinState('attacked');
                setThreatLevel(0);
            }
        }, 1000); // עצירת ההתגלגלות לאחר שנייה
    };

    // פונקציה להחזרת תיאור הפנגולין בהתאם למצבו
    const pangolinDescription = () => {
        switch (pangolinState) {
            case 'idle':
                return "הפנגולין רגוע ומחכה לפעולה.";
            case 'foraging':
                return "הפנגולין מחפש אחר נמלים טעימות.";
            case 'eating':
                return "הפנגולין אוכל נמלים.";
            case 'threatened':
                return "הפנגולין מרגיש מאוים!";
            case 'defending':
                return "הפנגולין מתגונן מפני הטורף.";
            case 'attacked':
                return "הפנגולין הותקף!";
            default:
                return "";
        }
    }

    // פונקציה להחזרת שם הקלאס עבור אנימציית התגלגלות
    const rollingAnimationClass = rolling ? 'animate-spin' : '';

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-green-50 to-teal-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-teal-800 leading-tight">
                סודות הפנגולין: שריון חי וטקטיקות הישרדות
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-teal-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו יצור מכוסה כולו בשריון, ניזון מנמלים וטרמיטים בלבד, ומתגלגל לכדור הדוק כשמאוים. האם תנחשו איזה יונק מסתורי מחזיק בתכונות הייחודיות האלו?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-teal-100 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-teal-700 mb-4">הדגמה אינטראקטיבית</h3>

                <div className="mb-4 text-center">
                    <p className="mb-2">{pangolinDescription()}</p>
                    {message && <p className="text-red-500 font-bold">{message}</p>}
                </div>

                {/* מצב חיפוש מזון - הצגת פס התקדמות */}
                {pangolinState === 'foraging' && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${forageProgress}%` }}></div>
                    </div>
                )}

                {/* תצוגת מצב הפנגולין - תמונה מתחלפת */}
                <div className="relative w-48 h-48 mb-6">
                    <img
                        ref={pangolinRef}
                        src={
                            pangolinState === 'idle' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Manis_javanica_eating.jpg/320px-Manis_javanica_eating.jpg' :
                                pangolinState === 'foraging' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/White-bellied_Pangolins.jpg/320px-White-bellied_Pangolins.jpg' :
                                    pangolinState === 'eating' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/White-bellied_Pangolins.jpg/320px-White-bellied_Pangolins.jpg' :
                                        pangolinState === 'threatened' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Indian_Pangolin_%28Manis_crassicaudata%29.jpg/320px-Indian_Pangolin_%28Manis_crassicaudata%29.jpg' :
                                            pangolinState === 'defending' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Indian_Pangolin_%28Manis_crassicaudata%29.jpg/320px-Indian_Pangolin_%28Manis_crassicaudata%29.jpg' :
                                                pangolinState === 'attacked' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Indian_Pangolin_%28Manis_crassicaudata%29.jpg/320px-Indian_Pangolin_%28Manis_crassicaudata%29.jpg' :
                                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Manis_javanica_eating.jpg/320px-Manis_javanica_eating.jpg'
                        }
                        alt="פנגולין"
                        className={`transition-all duration-500 rounded-full object-cover w-full h-full ${rollingAnimationClass}`} // אנימציה משתנה בהתאם למצב
                    />

                    {/* תמונת הטורף (מוסתרת כברירת מחדל) */}
                    {threatVisible && (
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tanzania_Serengeti_Cheetah-3.jpg/320px-Tanzania_Serengeti_Cheetah-3.jpg"
                            alt="טורף"
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-full opacity-90 transition-opacity duration-500" // מעבר הדרגתי
                        />
                    )}
                </div>

                {/* כפתורי פעולה */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleEat}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isEating || isForaging || pangolinState === 'threatened' || pangolinState === 'defending' || pangolinState === 'attacked' || gameOver}
                    >
                        אכילה
                    </button>
                    <button
                        onClick={handleForage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isEating || isForaging || pangolinState === 'threatened' || pangolinState === 'defending' || pangolinState === 'attacked' || gameOver}
                    >
                        חיפוש מזון
                    </button>
                    <button
                        onClick={handleThreat}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isEating || isForaging || pangolinState === 'threatened' || pangolinState === 'defending' || pangolinState === 'attacked' || gameOver}
                    >
                        סכנה
                    </button>
                    {pangolinState === 'threatened' && (
                        <button
                            onClick={handleDefend}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            התגוננות
                        </button>
                    )}
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-teal-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-teal-800 text-center">
                    ההסבר המדעי
                </h2>
                <p className="mb-4">
                    - <strong className="font-semibold">מבוא לפנגולין:</strong> הפנגולין הוא היונק היחיד בעולם עם קשקשים. ישנם שמונה מינים שונים של פנגולינים, ארבעה באסיה וארבעה באפריקה.
                    הפנגולינים הם יצורים ליליים וביישנים, ולכן קשה לחקור אותם בטבע. הם ממלאים תפקיד חשוב במערכת האקולוגית על ידי שליטה באוכלוסיית הנמלים והטרמיטים.
                </p>
                <p className="mb-4">
                    - <strong className="font-semibold">מבנה הקשקשים:</strong> הקשקשים של הפנגולין עשויים מקרטין, אותו חלבון ממנו עשויות הציפורניים והשיער שלנו. הם מסודרים בצורה חופפת ומספקים הגנה יעילה מפני טורפים.
                    הקשקשים מכסים את כל גופו של הפנגולין מלבד הבטן הפנימית, הפנים והחלק הפנימי של הרגליים.
                </p>
                <p className="mb-4">
                    - <strong className="font-semibold">תזונה:</strong> הפנגולינים ניזונים באופן בלעדי מנמלים וטרמיטים. הם משתמשים בלשונם הארוכה והדביקה כדי ללקק את החרקים מתוך הקינים שלהם.
                    ללשון של הפנגולין יכולה להיות אורך של עד 40 ס"מ, והיא מחוברת לאגן הירכיים שלו!
                </p>
                <p className="mb-4">
                    - <strong className="font-semibold">מנגנון ההגנה:</strong> כאשר הפנגולין מרגיש מאוים, הוא מתגלגל לכדור הדוק, כך שהקשקשים שלו מגנים עליו מכל הצדדים. זהו מנגנון הגנה יעיל מאוד נגד רוב הטורפים.
                    השרירים החזקים של הפנגולין מאפשרים לו להתכרבל חזק מאוד, מה שמקשה על טורפים לפתוח אותו.
                </p>
                <p className="mb-4">
                    - <strong className="font-semibold">טורפים עיקריים ואיום ההכחדה:</strong> הטורפים העיקריים של הפנגולין כוללים נמרים, צבועים, ופיתונים. עם זאת, האיום הגדול ביותר על הפנגולינים הוא ציד בלתי חוקי לצורך שימוש בקשקשים שלהם ברפואה המסורתית ולצריכה כמאכל גורמה. כתוצאה מכך, כל שמונת מיני הפנגולינים נמצאים בסכנת הכחדה.
                    חשוב להעלות את המודעות למצבם של הפנגולינים ולתמוך במאמצי שימור כדי להבטיח את הישרדותם בעתיד.
                </p>
            </section>
        </div>
    );
};

export default PangolinSecretsArmorAndSurvival;