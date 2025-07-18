import React, { useState, useEffect } from 'react';

/**
 * EpigeneticsEnvironmentActivatesGenes Component
 *
 * הסימולציה תאפשר למשתמש להתנסות בהשפעת גורמים סביבתיים והתנהגותיים על ביטוי גנים, מבלי לשנות את רצף ה-DNA. המשתמש יראה מודל ויזואלי של גן ספציפי (לדוגמה, גן המעורב בתגובת הגוף למתח או במטבוליזם). בצד המסך יהיו מחוונים אינטראקטיביים עבור 'איכות תזונה' (מבריאה/לא בריאה), 'רמת מתח' (נמוכה/גבוהה) ו'פעילות גופנית' (ספורטאי/יושבני). כשמשתמש יזיז את המחוונים, הוא יראה בזמן אמת שינויים על גבי הגן: הופעה או היעלמות של 'סימונים אפיגנטיים' (מולקולות מתילציה או שינויים בהיסטונים) במיקומים שונים לאורך הגן. במקביל, סרגל מדידה של 'רמת ביטוי הגן' ישתנה, וישפיע על 'פוטנציאל בריאותי' כלשהו (למשל, 'חוסן למתח' או 'יעילות מטבולית'). התובנה המרכזית שהמשתמש יפיק היא שגנים אינם קבועים במצב 'מופעל' או 'כבוי' רק על בסיס רצף ה-DNA שלהם, אלא הם דינמיים ומושפעים עמוקות מאינטראקציות עם הסביבה והתנהגות, מה שמשפיע באופן ישיר על בריאותו ותפקודו.
 */
const EpigeneticsEnvironmentActivatesGenes = () => {
    // משתני state עבור גורמים סביבתיים
    const [nutritionQuality, setNutritionQuality] = useState(50); // 0 (לא בריאה) עד 100 (מבריאה)
    const [stressLevel, setStressLevel] = useState(50); // 0 (נמוכה) עד 100 (גבוהה)
    const [physicalActivity, setPhysicalActivity] = useState(50); // 0 (יושבני) עד 100 (ספורטאי)

    // משתני state נגזרים עבור ביטוי גן ופוטנציאל בריאותי
    const [geneExpression, setGeneExpression] = useState(50);
    const [healthPotential, setHealthPotential] = useState('ממוצע');

    // Effect hook לחישוב ביטוי גן ופוטנציאל בריאותי בכל שינוי בגורמים הסביבתיים
    useEffect(() => {
        // חישוב פשוט של ביטוי הגן:
        // תזונה טובה, רמת מתח נמוכה, ופעילות גופנית גבוהה מובילות לביטוי גן גבוה יותר.
        const calculatedExpression = (
            (nutritionQuality * 0.4) +         // לתזונה יש השפעה חיובית חזקה
            ((100 - stressLevel) * 0.3) +      // למתח נמוך יש השפעה חיובית
            (physicalActivity * 0.3)           // לפעילות גופנית יש השפעה חיובית
        ) / 100; // נורמליזציה לטווח 0-1 עבור אחוזים

        const expressionPercentage = Math.round(calculatedExpression * 100);
        setGeneExpression(expressionPercentage);

        // קביעת פוטנציאל בריאותי בהתבסס על ביטוי הגן
        if (expressionPercentage > 80) {
            setHealthPotential('מעולה: חוסן משופר למתח, יעילות מטבולית גבוהה');
        } else if (expressionPercentage > 60) {
            setHealthPotential('טוב: חוסן סביר למתח, יעילות מטבולית טובה');
        } else if (expressionPercentage > 40) {
            setHealthPotential('ממוצע: פוטנציאל לחוסר איזון תלוי מצב');
        } else {
            setHealthPotential('נמוך: סיכון מוגבר לחוסר חוסן למתח, ירידה ביעילות מטבולית');
        }
    }, [nutritionQuality, stressLevel, physicalActivity]);

    // פונקציה לקביעת סגנון ויזואלי של סימון אפיגנטי
    const getMarkStyle = (markIndex) => {
        const avgEnvImpact = (nutritionQuality + (100 - stressLevel) + physicalActivity) / 300; // ממוצע השפעה סביבתית (0-1)

        let markColor = '';
        let opacity = 0.5;

        // הדמיית סוגים שונים של סימונים המגיבים באופן שונה
        if (markIndex % 2 === 0) { // סימון מתילציה (מדכא ביטוי אם גבוה)
            if (avgEnvImpact < 0.4) { // סביבה ירודה
                markColor = '#EF4444'; // אדום (דיכוי גבוה)
                opacity = 0.9;
            } else if (avgEnvImpact < 0.7) { // סביבה בינונית
                markColor = '#FBBF24'; // צהוב (דיכוי מתון)
                opacity = 0.7;
            } else { // סביבה טובה
                markColor = '#22C55E'; // ירוק (הפעלה / דיכוי נמוך)
                opacity = 0.5;
            }
        } else { // שינוי בהיסטונים (מפעיל ביטוי אם פתוח)
            if (avgEnvImpact < 0.4) { // סביבה ירודה
                markColor = '#60A5FA'; // כחול (היסטונים דחוסים)
                opacity = 0.4;
            } else if (avgEnvImpact < 0.7) { // סביבה בינונית
                markColor = '#A78BFA'; // סגול (פתוחים במתינות)
                opacity = 0.7;
            } else { // סביבה טובה
                markColor = '#8B5CF6'; // סגול כהה (פתוחים מאוד / פעילים מאוד)
                opacity = 0.9;
            }
        }

        return { backgroundColor: markColor, opacity: opacity, transition: 'background-color 0.5s, opacity 0.5s' };
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                אפיגנטיקה: הסביבה מפעילה את הגנים
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם ידעת שגם אם יש לך ולתאום הזהה שלך אותו רצף DNA, עדיין יכולים להיות ביניכם הבדלים משמעותיים בבריאות ובהתנהגות? ומה אם נאמר לך שהבחירות היומיומיות שלך – מה שאתה אוכל, כמה אתה ישן, ורמת המתח בחייך – משפיעות לא רק עליך, אלא גם על האופן שבו הגנים שלך יבואו לידי ביטוי?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">הדגמה אינטראקטיבית: השפעת הסביבה על ביטוי גנים</h3>
                <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                    הזז את המחוונים כדי לראות כיצד גורמים סביבתיים משפיעים על ה"סימונים האפיגנטיים" על הגן שלך (מולקולות קטנות המדליקות ומכבות גנים) ועל רמת ביטויו.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl mb-10">
                    {/* Slider: איכות תזונה */}
                    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md">
                        <label htmlFor="nutrition" className="text-lg font-semibold text-purple-700 mb-2">איכות תזונה</label>
                        <input
                            type="range"
                            id="nutrition"
                            min="0"
                            max="100"
                            value={nutritionQuality}
                            onChange={(e) => setNutritionQuality(parseInt(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-red-400 to-green-400 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between w-full text-sm text-gray-600 mt-1">
                            <span>לא בריאה</span>
                            <span>מבריאה</span>
                        </div>
                    </div>

                    {/* Slider: רמת מתח */}
                    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md">
                        <label htmlFor="stress" className="text-lg font-semibold text-purple-700 mb-2">רמת מתח</label>
                        <input
                            type="range"
                            id="stress"
                            min="0"
                            max="100"
                            value={stressLevel}
                            onChange={(e) => setStressLevel(parseInt(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-green-400 to-red-400 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between w-full text-sm text-gray-600 mt-1">
                            <span>נמוכה</span>
                            <span>גבוהה</span>
                        </div>
                    </div>

                    {/* Slider: פעילות גופנית */}
                    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md">
                        <label htmlFor="activity" className="text-lg font-semibold text-purple-700 mb-2">פעילות גופנית</label>
                        <input
                            type="range"
                            id="activity"
                            min="0"
                            max="100"
                            value={physicalActivity}
                            onChange={(e) => setPhysicalActivity(parseInt(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-red-400 to-blue-400 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between w-full text-sm text-gray-600 mt-1">
                            <span>יושבני</span>
                            <span>ספורטאי</span>
                        </div>
                    </div>
                </div>

                {/* מודל ויזואלי של הגן */}
                <div className="w-full max-w-3xl bg-gray-100 border-2 border-indigo-300 rounded-lg p-6 shadow-inner flex flex-col items-center">
                    <h4 className="text-xl font-bold text-indigo-700 mb-4">מודל גן היפותטי (לדוגמה, גן לחוסן למתח)</h4>
                    <div className="relative w-full h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-between px-4 overflow-hidden shadow-lg">
                        {/* הדמיית סימונים אפיגנטיים לאורך הגן */}
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="w-6 h-6 rounded-full border-2 border-white transform hover:scale-110 transition-transform duration-300 cursor-help"
                                style={getMarkStyle(i)}
                                title={i % 2 === 0 ? "סימון מתילציה: יכול לדכא ביטוי גן" : "שינוי היסטונים: יכול להפעיל/לדכא ביטוי גן"}
                            ></div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">הצבע והשקיפות של העיגולים מייצגים שינויים בסימונים האפיגנטיים.</p>
                </div>

                {/* סרגל מדידה של רמת ביטוי הגן ופוטנציאל בריאותי */}
                <div className="w-full max-w-3xl mt-8 p-4 bg-purple-50 rounded-xl shadow-lg border border-purple-200">
                    <h4 className="text-xl font-bold text-purple-800 mb-4">רמת ביטוי הגן: <span className="font-extrabold">{geneExpression}%</span></h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                        <div
                            className="bg-gradient-to-r from-red-400 to-green-500 h-4 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${geneExpression}%` }}
                        ></div>
                    </div>
                    <p className="text-lg font-semibold text-indigo-700 mt-4">פוטנציאל בריאותי: <span className="text-xl font-extrabold text-violet-900">{healthPotential}</span></p>
                </div>

            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                        <strong>מהי אפיגנטיקה?</strong>
                        בעוד שגנטיקה מסורתית חוקרת את רצף ה-DNA עצמו – את ה"קוד" הגנטי שעובר בתורשה – אפיגנטיקה (מיוונית: "מעל לגנטיקה") עוסקת בשינויים תורשתיים בביטוי גנים שאינם כרוכים בשינוי רצף ה-DNA. במילים אחרות, היא חוקרת כיצד גנים "נדלקים" או "נכבים" מבלי לשנות את ההוראות הבסיסיות ב-DNA. היא משמשת כ"מפסק תאורה" או כ"מערכת הפעלה" שקובעת איזה חלק מהקוד הגנטי יבוטא, מתי ואיפה.
                    </p>
                    <p>
                        <strong>מנגנונים אפיגנטיים עיקריים:</strong>
                        שני המנגנונים המרכזיים שבאמצעותם מתרחשים שינויים אפיגנטיים הם:
                        <ul className="list-disc list-inside mt-2 space-y-2">
                            <li>
                                <strong>מתילציית DNA:</strong> זוהי הוספה של קבוצת מתיל (CH3) לבסיסי ציטוזין ספציפיים ב-DNA. לרוב, מתילציה באזורים מקדמי ביטוי (פרומוטורים) גורמת ל"השתקה" של הגן, כלומר מונעת את קריאתו.
                            </li>
                            <li>
                                <strong>שינויים בהיסטונים:</strong> ה-DNA שלנו כרוך סביב חלבונים הנקראים היסטונים, ויוצר מבנה שנקרא כרומטין. שינויים כימיים בהיסטונים (כמו אצטילציה או מתילציה) יכולים לגרום לכרומטין להיפתח או להיסגר. כרומטין פתוח מאפשר גישה למכונות השעתוק ולביטוי הגן, בעוד כרומטין סגור חוסם זאת.
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>כיצד הסביבה משפיעה:</strong>
                        הבחירות היומיומיות והסביבה שלנו הן גורמים משמעותיים המשפיעים על השינויים האפיגנטיים:
                        <ul className="list-disc list-inside mt-2 space-y-2">
                            <li>
                                <strong>תזונה:</strong> רכיבי מזון מסוימים (כמו פולאט, ויטמין B12) הם תורמי קבוצות מתיל החיוניות לתהליך המתילציה. תזונה עשירה או לקויה יכולה להשפיע באופן דרמטי על פרופיל המתילציה.
                            </li>
                            <li>
                                <strong>מתח:</strong> מתח כרוני משפיע על שחרור הורמונים (כמו קורטיזול) שיכולים לשנות את הסימונים האפיגנטיים בגנים המעורבים בתגובת הגוף למתח, ובכך להשפיע על חוסן או פגיעות.
                            </li>
                            <li>
                                <strong>פעילות גופנית:</strong> פעילות גופנית סדירה נמצאה כמשפיעה על שינויים אפיגנטיים בגנים הקשורים למטבוליזם, חילוף חומרים ובריאות השרירים.
                            </li>
                            <li>
                                <strong>חשיפה לרעלים:</strong> כימיקלים ורעלים סביבתיים (כמו עשן סיגריות או חומרים מזהמים) יכולים לגרום לשינויים אפיגנטיים שפוגעים בבריאות התא וקשורים לסיכון למחלות.
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>השפעות אפיגנטיות על בריאות ומחלה:</strong>
                        שינויים אפיגנטיים חריגים נקשרו למגוון רחב של מחלות כרוניות, כולל סרטן, סוכרת, מחלות לב וכלי דם, והפרעות נוירולוגיות. הם ממלאים תפקיד קריטי בהתפתחות העובר, בתהליכי זיקנה (כמו קיצור טלומרים), ובפתוגנזה של מחלות. מודלים אפיגנטיים חדשים אפילו מנסים לחזות "גיל ביולוגי" על סמך פרופיל המתילציה.
                    </p>
                    <p>
                        <strong>האם שינויים אפיגנטיים ניתנים להורשה?</strong>
                        במקרים מסוימים, שינויים אפיגנטיים יכולים לעבור בתורשה בין דורות (אפיגנטיקה בין-דורית - transgenerational epigenetics) למרות שרצף ה-DNA נשאר זהה. דוגמאות לכך נצפו במחקרים בחיות ובבני אדם, כאשר חוויות של הורים (כמו רעב או מתח קיצוני) השפיעו על הבריאות והתכונות של צאצאיהם דרך מנגנונים אפיגנטיים.
                    </p>
                    <p>
                        <strong>הגמישות וההפיכות של האפיגנטיקה:</strong>
                        אחד ההיבטים המעניינים ביותר של אפיגנטיקה הוא גמישותה. בניגוד למוטציות ב-DNA שהן קבועות יחסית, שינויים אפיגנטיים יכולים להיות הפיכים ומושפעים לטובה או לרעה לאורך חיינו. המשמעות היא שהבחירות באורח החיים, כמו שיפור תזונה, הפחתת מתח ואימוץ פעילות גופנית, עשויות לשנות את ה"תוכנה" האפיגנטית שלנו ולשפר את הפוטנציאל הבריאותי, גם מבלי לשנות את ה-DNA הבסיסי. זוהי ההבטחה הגדולה של האפיגנטיקה לרפואה מונעת וטיפולית.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default EpigeneticsEnvironmentActivatesGenes;