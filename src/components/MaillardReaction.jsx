import React, { useState, useEffect } from 'react';

/**
 * MaillardReaction Component
 *
 * המשתמש יראה הדמיה של תגובת מייאר ברמה המולקולרית. הוא יוכל לשלוט בפרמטרים כמו טמפרטורה, סוג חומצת האמינו, וסוג הסוכר. שינוי הפרמטרים ישפיע על קצב התגובה (גרף בזמן אמת) ועל כמות התרכובות הארומטיות שנוצרות (אינדיקטור ויזואלי). מטרת הסימולציה היא להמחיש את התלות של תגובת מייאר בתנאים שונים ואת ההשפעה שלהם על הטעם והצבע הסופי של המזון.
 */
const MaillardReaction = () => {
    // משתני state לטמפרטורה, חומצת אמינו, סוכר, קצב תגובה ותרכובות ארומטיות
    const [temperature, setTemperature] = useState(100);
    const [aminoAcid, setAminoAcid] = useState('Glycine');
    const [sugar, setSugar] = useState('Glucose');
    const [reactionRate, setReactionRate] = useState(0);
    const [aromaticCompounds, setAromaticCompounds] = useState(0);
    const [compoundColor, setCompoundColor] = useState('bg-yellow-100'); // צבע משתנה לתרכובות ארומטיות

    // useEffect hook המדמה את קצב התגובה והיווצרות תרכובות ארומטיות בהתאם לפרמטרים
    useEffect(() => {
        // הדמיית קצב תגובה מבוססת על פרמטרים (מודל פשוט)
        let rate = temperature * 0.1;
        if (aminoAcid === 'Glycine') rate *= 0.8;
        if (sugar === 'Fructose') rate *= 1.2;

        setReactionRate(rate);

        // הדמיית היווצרות תרכובות ארומטיות (מודל פשוט)
        let compounds = rate * 0.05;
        setAromaticCompounds(compounds);

        // שינוי צבע בהתאם לכמות התרכובות (חלק חווייתי)
        if (compounds > 5) {
            setCompoundColor('bg-yellow-500');
        } else if (compounds > 2) {
            setCompoundColor('bg-yellow-300');
        } else {
            setCompoundColor('bg-yellow-100');
        }

    }, [temperature, aminoAcid, sugar]);

    // פונקציות event handler לעדכון ה-state כאשר המשתמש משנה את הפרמטרים
    const handleTemperatureChange = (e) => {
        setTemperature(parseInt(e.target.value));
    };

    const handleAminoAcidChange = (e) => {
        setAminoAcid(e.target.value);
    };

    const handleSugarChange = (e) => {
        setSugar(e.target.value);
    };


    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-amber-50 to-orange-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-colors duration-300" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-orange-700 leading-tight animate-pulse">
                קסם הזהוב: תגובת מייאר
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-orange-500 text-center mb-10 max-w-3xl mx-auto">
                תפוחי אדמה מטוגנים זהובים ופריכים, סטייק צרוב ועסיסי - מה משותף להם? האם ידעת שמאחורי הצבע, הטעם והריח המענגים מסתתר תהליך כימי מורכב?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
                {/* TODO: בנה כאן את האינטראקציה המרכזית על פי קונספט האפליקציה. */}
                <h3 className="text-2xl font-bold text-orange-700 mb-4 animate-bounce">הדגמה אינטראקטיבית</h3>
                <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="temperature" className="block text-gray-700 text-sm font-bold mb-2">טמפרטורה (°C):</label>
                    <input
                        type="number"
                        id="temperature"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-200 hover:shadow-md"
                        value={temperature}
                        onChange={handleTemperatureChange}
                    />
                </div>
                <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="aminoAcid" className="block text-gray-700 text-sm font-bold mb-2">חומצת אמינו:</label>
                    <select
                        id="aminoAcid"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-200 hover:shadow-md"
                        value={aminoAcid}
                        onChange={handleAminoAcidChange}
                    >
                        <option>Glycine</option>
                        <option>Alanine</option>
                        <option>Proline</option>
                    </select>
                </div>
                <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="sugar" className="block text-gray-700 text-sm font-bold mb-2">סוכר:</label>
                    <select
                        id="sugar"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-200 hover:shadow-md"
                        value={sugar}
                        onChange={handleSugarChange}
                    >
                        <option>Glucose</option>
                        <option>Fructose</option>
                        <option>Sucrose</option>
                    </select>
                </div>

                <div className="mb-4 text-center">
                    <p className="text-gray-700 font-semibold">קצב תגובה: <span className="text-blue-500">{reactionRate.toFixed(2)}</span></p>
                    {/* TODO: Add graph component here (e.g., using Chart.js or similar) */}
                    <p className="text-gray-700 font-semibold">תרכובות ארומטיות: <span className="text-green-500">{aromaticCompounds.toFixed(2)}</span></p>
                    {/* מדד ויזואלי לתרכובות ארומטיות - משתנה צבע */}
                    <div className={`w-24 h-6 rounded-full ${compoundColor} transition-colors duration-500 mx-auto`}></div>
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-orange-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-orange-800 text-center animate-pulse">
                    ההסבר המדעי
                </h2>
                {/* TODO: כתוב כאן את ההסבר המפורט על סמך ראשי הפרקים. השתמש בתגיות p, ul, li, strong וכו'. */}
                <h3 className="text-xl font-semibold mb-2 text-orange-700">מהי תגובת מייאר: הגדרה פשוטה והיסטוריה</h3>
                <p>תגובת מייאר היא תגובה כימית בין חומצת אמינו וסוכר מחזר, בדרך כלל דורשת חום. התגובה אחראית לצבע החום והטעם המיוחד של מזונות רבים כגון לחם, בשר צלוי וקפה. התגלה לראשונה על ידי הכימאי הצרפתי לואי-קמיל מייאר בתחילת המאה ה-20.</p>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-700">המגיבים העיקריים: חומצות אמינו וסוכרים מחזרים</h3>
                <p>חומצות אמינו הן אבני הבניין של חלבונים, וסוכרים מחזרים הם סוכרים שיכולים לתרום אלקטרונים בתגובות כימיות. דוגמאות לסוכרים מחזרים כוללות גלוקוז, פרוקטוז ולקטוז.</p>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-700">שלבי התגובה: הסבר מפורט על השלבים העיקריים בתגובה</h3>
                <ol className="list-decimal pl-5">
                    <li><strong>תחילת התגובה:</strong> הסוכר המחזר מגיב עם קבוצת האמין של חומצת האמינו ליצירת בסיס שיף.</li>
                    <li><strong>ארגון מחדש של אמאדורי:</strong> בסיס השיף עובר ארגון מחדש ליצירת קטוסאמין.</li>
                    <li><strong>פירוק ופילמור:</strong> הקטוסאמין עובר פירוק ופילמור, היוצר מגוון רחב של תרכובות, כולל אלדהידים, קטונים והטרוציקלים המכילים חנקן.</li>
                </ol>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-700">גורמים המשפיעים על קצב התגובה: טמפרטורה, pH, סוג חומצת האמינו, סוג הסוכר, נוכחות מים</h3>
                <ul className="list-disc pl-5">
                    <li><strong>טמפרטורה:</strong> תגובת מייאר מואצת על ידי טמפרטורות גבוהות יותר.</li>
                    <li><strong>pH:</strong> התגובה יעילה יותר בתנאים בסיסיים (pH גבוה).</li>
                    <li><strong>סוג חומצת האמינו:</strong> חומצות אמינו שונות מגיבות בקצבים שונים.</li>
                    <li><strong>סוג הסוכר:</strong> סוכרים מחזרים שונים מגיבים בקצבים שונים.</li>
                    <li><strong>נוכחות מים:</strong> כמות קטנה של מים נחוצה, אך יותר מדי מים יכולים להאט את התגובה.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-700">התרכובות הארומטיות הנוצרות: הסבר על התרכובות העיקריות ותרומתן לטעם ולריח</h3>
                <p>תגובת מייאר מייצרת מאות תרכובות ארומטיות שונות, ביניהן:</p>
                <ul className="list-disc pl-5">
                    <li><strong>פוראנים:</strong> תורמים לטעמים קרמליים ומתוקים.</li>
                    <li><strong>תיאזולים:</strong> תורמים לטעמי אגוזים ובשרניים.</li>
                    <li><strong>פיראזינים:</strong> תורמים לטעמים קלויים ואדמתיים.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-700">יישומים בתעשיית המזון: דוגמאות לשימוש בתגובת מייאר בתעשיית המזון (אפייה, טיגון, צלייה)</h3>
                <p>תגובת מייאר משמשת במגוון רחב של יישומים בתעשיית המזון, כולל:</p>
                <ul className="list-disc pl-5">
                    <li><strong>אפייה:</strong> יצירת קרום זהוב וחום על לחם ומאפים.</li>
                    <li><strong>טיגון:</strong> יצירת צבע וטעם אופייניים למאכלים מטוגנים.</li>
                    <li><strong>צלייה:</strong> יצירת טעם בשרני וצבע חום על בשר.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-700">סיכונים בריאותיים פוטנציאליים: דיון קצר על אקרילאמיד וחומרים מזיקים אחרים שעלולים להיווצר בתנאים מסוימים</h3>
                <p>תגובת מייאר עלולה ליצור גם חומרים מזיקים כמו אקרילאמיד, חומר מסרטן פוטנציאלי. היווצרות אקרילאמיד מוגברת בטמפרטורות גבוהות ובנוכחות אספרגין (חומצת אמינו). אמצעי זהירות, כגון שליטה בטמפרטורת הבישול והפחתת חשיפה יתר לחום, יכולים לסייע בהפחתת הסיכון.</p>
            </section>
        </div>
    );
};

export default MaillardReaction;