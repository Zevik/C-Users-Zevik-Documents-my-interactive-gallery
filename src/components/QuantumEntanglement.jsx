import React, { useState, useEffect, useRef } from 'react';

/**
 * QuantumEntanglement Component
 *
 * המשתמש יראה הדמיה של שני חלקיקים (עיגולים) המחוברים בקו דק. לכל חלקיק יש ספין, המוצג על ידי חץ קטן בתוך העיגול. המשתמש יכול ללחוץ על אחד החלקיקים כדי לשנות את כיוון הספין שלו (למעלה או למטה). ברגע שהמשתמש משנה את הספין של חלקיק אחד, הספין של החלקיק השני משתנה באופן מיידי לכיוון ההפוך, לא משנה המרחק ביניהם (המשתמש יכול לגרור את החלקיקים כדי להגדיל את המרחק). המטרה היא שהמשתמש יראה באופן ויזואלי את הקשר המיידי והמסתורי בין החלקיקים, ויבין שהמצב של חלקיק אחד משפיע ישירות על מצבו של השני, ללא תלות במרחק.
 */
const QuantumEntanglement = () => {
    const [particle1Spin, setParticle1Spin] = useState('up');
    const [particle2Spin, setParticle2Spin] = useState('down'); // Initial opposite spin
    const [particle1Position, setParticle1Position] = useState({ x: 100, y: 100 }); // מיקום התחלתי
    const [particle2Position, setParticle2Position] = useState({ x: 300, y: 100 }); // מיקום התחלתי
    const [isDragging, setIsDragging] = useState(null); // מצב גרירה
    const lineRef = useRef(null); // Ref לקו המחבר
    const [score, setScore] = useState(0); // ניקוד
    const [showScoreAnimation, setShowScoreAnimation] = useState(false);

    // פונקציה לעדכון הניקוד עם אנימציה
    const updateScore = (points) => {
        setScore(prevScore => prevScore + points);
        setShowScoreAnimation(true);
        setTimeout(() => setShowScoreAnimation(false), 500); // הסתרת האנימציה אחרי חצי שנייה
    };


    // פונקציה לשינוי הספין של חלקיק
    const toggleSpin = (particle) => {
        if (particle === 1) {
            setParticle1Spin(particle1Spin === 'up' ? 'down' : 'up');
            updateScore(10); // תוספת ניקוד בכל לחיצה
        }
    };

    // useEffect לעדכון הספין של חלקיק 2 בהתאם לחלקיק 1
    useEffect(() => {
        setParticle2Spin(particle1Spin === 'up' ? 'down' : 'up');
    }, [particle1Spin]);

    // פונקציה לעדכון מיקום החלקיקים כאשר משנים את מצבם
    useEffect(() => {
        updateLinePosition(); // קריאה ראשונית לעדכון מיקום הקו
    }, [particle1Position, particle2Position]);

    // פונקציות לגרירה
    const handleMouseDown = (particle) => (e) => {
        e.preventDefault();
        setIsDragging(particle);
    };

    const handleMouseMove = (e) => {
        if (isDragging === 1) {
            setParticle1Position({ x: e.clientX - 25, y: e.clientY - 25 }); // שמירה על מרכז העיגול במקום העכבר
        } else if (isDragging === 2) {
            setParticle2Position({ x: e.clientX - 25, y: e.clientY - 25 }); // שמירה על מרכז העיגול במקום העכבר
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
    };

    // useEffect להוספה והסרה של event listeners לגרירה
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // פונקציה לעדכון מיקום הקו
    const updateLinePosition = () => {
        if (lineRef.current) {
            const x1 = particle1Position.x + 25; // מרכז החלקיק
            const y1 = particle1Position.y + 25; // מרכז החלקיק
            const x2 = particle2Position.x + 25; // מרכז החלקיק
            const y2 = particle2Position.y + 25; // מרכז החלקיק

            lineRef.current.setAttribute('x1', x1.toString());
            lineRef.current.setAttribute('y1', y1.toString());
            lineRef.current.setAttribute('x2', x2.toString());
            lineRef.current.setAttribute('y2', y2.toString());
        }
    };


    // סגנונות עבור החלקיקים והחצים
    const particleStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '3px solid #3b82f6', // כחול יותר עמוק
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'absolute',
        transition: 'border-color 0.3s ease', // מעבר צבע חלק
    };

    const arrowStyle = (direction) => ({
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: `20px solid ${direction === 'up' ? '#3b82f6' : '#dc2626'}`, // כחול ואדום יותר עמוקים
        transform: direction === 'down' ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'border-bottom-color 0.3s ease, transform 0.3s ease', // מעבר חלק בסיבוב ובצבע
    });

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl relative overflow-hidden" dir="rtl">
            {/* כותרת */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                היגלוּת קוונטית: קשר מסתורי בין חלקיקים
            </h1>
            {/* תיאור */}
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם שני חלקיקים יכולים להיות קשורים זה לזה באופן מיידי, גם אם הם נמצאים בקצוות מנוגדים של היקום? דמיינו שאתם משנים תכונה של חלקיק אחד, והשני משתנה בו-זמנית, ללא קשר למרחק ביניהם. האם זה אפשרי?
            </p>

            {/* מד ניקוד */}
            <div className={`absolute top-4 left-4 bg-green-200 text-green-800 py-2 px-4 rounded-full font-semibold shadow-md transition-all duration-300 ${showScoreAnimation ? 'scale-110' : 'scale-100'}`}>
                ניקוד: {score}
            </div>

            {/* האינטראקציה הראשית */}
            <section className="relative flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                {/* כותרת האינטראקציה */}
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 animate-bounce">הדגמה אינטראקטיבית</h3>
                <p className="mb-4 text-center">גררו את החלקיקים, לחצו עליהם כדי לשנות את כיוון הספין שלהם. <br/>שימו לב לקשר המיידי!</p>

                {/* אזור החלקיקים */}
                <div className="relative w-full h-64 flex items-center justify-center">
                    {/* קו שמחבר בין החלקיקים */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <line ref={lineRef} x1="0" y1="0" x2="0" y2="0" stroke="#a3a3a3" strokeWidth="2" />
                    </svg>

                    {/* חלקיק 1 */}
                    <div
                        style={{ ...particleStyle, left: particle1Position.x, top: particle1Position.y }}
                        onMouseDown={handleMouseDown(1)}
                        className="transition-all duration-300 hover:border-indigo-500 active:scale-95 z-10"
                        onClick={() => toggleSpin(1)}
                        title="לחץ לשינוי ספין"
                    >
                        <div style={arrowStyle(particle1Spin)} className="animate-pulse"></div>
                    </div>

                    {/* חלקיק 2 */}
                    <div
                        style={{ ...particleStyle, left: particle2Position.x, top: particle2Position.y }}
                        onMouseDown={handleMouseDown(2)}
                        className="transition-all duration-300 hover:border-indigo-500 active:scale-95 z-10"
                        title="הספין תלוי בחלקיק הראשון!"
                    >
                        <div style={arrowStyle(particle2Spin)} className="animate-pulse"></div>
                    </div>
                </div>

            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800" dir="rtl">
                {/* כותרת ההסבר */}
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p>
                    <strong>מהי מכניקת קוונטים?</strong> מכניקת קוונטים היא תיאוריה פיזיקלית המתארת את התנהגות החומר באטומים וחלקיקים תת-אטומיים. היא שונה מהפיזיקה הקלאסית וכוללת מושגים כמו סופרפוזיציה וקוונטיזציה.
                </p>
                <p>
                    <strong>מהי היגלוּת קוונטית (Quantum Entanglement)?</strong> היגלוּת קוונטית היא תופעה שבה שני חלקיקים או יותר קשורים זה לזה כך שהמצב הקוונטי של כל אחד מהם לא יכול להיות מתואר באופן עצמאי, גם אם הם מופרדים במרחק גדול.
                </p>
                <p>
                    <strong>איך היגלוּת קוונטית עובדת?</strong> כאשר חלקיקים מוסבכים, המדידה של תכונה מסוימת של חלקיק אחד משפיעה באופן מיידי על התוצאה של מדידה מקבילה בחלקיק השני, ללא קשר למרחק ביניהם. זה קורה מכיוון שהמצבים הקוונטיים שלהם שזורים זה בזה, ושינוי במצב של אחד משפיע באופן מיידי על מצב השני.
                </p>
                <p>
                    <strong>ניסויים שמוכיחים היגלוּת קוונטית.</strong> ניסויים רבים איששו את קיום ההיגלוּת הקוונטית, כגון ניסויי בל ואספקטים, אשר הראו הפרה של אי-שוויון בל, מה שסותר את הפיזיקה הקלאסית ומאשש את קיומה של היגלוּת.
                </p>
                <p>
                    <strong>יישומים אפשריים של היגלוּת קוונטית (חישוב קוונטי, תקשורת קוונטית).</strong> היגלוּת קוונטית היא מרכיב מפתח בחישוב קוונטי, שבו ניתן להשתמש בקוביטים (ביטים קוונטיים) לבצע חישובים מורכבים הרבה יותר מהר ממחשבים קלאסיים. היא גם מאפשרת תקשורת קוונטית מאובטחת באמצעות הפצת מפתחות קוונטית (QKD), שבה מפתח הצפנה מועבר באמצעות חלקיקים שזורים, מה שמבטיח אבטחה מושלמת מפני האזנות.
                </p>
                <p>
                    <strong>פרדוקס איינשטיין-פודולסקי-רוזן (EPR).</strong> פרדוקס EPR הוא ניסוי מחשבתי שמטרתו להראות שלמכניקת קוונטים יש תוצאות לא שלמות או לא מקומיות, במיוחד בכל הנוגע להיגלוּת קוונטית. איינשטיין האמין שהיגלוּת קוונטית מרמזת על כך שלחלקיקים חייבים להיות משתנים נסתרים הקובעים את מצבם לפני המדידה, ולא שהמדידה עצמה יוצרת את המצב.
                </p>
                <p>
                    <strong>ביקורות על היגלוּת קוונטית.</strong> חלק מהמדענים טוענים שההיגלוּת הקוונטית אינה "מידית" אלא מוסברת על ידי משתנים נסתרים או תיאוריות אחרות. עם זאת, ניסויים רבים שללו תיאוריות של משתנים נסתרים מקומיים, מה שמחזק את ההבנה שהיגלוּת קוונטית היא תופעה אמיתית ולא מקומית.
                </p>
                <p>
                    <strong>מה זה אומר על המציאות?</strong> היגלוּת קוונטית מעלה שאלות עמוקות על טבע המציאות, הלוקליות והקשר בין תצפית למצב החלקיקים. היא מערערת את ההבנה הקלאסית של המרחב והזמן ומציעה שהמציאות עשויה להיות יותר מחוברת ובלתי ניתנת להפרדה ממה שחשבנו בעבר. היגלוּת קוונטית מציעה שהיקום עשוי להיות מערכת הוליסטית שבה חלקים רחוקים קשורים באופן אינהרנטי.
                </p>
            </section>
        </div>
    );
};

export default QuantumEntanglement;