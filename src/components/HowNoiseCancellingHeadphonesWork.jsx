import React, { useState, useEffect, useRef } from 'react';

/**
 * HowNoiseCancellingHeadphonesWork Component
 *
 * הסימולציה מציגה גל קול המייצג רעש חיצוני (למשל, צפירה או שיחת רקע). המשתמש יכול לשלוט על פרמטרים של גל קול שני – האמפליטודה והפאזה. המטרה היא להתאים את הגל השני כך שיבטל את הגל הראשון (התאבכות הורסת). גרף בזמן אמת יציג את סכום שני הגלים. כשהמשתמש מצליח לבטל את הרעש, הגרף הופך לקו ישר, ומוצגת הודעה: 'הרעש בוטל!'. התובנה היא שניתן לבטל גל קול על ידי יצירת גל קול זהה לחלוטין אך בפאזה הפוכה.
 */
const HowNoiseCancellingHeadphonesWork = () => {
    // משתני מצב (state) עבור אמפליטודה, פאזה, מצב ביטול רעש ונתוני הגל המשולב.
    const [amplitude, setAmplitude] = useState(1);
    const [phase, setPhase] = useState(0);
    const [noiseCancelled, setNoiseCancelled] = useState(false);
    const [summedWave, setSummedWave] = useState([]);
    const [wave1Data, setWave1Data] = useState([]);
    const [wave2Data, setWave2Data] = useState([]);

    // useRef עבור גישה ישירה ל-DOM של הגרף (לשיפור ביצועים)
    const chartRef = useRef(null);

    useEffect(() => {
        // סימולציה של גלי הקול והאינטראקציה ביניהם.
        const calculateSummedWave = () => {
            const wave1 = Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1)); // גל הרעש
            const wave2 = Array.from({ length: 100 }, (_, i) => amplitude * Math.sin(i * 0.1 + phase)); // גל ביטול הרעש
            const sum = wave1.map((val, index) => val + wave2[index]);

            // בדיקה האם הרעש בוטל (הסכום קרוב לאפס).
            const isCancelled = sum.every(val => Math.abs(val) < 0.05); // סף קטן יותר לדיוק רב יותר
            setNoiseCancelled(isCancelled);
            setSummedWave(sum);
            setWave1Data(wave1);
            setWave2Data(wave2);
        };

        calculateSummedWave();
    }, [amplitude, phase]);

    // אפקט עבור עדכון הגרף (באמצעות Canvas)
    useEffect(() => {
        if (!chartRef.current) return;

        const canvas = chartRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        const scaleX = width / summedWave.length;
        const scaleY = 50; // גורם מִדְרוּג עבור האמפליטודה

        // ניקוי הקנבס
        ctx.clearRect(0, 0, width, height);

        // ציור גל הרעש (wave1) - קו אפור דק
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)'; // אפור בהיר ושקוף
        wave1Data.forEach((value, index) => {
            const x = index * scaleX;
            const y = centerY - value * scaleY;
            index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        // ציור גל ביטול הרעש (wave2) - קו כחול דק
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 100, 255, 0.3)'; // כחול בהיר ושקוף
        wave2Data.forEach((value, index) => {
            const x = index * scaleX;
            const y = centerY - value * scaleY;
            index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();


        // ציור הגל המשולב - קו ירוק עבה יותר
        ctx.beginPath();
        ctx.strokeStyle = noiseCancelled ? 'green' : 'red'; // ירוק אם הרעש בוטל, אחרת אדום
        ctx.lineWidth = 2; // עובי הקו
        summedWave.forEach((value, index) => {
            const x = index * scaleX;
            const y = centerY - value * scaleY;
            index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        // אינדיקטור ויזואלי למצב ביטול הרעש
        if (noiseCancelled) {
            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'green';
            ctx.textAlign = 'center';
            ctx.fillText('הרעש בוטל!', width / 2, 30);
        }

    }, [summedWave, noiseCancelled, wave1Data, wave2Data]);

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                שקט! איך אוזניות מבטלות רעשים עובדות?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                דמיינו שאתם יושבים בבית קפה רועש, אבל ברגע אחד – השקט משתרר. איך אוזניות יכולות לבטל רעשים כאילו בלחיצת כפתור? התשובה טמונה בעולם המופלא של גלי קול והתאבכות הורסת.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="amplitude" className="block text-gray-700 text-sm font-bold mb-2">אמפליטודה:</label>
                    <input
                        type="range"
                        id="amplitude"
                        min="0"
                        max="2"
                        step="0.01"
                        value={amplitude}
                        onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">ערך נוכחי: <span className="font-semibold">{amplitude.toFixed(2)}</span></p>
                </div>
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="phase" className="block text-gray-700 text-sm font-bold mb-2">פאזה:</label>
                    <input
                        type="range"
                        id="phase"
                        min="-3.14"
                        max="3.14"
                        step="0.01"
                        value={phase}
                        onChange={(e) => setPhase(parseFloat(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">ערך נוכחי: <span className="font-semibold">{phase.toFixed(2)}</span></p>
                </div>

                <div className="wave-graph w-full max-w-2xl">
                    <canvas ref={chartRef} width={600} height={200} className="border border-gray-300 rounded-md shadow-md"></canvas>
                </div>

                {noiseCancelled && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md shadow-inner animate-pulse">
                        <p className="font-bold text-center">הרעש בוטל!</p>
                    </div>
                )}
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p><strong>מהו גל קול?</strong> גל קול הוא הפרעה שמתפשטת דרך תווך (כגון אוויר), הנושאת אנרגיה. הגל מאופיין בתדירות (גובה הצליל) ובאמפליטודה (עוצמת הצליל).</p>
                <p><strong>התאבכות בונה והתאבכות הורסת:</strong> התאבכות מתרחשת כאשר שני גלים או יותר נפגשים. התאבכות בונה מתרחשת כאשר גלים נפגשים בפאזה זהה, ומגבירים זה את זה. התאבכות הורסת מתרחשת כאשר גלים נפגשים בפאזה הפוכה, ומבטלים זה את זה.</p>
                <p><strong>איך אוזניות מבטלות רעשים מודדות את הרעש הסביבתי?</strong> אוזניות מבטלות רעשים משתמשות במיקרופונים קטנים כדי לזהות את הרעש הסביבתי.</p>
                <p><strong>יצירת גל קול הפוך באמצעות מיקרופון ומעבד אותות (DSP):</strong> המיקרופון קולט את הרעש, והמעבד (DSP) יוצר גל קול זהה אך בפאזה הפוכה (היפוך של 180 מעלות).</p>
                <p><strong>מגבלות של טכנולוגיית ביטול רעשים:</strong> ביטול רעשים יעיל יותר ברעשים קבועים (כמו רעש מנוע של מטוס) ופחות יעיל ברעשים פתאומיים או מורכבים (כמו דיבור).</p>
                <p><strong>שימושים נוספים של התאבכות הורסת:</strong> התאבכות הורסת משמשת גם בטכנולוגיות נוספות, כמו ביטול רעידות במכונות תעשייתיות ובבניינים.</p>
            </section>
        </div>
    );
};

export default HowNoiseCancellingHeadphonesWork;