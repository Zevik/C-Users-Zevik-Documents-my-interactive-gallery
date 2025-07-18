import React, { useState } from 'react';

/**
 * BanachTarskiParadoxOneBallTwoBalls Component
 *
 * הסימולציה תציג למשתמש כדור תלת-ממדי יחיד. המשתמש יוכל 'לנסות' לפרק אותו לנקודות או לחלקים שונים (אך בלי לראות את החלקים בפועל, כי הם אינסופיים ולא 'חתוכים' באופן קונבנציונלי). לאחר מכן, הסימולציה תדגים באופן ויזואלי את 'התוצאה' של הפרדוקס: הכדור המקורי ייעלם, ובמקומו יופיעו שני כדורים זהים לחלוטין בגודלם ובנפחם לכדור המקורי. מתחת לכדורים, יוצגו כפתורים המאפשרים ללמוד על ההנחות המיוחדות (כמו אקסיומת הבחירה) ועל אופיו התיאורטי של הפרדוקס. הרעיון הוא להדגיש את הפער בין האינטואיציה היומיומית לבין תוצאות מתמטיות טהורות בתורת הקבוצות, תוך הדגשה שזהו תהליך תיאורטי בלבד שאינו ניתן לביצוע פיזי.
 */
const BanachTarskiParadoxOneBallTwoBalls = () => {
    // מצב הקומפוננטה לניהול תצוגת הכדורים והאנימציה
    const [showOneBall, setShowOneBall] = useState(true); // האם להציג כדור אחד
    const [showTwoBalls, setShowTwoBalls] = useState(false); // האם להציג שני כדורים
    const [isAnimating, setIsAnimating] = useState(false); // האם אנימציה מתרחשת (כדי לנטרל כפתור)

    // פונקציה לטיפול בלחיצה על כפתור ה"פירוק והכפלה"
    const handleDeconstruct = () => {
        setIsAnimating(true); // מתחילים אנימציה
        // סימולציית ה"פירוק": הכדור האחד נעלם
        setShowOneBall(false);

        // סימולציית ה"הרכבה מחדש": שני כדורים מופיעים לאחר השהייה קצרה
        setTimeout(() => {
            setShowTwoBalls(true); // מציגים את שני הכדורים
            setIsAnimating(false); // מסיימים אנימציה
        }, 2000); // השהייה של 2 שניות לאפקט ויזואלי
    };

    // פונקציה לאיפוס המצב להתחלה
    const handleReset = () => {
        setIsAnimating(false); // מוודאים שהאנימציה לא פעילה
        setShowTwoBalls(false); // מסתירים את שני הכדורים
        setShowOneBall(true); // מציגים שוב את הכדור האחד
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                פרדוקס בנך-טרסקי: כדור אחד, שני כדורים?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו לרגע שבידיכם כדור אחד. האם הייתם מאמינים שאפשר, בתיאוריה, לפרק אותו לחלקים אינסופיים, ואז להרכיב מחדש שני כדורים *זהים לחלוטין* לכדור המקורי – בלי להוסיף שום חומר? נשמע בלתי אפשרי, נכון?
            </p>

            {/* האינטראקציה הראשית: הצגת הכדורים והכפתורים */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">הדגמה אינטראקטיבית</h3>
                <div className="relative w-full max-w-lg min-h-[200px] flex justify-center items-center mb-8">
                    {/* הצגת כדור אחד */}
                    {showOneBall && (
                        <div className="absolute w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-2xl transition-all duration-1000 ease-in-out transform scale-100 opacity-100">
                            כדור אחד
                        </div>
                    )}
                    {/* הצגת שני כדורים */}
                    {showTwoBalls && (
                        <div className="flex space-x-8 transition-all duration-1000 ease-in-out transform scale-100 opacity-100">
                            <div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-2xl">
                                כדור 1
                            </div>
                            <div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-2xl">
                                כדור 2
                            </div>
                        </div>
                    )}
                </div>

                {/* כפתורי הפעלה */}
                <div className="flex space-x-4 mb-6">
                    {/* כפתור "נסו לפרק ולהכפיל!" - מופיע רק כשיש כדור אחד ולא שניים */}
                    {!showTwoBalls && (
                        <button
                            onClick={handleDeconstruct}
                           disabled={isAnimating}
                            className={`px-8 py-4 bg-violet-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-violet-700 transition duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAnimating ? 'מפרקים ומכפילים...' : 'נסו לפרק ולהכפיל!'}
                        </button>
                    )}
                    {/* כפתור "התחלה מחדש" - מופיע רק כשיש שני כדורים */}
                    {showTwoBalls && (
                        <button
                            onClick={handleReset}
                            className="px-8 py-4 bg-indigo-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-indigo-700 transition duration-300"
                        >
                            התחלה מחדש
                        </button>
                    )}
                </div>

                {/* כפתורים להרחבת הידע (לא אינטראקטיביים בקוד זה) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    <button className="p-4 bg-purple-100 text-purple-800 rounded-lg text-lg font-medium shadow hover:bg-purple-200 transition duration-200">
                        מהי אקסיומת הבחירה?
                    </button>
                    <button className="p-4 bg-purple-100 text-purple-800 rounded-lg text-lg font-medium shadow hover:bg-purple-200 transition duration-200">
                        למה זה לא עובד במציאות?
                    </button>
                    <button className="p-4 bg-purple-100 text-purple-800 rounded-lg text-lg font-medium shadow hover:bg-purple-200 transition duration-200">
                        מהם חלקים לא-מדידים?
                    </button>
                    <button className="p-4 bg-purple-100 text-purple-800 rounded-lg text-lg font-medium shadow hover:bg-purple-200 transition duration-200">
                        היבטים היסטוריים ופילוסופיים
                    </button>
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי מפורט על הפרדוקס */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">מהו פרדוקס בנך-טרסקי?</h3>
                    <p>
                        פרדוקס בנך-טרסקי הוא משפט בתורת המידה המתמטית, הקובע כי ניתן לפרק כדור תלת-ממדי (או קבוצה חסומה דומה) למספר סופי של חלקים ("קבוצות"), ואז להרכיב מחדש את החלקים הללו לשני כדורים <strong className="text-violet-700">זהים לחלוטין</strong> לכדור המקורי – וכל זאת באמצעות הזזות וסיבובים בלבד, וללא הוספת או גריעת חומר. התוצאה נשמעת מנוגדת לאינטואיציה היומיומית, שבה "שלם" לא יכול להיות שווה ל"שני שלמים" מאותו חומר.
                    </p>

                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">מי עומד מאחוריו?</h3>
                    <p>
                        הפרדוקס נוסח והוכח באופן רשמי על ידי המתמטיקאים הפולנים <strong className="text-violet-700">סטפן בנך</strong> ו<strong className="text-violet-700">אלפרד טרסקי</strong> בשנת 1924. עבודתם הייתה חלק מתחום רחב יותר של תורת הקבוצות ותורת המידה, והם הוכיחו תוצאות מפתיעות רבות הנוגעות למושגי נפח ומדידה.
                    </p>

                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">עקרונות מפתח להבנת הפרדוקס:</h3>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        <li>
                            <strong className="text-violet-700">חלוקה לקבוצות לא-מדידות:</strong> החלקים אליהם מפורק הכדור אינם חלקים במובן הפיזי הרגיל שאנו יכולים לחתוך. הם "קבוצות" נקודות מופשטות שאין להן נפח מוגדר במובן המקובל (הן "לא-מדידות"). כלומר, לא ניתן להגדיר להן נפח בצורה עקבית עם מושג הנפח שאנו מכירים בחיי היום-יום.
                        </li>
                        <li>
                            <strong className="text-violet-700">תפקידה הקריטי של אקסיומת הבחירה:</strong> הוכחת הפרדוקס מסתמכת באופן מהותי על <strong className="text-violet-700">אקסיומת הבחירה</strong> (Axiom of Choice). אקסיומה זו, שהיא חלק ממערכת האקסיומות של תורת הקבוצות (ZFC), קובעת כי עבור כל אוסף של קבוצות לא ריקות, ניתן "לבחור" איבר אחד מכל קבוצה. במילים פשוטות, היא מאפשרת לבנות קבוצות מסוימות (כמו הקבוצות הלא-מדידות שבפרדוקס) באופן תיאורטי, למרות שאין דרך מפורשת או אלגוריתמית לתאר את האיברים בהן. בלי אקסיומת הבחירה, הפרדוקס לא ניתן להוכחה.
                        </li>
                        <li>
                            <strong className="text-violet-700">איזומטריות:</strong> הפרדוקס מדבר על הרכבה מחדש באמצעות <strong className="text-violet-700">איזומטריות</strong> – כלומר, טרנספורמציות המשמרות מרחק וצורה. אלו הן סיבובים והזזות במרחב התלת-ממדי בלבד. אין כיווץ, מתיחה, או עיוות של החלקים.
                        </li>
                    </ul>

                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">מדוע זה לא קורה במציאות הפיזית?</h3>
                    <p>
                        הפרדוקס הוא תוצאה תיאורטית לחלוטין של עולם המתמטיקה הטהורה ואינו ניתן לביצוע פיזי:
                    </p>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        <li>
                            <strong className="text-violet-700">"חלקים" שאינם פיזיים:</strong> החלקים המדוברים אינם ניתנים לחיתוך או לזיהוי פיזי. הם אוסף אינסופי של נקודות המפוזרות בצורה כה מורכבת ובלתי רציפה, שאי אפשר לדמיין אותן כחומר ממשי.
                        </li>
                        <li>
                            <strong className="text-violet-700">הגבלות פיזיות:</strong> במציאות, כל חומר מורכב מאטומים ואין לנו יכולת לחתוך אותו לחלקים אינסופיים בגודלם (נקודות). יתרה מכך, מושג הנפח הפיזי תואם למושג הנפח המדיד, בניגוד ל"חלקים" הלא-מדידים שבפרדוקס.
                        </li>
                    </ul>

                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">השלכות הפרדוקס:</h3>
                    <p>
                        למרות היותו תיאורטי, לפרדוקס בנך-טרסקי יש השלכות חשובות:
                    </p>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        <li>
                            <strong className="text-violet-700">אתגור האינטואיציה:</strong> הוא מדגים כמה אינטואיציה המבוססת על ניסיון יומיומי יכולה להיות מטעה כאשר נכנסים לתחום האינסוף ותורת הקבוצות המודרנית.
                        </li>
                        <li>
                            <strong className="text-violet-700">הבנת גבולות מושג הנפח:</strong> הוא מחדד את ההבנה שמושג הנפח שאנו מכירים תקף רק עבור קבוצות "מדידות" מסוימות.
                        </li>
                        <li>
                            <strong className="text-violet-700">השפעת אקסיומת הבחירה:</strong> הוא מציג דוגמה קיצונית לכוחה ולהשלכותיה (השנויות במחלוקת לעיתים) של אקסיומת הבחירה על תוצאות מתמטיות.
                        </li>
                    </ul>

                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">האם יש לזה יישומים מעשיים?</h3>
                    <p>
                        <strong className="text-violet-700">לא.</strong> הפרדוקס אינו ניתן ליישום מעשי במציאות הפיזית. הוא אינו מאפשר "לייצר" זהב יש מאין, או להכפיל חומרים. תכליתו היא להעשיר את ההבנה המתמטית בתחום תורת המידה, הגאומטריה והלוגיקה המתמטית, ולהציב אתגרים פילוסופיים באשר לטבעה של המציאות והאופן שבו מתמטיקה מודלפת אותה.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default BanachTarskiParadoxOneBallTwoBalls;