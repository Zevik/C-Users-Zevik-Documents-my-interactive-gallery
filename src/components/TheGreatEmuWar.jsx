import React, { useState, useEffect } from 'react';

const TheGreatEmuWar = () => {
    const [bullets, setBullets] = useState(50);
    const [emusShot, setEmusShot] = useState(0);
    const [emusPresent, setEmusPresent] = useState(500);
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [simulationEnded, setSimulationEnded] = useState(false);
    const [message, setMessage] = useState(''); // הודעה למשתמש, לדוגמה "טענת!"
    const [gameOverMessage, setGameOverMessage] = useState(''); //הודעה מותאמת אישית בסיום המשחק

    // אפקטים קוליים (אפשר להוסיף קבצי אודיו)
    const pewSound = () => new Audio('https://www.fesliyanstudios.com/play-mp3/6656').play();
    const ouchSound = () => new Audio('https://www.myinstants.com/media/sounds/pain.mp3').play();
    const gameOverSound = () => new Audio('https://www.myinstants.com/media/sounds/sad-trombone.mp3').play();


    useEffect(() => {
        let interval;
        if (simulationRunning && bullets > 0 && emusPresent > 0) {
            interval = setInterval(() => {
                // הסתברות לפגיעה באמו
                if (Math.random() < 0.1) {
                    setEmusShot(prev => prev + 1);
                    setEmusPresent(prev => prev - 1);
                    setMessage('פגעת!'); // משוב ויזואלי
                    pewSound(); // השמעת אפקט ירי
                    ouchSound(); // השמעת אפקט פגיעה
                    setTimeout(() => setMessage(''), 500); // ניקוי ההודעה לאחר זמן קצר
                } else {
                    // הסתברות להתרבות אמו
                    if (Math.random() < 0.01) {
                        setEmusPresent(prev => prev + 1);
                        setMessage('אמו חדש הגיע!'); // משוב ויזואלי
                        setTimeout(() => setMessage(''), 500); // ניקוי ההודעה לאחר זמן קצר
                    } else {
                        setMessage(''); // ניקוי ההודעה אם לא קרה כלום
                    }
                }
                setBullets(prev => prev - 1);
            }, 100);
        } else {
            clearInterval(interval);
            setSimulationRunning(false);
            setSimulationEnded(true);

            //הודעה מותאמת אישית לסיום המשחק
            if (emusPresent === 0) {
                setGameOverMessage('ניצחת! הצלת את אוסטרליה!');
            } else {
                setGameOverMessage('האמו ניצחו... כדאי שתוותר.');
                gameOverSound();
            }

        }

        return () => clearInterval(interval);
        // useEffect יופעל מחדש בכל שינוי ב-simulationRunning, bullets, או emusPresent
    }, [simulationRunning, bullets, emusPresent]);

    const startSimulation = () => {
        setBullets(50);
        setEmusShot(0);
        setEmusPresent(500);
        setSimulationRunning(true);
        setSimulationEnded(false);
        setGameOverMessage(''); // איפוס הודעת סיום
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-green-50 to-yellow-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            {/* כותרת מרכזית */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-green-800 leading-tight animate-pulse">
                מלחמת האמו הגדולה: סימולציה אינטראקטיבית
            </h1>
            {/* תיאור קצר */}
            <p className="text-xl md:text-2xl font-light italic text-yellow-600 text-center mb-10 max-w-3xl mx-auto">
                הצטרפו לסימולציה המטורפת בה הצבא האוסטרלי ניסה (ונכשל!) להילחם באמו. האם תוכלו לשנות את ההיסטוריה?
            </p>

            {/* אזור הסימולציה */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-green-700 mb-4">הדגמה אינטראקטיבית</h3>

                {!simulationEnded ? (
                    // תצוגה בזמן הסימולציה
                    <div className="space-y-3">
                        <p className="mb-2 text-lg">כדורים: <span className="font-semibold">{bullets}</span></p>
                        <p className="mb-2 text-lg">אמו בשטח: <span className="font-semibold">{emusPresent}</span></p>
                        <p className="mb-4 text-lg">אמו שנפגעו: <span className="font-semibold">{emusShot}</span></p>
                        {message && (
                            <div className="text-center text-xl font-bold text-blue-600 animate-bounce">{message}</div>
                        )}

                        {!simulationRunning ? (
                            // כפתור התחלת סימולציה
                            <button onClick={startSimulation} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                                התחל סימולציה
                            </button>
                        ) : (
                            // הודעה שהסימולציה רצה
                            <div className="flex items-center justify-center">
                                <p className="text-lg font-semibold text-gray-700 mr-2">הסימולציה בעיצומה...</p>
                                <div className="w-6 h-6 rounded-full bg-green-500 animate-ping"></div>
                            </div>
                        )}
                    </div>
                ) : (
                    // תצוגה בסיום הסימולציה
                    <div className="text-center">
                        <h4 className="text-xl font-semibold text-gray-700 mb-2">דיווח סיום</h4>
                        <p className="mb-2">כמות אמו התחלתית: 500</p>
                        <p className="mb-2">כדורים שנורו: 50</p>
                        <p className="mb-4">אמו שנפגעו: {emusShot}</p>
                        <p className={`text-2xl font-bold ${emusPresent === 0 ? 'text-green-600' : 'text-red-600'}`}>{gameOverMessage}</p>
                    </div>
                )}
            </section>

            {/* הסבר היסטורי ומדעי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-yellow-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-green-800 text-center">
                    ההסבר המדעי
                </h2>
                <p><strong>רקע היסטורי:</strong> השפל הכלכלי הגדול באוסטרליה והקצאת קרקעות לחיילים משוחררים. לאחר מלחמת העולם הראשונה, ממשלת אוסטרליה הציעה לחיילים משוחררים אדמות חקלאיות במערב אוסטרליה, במטרה לסייע להם להשתקם ולפתח את האזור. עם זאת, האזור סבל ממחסור במים ותשתיות לא מספקות, מה שהקשה על החקלאים החדשים.</p>
                <p><strong>האיום האמואי:</strong> אוכלוסיית האמו גדלה משמעותית ופגעה ביבולים. עקב כריתת שטחי מרעה טבעיים לטובת שטחים חקלאיים, האמו נמשכו לשדות המעובדים כמקור מזון חלופי. להקות גדולות של אמו היו פושטות על השדות, אוכלות את היבולים וגורמות לנזק רב לתשתיות החקלאיות, כגון גדרות.</p>
                <p><strong>פנייה לממשלה:</strong> החקלאים מבקשים סיוע צבאי לטיפול בבעיה. החקלאים המתוסכלים פנו לממשלה בבקשה לסיוע, בטענה שהם אינם מסוגלים להתמודד עם האיום האמואי בכוחות עצמם. הם ביקשו שהממשלה תשלח כוחות צבא כדי להדביר את האמו ולהגן על היבולים שלהם.</p>
                <p><strong>הפעלת הצבא:</strong> יחידה מצוידת במקלעים נשלחת למשימה. שר ההגנה האוסטרלי הסכים לבקשה, מתוך אמונה שהצבא יכול לפתור את הבעיה במהירות וביעילות. יחידה של הצבא האוסטרלי, בפיקודו של מייג'ור מרווין מרדית', נשלחה לאזור עם שני מקלעים לואיס וכ-10,000 כדורים.</p>
                <p><strong>כישלון המבצע:</strong> קשיים טכניים, טקטיקות לא יעילות, עמידות האמו. המבצע הצבאי נתקל בקשיים רבים מההתחלה. המקלעים התגלו כלא יעילים נגד האמו, שהיו מהירות וחמקמקות. בנוסף, האמו היו עמידות באופן מפתיע לפגיעות ירי, ולעיתים קרובות המשיכו לרוץ גם לאחר שנפגעו. הטקטיקות הצבאיות שהופעלו, כמו ניסיון לארוב לאמו או לרדוף אחריהן עם כלי רכב, לא הועילו.</p>
                <p><strong>תוצאות המלחמה:</strong> נזק תדמיתי לצבא, ביקורת ציבורית, והמשך בעיית האמו. המבצע הסתיים בכישלון מוחלט. הצבא לא הצליח להדביר את האמו, והמבצע ספג ביקורת ציבורית רחבה. התקשורת לעגה לצבא על כישלונו להביס את האמו, והאירוע הפך לסמל לחוסר יעילות ממשלתית. בעיית האמו נותרה בעינה, והחקלאים נאלצו למצוא פתרונות אחרים כדי להגן על היבולים שלהם.</p>
                <p><strong>לקחים מהאירוע:</strong> חשיבות ההבנה האקולוגית, פתרונות ברי קיימא לבעיות חקלאיות, ביקורת על שימוש בכוח צבאי בבעיות אזרחיות. מלחמת האמו הגדולה מלמדת אותנו לקחים חשובים על הצורך בהבנה מעמיקה של מערכות אקולוגיות לפני שמנסים לשנות אותן. היא מדגישה את החשיבות של פיתוח פתרונות ברי קיימא לבעיות חקלאיות, במקום להסתמך על פתרונות צבאיים או טכנולוגיים מהירים. בנוסף, היא מעלה שאלות חשובות על השימוש בכוח צבאי לפתרון בעיות אזרחיות, ומדגישה את הצורך בשיקול דעת זהיר לפני הפעלת כוח.</p>
            </section>
        </div>
    );
};

export default TheGreatEmuWar;