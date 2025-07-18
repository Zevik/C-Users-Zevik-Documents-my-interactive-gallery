import React, { useState, useEffect } from 'react';

/**
 * TrolleyProblem Component
 *
 * המשתמש מוצג עם גרסה ויזואלית של דילמת העגלה. הוא רואה מסילת רכבת, עליה חמישה אנשים קשורים. מסילה צדדית מובילה לאדם אחד. המשתמש יכול לבחור 'להסיט את העגלה' או 'לא לעשות כלום'. לאחר הבחירה, העגלה ממשיכה במסלולה (או משנה מסלול) עם אנימציה. טקסט קצר מסכם את התוצאה (למשל, 'בחרתם להסיט את העגלה. אדם אחד מת, חמישה ניצלו'). לאחר מכן, מוצגת גרסה שונה של הדילמה (למשל, אדם שמן שיכול לעצור את העגלה אם יפול עליה, או חמישה פושעים ואדם אחד חף מפשע). המשתמש מתמודד עם מספר תרחישים שונים כדי להבין את המורכבות של השיקולים האתיים.
 * שיפורים:
 *  - אנימציות CSS transitions לשיפור חווית המשתמש.
 *  - עיצוב משופר באמצעות Tailwind CSS.
 *  - משוב ויזואלי משופר למשתמש.
 *  - הוספת אפקטים קוליים (אופציונלי - יש להוסיף קבצי קול).
 */
const TrolleyProblem = () => {
    const [scenario, setScenario] = useState(0);
    const [decision, setDecision] = useState(null);
    const [resultText, setResultText] = useState(''); // טקסט התוצאה שמוצג
    const [isAnimating, setIsAnimating] = useState(false); // מצב אנימציה
    const scenarios = [
        {
            description: "חמישה אנשים קשורים למסילה. אדם אחד קשור למסילה צדדית.",
            choice1: "להסיט את העגלה",
            choice2: "לא לעשות כלום",
            result1: "בחרתם להסיט את העגלה. אדם אחד מת, חמישה ניצלו.",
            result2: "בחרתם לא לעשות כלום. חמישה אנשים מתו.",
        },
        {
            description: "אדם שמן יכול לעצור את העגלה אם יפול עליה. חמישה אנשים קשורים למסילה.",
            choice1: "לדחוף את האדם השמן",
            choice2: "לא לעשות כלום",
            result1: "דחפתם את האדם השמן. הוא מת, חמישה ניצלו.",
            result2: "בחרתם לא לעשות כלום. חמישה אנשים מתו.",
        },
        {
            description: "חמישה פושעים קשורים למסילה. אדם אחד חף מפשע קשור למסילה צדדית.",
            choice1: "להסיט את העגלה",
            choice2: "לא לעשות כלום",
            result1: "בחרתם להסיט את העגלה. אדם חף מפשע אחד מת, חמישה פושעים ניצלו.",
            result2: "בחרתם לא לעשות כלום. חמישה פושעים מתו.",
        },
    ];

    // פונקציה לטיפול בבחירת המשתמש
    const handleChoice = (choice) => {
        setDecision(choice);
        setIsAnimating(true); // הפעל אנימציה

        // הצגת התוצאה לאחר השהייה קצרה
        setTimeout(() => {
            setResultText(choice === 1 ? scenarios[scenario].result1 : scenarios[scenario].result2);
            setIsAnimating(false); // סיום אנימציה
        }, 2000); // השהייה של 2 שניות (ניתן לשנות)
    };

    // אפקט צדדי לאיפוס ההחלטה כאשר התרחיש משתנה
    useEffect(() => {
        setDecision(null);
        setResultText(''); // איפוס טקסט התוצאה
    }, [scenario]);

    // פונקציה למעבר לתרחיש הבא
    const nextScenario = () => {
        setScenario((prevScenario) => (prevScenario + 1) % scenarios.length);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300 hover:scale-105" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                דילמת העגלה: האם תסיטו את המסילה?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו שאתם צופים בעגלת רכבת דוהרת, חמישה אנשים קשורים למסילה. אתם יכולים להסיט את העגלה למסילה צדדית, אבל שם קשור אדם אחד. האם תתערבו ותסיטו את העגלה, ובכך תגרמו למותו של אדם אחד כדי להציל חמישה?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">תרחיש {scenario + 1}</h3>
                <p className="mb-4 text-lg">{scenarios[scenario].description}</p>
                <div className="flex space-x-4">
                    <button
                        className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isAnimating ? 'animate-pulse' : ''}`}
                        onClick={() => handleChoice(1)}
                        disabled={decision !== null || isAnimating}
                    >
                        {scenarios[scenario].choice1}
                    </button>
                    <button
                        className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isAnimating ? 'animate-pulse' : ''}`}
                        onClick={() => handleChoice(2)}
                        disabled={decision !== null || isAnimating}
                    >
                        {scenarios[scenario].choice2}
                    </button>
                </div>
                {/* הצגת התוצאה עם אנימציה */}
                {resultText && (
                    <div className="mt-4 text-center">
                        <p className="text-xl font-semibold text-gray-900 animate-fade-in">{resultText}</p>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300"
                            onClick={nextScenario}
                        >
                            לתרחיש הבא
                        </button>
                    </div>
                )}
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p className="mb-4">
                    <strong className="text-violet-700">מהי בעיית העגלה ומדוע היא חשובה?</strong> בעיית העגלה היא ניסוי מחשבתי בתחום האתיקה המציג דילמה מוסרית: האם להקריב אדם אחד כדי להציל מספר רב יותר של אנשים? היא חשובה כי היא בוחנת את העקרונות המנחים את ההחלטות המוסריות שלנו.
                </p>
                <p className="mb-4">
                    <strong className="text-violet-700">השוואה בין תועלתנות (Utilitarianism) לדאונטולוגיה (Deontology).</strong> תועלתנות גורסת שהמעשה הנכון הוא זה שממקסם את האושר הכולל או ממזער את הסבל. דאונטולוגיה, לעומת זאת, מתמקדת בחובות ובכללים מוסריים, ללא קשר לתוצאה.
                </p>
                <p className="mb-4">
                    <strong className="text-violet-700">עקרון הנזק הכפול (Doctrine of Double Effect).</strong> עקרון זה מנסה להבחין בין תוצאות חיוביות ושליליות של מעשה, כאשר הנזק אינו אמצעי להשגת התוצאה הטובה.
                </p>
                <p className="mb-4">
                    <strong className="text-violet-700">ניתוח וריאציות שונות של בעיית העגלה.</strong> וריאציות שונות בוחנות שיקולים מוסריים נוספים כמו קרבה אישית, כוונה ותפקיד.
                </p>
                <p className="mb-4">
                    <strong className="text-violet-700">ביקורות על בעיית העגלה כמבחן מוסרי אמיתי.</strong> מבקרים טוענים שהבעיה מופשטת מדי ואינה משקפת את המורכבות של החלטות מוסריות בעולם האמיתי.
                </p>
                <p className="mb-4">
                    בעיית העגלה, על אף היותה כלי מופשט, מעוררת שאלות עמוקות על מוסר, אתיקה וקבלת החלטות. הנה הרחבה מעמיקה יותר על הנושאים שהוזכרו:
                </p>
                <ol className="list-decimal list-inside my-4">
                    <li>
                        <strong className="text-violet-700">מהי בעיית העגלה ומדוע היא חשובה?</strong>
                        <p className="mb-2">
                            בעיית העגלה היא ניסוי מחשבתי קלאסי בפילוסופיה מוסרית. בתרחיש הבסיסי, עגלת רכבת דוהרת במסלול שבו קשורים חמישה אנשים. אתם עומדים ליד מנוף שיכול להסיט את העגלה למסלול צדדי, אך במסלול זה קשור אדם אחד. השאלה היא האם עליכם להסיט את העגלה, ובכך להרוג אדם אחד כדי להציל חמישה.
                        </p>
                        <p className="mb-2">
                            החשיבות של בעיית העגלה נובעת מיכולתה לחשוף את העקרונות המוסריים הסמויים המנחים את שיקול הדעת שלנו. היא מאפשרת לנו לבחון את האינטואיציות המוסריות שלנו, את ההבדלים בין סוגי פעולות שונים (כגון פעולה ישירה לעומת מחדל), ואת המשקל שאנו מייחסים לתוצאות לעומת כוונות.
                        </p>
                    </li>
                    <li>
                        <strong className="text-violet-700">השוואה בין תועלתנות (Utilitarianism) לדאונטולוגיה (Deontology)</strong>
                        <ul className="list-disc list-inside my-2">
                            <li>
                                <strong className="text-indigo-700">תועלתנות:</strong>
                                <p className="mb-2">
                                    גישה זו, שמזוהה עם פילוסופים כמו ג'רמי בנת'ם וג'ון סטיוארט מיל, גורסת שהמעשה הנכון הוא זה שממקסם את התועלת הכוללת – כלומר, את האושר או הרווחה של המספר הגדול ביותר של אנשים. במקרה של בעיית העגלה, תועלתן עשוי לטעון שיש להסיט את העגלה כדי להציל חמישה אנשים, גם אם זה כרוך בהריגת אדם אחד.
                                </p>
                            </li>
                            <li>
                                <strong className="text-indigo-700">דאונטולוגיה:</strong>
                                <p className="mb-2">
                                    גישה זו, שמזוהה עם עמנואל קאנט, מתמקדת בחובות ובכללים מוסריים. על פי הדאונטולוגיה, יש פעולות שאסור לעשות, ללא קשר לתוצאות. למשל, אסור להרוג אדם חף מפשע, גם אם זה יציל חיים רבים יותר. במקרה של בעיית העגלה, דאונטולוג עשוי לטעון שאסור להסיט את העגלה, כי זה כרוך בהריגה מכוונת של אדם אחד.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong className="text-violet-700">עקרון הנזק הכפול (Doctrine of Double Effect)</strong>
                        <p className="mb-2">
                            עקרון זה, שמקורו בפילוסופיה הנוצרית, מנסה להבחין בין מקרים שבהם מותר לגרום נזק כתוצאה לוואי של פעולה טובה, לבין מקרים שבהם אסור לגרום נזק כאמצעי להשגת מטרה טובה. העקרון קובע ארבעה תנאים שצריכים להתקיים כדי שהפעולה תהיה מותרת:
                        </p>
                        <ol className="list-lower-alpha list-inside my-2">
                            <li>הפעולה עצמה חייבת להיות טובה או ניטרלית מבחינה מוסרית.</li>
                            <li>הכוונה חייבת להיות להשיג את התוצאה הטובה, ולא את התוצאה הרעה.</li>
                            <li>התוצאה הטובה לא יכולה לנבוע ישירות מהתוצאה הרעה.</li>
                            <li>התוצאה הטובה חייבת להיות פרופורציונלית לתוצאה הרעה.</li>
                        </ol>
                        <p className="mb-2">
                            במקרה של בעיית העגלה, אפשר לטעון שהסטת העגלה עומדת בתנאים אלה, כי הכוונה היא להציל חמישה אנשים, והמוות של האדם האחד הוא תוצאה לוואי ולא אמצעי להצלת האחרים. עם זאת, פרשנות זו שנויה במחלוקת.
                        </p>
                    </li>
                    <li>
                        <strong className="text-violet-700">ניתוח וריאציות שונות של בעיית העגלה</strong>
                        <p className="mb-2">
                            בעיית העגלה זכתה לווריאציות רבות, שכל אחת מהן בוחנת שיקולים מוסריים נוספים. למשל:
                        </p>
                        <ul className="list-disc list-inside my-2">
                            <li>
                                <strong className="text-indigo-700">האדם השמן:</strong>
                                <p className="mb-2">
                                    בגרסה זו, אין מנוף, אך אתם עומדים על גשר מעל המסילה, ולצדכם עומד אדם שמן. אם תדחפו אותו למסילה, הוא יעצור את העגלה ויציל את חמשת האנשים. האם תדחפו אותו?
                                </p>
                            </li>
                            <li>
                                <strong className="text-indigo-700">המנתח:</strong>
                                <p className="mb-2">
                                    בגרסה זו, אתם מנתח ויש לכם חמישה חולים שזקוקים להשתלות איברים. מגיע אליכם חולה בריא לחלוטין. האם תהרגו אותו ותשתמשו באיבריו כדי להציל את חמשת החולים האחרים?
                                </p>
                            </li>
                        </ul>
                        <p className="mb-2">
                            ההבדלים בין הווריאציות השונות חושפים את החשיבות של גורמים כמו קרבה אישית, כוונה, אמצעי, ותפקיד חברתי בהחלטות מוסריות.
                        </p>
                    </li>
                    <li>
                        <strong className="text-violet-700">ביקורות על בעיית העגלה כמבחן מוסרי אמיתי</strong>
                        <p className="mb-2">
                            בעיית העגלה ספגה ביקורת על היותה מופשטת מדי ובלתי מציאותית. מבקרים טוענים שהיא אינה משקפת את המורכבות של החלטות מוסריות בעולם האמיתי, שבהן יש לרוב מידע חלקי, לחצים זמן, ושיקולים רגשיים. כמו כן, יש הטוענים שהתגובות שלנו לבעיית העגלה מושפעות מגורמים כמו מסגור (framing) וסדר הצגת הבעיות.
                        </p>
                        <p className="mb-2">
                            למרות הביקורות, בעיית העגלה נותרה כלי רב ערך לחקר המוסר האנושי. היא מעוררת דיון מעמיק על הערכים והעקרונות המנחים את חיינו, ומסייעת לנו להבין את עצמנו ואת החברה שבה אנו חיים.
                        </p>
                    </li>
                </ol>
            </section>
        </div>
    );
};

// CSS Animation to Fade In
const fadeIn = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
`;

// Add CSS to the document head
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = fadeIn
document.head.appendChild(styleSheet)

export default TrolleyProblem;