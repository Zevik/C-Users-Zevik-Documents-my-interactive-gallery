import React, { useState, useEffect, useRef } from 'react';

const LightFromDarknessAJourneyIntoSonoluminescence = () => {
    const [soundIntensity, setSoundIntensity] = useState(50); // עוצמת גל הקול
    const [bubbles, setBubbles] = useState([]); // מערך בועות
    const [selectedBubble, setSelectedBubble] = useState(null); // הבועה שנבחרה
    const [pressureData, setPressureData] = useState([]); // נתוני לחץ
    const [temperatureData, setTemperatureData] = useState([]); // נתוני טמפרטורה
    const [lightIntensity, setLightIntensity] = useState(0); // עוצמת האור הנפלטת
    const [bubbleStage, setBubbleStage] = useState('growing'); // שלב הבועה (גדילה, קריסה)
    const [score, setScore] = useState(0); // ניקוד משחק

    const animationFrameId = useRef(null); // מזהה פריימים לאנימציה

    // אפקט ליצירת בועות בהתאם לעוצמת הקול
    useEffect(() => {
        const generateBubbles = () => {
            const newBubbles = Array.from({ length: Math.floor(soundIntensity / 10) }, (_, i) => ({
                id: i,
                size: 1 + Math.random() * 2, // גודל התחלתי משתנה
                x: Math.random() * 90 + 5, // מיקום אופקי רנדומלי
                y: Math.random() * 80 + 10, // מיקום אנכי רנדומלי
                stage: 'growing', // שלב התחלתי
            }));
            setBubbles(newBubbles);
        };

        generateBubbles(); // יצירת בועות ראשונית
    }, [soundIntensity]);

    // אפקט לטיפול בבועה שנבחרה - גדילה, קריסה, פליטת אור
    useEffect(() => {
        if (selectedBubble !== null) {
            let size = 1;
            let isCollapsing = false;

            const animateBubble = () => {
                if (!isCollapsing) {
                    size += 0.05; // גדילה הדרגתית
                    if (size > 5) {
                        isCollapsing = true;
                        setBubbleStage('collapsing');
                        // רטט קל להדגיש קריסה
                    }
                } else {
                    size -= 0.2; // קריסה מהירה
                    if (size <= 0.1) {
                        size = 0;
                        setLightIntensity(5); // פליטת אור
                        setScore(prevScore => prevScore + 1); // עדכון ניקוד!
                        setTimeout(() => {
                            setLightIntensity(0);
                            setBubbleStage('growing');
                            size = 1;
                            isCollapsing = false;

                            // עדכון נתוני הבועה
                            setBubbles(prevBubbles => {
                                return prevBubbles.map(bubble => {
                                    if (bubble.id === selectedBubble) {
                                        return {
                                            ...bubble,
                                            size: 1,
                                            stage: 'growing'
                                        }
                                    }
                                    return bubble;
                                })
                            })
                        }, 200); // משך הבזק האור
                    }
                }

                // עדכון גודל הבועה
                setBubbles(prevBubbles => {
                    return prevBubbles.map(bubble => {
                        if (bubble.id === selectedBubble) {
                            return {
                                ...bubble,
                                size: size
                            }
                        }
                        return bubble;
                    })
                });

                // הדמיית לחץ וטמפרטורה
                setPressureData(prevData => [...prevData, { time: prevData.length, value: 10 * size }]);
                setTemperatureData(prevData => [...prevData, { time: prevData.length, value: 5 * size }]);

                animationFrameId.current = requestAnimationFrame(animateBubble);
            };

            animationFrameId.current = requestAnimationFrame(animateBubble);
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [selectedBubble]);

    // שינוי עוצמת הקול
    const handleIntensityChange = (e) => {
        setSoundIntensity(parseInt(e.target.value));
        setSelectedBubble(null); // ביטול בחירה בבועה
        setPressureData([]); // איפוס נתוני לחץ
        setTemperatureData([]); // איפוס נתוני טמפרטורה
    };

    // בחירת בועה
    const selectBubble = (id) => {
        setSelectedBubble(id);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300 hover:scale-105" dir="rtl">
            {/* כותרת */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                אור מתוך חושך: מסע אל הסונולומינסנציה
            </h1>
            {/* תיאור קצר */}
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם ידעתם שאפשר ליצור אור בעזרת קול? דמיינו בועה קטנה, קטנה מאוד, שקורסת במהירות עצומה ופולטת הבזק אור חזק. איך זה בכלל אפשרי?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>

                {/* סליידר עוצמת קול */}
                <div className="mb-4 w-full max-w-md">
                    <label htmlFor="soundIntensity" className="block text-gray-700 text-sm font-bold mb-2">עוצמת גל קול:</label>
                    <input
                        type="range"
                        id="soundIntensity"
                        min="0"
                        max="100"
                        value={soundIntensity}
                        onChange={handleIntensityChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                    />
                    <p className="text-center mt-2 text-gray-600">עוצמה: <span className="font-semibold">{soundIntensity}</span></p>
                </div>

                {/* אזור הבועות */}
                <div className="relative w-64 h-40 bg-blue-100 rounded-md overflow-hidden shadow-md transition-all duration-300">
                    {/* הבזק אור */}
                    {lightIntensity > 0 && (
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-yellow-200 opacity-75 animate-ping"
                            style={{ animationDuration: '0.2s' }}
                        ></div>
                    )}
                    {/* הבועות */}
                    {bubbles.map(bubble => (
                        <div
                            key={bubble.id}
                            className={`absolute rounded-full bg-blue-500 cursor-pointer transition-all duration-200 hover:scale-110 ${selectedBubble === bubble.id ? 'ring-2 ring-blue-700' : ''}`}
                            style={{
                                width: bubble.size * 10 + 'px',
                                height: bubble.size * 10 + 'px',
                                left: `calc(${bubble.x}% - ${bubble.size * 5}px)`,
                                top: `calc(${bubble.y}% - ${bubble.size * 5}px)`,
                                opacity: 0.7,
                            }}
                            onClick={() => {
                                selectBubble(bubble.id);
                            }}
                        />
                    ))}
                </div>

                {/* משוב למשתמש */}
                {selectedBubble !== null && (
                    <p className="mt-2 text-sm text-gray-500">הבועה נבחרה. צפו בקריסה!</p>
                )}
                {bubbleStage === 'collapsing' && (
                    <p className="text-red-500 animate-pulse font-bold">קורסת!</p>
                )}

                {/* תצוגת גרפים */}
                <div className="flex flex-col md:flex-row w-full justify-around mt-4">
                    <div className="w-full md:w-1/2 p-4">
                        <h4 className="text-lg font-semibold text-gray-700">גרף לחץ</h4>
                        <LineChart data={pressureData} dataKey="value" color="#8884d8" />
                    </div>

                    <div className="w-full md:w-1/2 p-4">
                        <h4 className="text-lg font-semibold text-gray-700">גרף טמפרטורה</h4>
                        <LineChart data={temperatureData} dataKey="value" color="#82ca9d" />
                    </div>
                </div>
                {/* תצוגת ניקוד */}
                <p className="mt-4 text-xl font-bold text-green-600">ניקוד: {score}</p>
            </section>

            {/* הסבר מדעי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <ol className="list-decimal list-inside">
                    <li className="mb-4">
                        <strong className="text-indigo-700">מהי סונולומינסנציה:</strong> הגדרה ותיאור התופעה. סונולומינסנציה היא תופעה שבה בועות קטנות בנוזל קורסות תחת השפעת גלי קול, ופולטות הבזקי אור קצרים.
                    </li>
                    <li className="mb-4">
                        <strong className="text-indigo-700">גילוי הסונולומינסנציה:</strong> היסטוריה קצרה. התופעה התגלתה לראשונה בשנות ה-30 של המאה ה-20.
                    </li>
                    <li className="mb-4">
                        <strong className="text-indigo-700">היווצרות הבועות:</strong> תהליך הנביעה (cavitation) והשפעת גלי הקול. גלי הקול יוצרים אזורים של לחץ נמוך בנוזל, מה שגורם להיווצרות בועות.
                    </li>
                    <li className="mb-4">
                        <strong className="text-indigo-700">דינמיקת הבועה:</strong> התרחבות, התכווצות וקריסה אדיאבטית. הבועות מתרחבות בהתחלה, ואז קורסות במהירות עצומה בתהליך אדיאבטי.
                    </li>
                    <li className="mb-4">
                        <strong className="text-indigo-700">מנגנון פליטת האור:</strong> תיאוריות שונות (hotspot, radiation). ישנן תיאוריות שונות המסבירות את פליטת האור, כולל יצירת נקודה חמה בתוך הבועה או פליטת קרינה. הטמפרטורה בתוך הבועה יכולה להגיע למיליוני מעלות קלווין.
                    </li>
                    <li className="mb-4">
                        <strong className="text-indigo-700">יישומים אפשריים:</strong> רפואה, כימיה, היתוך גרעיני (תאורטי). לסונולומינסנציה יש יישומים פוטנציאליים בתחומים שונים, כולל רפואה, כימיה ואפילו היתוך גרעיני (בתאוריה). לדוגמא, ניתן להשתמש בסונולומינסנציה לביצוע תגובות כימיות.
                    </li>
                </ol>
            </section>
        </div>
    );
};

// קומפוננטת גרף קווי פשוטה
const LineChart = ({ data, dataKey, color }) => {
    return (
        <svg width="100%" height="200">
            <path
                d={data.map((point, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - point[dataKey] * 5; //Scale value for visualization
                    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
                }).join(' ')}
                stroke={color}
                fill="none"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
            />
        </svg>
    );
};

export default LightFromDarknessAJourneyIntoSonoluminescence;