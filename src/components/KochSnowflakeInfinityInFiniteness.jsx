import React, { useState, useEffect, useRef } from 'react';

/**
 * KochSnowflakeInfinityInFiniteness Component
 *
 * הסימולציה מציגה משולש שווה צלעות. המשתמש יכול ללחוץ על כפתור "חזרה נוספת" כדי להוסיף עוד איטרציה של בניית פתית השלג של קוך. בכל איטרציה, כל צלע מחולקת לשלושה חלקים שווים, והחלק האמצעי מוחלף בשני צלעות של משולש שווה צלעות קטן יותר. המשתמש יכול לראות ויזואלית איך הצורה הופכת מורכבת יותר ויותר בכל שלב. מדדים של היקף ושטח מוצגים באופן דינמי עבור כל איטרציה, מה שמאפשר למשתמש לצפות בהיקף גדל באופן משמעותי בעוד שהשטח מתכנס לגבול סופי. התובנה היא שהיקף הפרקטל גדל לאינסוף ככל שמספר האיטרציות גדל, בעוד שהשטח נשאר סופי.
 */
const KochSnowflakeInfinityInFiniteness = () => {
    const [iteration, setIteration] = useState(0);
    const [perimeter, setPerimeter] = useState(3);
    const [area, setArea] = useState(Math.sqrt(3) / 4); // שטח משולש שווה צלעות עם צלע 1
    const [isIterating, setIsIterating] = useState(false); // מצב המציין האם האיטרציה מתבצעת
    const buttonRef = useRef(null); // Reference לכפתור, לשינוי אנימציה

    useEffect(() => {
        // חישוב היקף ושטח בכל איטרציה
        const sideLength = 1 / Math.pow(3, iteration);
        const numSides = 3 * Math.pow(4, iteration);
        setPerimeter(numSides * sideLength);

        let initialArea = Math.sqrt(3) / 4;
        let areaSum = 0;
        for (let i = 0; i < iteration; i++) {
          let numTriangles = 3 * Math.pow(4, i);
          let triangleSide = 1 / Math.pow(3, i + 1);
          areaSum += numTriangles * (Math.sqrt(3) / 4) * Math.pow(triangleSide, 2);
        }
        setArea(initialArea + areaSum);
    }, [iteration]);

    const handleIterate = () => {
        setIsIterating(true); // מתחילים את האנימציה
        if (buttonRef.current) {
            buttonRef.current.classList.add('animate-pulse'); // מפעילים את האנימציה של הכפתור
        }

        // מחכים קצת לפני שמבצעים את האיטרציה בפועל, כדי שהאנימציה תהיה גלויה
        setTimeout(() => {
            setIteration(iteration + 1);
            setIsIterating(false); // מסיימים את האנימציה
            if (buttonRef.current) {
                buttonRef.current.classList.remove('animate-pulse'); // מכבים את האנימציה של הכפתור
            }
        }, 500); // עיכוב קצר
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-fade-in">
                פתית השלג של קוך: אינסוף בתוך סוף
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto animate-fade-in delay-200">
                האם ייתכן לצייר צורה שההיקף שלה לעולם לא נגמר, אבל השטח שהיא תופסת מוגבל? גלו איך צורה גיאומטרית פשוטה יכולה להפתיע ולשבור את האינטואיציה שלנו לגבי גודל ומרחב.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 transition-colors duration-300 hover:text-violet-900">הדגמה אינטראקטיבית</h3>
                <p className="mb-4 text-gray-700">לחצו על הכפתור כדי להוסיף איטרציה של פתית השלג של קוך.</p>
                <button
                    ref={buttonRef}
                    className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    onClick={handleIterate}
                    disabled={isIterating}
                >
                    {isIterating ? 'מעבד...' : 'חזרה נוספת'}
                </button>
                <p className="mt-4 text-lg font-medium text-gray-900">איטרציה: <span className="font-semibold text-indigo-800">{iteration}</span></p>
                <p className="text-lg font-medium text-gray-900">היקף: <span className="font-semibold text-indigo-800">{perimeter.toFixed(3)}</span></p>
                <p className="text-lg font-medium text-gray-900">שטח: <span className="font-semibold text-indigo-800">{area.toFixed(3)}</span></p>
                {/* TODO: בנה כאן את האינטראקציה המרכזית על פי קונספט האפליקציה. */}
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center animate-pulse">
                    ההסבר המדעי
                </h2>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-violet-700 transition-colors duration-200">מהם פרקטלים?</h3>
                <p className="mb-4 text-gray-700 leading-relaxed">פרקטל הוא צורה גיאומטרית שמורכבת מחלקים הדומים לצורה כולה במובן מסוים. במילים אחרות, אם נגדיל חלק קטן של פרקטל, הוא ייראה דומה לפרקטל המקורי. תכונה זו נקראת דמיון עצמי (self-similarity).</p>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-violet-700 transition-colors duration-200">בניית פתית השלג של קוך: צעד אחר צעד.</h3>
                <ol className="list-decimal list-inside mb-4 text-gray-700 leading-relaxed">
                    <li>מתחילים ממשולש שווה צלעות.</li>
                    <li>מחלקים כל צלע לשלושה חלקים שווים.</li>
                    <li>מחליפים את החלק האמצעי בשני צלעות של משולש שווה צלעות קטן יותר, כך שנוצרת בליטה החוצה.</li>
                    <li>חוזרים על התהליך עבור כל צלע חדשה שנוצרה.</li>
                </ol>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-violet-700 transition-colors duration-200">חישוב היקף פתית השלג של קוך: מדוע הוא אינסופי?</h3>
                <p className="mb-4 text-gray-700 leading-relaxed">בכל איטרציה, אורך הצלע החדשה הוא שליש מאורך הצלע הקודמת, אך ישנן ארבע צלעות חדשות במקום אחת. לכן, ההיקף גדל פי 4/3 בכל איטרציה. אם נמשיך בתהליך האיטרטיבי הזה, ההיקף יגדל לאינסוף.</p>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-violet-700 transition-colors duration-200">חישוב שטח פתית השלג של קוך: מדוע הוא סופי?</h3>
                <p className="mb-4 text-gray-700 leading-relaxed">אף על פי שההיקף גדל לאינסוף, השטח גדל בסכום קטן יותר בכל איטרציה. סכום השטחים הנוספים מתכנס לגבול סופי, ולכן השטח של פתית השלג של קוך הוא סופי.</p>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-violet-700 transition-colors duration-200">פרקטלים בטבע ובטכנולוגיה.</h3>
                <p className="mb-4 text-gray-700 leading-relaxed">פרקטלים מופיעים במקומות רבים בטבע, כגון עננים, עצים, קווי חוף, ורשתות כלי דם. הם משמשים גם בתחומים טכנולוגיים רבים, כגון אנטנות, גרפיקה ממוחשבת, ועיבוד אותות.</p>
            </section>
        </div>
    );
};

export default KochSnowflakeInfinityInFiniteness;