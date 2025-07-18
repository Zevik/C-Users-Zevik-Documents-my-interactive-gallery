import React, { useState, useEffect } from 'react';

/**
 * MayanWritingSystemDeciphering Component
 *
 * המשתמש יוצג בפני גליף מאייני בודד. מתחת לגליף, יהיו מספר אפשרויות פירוש (מילים או פונמות). המשתמש יצטרך לבחור את הפירוש הנכון ביותר.
 * לאחר הבחירה, תינתן משוב מיידי: אם הבחירה נכונה, יופיע הסבר קצר על משמעות הגליף וכיצד הוא משתלב במערכת הכתב המאיינית.
 * אם הבחירה שגויה, תוצג רמז עדין או הסבר חלקי, והמשתמש יוכל לנסות שוב. הסימולציה תתקדם לגליפים מורכבים יותר ככל שהמשתמש מצליח לפענח את הפשוטים,
 * ותציג לו מושגים כמו סילאבָרים (syllabary), לוגוגרמות (logograms) וקביעות פונטיות.
 * התובנה שהמשתמש אמור להפיק היא שהכתב המאייני הוא מערכת מורכבת אך שיטתית, המשלבת סימנים המייצגים מילים שלמות עם סימנים המייצגים צלילים בודדים.
 */
const MayanWritingSystemDeciphering = () => {
    const glyphs = [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Maya_writing_glyph_T501.svg/128px-Maya_writing_glyph_T501.svg.png',
            options: ['ראש', 'שמש', 'מלך'],
            correctOption: 'ראש',
            explanation: 'הגליף הזה מייצג "ראש" והוא משמש במילים שונות הקשורות למנהיגות.',
        },
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Maya_writing_glyph_T544.svg/128px-Maya_writing_glyph_T544.svg.png',
            options: ['נחש', 'מים', 'כוח'],
            correctOption: 'מים',
            explanation: 'הגליף הזה מייצג "מים" והוא יסוד חשוב בטקסים מאייניים.',
        },
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Maya_writing_glyph_T533.svg/128px-Maya_writing_glyph_T533.svg.png',
            options: ['שמיים', 'תירס', 'אדמה'],
            correctOption: 'תירס',
            explanation: 'גליף זה מייצג "תירס", מרכיב חיוני בתזונה ובתרבות המאיה.',
        },
    ];

    const [currentGlyphIndex, setCurrentGlyphIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [hintUsed, setHintUsed] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null); // שמירת סטטוס אם התשובה נכונה או לא
    const [shaking, setShaking] = useState(false); // סטייט לאנימציית שייק

    const currentGlyph = glyphs[currentGlyphIndex];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === currentGlyph.correctOption) {
            setFeedback(`נכון! ${currentGlyph.explanation}`);
            setScore(prevScore => prevScore + 1);
            setIsCorrect(true);
        } else {
            setFeedback('לא נכון. נסה שוב!');
            setIsCorrect(false);
            // הפעלת אנימציית שייק
            setShaking(true);
            setTimeout(() => setShaking(false), 500); // עצירת האנימציה לאחר 0.5 שניות
        }
    };

    const nextGlyph = () => {
        setSelectedOption(null);
        setFeedback('');
        setHintUsed(false); // Reset hint usage for the new glyph
        setIsCorrect(null);
        if (currentGlyphIndex < glyphs.length - 1) {
            setCurrentGlyphIndex(prevIndex => prevIndex + 1);
        } else {
            // Loop back to the first glyph
            setCurrentGlyphIndex(0);
            setScore(0);
            alert("סיימת את כל הגליפים! מתחיל מחדש.");
        }
    };

    const giveHint = () => {
        if (!hintUsed) {
            setFeedback(`רמז: חשוב על ההקשר התרבותי של הגליף.`);
            setHintUsed(true);
        } else {
            setFeedback("השתמשת כבר ברמז לגליף הזה!");
        }
    };

    // useEffect hook לטפל באפקט קולי או חזותי כאשר הניקוד משתנה
    useEffect(() => {
        if (score > 0) {
            // לדוגמה, ניתן להפעיל צליל או אנימציה קצרה
            console.log("הניקוד עלה! ניקוד נוכחי:", score);
        }
    }, [score]);

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                סודות הכתב המאייני: לפענח את העבר
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו שאתם ארכיאולוגים בשנת 1840. גיליתם כתובת מסתורית חרוטה על אבן עתיקה בג'ונגלים של מקסיקו. אף אחד לא מבין מה כתוב שם, וייתכן שהכתובת הזו מחזיקה מפתח לידע אבוד של תרבות עתיקה ומפוארת. האם תצליחו לפענח את הסודות החבויים בכתב המאייני?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <img
                    src={currentGlyph.image}
                    alt="גליף מאייני"
                    className="mb-4 w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
                />
                <div className="flex flex-col gap-2">
                    {currentGlyph.options.map((option, index) => (
                        <button
                            key={index}
                            className={`group relative bg-indigo-200 hover:bg-indigo-300 text-indigo-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 ${selectedOption === option ? 'bg-indigo-400' : ''} ${shaking ? 'animate-shake' : ''}`}
                            onClick={() => handleOptionSelect(option)}
                            disabled={selectedOption !== null}
                        >
                            {option}
                            {selectedOption === option && isCorrect && (
                                <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-green-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                </span>
                            )}
                            {selectedOption === option && isCorrect === false && (
                                <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                {feedback && <p className={`mt-4 transition-all duration-300 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={nextGlyph}
                        disabled={!feedback}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
                    >
                        הבא
                    </button>
                    <button
                        onClick={giveHint}
                        disabled={feedback}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
                    >
                        רמז
                    </button>
                </div>
                <p className="mt-4 font-semibold">ניקוד: <span className="text-indigo-700">{score}</span></p>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p>תרבות המאיה, ששגשגה במרכז אמריקה, ידועה בהישגים המתמטיים, האסטרונומיים והאמנותיים שלה. הכתב המאייני, מערכת מורכבת של גליפים, שימש לתיעוד היסטוריה, טקסים וידע מדעי.</p>
                <p>מבנה הכתב המאייני משלב לוגוגרמות (סימנים המייצגים מילים שלמות) וסימנים פונטיים (המורכבים מסילאבָרים). שילוב זה אפשר גמישות רבה בביטוי שפה, אך גם הקשה על הפיענוח.</p>
                <p>הכתב המאייני אינו אלפבית, אלא מערכת לוגו-סילאבית. כלומר, חלק מהסימנים מייצגים מילים שלמות (לוגוגרמות) ואחרים מייצגים הברות (סילאבָרים). לדוגמה, הגליף של "באלאם" (יגואר) יכול לייצג את המילה "באלאם" או את ההברה "בה".</p>
                <p>אחד האתגרים בפיענוח הכתב המאייני הוא העובדה שגליף מסוים יכול להיות בעל מספר קריאות אפשריות, תלוי בהקשר. לדוגמה, גליף יכול לשמש כלוגוגרמה במקרה אחד, וכסילאבָר במקרה אחר. הפיענוח דורש הבנה מעמיקה של השפה המאיינית והתרבות המאיינית.</p>
                <p>דוגמאות לגליפים נפוצים כוללות את הגליף המייצג את המילה "אדמה" (Kab'an), ואת הגליף המייצג את המספר "אחד" (Hun). גליפים אלה מופיעים בכתובות רבות ובקודקסים של המאיה.</p>
                <p>פיענוח הכתב המאייני היה תהליך ארוך ומורכב, שכלל את עבודתם של חוקרים רבים, ביניהם יורי קנורוזוב, שפיתח שיטה לפיענוח הכתב ככתב פונטי. קנורוזוב טען שניתן לפענח את הכתב המאייני על ידי זיהוי התבניות הפונטיות החוזרות ונשנות בגליפים.</p>
                <p>הכתב המאייני שינה את הידע שלנו על התרבות המאיינית, ואיפשר לנו להבין טוב יותר את ההיסטוריה, האסטרונומיה והדת שלהם. לדוגמה, הכתובות המאייניות סיפקו מידע רב על מלכים מאיינים, מלחמות וטקסים דתיים.</p>
                <p>משאבים נוספים ללמידה כוללים ספרים כמו "Breaking the Maya Code" של מייקל קו, אתרי אינטרנט כמו FAMSI (Foundation for the Advancement of Mesoamerican Studies), ומוזיאונים כמו הלובר בפריז והמוזיאון הלאומי לאנתרופולוגיה במקסיקו סיטי.</p>
            </section>
        </div>
    );
};

export default MayanWritingSystemDeciphering;