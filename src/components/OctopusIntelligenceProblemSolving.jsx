import React, { useState } from 'react';

const OctopusIntelligenceProblemSolving = () => {
    const [jarOpen, setJarOpen] = useState(false);
    const [octopusColor, setOctopusColor] = useState('gray');
    const [mazeSolution, setMazeSolution] = useState([]);
    const [isSolvingMaze, setIsSolvingMaze] = useState(false); // מצב טעינה עבור פתרון המבוך

    const handleJarOpen = () => {
        setJarOpen(true);
        // אפקט קולי או ויזואלי לפתיחת הצנצנת (אפשר להוסיף כאן)
    };

    const handleColorChange = (color) => {
        setOctopusColor(color);
    };

    const handleMazeSolve = () => {
        setIsSolvingMaze(true); // מתחילים את הטעינה

        // סימולציה של טעינה של 2 שניות לפני הצגת הפתרון
        setTimeout(() => {
            setMazeSolution(['ימין', 'ישר', 'שמאל']);
            setIsSolvingMaze(false); // סיום הטעינה
        }, 2000);
    };


    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-colors duration-300 hover:bg-gradient-to-tr hover:from-indigo-50 hover:to-purple-50" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                מוח תמנוני: איך תמנון פותר בעיות?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו יצור רך גוף, חסר שלד, שמסוגל לפתוח צנצנת אטומה, להסוות את עצמו בצורה מושלמת, ואפילו לברוח מאקווריום סגור. איך תמנון עושה את זה, כשיש לו 'מוח' מבוזר בזרועות?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-shadow duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <div className="mb-4 w-full max-w-md">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">פתיחת צנצנת:</h4>
                    <button
                        onClick={handleJarOpen}
                        className={`relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 ${jarOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={jarOpen}
                    >
                        {jarOpen ? (
                            <>
                                <span className="absolute inset-0 bg-green-500 opacity-75 animate-pulse"></span>
                                <span className="relative">הצנצנת פתוחה!</span>
                            </>
                        ) : (
                            <span className="relative">נסה לפתוח את הצנצנת</span>
                        )}
                        {jarOpen && <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-green-200 animate-bounce">🎉</span>}
                    </button>
                </div>
                <div className="mb-4 w-full max-w-md">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">הסוואה:</h4>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => handleColorChange('green')}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            הפוך לירוק
                        </button>
                        <button
                            onClick={() => handleColorChange('blue')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            הפוך לכחול
                        </button>
                        <button
                            onClick={() => handleColorChange('gray')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            הפוך לאפור
                        </button>
                    </div>
                    <p className="mt-3 text-gray-600">צבע התמנון: <span className="font-bold" style={{ color: octopusColor, transition: 'color 0.5s ease-in-out' }}>{octopusColor}</span></p>
                </div>
                <div className="w-full max-w-md">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">מבוך:</h4>
                    <button
                        onClick={handleMazeSolve}
                        className={`relative bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${isSolvingMaze ? 'cursor-wait' : ''}`}
                        disabled={isSolvingMaze}
                    >
                        {isSolvingMaze ? (
                            <>
                                <span className="animate-ping absolute top-0 left-0 w-full h-full rounded-full bg-yellow-500 opacity-75"></span>
                                <span className="relative">פותר...</span>
                            </>
                        ) : (
                            <span className="relative">פתור את המבוך</span>
                        )}
                    </button>
                    <p className="mt-3 text-gray-600">פתרון המבוך: {mazeSolution.length > 0 ? mazeSolution.join(', ') : 'לא נפתר'}</p>
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-transform duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center animate-pulse">
                    ההסבר המדעי
                </h2>
                <p className="mb-4"><strong>מבוא: מהי אינטליגנציה בתמנונים ולמה היא מעניינת?</strong></p>
                <p className="mb-4">אינטליגנציה בתמנונים מתבטאת ביכולתם לפתור בעיות מורכבות, להשתמש בכלים ולהסתגל לסביבה משתנה. היא מעניינת מכיוון שהיא התפתחה באופן עצמאי ממערכות עצבים מורכבות אחרות, כמו זו של היונקים.</p>
                <p className="mb-4"><strong>מבנה מערכת העצבים של התמנון: מוח מרכזי ותאי עצב בזרועות.</strong></p>
                <p className="mb-4">לתמנון מערכת עצבים ייחודית, הכוללת מוח מרכזי אך גם ריכוז גדול של תאי עצב בכל אחת מזרועותיו. משמעות הדבר היא שכל זרוע יכולה לפעול באופן עצמאי יחסית.</p>
                <p className="mb-4"><strong>אוטונומיה של הזרועות: כיצד הזרועות פועלות באופן עצמאי ומתקשרות עם המוח.</strong></p>
                <p className="mb-4">הזרועות יכולות לבצע פעולות מורכבות באופן עצמאי, כמו תפיסת טרף או חיפוש מזון. הן מתקשרות עם המוח המרכזי כדי לתאם פעולות מורכבות יותר וללמוד מניסיון.</p>
                <p className="mb-4"><strong>פתרון בעיות מורכבות: דוגמאות מתוך הסימולציה (פתיחת צנצנת, הסוואה, מבוך) ומחקרים נוספים (שימוש בכלים, בריחה).</strong></p>
                <p className="mb-4">הסימולציה מדגימה את יכולת התמנון לפתור בעיות כמו פתיחת צנצנת, הסוואה ומציאת דרך במבוך. מחקרים נוספים הראו שהתמנונים מסוגלים להשתמש בכלים ולברוח ממקומות סגורים.</p>
                <p className="mb-4"><strong>מנגנוני למידה וזיכרון: כיצד התמנון לומד וזוכר, כולל תפקיד הדופמין.</strong></p>
                <p className="mb-4">התמנונים לומדים באמצעות אסוציאציות וחיזוקים. הדופמין ממלא תפקיד חשוב בתהליך הלמידה, בדומה לבעלי חוליות.</p>
                <p className="mb-4"><strong>השוואה ליצורים אחרים: הבדלים בין אינטליגנציית תמנון לזו של בעלי חוליות.</strong></p>
                <p className="mb-4">אינטליגנציית התמנון שונה מאינטליגנציית בעלי חוליות בכך שהיא מבוזרת יותר ומתבססת על אוטונומיה של הזרועות. היא גם ממוקדת יותר בפתרון בעיות מעשיות מאשר בתהליכים קוגניטיביים מורכבים.</p>
                <p><strong>סיכום: משמעות האינטליגנציה של התמנון להבנת התפתחות האינטליגנציה בכלל.</strong></p>
                <p>האינטליגנציה של התמנון מדגימה שאפשר לפתח אינטליגנציה מורכבת גם במערכות עצבים שונות מאוד מאלו של היונקים. היא מעלה שאלות חשובות על התפתחות האינטליגנציה ועל תפקיד המוח במערכת העצבים.</p>
            </section>
        </div>
    );
};

export default OctopusIntelligenceProblemSolving;