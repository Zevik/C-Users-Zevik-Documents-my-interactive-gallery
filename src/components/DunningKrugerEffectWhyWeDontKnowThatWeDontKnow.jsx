import React, { useState } from 'react';

/**
 * DunningKrugerEffectWhyWeDontKnowThatWeDontKnow Component
 *
 * הסימולציה, בשם 'מד הדיוק העצמי', תציג למשתמש מספר תרחישים קצרים, כל אחד מהם מתאר אדם חדש בתחום מסוים, את הערכתו העצמית (הביטחון שלו ביכולותיו) ואת ביצועיו בפועל. המשתמש יתבקש ללחוץ על כפתור 'הצג ביצוע' עבור כל תרחיש.

לדוגמה:
*   **תרחיש 1 (הדגמת דאנינג-קרוגר):** "ג'וני החליט ללמוד לנגן בגיטרה. אחרי שבוע של אימונים, הוא הרגיש שהוא כבר גיטריסט לא רע בכלל והצהיר בביטחון: 'אני בטח יכול כבר לנגן סולו!' (ציון עצמי: 8/10)"
    *   כפתור: "נגן את הסולו של ג'וני"
    *   תוצאה: "ג'וני ניגן... רע מאוד. הקאמבק לא נשמע טוב. (ציון ביצוע בפועל: 2/10)"
    *   ויזואליזציה: גרף עמודות פשוט המשווה את הציון העצמי והציון בפועל.

*   **תרחיש 2 (הדגמת תסמונת המתחזה):** "שרה היא מתכנתת מנוסה. היא ניגשה לפרויקט חדש ואמרה: 'אני לא בטוחה שאני מספיק טובה לזה, זה נראה מסובך מדי...' (ציון עצמי: 4/10)"
    *   כפתור: "ראה את תוצאת הפרויקט של שרה"
    *   תוצאה: "שרה סיימה את הפרויקט בהצטיינות, הרבה לפני המועד. (ציון ביצוע בפועל: 9/10)"
    *   ויזואליזציה: גרף עמודות המשווה את הציון העצמי והציון בפועל.

*   **תרחיש 3 (הערכה מדויקת):** "אדם התחיל קורס בישול. לאחר מספר שיעורים, הוא אמר: 'אני מתחיל להבין את העקרונות הבסיסיים, אבל עדיין יש לי דרך ארוכה להיות שף. אני בינוני כרגע.' (ציון עצמי: 5/10)"
    *   כפתור: "טעמו את המנה של אדם"
    *   תוצאה: "הבשר היה אכיל, אבל חסר תיבול. אכן ביצוע בינוני. (ציון ביצוע בפועל: 5/10)"
    *   ויזואליזציה: גרף עמודות המשווה את הציון העצמי והציון בפועל.

**התובנה המרכזית שהמשתמש אמור להפיק:** המשתמש יראה באופן מוחשי כיצד קיימת פער משמעותי בין תפיסה עצמית לבין יכולת אמיתית, במיוחד אצל אלה עם יכולת נמוכה (הערכת יתר) ואצל אלה עם יכולת גבוהה (לעיתים הערכת חסר). הסימולציה תאפשר לו לזהות דפוסים אלו ולגשר בין התיאוריה להתנסות אישית.
 */
const DunningKrugerEffectWhyWeDontKnowThatWeDontKnow = () => {
    // הגדרת נתוני התרחישים לסימולציה
    const scenarios = [
        {
            id: 1,
            description: "ג'וני החליט ללמוד לנגן בגיטרה. אחרי שבוע של אימונים, הוא הרגיש שהוא כבר גיטריסט לא רע בכלל והצהיר בביטחון: 'אני בטח יכול כבר לנגן סולו!'",
            selfScore: 8,
            buttonText: "נגן את הסולו של ג'וני",
            result: "ג'וני ניגן... רע מאוד. הקאמבק לא נשמע טוב.",
            actualScore: 2,
        },
        {
            id: 2,
            description: "שרה היא מתכנתת מנוסה. היא ניגשה לפרויקט חדש ואמרה: 'אני לא בטוחה שאני מספיק טובה לזה, זה נראה מסובך מדי...'",
            selfScore: 4,
            buttonText: "ראה את תוצאת הפרויקט של שרה",
            result: "שרה סיימה את הפרויקט בהצטיינות, הרבה לפני המועד.",
            actualScore: 9,
        },
        {
            id: 3,
            description: "אדם התחיל קורס בישול. לאחר מספר שיעורים, הוא אמר: 'אני מתחיל להבין את העקרונות הבסיסיים, אבל עדיין יש לי דרך ארוכה להיות שף. אני בינוני כרגע.'",
            selfScore: 5,
            buttonText: "טעמו את המנה של אדם",
            result: "הבשר היה אכיל, אבל חסר תיבול. אכן ביצוע בינוני.",
            actualScore: 5,
        },
    ];

    // ניהול ה-state עבור התרחישים שנחשפו (כלומר, עבורם המשתמש לחץ על כפתור 'הצג ביצוע')
    // אובייקט זה ישמור מזהי תרחישים שנחשפו כ-keys עם ערך true.
    const [revealedScenarios, setRevealedScenarios] = useState({});

    // פונקציה לטיפול בלחיצה על כפתור חשיפת הביצועים
    const handleReveal = (scenarioId) => {
        setRevealedScenarios(prev => ({
            ...prev,
            [scenarioId]: true
        }));
    };

    // קומפוננטת עזר להצגת גרף עמודות המשווה ציון עצמי לציון בפועל
    const BarChart = ({ selfScore, actualScore }) => (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">השוואת ציונים:</h4>
            <div className="flex items-center mb-2 gap-2">
                <span className="w-24 text-sm font-medium text-blue-700">הערכה עצמית:</span>
                <div className="flex-1 bg-blue-100 h-6 rounded-full overflow-hidden">
                    <div
                        style={{ width: `${selfScore * 10}%` }}
                        className="bg-blue-500 h-full flex items-center justify-end pr-2 text-white text-xs font-semibold rounded-full transition-all duration-700 ease-out"
                    >
                        {selfScore}/10
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-24 text-sm font-medium text-green-700">ביצוע בפועל:</span>
                <div className="flex-1 bg-green-100 h-6 rounded-full overflow-hidden">
                    <div
                        style={{ width: `${actualScore * 10}%` }}
                        className="bg-green-500 h-full flex items-center justify-end pr-2 text-white text-xs font-semibold rounded-full transition-all duration-700 ease-out"
                    >
                        {actualScore}/10
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                אפקט דאנינג-קרוגר: למה אנחנו לא יודעים שאנחנו לא יודעים?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם אי פעם נתקלתם במישהו שבטוח לחלוטין ביכולותיו, אך בפועל ביצועיו היו רחוקים מלהיות מרשימים? או אולי להיפך, האם אתם מכירים אנשים בעלי כישרון אמיתי, הממעיטים בערך עצמם? המצב הזה נפוץ הרבה יותר ממה שנדמה, ויש לו שם מדעי.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">מד הדיוק העצמי: סימולציה אינטראקטיבית</h3>
                <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">לחצו על כפתור 'הצג ביצוע' כדי לחשוף את תוצאות הביצועים בפועל עבור כל תרחיש.</p>

                <div className="w-full space-y-8">
                    {scenarios.map(scenario => (
                        <div key={scenario.id} className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
                            <p className="text-lg mb-3">
                                <span className="font-semibold text-purple-700">תרחיש {scenario.id}:</span> {scenario.description} <span className="font-bold text-blue-600">(ציון עצמי: {scenario.selfScore}/10)</span>
                            </p>
                            {!revealedScenarios[scenario.id] ? (
                                <button
                                    onClick={() => handleReveal(scenario.id)}
                                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                                >
                                    {scenario.buttonText}
                                </button>
                            ) : (
                                <div className="mt-4">
                                    <p className="text-lg font-medium text-green-700 mb-3">
                                        <span className="font-bold">תוצאה:</span> {scenario.result} <span className="font-bold text-green-600">(ציון ביצוע בפועל: {scenario.actualScore}/10)</span>
                                    </p>
                                    <BarChart selfScore={scenario.selfScore} actualScore={scenario.actualScore} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-xl font-semibold text-center text-indigo-800 max-w-3xl">
                    <span className="font-extrabold text-violet-900">התובנה המרכזית:</span> כפי שראיתם, קיים פער משמעותי בין תפיסה עצמית לבין יכולת אמיתית.
                    סימולציה זו ממחישה את הנטייה להערכת יתר אצל בעלי יכולת נמוכה (אפקט דאנינג-קרוגר) ולעיתים הערכת חסר אצל בעלי יכולת גבוהה (תסמונת המתחזה).
                </p>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <ul className="list-disc list-inside space-y-4 text-lg leading-relaxed">
                    <li>
                        <span className="font-semibold text-purple-700">מהו אפקט דאנינג-קרוגר?</span> זהו הטיה קוגניטיבית שבה אנשים בעלי יכולת נמוכה בתחום מסוים סובלים מביטחון עצמי מופרז, בעוד שאנשים בעלי יכולת גבוהה נוטים להמעיט בערך עצמם. האפקט תואר לראשונה על ידי הפסיכולוגים החברתיים <strong className="text-indigo-600">דניאל דאנינג וג'סטין קרוגר</strong> בשנת 1999.
                    </li>
                    <li>
                        <span className="font-semibold text-purple-700">מדוע זה קורה?</span> הסיבה העיקרית היא <strong className="text-indigo-600">חוסר מטא-קוגניציה</strong> – חוסר היכולת של אדם לזהות את חוסר יכולתו שלו. אלה שפחות מיומנים נוטים להגיע למסקנות שגויות ולקבל החלטות גרועות, אך המיומנות החסרה להם היא גם זו שמונעת מהם להבין שהם עושים זאת.
                    </li>
                    <li>
                        <span className="font-semibold text-purple-700">ביטויים של האפקט בחיי היומיום:</span> ניתן לראות את האפקט במגוון רחב של תחומים, כמו בנהיגה (אנשים שחושבים שהם נהגים טובים יותר מהממוצע), מיומנויות מחשב, דיונים פוליטיים, הערכת עובדים ואפילו בהבנת בדיחות.
                    </li>
                    <li>
                        <span className="font-semibold text-purple-700">'הצד השני של המטבע': תסמונת המתחזה (Imposter Syndrome)</span> - המצב ההפוך בו אנשים בעלי יכולת גבוהה, ואף מומחיות מוכחת, נוטים להמעיט בערך עצמם, לפקפק בהישגיהם, ולחוש שהם "מתחזים" וכי הצלחתם היא תוצאה של מזל ולא של כישרון או עבודה קשה.
                    </li>
                    <li>
                        <span className="font-semibold text-purple-700">השפעות האפקט:</span> קבלת החלטות שגויה על בסיס הערכת יתר של יכולות עצמיות, ביטחון עצמי מופרז המוביל לכישלונות מיותרים, וחוסר פתיחות לביקורת או ללמידה מטעויות.
                    </li>
                    <li>
                        <span className="font-semibold text-purple-700">כיצד ניתן להתמודד ולהתגבר על אפקט דאנינג-קרוגר?</span> המפתח הוא מודעות. קבלת <strong className="text-indigo-600">משוב קבוע</strong> מאחרים, למידה מתמדת, פיתוח <strong className="text-indigo-600">ביקורת עצמית בריאה</strong>, והטלת ספק מושכל בידע וביכולות שלנו יכולים לסייע לגשר על הפער בין תפיסה למציאות. חשיבה ביקורתית על המקורות והנתונים היא קריטית.
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default DunningKrugerEffectWhyWeDontKnowThatWeDontKnow;