import React, { useState } from 'react';

/**
 * SuspensionBridgesTheSecretBehindThePhysicalGiant Component
 *
 * הסימולציה תאפשר למשתמשים 'לבנות' גשר תלוי משלהם, באמצעות ממשק גרור ושחרר (Drag & Drop) של רכיבים כמו כבלים, מגדלים ומשטחים. המשתמשים יוכלו לשנות פרמטרים כמו עובי הכבלים, גובה המגדלים, חומר המשטח ועוד. עם הוספת משקל דינמי (למשל, כלי רכב נעים) למשטח הגשר, המשתמש יראה באופן מיידי ואינטראקטיבי את חלוקת הכוחות הפועלים על כל רכיב: חצים וקטוריים יצביעו על כוחות המתיחה בכבלים, כוחות הלחיצה במגדלים, והעומס על המשטח. מד מחוון יציג את מידת העומס הכולל ואת נקודת הכשל הפוטנציאלית של הגשר בהתאם לשינויי המשתמש. התובנה המרכזית תהיה כיצד כוחות אדירים מועברים ומפוזרים ביעילות דרך רשת מורכבת של מתח ולחיצה, וכיצד שינוי בפרמטר יחיד יכול להשפיע דרמטית על יציבות המבנה כולו, תוך הדגשת עקרונות שיווי המשקל והעברת כוחות.
 */
const SuspensionBridgesTheSecretBehindThePhysicalGiant = () => {
    // Hooks לניהול מצב הפרמטרים של הגשר
    // עובי הכבלים הראשיים (יחידות שרירותיות, משפיע על חוזק המתיחה)
    const [cableThickness, setCableThickness] = useState(50);
    // גובה המגדלים (יחידות שרירותיות, משפיע על זווית הכבלים ויעילות חלוקת הכוח)
    const [towerHeight, setTowerHeight] = useState(150);
    // חומר משטח הגשר (משפיע על יכולת הגשר לפזר עומס)
    const [surfaceMaterial, setSurfaceMaterial] = useState('concrete');
    // משקל דינמי על הגשר (טון, מדמה כלי רכב או עומס משתנה)
    const [currentLoad, setCurrentLoad] = useState(0);

    /**
     * פונקציית עזר לחישוב רמת הסטרס ההיפותטית על הגשר.
     * חישוב זה מדמה את השפעת הפרמטרים השונים על היציבות הכללית.
     * ערך נמוך יותר מצביע על גשר יציב יותר.
     */
    const calculateStress = () => {
        let stress = currentLoad; // מתחילים מהעומס הדינמי

        // השפעת עובי הכבלים: כבלים עבים יותר מפחיתים סטרס (יעילות גבוהה יותר)
        // מנורמל כך ש-50 יחידות עובי מהוות נקודת ייחוס.
        stress *= (100 / cableThickness);

        // השפעת גובה המגדלים: מגדלים גבוהים יותר מפחיתים סטרס (זוויות טובות יותר לפיזור כוחות)
        // מנורמל כך ש-150 יחידות גובה מהוות נקודת ייחוס.
        stress *= (200 / towerHeight);

        // השפעת חומר המשטח: חומרים חזקים יותר (כמו פלדה) מפחיתים סטרס
        switch (surfaceMaterial) {
            case 'steel':
                stress *= 0.7; // פלדה: מקדם נמוך יותר = פחות סטרס
                break;
            case 'concrete':
                stress *= 1.0; // בטון: מקדם בסיסי
                break;
            case 'wood':
                stress *= 1.5; // עץ: מקדם גבוה יותר = יותר סטרס
                break;
            default:
                stress *= 1.0;
        }

        // הגנה מפני ערכים בלתי חוקיים (לדוגמה, חלוקה באפס)
        if (isNaN(stress) || !isFinite(stress) || stress < 0) {
            return 0;
        }

        return Math.round(stress);
    };

    const calculatedStress = calculateStress();
    const failureThreshold = 300; // סף היפותטי שמעליו הגשר נחשב קרוב לכשל
    const warningThreshold = 150; // סף היפותטי שמעליו הגשר נחשב תחת עומס משמעותי
    const isUnderStress = calculatedStress > warningThreshold && calculatedStress < failureThreshold;
    const isFailing = calculatedStress >= failureThreshold;

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                גשרים תלויים: הסוד מאחורי הענק הפיזיקלי
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                איך ייתכן שגשרים עצומים, במשקל אלפי טונות, מצליחים לחבר בין יבשות ולהתמודד עם כוחות טבע אדירים, וכל זה נתמך על ידי כבלים הנראים דקים למדי? האם קסם עומד מאחורי יציבותם, או שמא זהו שיא ההבנה האנושית של חוקי הפיזיקה?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית: בנה גשר משלך!</h3>
                <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
                    דמיין שאתה יכול לתכנן גשר תלוי בעצמך! בסימולציה מלאה, היית גורר ושחרר רכיבים ובזמן אמת רואה את השפעת הבחירות שלך על יציבות הגשר. כאן, נציג את הפרמטרים העיקריים שאתה יכול לשלוט בהם:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl mb-8">
                    <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow-inner">
                        <label htmlFor="cableThickness" className="font-semibold text-indigo-700 mb-2">עובי כבלים ראשיים: {cableThickness} יחידות</label>
                        <input
                            id="cableThickness"
                            type="range"
                            min="10"
                            max="100"
                            value={cableThickness}
                            onChange={(e) => setCableThickness(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg shadow-inner">
                        <label htmlFor="towerHeight" className="font-semibold text-purple-700 mb-2">גובה מגדלים: {towerHeight} יחידות</label>
                        <input
                            id="towerHeight"
                            type="range"
                            min="50"
                            max="200"
                            value={towerHeight}
                            onChange={(e) => setTowerHeight(Number(e.target.value))}
                            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col items-center p-4 bg-violet-50 rounded-lg shadow-inner">
                        <label htmlFor="surfaceMaterial" className="font-semibold text-violet-700 mb-2">חומר משטח הגשר:</label>
                        <select
                            id="surfaceMaterial"
                            value={surfaceMaterial}
                            onChange={(e) => setSurfaceMaterial(e.target.value)}
                            className="w-full p-2 border border-violet-300 rounded-md bg-white text-gray-700"
                        >
                            <option value="concrete">בטון</option>
                            <option value="steel">פלדה</option>
                            <option value="wood">עץ</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-inner col-span-full">
                        <label htmlFor="currentLoad" className="font-semibold text-gray-700 mb-2">משקל דינמי (רכבים): {currentLoad} טון</label>
                        <input
                            id="currentLoad"
                            type="range"
                            min="0"
                            max="500"
                            value={currentLoad}
                            onChange={(e) => setCurrentLoad(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className={`w-full p-6 rounded-lg border shadow-md transition-colors duration-500
                    ${isFailing ? 'bg-red-100 border-red-300 text-red-800' : isUnderStress ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 'bg-green-100 border-green-300 text-green-800'}`}>
                    <h4 className="text-xl font-bold mb-3 text-center">תוצאות הסימולציה (הדמיה)</h4>
                    <p className="text-lg mb-2 text-center">
                        <strong className="text-current">כוחות המתיחה בכבלים:</strong> ככל שהעומס הכולל גבוה יותר, כך גדלה המתיחה בכבלים, במיוחד עם כבלים דקים יותר.
                    </p>
                    <p className="text-lg mb-2 text-center">
                        <strong className="text-current">כוחות הלחיצה במגדלים:</strong> מגדלים גבוהים יותר ועבים יותר מפחיתים את הלחץ הנקודתי שמופעל עליהם.
                    </p>
                    <p className="text-lg mb-2 text-center">
                        <strong className="text-current">עומס על המשטח:</strong> חומר חזק יותר כמו פלדה מפזר את העומס בצורה טובה יותר מעץ.
                    </p>
                    <div className="mt-4 text-center">
                        {/* תצוגת רמת הסטרס הכללית */}
                        <p className="text-lg font-semibold text-current">
                            עומס כולל על הגשר (מד סטרס היפותטי): <span className="text-2xl font-extrabold">{calculatedStress} יחידות סטרס</span>
                        </p>
                        {/* הודעה על מצב הגשר */}
                        {isFailing ? (
                            <p className="text-xl font-bold text-red-700 mt-2">
                                <span className="animate-pulse">⚠️ סכנה! הגשר קרוב לנקודת כשל! ⚠️</span>
                            </p>
                        ) : isUnderStress ? (
                            <p className="text-lg font-semibold text-yellow-700 mt-2">
                                שימו לב: הגשר נמצא תחת עומס משמעותי.
                            </p>
                        ) : (
                            <p className="text-lg font-semibold text-green-700 mt-2">
                                הגשר יציב ובטוח תחת העומס הנוכחי.
                            </p>
                        )}
                        <p className="text-md text-current mt-1">
                            (נקודת כשל פוטנציאלית מעל {failureThreshold} יחידות סטרס)
                        </p>
                    </div>
                </div>

            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p className="mb-4">
                    <strong>הגדרת הגשר התלוי:</strong> גשר תלוי הוא סוג של גשר שבו משטח הגשר תלוי באמצעות כבלים אנכיים, המחוברים לכבלי תמיכה ראשיים גדולים. כבלים אלו, בתורם, נמתחים בין שני מגדלים (פיילונים) גבוהים, ומעוגנים בקרקע בשני קצות הגשר. גשרים תלויים משמשים בעיקר לחיבור בין שתי נקודות רחוקות זו מזו, לרוב מעל מכשולי מים גדולים או עמקים עמוקים, בזכות יכולתם לגשר על פני מרחקים ארוכים במיוחד ללא צורך בעמודי תמיכה רבים באמצע הטווח. יתרונותיהם הבולטים הם טווח גדול מאוד, גמישות מסוימת להתמודדות עם רעידות אדמה, ומראה אסתטי ומרשים.
                </p>

                <p className="mb-4">
                    <strong>רכיבים מרכזיים:</strong>
                </p>
                <ul className="list-disc list-inside mb-4 ml-4">
                    <li className="mb-2">
                        <strong>מגדלים (פיילונים):</strong> עמודים גבוהים ויציבים התומכים בכבלים הראשיים ומעבירים את משקל הגשר והעומסים הנגרמים מכך אל היסודות בקרקע. הם נתונים בעיקר לכוחות לחיצה.
                    </li>
                    <li className="mb-2">
                        <strong>כבלים ראשיים:</strong> כבלים עבים וחזקים במיוחד, לרוב עשויים מאלפי חוטי פלדה דקים השזורים יחד. הם מהווים את עמוד השדרה של הגשר, עליהם תלויה כל המערכת. הם נתונים לכוחות מתיחה עצומים.
                    </li>
                    <li className="mb-2">
                        <strong>כבלי תמיכה (מתלים / האנגרים):</strong> כבלים אנכיים או אלכסוניים קצרים יותר, המחברים את משטח הגשר לכבלים הראשיים. הם אלו שנושאים ישירות את משקל משטח הגשר והתנועה עליו ומעבירים אותו לכבלים הראשיים.
                    </li>
                    <li className="mb-2">
                        <strong>משטח הגשר (Deck):</strong> הכביש או מסילת הרכבת עצמה, עליה עוברת התנועה. הוא נתמך על ידי כבלי התמיכה.
                    </li>
                    <li className="mb-2">
                        <strong>עוגני קרקע (Anchorages):</strong> מבני ענק מבטון ופלדה הממוקמים בשני קצות הגשר, לרוב בתוך הקרקע. תפקידם לעגן בחוזקה את הכבלים הראשיים ולספוג את כוחות המתיחה העצומים המופעלים עליהם.
                    </li>
                </ul>

                <p className="mb-4">
                    <strong>עקרונות פיזיקליים:</strong> יציבותו של גשר תלוי טמונה בהבנה עמוקה של חוקי הפיזיקה, ובפרט חוקי ניוטון. הכוחות העיקריים הפועלים הם:
                </p>
                <ul className="list-disc list-inside mb-4 ml-4">
                    <li className="mb-2">
                        <strong>כוחות מתיחה (Tension):</strong> הכוח העיקרי הפועל על הכבלים (הראשיים ומתלי התמיכה). כוח זה מושך את הכבלים כלפי חוץ. בזכות חומרים בעלי חוזק מתיחה גבוה (כמו פלדה), הכבלים יכולים לעמוד בעומסים אדירים.
                    </li>
                    <li className="mb-2">
                        <strong>כוחות לחיצה (Compression):</strong> הכוח העיקרי הפועל על המגדלים. משקל הגשר והעומסים המועברים דרך הכבלים הראשיים "דוחסים" את המגדלים כלפי מטה אל היסודות.
                    </li>
                    <li className="mb-2">
                        <strong>שיווי משקל (Equilibrium):</strong> תכנון הגשר מבוסס על עקרון שיווי המשקל המכני, לפיו סך כל הכוחות והמומנטים הפועלים על המבנה שווה לאפס. כך, כל הכוחות הפועלים (משקל הגשר, כלי רכב, רוח) מתאזנים על ידי כוחות התגובה של הכבלים, המגדלים והעוגנים, והמבנה נשאר יציב.
                    </li>
                </ul>

                <p className="mb-4">
                    <strong>חשיבות עקומת השרשרת (Catenary Curve):</strong> הכבלים הראשיים של גשר תלוי מקבלים צורה טבעית של "עקומת שרשרת" (catenary curve) כשהם תלויים בחופשיות בין שתי נקודות. תצורה זו מאפשרת חלוקת משקל אופטימלית ואחידה לכל אורך הכבל, וממזערת עומסי כפיפה, מה שמגביר באופן דרמטי את יעילות המבנה ועמידותו. מבחינה הנדסית, הכבלים הראשיים הם לרוב בצורת פרבולה בגלל התפשטות המשקל בצורה אחידה לאורך המשטח, אך העיקרון הבסיסי זהה: הפצת עומס באופן שממזער את הסטרס בנקודות ספציפיות.
                </p>

                <p className="mb-4">
                    <strong>השפעת רוחות ורעידות אדמה:</strong> גשרים תלויים, בשל גודלם וגמישותם היחסית, חשופים במיוחד לכוחות טבע כמו רוחות חזקות ורעידות אדמה.
                </p>
                <ul className="list-disc list-inside mb-4 ml-4">
                    <li className="mb-2">
                        <strong>רוחות:</strong> רוחות יכולות ליצור תנודות הרסניות (כמו במקרה של גשר טאקומה נארוז הישן). כדי להתמודד עם זה, מהנדסים משתמשים בתכנון אווירודינמי של משטח הגשר, בולמי זעזועים, וכבלים נוספים לייצוב.
                    </li>
                    <li className="mb-2">
                        <strong>רעידות אדמה:</strong> הגמישות של גשרים תלויים מאפשרת להם לספוג חלק מהאנרגיה של רעידת אדמה, אך עדיין נדרשים פתרונות הנדסיים מורכבים כמו מיסבים מבודדים וחיבורים גמישים כדי למנוע קריסה.
                    </li>
                </ul>

                <p className="mb-4">
                    <strong>דוגמאות מפורסמות של גשרים תלויים בעולם:</strong>
                </p>
                <ul className="list-disc list-inside ml-4">
                    <li className="mb-2">
                        <strong>גשר שער הזהב (Golden Gate Bridge), סן פרנסיסקו, ארה"ב:</strong> אחד הגשרים המפורסמים והיפים בעולם, סמל להנדסה מודרנית ויופי אדריכלי. בבנייתו למדו רבות על ההשפעה של רוחות והצורך בתחזוקה שוטפת של הכבלים.
                    </li>
                    <li className="mb-2">
                        <strong>גשר ברוקלין (Brooklyn Bridge), ניו יורק, ארה"ב:</strong> גשר היסטורי ופורץ דרך, שהיה הראשון להשתמש בכבלי פלדה במקום ברזל יצוק והיווה פריצת דרך הנדסית עצומה בזמנו. סיפק לקחים חשובים בנוגע לעמידות חומרים לאורך זמן.
                    </li>
                    <li className="mb-2">
                        <strong>גשר אקאשי קאייקיו (Akashi Kaikyō Bridge), יפן:</strong> הגשר התלוי הארוך ביותר בעולם, נבנה באזור מועד לרעידות אדמה וכולל טכנולוגיות מתקדמות במיוחד להתמודדות עם כוחות קיצוניים.
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default SuspensionBridgesTheSecretBehindThePhysicalGiant;