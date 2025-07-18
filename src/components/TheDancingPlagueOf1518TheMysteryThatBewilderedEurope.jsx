import React, { useState, useEffect } from 'react';

/**
 * TheDancingPlagueOf1518TheMysteryThatBewilderedEurope Component
 *
 * סימולציה אינטראקטיבית המדמה את התפשטות מגפה פסיכוגנית המונית. המשתמש יוצג בפני מפה של עיר ועליה נקודות המייצגות את האוכלוסייה. בתחילת הסימולציה, מספר קטן של נקודות יתחילו 'לרקוד' (לשנות צבע/תנועה). לרשות המשתמש יהיו מספר מחוונים (סליידרים) המשפיעים על קצב ומידת ההתפשטות: 'רמת לחץ קהילתי' (בצורת מלחמות, רעב, מחלות), 'פגיעות פסיכולוגית' (הנטייה להידבק מפחדים וחרדות של אחרים), ו'תגובת הרשויות' (האם הרשויות ניסו להרגיע או דווקא עודדו את ההתנהגות מתוך אמונה תפלה). על המשתמש להתאים את המחוונים ולצפות בהשפעתם על התפשטות ה'מגפה'. התובנה המרכזית היא להבין כיצד שילוב של לחץ חברתי-פסיכולוגי קיצוני, פגיעות אישית והיעדר הבנה של הגורמים, יכול להוביל להתפשטות מהירה של תופעות פסיכוגניות המוניות, גם ללא גורם פיזיולוגי ישיר, וכיצד התגובה הסביבתית משפיעה על היקף ומשך האירוע.
 */
const TheDancingPlagueOf1518TheMysteryThatBewilderedEurope = () => {
    // משתני מצב למחוונים (סליידרים)
    const [communityStress, setCommunityStress] = useState(50); // 0-100: רמת לחץ בקהילה
    const [psychologicalVulnerability, setPsychologicalVulnerability] = useState(50); // 0-100: פגיעות פסיכולוגית אישית
    const [authorityResponse, setAuthorityResponse] = useState(50); // 0 (מעודד) - 100 (בולמת): תגובת הרשויות

    // משתני מצב לסימולציה
    const totalPopulation = 100; // גודל האוכלוסייה בסימולציה
    const [dancingPopulation, setDancingPopulation] = useState(0); // מספר האנשים ה"רוקדים"
    const [simulationRunning, setSimulationRunning] = useState(false); // האם הסימולציה פעילה

    // הגדרת אוכלוסייה ראשונית בעת טעינת הקומפוננטה
    useEffect(() => {
        // התחלה עם מספר קטן של אנשים "רוקדים"
        setDancingPopulation(Math.floor(totalPopulation * 0.02)); // 2% רוקדים בתחילה
    }, []); // מערך תלויות ריק מבטיח שהאפקט ירוץ רק פעם אחת לאחר הטעינה הראשונית

    // לוגיקת הסימולציה: התפשטות והתאוששות של מגפת הריקודים
    useEffect(() => {
        let intervalId; // משתנה לשמירת ה-ID של ה-setInterval
        if (simulationRunning) {
            // הגדרת אינטרוול לסימולציה
            intervalId = setInterval(() => {
                setDancingPopulation(prevDancing => {
                    // חישוב קצב התפשטות בהתבסס על המחוונים
                    // לחץ גבוה ופגיעות גבוהה = התפשטות מהירה יותר
                    const stressFactor = communityStress / 100;
                    const vulnerabilityFactor = psychologicalVulnerability / 100;
                    // ככל שתגובת הרשויות נמוכה יותר (קרוב ל-0, כלומר מעודדת ריקוד), כך ההתפשטות מהירה יותר
                    const authorityFactor = (100 - authorityResponse) / 100;

                    // קצב ההתפשטות הכולל - נוסחה פשוטה המשלבת את הגורמים
                    const spreadRate = 0.05 * stressFactor + 0.05 * vulnerabilityFactor + 0.05 * authorityFactor;
                    // חישוב מספר ה"רקדנים" החדשים על בסיס האוכלוסייה שאינה רוקדת עדיין
                    const potentialNewDancers = Math.floor((totalPopulation - prevDancing) * spreadRate);

                    let newDancing = prevDancing + potentialNewDancers;

                    // יישום קצב התאוששות/החלמה בהתבסס על תגובת הרשויות
                    // ככל שתגובת הרשויות גבוהה יותר (קרוב ל-100, כלומר בולמת), כך יותר התאוששות
                    const recoveryRate = authorityResponse / 100 * 0.02;
                    // חישוב מספר ה"רקדנים" המתאוששים
                    const potentialRecoveredDancers = Math.floor(prevDancing * recoveryRate);
                    newDancing = newDancing - potentialRecoveredDancers;

                    // הגבלת המספר בין 0 לכלל האוכלוסייה
                    newDancing = Math.max(0, Math.min(totalPopulation, newDancing));

                    // עצירת הסימולציה אם כל האוכלוסייה רוקדת, או אם אף אחד לא רוקד ואין פוטנציאל להתפשטות
                    if (newDancing >= totalPopulation || (newDancing <= 0 && potentialNewDancers <= 0 && prevDancing <= 0)) {
                        setSimulationRunning(false);
                    }

                    return newDancing;
                });
            }, 500); // עדכון מצב הסימולציה כל 500 מילישניות
        }

        // פונקציית ניקוי - מופעלת כאשר הקומפוננטה נעלמת או כאשר התלויות של ה-useEffect משתנות
        // היא מבטיחה שה-setInterval הקודם ינוקה לפני שיוגדר חדש (או שהקומפוננטה תוסר)
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [simulationRunning, communityStress, psychologicalVulnerability, authorityResponse, totalPopulation]); // תלויות: שינוי באחד מהם יפעיל מחדש את ה-Effect

    // פונקציה להפעלת הסימולציה
    const startSimulation = () => {
        setDancingPopulation(Math.floor(totalPopulation * 0.02)); // איפוס למספר רוקדים התחלתי
        setSimulationRunning(true);
    };

    // פונקציה לעצירת הסימולציה
    const stopSimulation = () => {
        setSimulationRunning(false);
    };

    // פונקציה לאיפוס הסימולציה למצב ההתחלתי
    const resetSimulation = () => {
        setSimulationRunning(false); // עצירת הסימולציה
        setDancingPopulation(Math.floor(totalPopulation * 0.02)); // איפוס מספר הרוקדים
        setCommunityStress(50); // איפוס מחוונים לערכי ברירת מחדל
        setPsychologicalVulnerability(50);
        setAuthorityResponse(50);
    };

    // פונקציה לקביעת צבע הנקודה (רוקדת/לא רוקדת)
    const getDancingColor = (index) => {
        // אם האינדקס נמוך ממספר האוכלוסייה הרוקדת, הנקודה "רוקדת"
        return index < dancingPopulation ? 'bg-red-500 animate-pulse' : 'bg-gray-300';
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                מגפת הריקודים של 1518: התעלומה שסחררה את אירופה
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו עיר שלמה שנאחזת בשיגעון בלתי מוסבר: מאות אנשים רוקדים ברחובות ללא הפסקה, חלקם במשך ימים רצופים, עד קריסה ולעיתים אף מוות. זה לא קטע מסרט אימה, אלא אירוע היסטורי מתועד שאירע בשנת 1518 בעיר שטרסבורג. מה גרם לאנשים לרקוד עד כלות, וכיצד תופעה כה מוזרה יכולה להשתלט על קהילה שלמה?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">הדגמה אינטראקטיבית: סימולציית מגפת הריקודים</h3>

                <div className="w-full max-w-xl mb-8">
                    <div className="mb-6">
                        <label htmlFor="communityStress" className="block text-lg font-medium text-gray-700 mb-2">
                            רמת לחץ קהילתי ({communityStress}%):
                            <span className="text-sm text-gray-500 block">מלחמות, רעב, מחלות</span>
                        </label>
                        <input
                            type="range"
                            id="communityStress"
                            min="0"
                            max="100"
                            value={communityStress}
                            onChange={(e) => setCommunityStress(Number(e.target.value))}
                            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="psychologicalVulnerability" className="block text-lg font-medium text-gray-700 mb-2">
                            פגיעות פסיכולוגית ({psychologicalVulnerability}%):
                            <span className="text-sm text-gray-500 block">הנטייה להידבק מפחדים וחרדות של אחרים</span>
                        </label>
                        <input
                            type="range"
                            id="psychologicalVulnerability"
                            min="0"
                            max="100"
                            value={psychologicalVulnerability}
                            onChange={(e) => setPsychologicalVulnerability(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="authorityResponse" className="block text-lg font-medium text-gray-700 mb-2">
                            תגובת הרשויות ({authorityResponse}%):
                            <span className="text-sm text-gray-500 block">0% = מעודד ריקוד (אמונה תפלה), 100% = בולם (מבין את הסיכון)</span>
                        </label>
                        <input
                            type="range"
                            id="authorityResponse"
                            min="0"
                            max="100"
                            value={authorityResponse}
                            onChange={(e) => setAuthorityResponse(Number(e.target.value))}
                            className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mb-8">
                    <button
                        onClick={simulationRunning ? stopSimulation : startSimulation}
                        className={`py-2 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${simulationRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {simulationRunning ? 'עצור סימולציה' : 'התחל סימולציה'}
                    </button>
                    <button
                        onClick={resetSimulation}
                        className="py-2 px-6 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300"
                    >
                        אפס
                    </button>
                </div>

                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-inner mb-6">
                    <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
                        אוכלוסיית העיר: <span className="text-red-500">{dancingPopulation}</span> רוקדים מתוך <span className="text-gray-600">{totalPopulation}</span>
                    </h4>
                    <div className="grid grid-cols-10 gap-1 md:grid-cols-20 md:gap-0.5 max-w-md mx-auto">
                        {[...Array(totalPopulation)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-4 h-4 rounded-full ${getDancingColor(i)} border border-gray-200 transition-all duration-100 ease-in-out`}
                            ></div>
                        ))}
                    </div>
                </div>

                <p className="text-md text-gray-600 text-center max-w-2xl">
                    התאם את המחוונים וצפה כיצד השילוב של לחץ חברתי-פסיכולוגי, פגיעות אישית והיעדר הבנה של הגורמים, יכול להוביל להתפשטות מהירה של תופעות פסיכוגניות המוניות. שים לב כיצד תגובת הרשויות משפיעה על היקף ומשך האירוע.
                </p>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">תיאור האירוע ההיסטורי</h3>
                        <p>
                            'מגפת הריקודים' הייתה אירוע חריג שאירע בעיר שטרסבורג (כיום בצרפת) בקיץ 1518. האירועים החלו ביולי, כאשר אישה בשם פראו טרופאה החלה לרקוד ללא הפסקה ברחוב. תוך מספר ימים הצטרפו אליה עשרות נוספים, ותוך חודש התפשטה התופעה למאות אנשים. הרקדנים רקדו במשך שעות ארוכות, ימים ואף שבועות, ללא שליטה, לעיתים עד כדי תשישות, התמוטטות, התקפי לב, שבץ מוחי ואף מוות. מדובר בתופעה המונית ומתועדת היטב, אך מסיבות שנותרו תעלומה ברובן.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">הקשר היסטורי וחברתי</h3>
                        <p>
                            שטרסבורג ואירופה של המאה ה-16 היו נתונות לתנאים קשים במיוחד. האזור חווה תקופות קשות של רעב, מחלות (כגון אבעבועות שחורות ועגבת), עוני קיצוני ותנאים סניטריים ירודים. בנוסף, החברה הייתה שרויה תחת לחץ דתי כבד ואמונות תפלות נרחבות. אנשים היו פגיעים מאוד רגשית ופסיכולוגית, וכל אירוע חריג נתפס לעיתים קרובות כעונש אלוהי או כמעשה שטן. אווירה זו של מצוקה וחוסר וודאות יצרה כר פורה להתפתחות תופעות חברתיות חריגות.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">הסברים אפשריים לתופעה</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>ארגוטיזם (Ergotism):</strong> תיאוריה רווחת אחת היא שהריקוד נגרם כתוצאה מהרעלה מפטריית הארגוט (Claviceps purpurea), הצומחת על שיפון ודגנים אחרים. הפטרייה מכילה אלקלואידים בעלי השפעות פסיכואקטיביות הדומות ל-LSD, ועלולה לגרום לעוויתות, הזיות, עוויתות וכאבים חזקים, תופעות המכונות "אש אנטוניוס הקדוש".
                                <p className="text-sm text-gray-600 mt-1">
                                    <strong>עדויות תומכות:</strong> הארגוט היה נפוץ באותה תקופה בשל תנאי אחסון לקויים של דגנים.
                                    <strong>עדויות מחלישות:</strong> הריקוד המתמשך אינו סימפטום אופייני לארגוטיזם; לרוב גורם להתכווצויות ולשיתוק, ולא לריקוד אינסופי. כמו כן, לא תמיד דווח על סימפטומים אחרים של הרעלה.
                                </p>
                            </li>
                            <li>
                                <strong>מחלה פסיכוגנית המונית (Mass Psychogenic Illness - MPI):</strong> הסבר פסיכולוגי זה מדגיש את תפקידם של לחץ קיצוני, חרדה, פחד והיעדר הבנה כגורמים להתפשטות תופעות פיזיות (או התנהגותיות) ללא גורם אורגני מובהק. MPI מאופיינת בהתפשטות מהירה בתוך קבוצה סגורה יחסית, כאשר אדם אחד מתחיל לחוות סימפטומים ואחרים "נדבקים" פסיכולוגית מתוך סוגסטביליות חברתית. במקרה זה, הריקוד יכול היה להיות דרך לשחרור מתחים או התנהגות חיקוי שנבעה מחרדה קולקטיבית.
                            </li>
                            <li>
                                <strong>שילוב גורמים:</strong> כיום, מרבית החוקרים נוטים להאמין כי מדובר ככל הנראה בשילוב מורכב של גורמים. ייתכן שגורם פיזיולוגי כלשהו (כמו הרעלה קלה) הווה טריגר ראשוני, אך ההתפשטות וההסלמה ההמונית נבעו בעיקר מלחיץ פסיכולוגי וחברתי עצום, חוסר אונים, פגיעות רגשית קיצונית ואמונות תפלות. התנאים הסביבתיים (רעב, מחלות) יצרו את הרקע, והסוגסטביליות החברתית הובילה להתפשטות דפוס ההתנהגות.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">מאפיינים של MPI</h3>
                        <p>
                            מחלות פסיכוגניות המוניות (MPI) הן תופעות שבהן קבוצת אנשים חווים סימפטומים דומים של מחלה, אך ללא זיהוי גורם פיזיולוגי או רעלן שיכול להסביר את הסימפטומים. מאפיינים עיקריים כוללים:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>היעדר גורם אורגני מובהק:</strong> בדיקות רפואיות אינן מגלות פתולוגיה פיזית אצל הנדבקים.</li>
                            <li><strong>התפשטות מהירה:</strong> התופעה מתפשטת במהירות דרך קשר חברתי, ולא דרך חשיפה פיזית.</li>
                            <li><strong>השפעה על קבוצות מוגדרות:</strong> לרוב משפיעה על קבוצות ספציפיות (למשל, בני נוער, נשים, קבוצות במתח גבוה).</li>
                            <li><strong>מגוון סימפטומים:</strong> יכולה להתבטא בכאבי ראש, סחרחורות, בחילות, התקפי חרדה, ואף התנהגויות חריגות כמו ריקוד בלתי נשלט.</li>
                            <li><strong>קשר למתח וחרדה:</strong> מתרחשת לרוב בתנאי לחץ פסיכולוגי קיצוני או חרדה חברתית.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">התמודדות הרשויות</h3>
                        <p>
                            בתחילה, הרשויות בשטרסבורג לא הבינו את טבעה של התופעה. מתוך אמונה תפלה שהריקוד הוא עונש אלוהי שניתן לרפא רק על ידי ריקוד נוסף, הן דווקא <strong>עודדו</strong> את הרקדנים. הם סיפקו להם חללים לרקוד בהם (כולל אולם הגילדה) ואף שכרו נגנים, בתקווה שהריקוד ישכך את ה"קללה". תגובה זו רק החמירה את המצב והגבירה את הסוגסטביליות ההמונית. רק לאחר שהמצב יצא מכלל שליטה, ואנשים החלו למות מתשישות, שינו הרשויות את גישתן. הם אסרו על הריקוד בפומבי, הקימו בתי חולים לטיפול ברקדנים, ונקטו בצעדים לבלימת התופעה, כולל סגירת מרחבי ציבור ועידוד פעילויות אחרות.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">תובנות עכשוויות</h3>
                        <p>
                            מגפת הריקודים של 1518 היא מקרה מבחן מרתק המלמד אותנו רבות על פסיכולוגיה חברתית, השפעת לחץ קיצוני על האוכלוסייה, והחשיבות של הבנה מדעית אל מול אמונות תפלות. האירוע מדגיש כיצד חוסר וודאות, פחד ולחץ יכולים להתבטא בצורות פיזיות והתנהגותיות חריגות, וכיצד התגובה החברתית והמוסדית (בין אם בעידוד או בבלימה) משפיעה באופן דרמטי על היקף ומשך תופעות כאלה. בעידן המודרני, עם הפצת מידע מהירה (גם כוזב), הבנת מנגנוני MPI רלוונטית מתמיד להבנת תופעות כמו היסטריה המונית או התפשטות פאניקה.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TheDancingPlagueOf1518TheMysteryThatBewilderedEurope;