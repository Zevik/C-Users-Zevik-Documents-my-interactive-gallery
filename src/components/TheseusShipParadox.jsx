import React, { useState, useEffect, useRef } from 'react';

const TheseusShipParadox = () => {
    const [replacedPartsCount, setReplacedPartsCount] = useState(0);
    const [isStillSameShip, setIsStillSameShip] = useState(null);
    const [showRebuildOption, setShowRebuildOption] = useState(false);
    const [isOriginalShipTrue, setIsOriginalShipTrue] = useState(null);
    const [shipParts, setShipParts] = useState(['קרש1', 'מפרש', 'תורן', 'הגה', 'עוגן']);
    const [shipImage, setShipImage] = useState('/images/ship.png');
    const [originalParts, setOriginalParts] = useState([]);
    const [rebuiltShip, setRebuiltShip] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const shipImageRef = useRef(null); // רפרנס לתמונה של הספינה לאנימציות

    // אפקט צדדי להצגת הודעות משוב למשתמש
    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => {
                setFeedbackMessage('');
            }, 3000); // הסתרת ההודעה לאחר 3 שניות
            return () => clearTimeout(timer); // ניקוי הטיימר אם הקומפוננטה מתפרקת
        }
    }, [feedbackMessage]);

    // פונקציה להחלפת חלק בספינה
    const handleReplacePart = () => {
        // בחירת אינדקס רנדומלי של חלק להחלפה
        const randomPartIndex = Math.floor(Math.random() * shipParts.length);
        const replacedPart = shipParts[randomPartIndex];
        const newPart = `חלק חדש ${replacedPartsCount + 1}`;
        const newShipParts = [...shipParts];
        newShipParts[randomPartIndex] = newPart;

        // שמירת החלק המקורי שהוחלף
        setOriginalParts(prev => [...prev, replacedPart]);
        // עדכון חלקי הספינה
        setShipParts(newShipParts);
        // עדכון מספר החלקים שהוחלפו
        setReplacedPartsCount(replacedPartsCount + 1);
        // איפוס מצבים רלוונטיים
        setIsStillSameShip(null);
        setIsOriginalShipTrue(null);
        setShowRebuildOption(false);
        setRebuiltShip(false);

        // הפעלת אנימציה של טלטול הספינה
        if (shipImageRef.current) {
            shipImageRef.current.classList.add('animate-shake');
            setTimeout(() => {
                shipImageRef.current.classList.remove('animate-shake');
            }, 500); // הסרת הקלאס לאחר חצי שניה
        }

        // מתן משוב ויזואלי
        setFeedbackMessage(`הוחלף ${replacedPart} ב-${newPart}!`);
    };

    // פונקציה לטיפול בתשובת המשתמש לגבי זהות הספינה
    const handleAnswer = (answer) => {
        setIsStillSameShip(answer);
        setShowRebuildOption(true);
        setFeedbackMessage(answer ? 'מעניין... אתה חושב שזו עדיין אותה ספינה!' : 'הבנתי... אתה חושב שהיא כבר לא אותה ספינה!');
    };

    // פונקציה לשיקום הספינה המקורית
    const handleRebuild = () => {
        setShipParts([...originalParts]);
        setIsOriginalShipTrue(null);
        setShipImage('/images/original_ship.png');
        setRebuiltShip(true);
        setFeedbackMessage('הספינה המקורית שוחזרה!');
    };

    // פונקציה לטיפול בתשובת המשתמש לגבי הספינה המשוקמת
    const handleOriginalShipAnswer = (answer) => {
        setIsOriginalShipTrue(answer);
        setFeedbackMessage(answer ? 'אוקיי, אז הספינה המשוחזרת היא ספינת תזאוס האמיתית!' : 'הבנתי, אתה חושב שגם הספינה המשוחזרת היא לא ספינת תזאוס האמיתית.');
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                ספינת תזאוס: האם היא עדיין אותה הספינה?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו ספינה עתיקה שכל קרש שלה, אחד אחרי השני, מוחלף בקרש חדש. האם בסוף התהליך זו עדיין אותה הספינה המקורית? ואם נרכיב את כל הקרשים הישנים לספינה חדשה, איזו מהן היא 'ספינת תזאוס' האמיתית?
            </p>

            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <img
                    ref={shipImageRef}
                    src={shipImage}
                    alt="ספינה"
                    className="max-w-md mb-4 transition-transform duration-300 hover:scale-110 cursor-pointer"
                    title="לחצו כדי לראות את הספינה!"
                />
                <p className="text-lg">חלקים שהוחלפו: <span className="font-semibold text-blue-500">{replacedPartsCount}</span></p>
                <div className="flex flex-wrap justify-center mb-4">
                    {shipParts.map((part, index) => (
                        <span key={index} className="mr-2 py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium transition-all duration-200 hover:bg-gray-300">{part}</span>
                    ))}
                </div>
                <button
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300"
                    onClick={handleReplacePart}
                    disabled={replacedPartsCount >= 10} // הגבלת מספר ההחלפות
                >
                    {replacedPartsCount < 10 ? 'החלף חלק' : 'הספינה שופצה לחלוטין!'}
                </button>

                {replacedPartsCount > 3 && isStillSameShip === null && (
                    <div className="mb-4 animate-fade-in">
                        <p className="text-lg font-semibold mb-2">האם זו עדיין אותה ספינה?</p>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300" onClick={() => handleAnswer(true)}>כן</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={() => handleAnswer(false)}>לא</button>
                    </div>
                )}

                {showRebuildOption && isStillSameShip !== null && (
                    <div className="animate-slide-in-bottom">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300" onClick={handleRebuild}>בנה את הספינה המקורית</button>
                    </div>
                )}

                {rebuiltShip && isOriginalShipTrue === null && (
                    <div className="mb-4 animate-fade-in">
                        <p className="text-lg font-semibold mb-2">האם זו ספינת תזאוס האמיתית?</p>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300" onClick={() => handleOriginalShipAnswer(true)}>כן</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={() => handleOriginalShipAnswer(false)}>לא</button>
                    </div>
                )}

                {isStillSameShip !== null && (
                    <p className="text-lg mt-4 font-medium animate-fade-in">תשובתך: <span className="text-green-600">{isStillSameShip ? 'כן, זו עדיין אותה הספינה' : 'לא, זו לא אותה הספינה'}</span></p>
                )}
                {isOriginalShipTrue !== null && (
                    <p className="text-lg mt-4 font-medium animate-fade-in">תשובתך לגבי הספינה המקורית: <span className="text-green-600">{isOriginalShipTrue ? 'כן, זו ספינת תזאוס האמיתית' : 'לא, זו לא ספינת תזאוס האמיתית'}</span></p>
                )}

                {/* הודעת משוב למשתמש */}
                {feedbackMessage && (
                    <div className="absolute bottom-0 left-0 w-full bg-green-100 border-t border-green-200 py-2 px-4 text-center text-green-700 font-semibold animate-fade-in">
                        {feedbackMessage}
                    </div>
                )}
            </section>

            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 animate-slide-in-bottom">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר הפילוסופי
                </h2>
                <p><strong>מהו פרדוקס ספינת תזאוס:</strong> פרדוקס זה מעלה את השאלה האם אובייקט שנרכיביו הוחלפו בהדרגה עדיין נחשב לאותו אובייקט.</p>

                <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-700">גישות פילוסופיות לפרדוקס:</h3>
                <ul className="list-disc list-inside">
                    <li><strong className="font-semibold">פרסיסטנטיות (endurantism):</strong> גישה זו טוענת שהספינה נשארת זהה למרות השינויים, מכיוון שהיא ממשיכה להתקיים באותו מקום ובאותו זמן, אף על פי שהרכיבים שלה משתנים.</li>
                    <li><strong className="font-semibold">פרדורנטיזם (perdurantism):</strong> גישה זו רואה את הספינה כאוסף של חלקים לאורך זמן. הזהות של הספינה מוגדרת על ידי סדרת החלקים שהיא מורכבת מהם ברגע נתון.</li>
                    <li><strong className="font-semibold">גישת ה'טלאים':</strong> גישה זו מדגישה שכל חלק מהווה טלאי המחליף חלק אחר, אך הזהות של הספינה נשמרת מכיוון שהשינויים הם הדרגתיים ומתמשכים.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-700">השלכות הפרדוקס על זהות עצמית:</h3>
                <p>הפרדוקס מעלה שאלות על זהות אישית ושינוי. האם אנחנו עדיין אותו אדם אם כל התאים בגוף שלנו הוחלפו לאורך זמן? האם הזיכרונות והחוויות שלנו הם שמגדירים את הזהות שלנו?</p>

                <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-700">יישומים מודרניים:</h3>
                <p>הפרדוקס רלוונטי גם בתחומים כמו מדעי המחשב (עדכון תוכנה) וביולוגיה (החלפת תאים בגוף). לדוגמה, כאשר אנו מעדכנים תוכנה, האם זו עדיין אותה תוכנה אם כל הקוד שלה שונה?</p>
            </section>
        </div>
    );
};

export default TheseusShipParadox;