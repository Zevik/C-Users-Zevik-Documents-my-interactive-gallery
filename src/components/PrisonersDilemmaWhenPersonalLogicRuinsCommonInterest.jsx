import React, { useState } from 'react';

/**
 * PrisonersDilemmaWhenPersonalLogicRuinsCommonInterest Component
 *
 * הסימולציה תציג בפני המשתמש תרחיש פשוט המבוסס על דילמת האסיר, כאשר המשתמש יגלם את 'אסיר א''. עליו להחליט האם 'להתוודות' (לשתף פעולה עם החוקרים ובכך לבגוד בשותפו) או 'לשמור על שתיקה' (לשתף פעולה עם שותפו ולא להפליל אותו). הממשק יהיה נקי ויציג שתי אפשרויות בחירה ברורות. לאחר בחירת המשתמש, תוצג בחירת 'אסיר ב'' (שתהיה אקראית או מבוססת על אסטרטגיה קבועה של בגידה, כדי להמחיש את הדילמה והסיכון). בסיום, יוצג לוח תוצאות המפרט את תקופות המאסר עבור שני האסירים בהתאם לשילוב הבחירות (לדוגמה: שניהם שומרים על שתיקה = שנה לכל אחד; המשתמש מתודה והשותף שומר על שתיקה = המשתמש משוחרר, השותף 10 שנים; שניהם מתודים = 5 שנים לכל אחד). התובנה המרכזית שהמשתמש יפיק היא כיצד הבחירה ה'הגיונית' מנקודת מבט אישית (התוודות כדי למזער סיכון אישי) מובילה במקרים רבים לתוצאה גרועה יותר עבור שני הצדדים מאשר אם שניהם היו משתפים פעולה מלכתחילה. המשתמש יחווה באופן ישיר את הפער בין אופטימום אישי לאופטימום קולקטיבי.
 */
const PrisonersDilemmaWhenPersonalLogicRuinsCommonInterest = () => {
    // משתני מצב (State variables) לניהול הסימולציה
    const [playerAChoice, setPlayerAChoice] = useState(null); // הבחירה של אסיר א' ('confess' או 'silent')
    const [playerBChoice, setPlayerBChoice] = useState(null); // הבחירה של אסיר ב' ('confess' או 'silent')
    const [result, setResult] = useState(null); // תוצאת המאסר עבור שניהם ({ playerA: years, playerB: years })
    const [showResults, setShowResults] = useState(false); // האם להציג את התוצאות או את אפשרויות הבחירה

    // מטריצת התשלומים (Payoff Matrix) - שנות מאסר
    // המפתחות: 'בחירת אסיר א'_בחירת אסיר ב''
    const payoffMatrix = {
        'silent_silent': { playerA: 1, playerB: 1 }, // שניהם שומרים על שתיקה: שנה לכל אחד
        'confess_silent': { playerA: 0, playerB: 10 }, // אסיר א' מתודה, אסיר ב' שותק: א' משוחרר, ב' 10 שנים
        'silent_confess': { playerA: 10, playerB: 0 }, // אסיר א' שותק, אסיר ב' מתודה: א' 10 שנים, ב' משוחרר
        'confess_confess': { playerA: 5, playerB: 5 }, // שניהם מתודים: 5 שנים לכל אחד
    };

    // קביעת בחירת אסיר ב'
    const getPlayerBChoice = () => {
        // כדי להדגיש בצורה חזקה את הדילמה והאסטרטגיה הדומיננטית,
        // אסיר ב' תמיד יתוודה (האסטרטגיה הדומיננטית שלו).
        // לחלופין, עבור תחושה "אקראית" יותר, ניתן להשתמש ב: Math.random() < 0.5 ? 'confess' : 'silent';
        return 'confess';
    };

    // טיפול בבחירת המשתמש (אסיר א')
    const handleChoice = (choiceA) => {
        setPlayerAChoice(choiceA);
        const choiceB = getPlayerBChoice(); // קבלת בחירת אסיר ב'
        setPlayerBChoice(choiceB);

        // חישוב התוצאה בהתבסס על שתי הבחירות
        const outcomeKey = `${choiceA}_${choiceB}`;
        setResult(payoffMatrix[outcomeKey]);
        setShowResults(true); // הצגת התוצאות
    };

    // איפוס הסימולציה למצב התחלתי
    const handleReset = () => {
        setPlayerAChoice(null);
        setPlayerBChoice(null);
        setResult(null);
        setShowResults(false);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                דילמת האסיר: כשהיגיון אישי הורס את האינטרס המשותף
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם אי פעם מצאתם את עצמכם במצב שבו כל אחד פועל בצורה הגיונית לטובתו האישית, אך התוצאה הסופית גרועה באופן מפתיע לכולם? נשמע אבסורדי, אבל זה קורה סביבנו כל הזמן – החל מירידת מחירים בתעשייה ועד להתמודדות עם משברים גלובליים. איך ייתכן שהחלטות רציונליות אינדיבידואליות מובילות לתוצאה קולקטיבית שאיש לא רצה בה?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">הדגמה אינטראקטיבית: דילמת האסיר</h3>
                {!showResults ? (
                    <div className="text-center">
                        <p className="text-lg md:text-xl mb-6 leading-relaxed">
                            אתה, 'אסיר א'', נתפסת יחד עם שותפך לפשע, 'אסיר ב''. אתם מוחזקים בחדרים נפרדים, ואין לכם דרך לתקשר. החוקרים מציעים לכל אחד מכם עסקה:
                        </p>
                        <ul className="text-right text-lg md:text-xl list-disc list-inside mb-8 pr-4">
                            <li><strong className="text-green-700">אם תתוודה ואסיר ב' ישתוק:</strong> אתה משוחרר מיידית, והוא מקבל 10 שנות מאסר.</li>
                            <li><strong className="text-red-700">אם תשמור על שתיקה ואסיר ב' יתוודה:</strong> אתה מקבל 10 שנות מאסר, והוא משוחרר מיידית.</li>
                            <li><strong className="text-yellow-700">אם שניכם תתוודו:</strong> שניכם מקבלים 5 שנות מאסר.</li>
                            <li><strong className="text-blue-700">אם שניכם תשמרו על שתיקה:</strong> שניכם מקבלים שנה אחת בלבד.</li>
                        </ul>
                        <p className="text-xl font-semibold mb-8 text-gray-700">
                            מה תבחר לעשות, אסיר א'?
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={() => handleChoice('confess')}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                            >
                                להתוודות (לבגוד בשותף)
                            </button>
                            <button
                                onClick={() => handleChoice('silent')}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                            >
                                לשמור על שתיקה (לשתף פעולה)
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center w-full max-w-md">
                        <h4 className="text-2xl font-bold mb-4 text-indigo-800">התוצאות:</h4>
                        <div className="bg-indigo-50 p-6 rounded-xl shadow-inner mb-6 border border-indigo-200">
                            <p className="text-lg mb-2"><strong className="text-violet-700">הבחירה שלך (אסיר א'):</strong> <span className="font-semibold">{playerAChoice === 'confess' ? 'התוודית' : 'שמרת על שתיקה'}</span></p>
                            <p className="text-lg mb-4"><strong className="text-violet-700">בחירת אסיר ב':</strong> <span className="font-semibold">{playerBChoice === 'confess' ? 'התוודה' : 'שמר על שתיקה'}</span></p>
                            {result && (
                                <>
                                    <p className="text-xl font-bold text-gray-800 mb-2">
                                        <span className="text-purple-600">שנות מאסר לאסיר א' (אתה):</span> <span className="text-4xl font-extrabold text-red-600">{result.playerA}</span> שנים
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                        <span className="text-purple-600">שנות מאסר לאסיר ב':</span> <span className="text-4xl font-extrabold text-red-600">{result.playerB}</span> שנים
                                    </p>
                                </>
                            )}
                        </div>
                        <p className="text-lg italic text-gray-700 mb-6">
                            הבחירה ה"הגיונית" עבור כל שחקן באופן אינדיבידואלי היא להתוודות, שכן היא ממזערת את העונש האישי במקרה הגרוע ביותר (בטחון של 0 שנים אם השני שותק, או 5 שנים במקום 10 אם גם השני מתודה). אולם, כאשר שני הצדדים פועלים באופן זה, התוצאה הקולקטיבית (5 שנים לכל אחד) גרועה יותר מאשר אם שניהם היו משתפים פעולה ושומרים על שתיקה (שנה אחת לכל אחד). זוהי הדילמה!
                        </p>
                        <button
                            onClick={handleReset}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                        >
                            שחק שוב
                        </button>
                    </div>
                )}
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                        <strong>הצגת תורת המשחקים:</strong> ענף בכלכלה ובמתמטיקה העוסק בחקר קבלת החלטות אסטרטגיות במצבי אינטראקציה בין גורמים רציונליים. תורת המשחקים מספקת כלים לניתוח מצבים שבהם התוצאה של בחירה מסוימת תלויה בבחירות של שחקנים אחרים.
                    </p>
                    <p>
                        <strong>הגדרה של דילמת האסיר:</strong> משחק קלאסי בתורת המשחקים המדגים מצב שבו החלטות רציונליות אינדיבידואליות מובילות לתוצאה לא אופטימלית קולקטיבית. המשחק מציג שני שחקנים, שבחירותיהם משפיעות זו על זו, למרות שאינם יכולים לתקשר.
                    </p>
                    <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-700">מטריצת התשלומים (Payoff Matrix) של דילמת האסיר:</h3>
                    <p>
                        מטריצת התשלומים מציגה את התוצאות (במקרה שלנו, שנות מאסר) עבור כל שילוב אפשרי של בחירות מצד שני האסירים:
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-blue-50 border border-blue-200 rounded-lg shadow-md text-center">
                            <thead>
                                <tr className="bg-blue-200 text-blue-800">
                                    <th className="py-3 px-4 border-b border-blue-200"></th>
                                    <th className="py-3 px-4 border-b border-blue-200">אסיר ב': שומר על שתיקה</th>
                                    <th className="py-3 px-4 border-b border-blue-200">אסיר ב': מתודה</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-blue-100">
                                    <td className="py-3 px-4 border-b border-blue-200 font-semibold">אסיר א': שומר על שתיקה</td>
                                    <td className="py-3 px-4 border-b border-blue-200">א: שנה, ב: שנה</td>
                                    <td className="py-3 px-4 border-b border-blue-200">א: 10 שנים, ב: 0 שנים</td>
                                </tr>
                                <tr className="hover:bg-blue-100">
                                    <td className="py-3 px-4 border-b border-blue-200 font-semibold">אסיר א': מתודה</td>
                                    <td className="py-3 px-4 border-b border-blue-200">א: 0 שנים, ב: 10 שנים</td>
                                    <td className="py-3 px-4 border-b border-blue-200">א: 5 שנים, ב: 5 שנים</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>הסבר על אסטרטגיה דומיננטית (Dominant Strategy):</strong> זוהי אסטרטגיה שהיא הטובה ביותר עבור שחקן מסוים, ללא קשר למה שהשחקן האחר בוחר לעשות. בדילמת האסיר, עבור כל אחד מהאסירים, אסטרטגיית <strong>'התוודות' (בגידה)</strong> היא האסטרטגיה הדומיננטית:
                    </p>
                    <ul className="list-disc list-inside pr-4 space-y-2">
                        <li>אם אסיר ב' שומר על שתיקה, לאסיר א' עדיף להתוודות (0 שנות מאסר לעומת שנה).</li>
                        <li>אם אסיר ב' מתודה, לאסיר א' עדיף גם להתוודות (5 שנות מאסר לעומת 10 שנים).</li>
                        <li>מכיוון שהתוודות עדיפה בכל מקרה, זו האסטרטגיה הדומיננטית עבור כל שחקן.</li>
                    </ul>

                    <p>
                        <strong>הסבר על שיווי משקל נאש (Nash Equilibrium):</strong> נקודה שבה אף שחקן לא ירוויח משינוי חד-צדדי של האסטרטגיה שלו, בהינתן בחירת היריב. במילים אחרות, ברגע שמגיעים לשיווי משקל נאש, אין לשום שחקן תמריץ לשנות את בחירתו אם השחקן השני שומר על בחירתו. בדילמת האסיר, שיווי משקל נאש מתרחש כאשר <strong>שני האסירים מתודים</strong> (כל אחד מקבל 5 שנות מאסר). אף אחד מהם לא יכול לשפר את מצבו על ידי שינוי בחירה לבד.
                    </p>

                    <p>
                        <strong>השוואה בין שיווי משקל נאש לבין יעילות פארטו (Pareto Efficiency):</strong>
                        <ul className="list-disc list-inside pr-4 space-y-2">
                            <li><strong>יעילות פארטו:</strong> מצב שבו לא ניתן לשפר את מצבו של אדם אחד מבלי לפגוע במצבו של אדם אחר.</li>
                            <li>בדילמת האסיר, התוצאה של "שניהם שומרים על שתיקה" (שנה אחת לכל אחד) היא <strong className="text-green-700">יעילה פארטו</strong>, שכן אי אפשר להוריד את עונשו של אחד מבלי להעלות את עונשו של האחר.</li>
                            <li>לעומת זאת, שיווי משקל נאש של "שניהם מתודים" (5 שנים לכל אחד) <strong className="text-red-700">אינו יעיל פארטו</strong>, מכיוון שניתן לשפר את מצבם של שניהם (לשנה במקום 5) אם רק ישנו את בחירתם יחד ל"שתיקה". זהו הפער המרכזי שממחיש את הדילמה: היגיון אישי מוביל לתוצאה קולקטיבית שאינה אופטימלית.</li>
                        </ul>
                    </p>

                    <p>
                        <strong>דוגמאות מודרניות ויומיומיות מהעולם האמיתי הממחישות את דילמת האסיר:</strong>
                        דילמת האסיר אינה רק מושג תיאורטי, אלא באה לידי ביטוי במגוון רחב של תרחישים אמיתיים בחיינו:
                    </p>
                    <ul className="list-disc list-inside pr-4 space-y-2">
                        <li><strong>מרוץ חימוש:</strong> כל מדינה בוחרת להגדיל את כוחה הצבאי כדי להגן על עצמה, מתוך חשש שהמדינות האחרות יעשו זאת. התוצאה היא מירוץ יקר ומסוכן שמאיים על כולן, למרות שאף מדינה לא באמת רוצה בו.</li>
                        <li><strong>משברי אקלים וזיהום:</strong> כל מדינה או חברה מעדיפה לזהם כדי למקסם רווחים כלכליים, מכיוון שאם תפסיק לזהם לבדה - תיפגע כלכלית. אך התוצאה היא אסון אקולוגי גלובלי המשפיע על כולם.</li>
                        <li><strong>תחרות בין חברות (למשל, פרסום יתר):</strong> חברות משקיעות הון עתק בפרסום כדי לצבור יתרון תחרותי. אם חברה אחת תפסיק לפרסם, היא תפסיד נתח שוק. התוצאה היא בזבוז משאבים רב על פרסום שלא באמת מגדיל את השוק הכולל.</li>
                        <li><strong>בעיית החופשיות (Free Rider Problem) במיזמים קבוצתיים:</strong> כאשר בקבוצה גדולה, לכל פרט יש תמריץ לא לתרום למאמץ המשותף ולסמוך על תרומתם של אחרים. אם רבים יפעלו כך, המיזם כולו יכשל, למרות שהיה אינטרס משותף בהצלחתו.</li>
                    </ul>

                    <p>
                        <strong>דרכים ואסטרטגיות להתמודד עם הדילמה ולשפר את שיתוף הפעולה:</strong>
                        כדי להתגבר על הנטייה האנוכית ולעודד שיתוף פעולה, ישנם מספר מנגנונים:
                    </p>
                    <ul className="list-disc list-inside pr-4 space-y-2">
                        <li><strong>חזרתיות המשחק (Repeated Games):</strong> כאשר השחקנים יודעים שהם ישחקו אחד עם השני שוב ושוב, נוצר תמריץ לשתף פעולה כדי לבנות מוניטין, לנקום בבוגדים, ולזכות בתועלות עתידיות משיתוף פעולה מתמשך.</li>
                        <li><strong>אמון הדדי:</strong> במערכות יחסים ארוכות טווח, יצירת אמון בין הצדדים יכולה להוביל לשיתוף פעולה גם ללא אכיפה חיצונית, מתוך הבנה שהצד השני יפעל בהגינות.</li>
                        <li><strong>הסכמים וחוזים:</strong> יצירת הסכמים מחייבים המגדירים את כללי המשחק ואת ההשלכות של הפרתם. הסכמים אלו, יחד עם מערכת משפטית, משנים את מבנה התשלומים ומעודדים שיתוף פעולה.</li>
                        <li><strong>רגולציה ואכיפה:</strong> גורם חיצוני (כמו ממשלה או ארגון בינלאומי) קובע כללים ואוכף אותם (למשל, באמצעות קנסות או עונשים), ובכך משנה את התמריצים ומעודד שיתוף פעולה גם כאשר התמריץ האישי נוטה לבגידה.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default PrisonersDilemmaWhenPersonalLogicRuinsCommonInterest;