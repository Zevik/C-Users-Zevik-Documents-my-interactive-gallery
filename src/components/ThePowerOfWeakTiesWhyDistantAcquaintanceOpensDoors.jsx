import React, { useState } from 'react';

/**
 * ThePowerOfWeakTiesWhyDistantAcquaintanceOpensDoors Component
 *
 * אפליקציה אינטראקטיבית המדמה רשת חברתית אישית. המשתמש יראה במרכז מסך 'את עצמו' (כצומת מרכזי). מסביבו יהיו מקובצים מספר 'אשכולות' (קבוצות) של אנשים: לדוגמה, 'משפחה וחברים קרובים', 'קולגות מהעבודה', 'חברים מתחביב/לימודים' - וכן מספר 'מכרים רחוקים' הפזורים בין האשכולות.
 *
 *   **ייצוג קשרים**: קווים עבים וקצרים (לדוגמה, בצבע כחול) יצביעו על 'קשרים חזקים' (חברים קרובים, משפחה – בתוך האשכולות). קווים דקים וארוכים (לדוגמה, בצבע ירוק) יצביעו על 'קשרים חלשים' (מכרים רחוקים – המחברים בין אשכולות שונים או מגיעים מחוץ לאשכולות המרכזיים).
 *   **אינטראקציה**: המשתמש יוכל 'לשאול שאלה' או 'לבקש עזרה במציאת עבודה/מידע' על ידי לחיצה על כל קשר (חזק או חלש) היוצא ממנו.
 *   **סימולציית זרימת מידע**:
 *   **קשר חזק**: כאשר המשתמש לוחץ על קשר חזק, הסימולציה תראה כיצד ה'שאלה' או ה'בקשה' מתפשטת בתוך אותו אשכול חברתי ספציפי. הקווים בתוך האשכול יודגשו. יופיע טקסט המסביר: 'המידע הגיע לחברים קרובים, אך הוא כנראה כבר מוכר לך או לא חשף הזדמנויות חדשות מחוץ למעגל המוכר שלך. המידע בתוך קבוצה הומוגנית נוטה להיות יתיר.'
 *   **קשר חלש**: כאשר המשתמש לוחץ על קשר חלש, הסימולציה תראה כיצד ה'שאלה' או ה'בקשה' 'קופצת' לאשכול חברתי חדש לגמרי, המכיל סוגי קשרים ומידע שונים לחלוטין. קווים חדשים יידלקו ויחשפו צמתים שלא היו מחוברים ישירות. יופיע טקסט המסביר: 'קשר חלש זה שימש גשר לעולם חדש ובלתי צפוי של קשרים ומידע! הזדמנויות ותובנות חדשות צפויות לצוץ כאן, הרחק מהמעגל הרגיל שלך. קשרים חלשים הם שער למידע לא יתיר.'
 *   **תובנה**: המטרה היא שהמשתמש יחווה ויבין ויזואלית כיצד קשרים חלשים משמשים 'גשרים' למקורות מידע והזדמנויות חדשים וייחודיים, בעוד קשרים חזקים נוטים לחזק מידע קיים בתוך מעגל סגור ומוכר.
 */
const ThePowerOfWeakTiesWhyDistantAcquaintanceOpensDoors = () => {
    // מצב המייצג את ההודעה המוצגת למשתמש מתחת לסימולציה
    const [simulationMessage, setSimulationMessage] = useState("לחץ על סוג קשר כדי לראות את זרימת המידע:");
    // מצב המציין איזה סוג קשר פעיל כרגע (לצורך הדגשה ויזואלית)
    const [activePath, setActivePath] = useState(null); // 'strong' or 'weak'

    // פונקציה המטפלת בלחיצה על כפתור קשר חזק/חלש
    const handleConnectionClick = (type) => {
        setActivePath(type); // הפעלת הדגשה ויזואלית לפי סוג הקשר
        if (type === 'strong') {
            setSimulationMessage('המידע הגיע לחברים קרובים, אך הוא כנראה כבר מוכר לך או לא חשף הזדמנויות חדשות מחוץ למעגל המוכר שלך. המידע בתוך קבוצה הומוגנית נוטה להיות יתיר.');
        } else { // type === 'weak'
            setSimulationMessage('קשר חלש זה שימש גשר לעולם חדש ובלתי צפוי של קשרים ומידע! הזדמנויות ותובנות חדשות צפויות לצוץ כאן, הרחק מהמעגל הרגיל שלך. קשרים חלשים הם שער למידע לא יתיר.');
        }

        // איפוס ההדגשה לאחר השהיה קצרה לאפקט ויזואלי
        setTimeout(() => {
            setActivePath(null);
        }, 3000); // הדגשה למשך 3 שניות
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                כוחם של קשרים חלשים: מדוע המכר הרחוק יפתח לך דלתות?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                אתה מחפש עבודה חדשה, נתקלת בבעיה מורכבת שצריך לפתור, או שאתה פשוט רוצה ללמוד משהו חדש? האינסטינקט אומר לפנות מיד לחברים הקרובים ולמשפחה, לא? ובכן, מחקרים מראים שהמידע וההזדמנויות המרתקות ביותר מגיעים דווקא מאנשים שאתה בקושי מכיר.
            </p>

            {/* קטע האינטראקציה הראשי */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">הדגמה אינטראקטיבית: רשת הקשרים שלך</h3>
                <div className="relative w-full max-w-lg h-96 flex items-center justify-center mb-8 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    {/* ייצוג ויזואלי: צומת 'אתה' מרכזי */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 border-4 border-violet-800">
                        אתה
                    </div>

                    {/* אשכול קשר חזק (משפחה/חברים קרובים) */}
                    <div className={`absolute p-4 rounded-xl shadow-md transition-all duration-500 ease-in-out ${activePath === 'strong' ? 'scale-105 border-2 border-blue-500 bg-blue-200' : 'bg-blue-100'}`} style={{ top: '20%', left: '25%', transform: 'translate(-50%, -50%) rotate(-15deg)' }}>
                        <p className="text-sm font-semibold text-blue-800 mb-2">משפחה וחברים קרובים</p>
                        <div className="flex justify-around">
                            <div className="w-8 h-8 bg-blue-500 rounded-full m-1"></div>
                            <div className="w-8 h-8 bg-blue-500 rounded-full m-1"></div>
                            <div className="w-8 h-8 bg-blue-500 rounded-full m-1"></div>
                        </div>
                        {/* חיבור ויזואלי ל'אתה' - ייצוג קו כחול עבה קונספטואלי */}
                        <div className={`absolute h-1 w-20 bg-blue-500 origin-top-left -rotate-45 -right-4 -bottom-4 transition-all duration-500 ${activePath === 'strong' ? 'bg-blue-700 h-2' : ''}`}></div>
                    </div>

                    {/* אשכול קשר חלש (מכרים חדשים/רשת רחוקה) */}
                    <div className={`absolute p-4 rounded-xl shadow-md transition-all duration-500 ease-in-out ${activePath === 'weak' ? 'scale-105 border-2 border-green-500 bg-green-200' : 'bg-green-100'}`} style={{ bottom: '20%', right: '25%', transform: 'translate(50%, 50%) rotate(10deg)' }}>
                        <p className="text-sm font-semibold text-green-800 mb-2">מכרים רחוקים / רשתות חדשות</p>
                        <div className="flex justify-around">
                            <div className="w-8 h-8 bg-green-500 rounded-full m-1"></div>
                            <div className="w-8 h-8 bg-green-500 rounded-full m-1"></div>
                            <div className="w-8 h-8 bg-green-500 rounded-full m-1"></div>
                        </div>
                        {/* חיבור ויזואלי ל'אתה' - ייצוג קו ירוק דק קונספטואלי */}
                        <div className={`absolute h-1 w-24 bg-green-500 origin-bottom-right rotate-45 -left-4 -top-4 transition-all duration-500 ${activePath === 'weak' ? 'bg-green-700 h-2' : ''}`}></div>
                    </div>

                    {/* אינדיקטור זרימת מידע (אנימציית פינג) */}
                    {activePath && (
                        <div className={`absolute top-1/2 left-1/2 w-10 h-10 rounded-full animate-ping ${activePath === 'strong' ? 'bg-blue-400' : 'bg-green-400'}`} style={{ animationDuration: '1s' }}></div>
                    )}
                </div>

                {/* לחצני אינטראקציה */}
                <div className="flex space-x-4 space-x-reverse mb-6">
                    <button
                        onClick={() => handleConnectionClick('strong')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-lg"
                    >
                        שאל/י חבר קרוב (קשר חזק)
                    </button>
                    <button
                        onClick={() => handleConnectionClick('weak')}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-lg"
                    >
                        שאל/י מכר רחוק (קשר חלש)
                    </button>
                </div>

                {/* הודעת הסימולציה המשתנה בהתאם לאינטראקציה */}
                <p className={`text-center mt-4 p-4 rounded-lg text-lg transition-all duration-500 ease-in-out
                    ${activePath === 'strong' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    activePath === 'weak' ? 'bg-green-50 text-green-800 border border-green-200' :
                    'text-gray-600'}`}>
                    {simulationMessage}
                </p>
            </section>

            {/* קטע הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                        <strong>ההשראה:</strong> תיאוריית 'כוחם של קשרים חלשים' פותחה על ידי הסוציולוג האמריקאי <strong className="text-indigo-700">מרק גרנובטר (Mark Granovetter)</strong> בשנת 1973. מחקרו הראה באופן מפתיע כי דווקא הקשרים הפחות קרובים אלינו הם אלו שלעיתים קרובות מובילים אותנו להזדמנויות החדשות והמשמעותיות ביותר בחיים.
                    </p>
                    <p>
                        <strong>הגדרת קשרים:</strong> גרנובטר הבחין בין שני סוגי קשרים:
                        <ul className="list-disc pr-8 mt-2 space-y-2">
                            <li>
                                <strong className="text-blue-700">קשרים חזקים (Strong Ties):</strong> מאופיינים בתדירות אינטראקציה גבוהה, עומק רגשי, הדדיות רבה ושיתוף נרחב במידע אישי. אלו בני המשפחה הקרובים, החברים הטובים ביותר והקולגות שבסביבת העבודה המיידית שלך.
                            </li>
                            <li>
                                <strong className="text-green-700">קשרים חלשים (Weak Ties):</strong> מאופיינים בתדירות אינטראקציה נמוכה יותר, עומק רגשי פחות, ופחות שיתוף במידע אישי. אלו מכרים רחוקים, קולגות לשעבר, חברים של חברים, או אנשים שפגשת בכנס מקצועי.
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>מדוע קשרים חזקים מביאים מידע 'יתיר' (Redundant Information):</strong> מעגל הקשרים החזקים שלך הוא בדרך כלל הומוגני למדי. חבריך הקרובים נוטים לחלוק איתך את אותם מקורות מידע, את אותם מעגלי היכרות ולפעמים אף את אותן דעות. כתוצאה מכך, המידע שזורם בתוך מעגל זה נוטה להיות "יתיר" – כלומר, מה שהם יודעים, סביר להניח שאתה כבר יודע, או שתוכל ללמוד בקלות ממקורות שכבר נגישים לך.
                    </p>
                    <p>
                        <strong>מדוע קשרים חלשים מביאים מידע 'חדשני' (Non-Redundant Information):</strong> מכרים רחוקים, לעומת זאת, חיים במעגלים חברתיים וקבוצות שונות לחלוטין משלך. הם חשופים למקורות מידע שונים, לרעיונות אחרים ולהזדמנויות שאתה לא היית נחשף אליהם בתוך המעגל המוכר שלך. בכך, הם משמשים כ'גשרים' (Bridges) המקשרים אותך לעולמות מידע חדשים ובלתי צפויים.
                    </p>
                    <p>
                        <strong>תרומתם של גשרים:</strong> קשרים חלשים הם "גשרים" חיוניים ברשת החברתית. הם מקשרים בין 'אשכולות' (Clusters) שונים של אנשים שבדרך כלל לא היו מתקשרים זה עם זה. קשרים אלו מאפשרים זרימה מהירה ויעילה של מידע, רעיונות והזדמנויות חדשות על פני מרווחים חברתיים גדולים, ומפחיתים את הסיכון ל"בורות מקומית" (Local Blindness) שבה כולם יודעים את אותם הדברים.
                    </p>
                    <p>
                        <strong>יישומים מעשיים:</strong> כוחם של קשרים חלשים בא לידי ביטוי בתחומים רבים:
                        <ul className="list-disc pr-8 mt-2 space-y-2">
                            <li><strong className="text-purple-700">מציאת עבודה:</strong> מחקרים הראו שחלק גדול מהאנשים מוצאים עבודה דרך מכרים רחוקים ולא דרך חברים קרובים.</li>
                            <li><strong className="text-purple-700">הפצת חדשנות טכנולוגית:</strong> רעיונות וטכנולוגיות חדשות מתפשטים ביעילות רבה יותר דרך קשרים חלשים המקשרים בין תעשיות וקהילות שונות.</li>
                            <li><strong className="text-purple-700">מעבר מידע רפואי או חברתי:</strong> קמפיינים לבריאות הציבור או מודעות חברתית מצליחים יותר כאשר הם מגיעים לאנשים דרך רשתות מגוונות.</li>
                            <li><strong className="text-purple-700">יזמות ופיתוח עסקי:</strong> גישה לשווקים חדשים, שותפויות פוטנציאליות ורעיונות פורצי דרך מגיעים לרוב מחוץ למעגל הקשרים המיידי.</li>
                        </ul>
                    </p>
                    <p>
                        <strong>אסטרטגיות לחיים:</strong> כדי ליישם את התובנה החשובה הזו בחיי היומיום, כדאי לנקוט באסטרטגיות הבאות:
                        <ul className="list-disc pr-8 mt-2 space-y-2">
                            <li><strong className="text-indigo-700">בניית רשת קשרים מגוונת:</strong> השתדל/י להכיר אנשים מתחומים שונים, מרקעים שונים וממעגלים חברתיים חדשים.</li>
                            <li><strong className="text-indigo-700">חשיבות ה'סמול טוק':</strong> שיחות קצרות ולא מחייבות עם מכרים רחוקים, שכנים או עמיתים שאתה לא עובד איתם ישירות יכולות לפתוח דלתות בלתי צפויות.</li>
                            <li><strong className="text-indigo-700">השתתפות באירועים מחוץ למעגל המיידי:</strong> כנסים מקצועיים, סדנאות, מפגשים קהילתיים או התנדבות הם דרכים מצוינות ליצור קשרים חלשים חדשים.</li>
                            <li><strong className="text-indigo-700">תחזוקה עדינה של קשרים:</strong> אין צורך להשקיע מאמץ רב בכל קשר חלש, אך מדי פעם חידוש קשר קצר יכול להיות בעל ערך רב.</li>
                        </ul>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ThePowerOfWeakTiesWhyDistantAcquaintanceOpensDoors;