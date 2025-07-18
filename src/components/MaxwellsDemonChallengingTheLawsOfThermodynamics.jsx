import React, { useState, useEffect, useRef } from 'react';

/**
 * MaxwellsDemonChallengingTheLawsOfThermodynamics Component
 *
 * המשתמש מתנסה בסימולציה של ניסוי 'השד של מקסוול'. המסך יציג מיכל אטום המחולק לשני תאים על ידי מחיצה, ובה דלתית זעירה הנשלטת על ידי 'שד' (דמות אנימציה קטנה). בתוך המיכל ינועו מולקולות גז (מיוצגות על ידי נקודות אנימטיביות), כאשר מהירותן תסומן בצבע (לדוגמה, אדום למהירות גבוהה/חום, כחול למהירות נמוכה/קור). בתחילת הסימולציה, המולקולות מפוזרות באופן אקראי ואחיד. המשתמש יוכל 'להפעיל' את השד באמצעות כפתור או מחוון. כאשר השד מופעל, הוא 'יתבונן' במולקולות המתקרבות לדלתית, ועל פי מהירותן, יפתח את הדלתית לרגע כדי לאפשר למולקולות מהירות לעבור לתא אחד ולמולקולות איטיות לתא השני. ככל שהשד ימיין יותר מולקולות, המשתמש יראה ויזואלית כיצד שני התאים הופכים להיות מופרדים יותר ויותר בטמפרטורה (לדוגמה, צד אחד אדום דומיננטי וצד שני כחול דומיננטי). במקביל, יופיע מד חום/אנרגיה או מד 'אנטרופיה של השד' שיעלה באופן עקבי, ויסמן את העלות האנרגטית/מידעית של פעולת המיון של השד (האנרגיה הדרושה לתצפית, חישוב ופתיחת/סגירת הדלת). התובנה העיקרית היא כי למרות שהגז במיכל נראה כמפחית את האנטרופיה שלו, פעולת המיון של השד עצמה דורשת אנרגיה ועיבוד מידע, אשר מגבירים את האנטרופיה הכוללת במערכת (גז + שד). הסימולציה ממחישה כי חוקי התרמודינמיקה נשמרים תמיד, וכי יצירת סדר מקומי תמיד מגיעה עם מחיר אנרגטי במקום אחר.
 */

// קבועים עבור הסימולציה
const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 300;
const PARTITION_X = CONTAINER_WIDTH / 2;
const DOOR_SIZE = 40; // גודל הפתח במחיצה
const NUM_MOLECULES = 50;
const MOLECULE_RADIUS = 5;
const MOLECULE_SPEED_FACTOR = 0.5; // קובע את מהירות התנועה של המולקולות
const DEMON_SORT_THRESHOLD = 20; // עד כמה קרוב מולקולה צריכה להיות לדלת כדי למיין
const DEMON_SORT_INTERVAL = 100; // מילישניות בין בדיקות מיון של השד

// פונקציית עזר לקבלת מספר אקראי בטווח נתון
const getRandom = (min, max) => Math.random() * (max - min) + min;

// יצירת מצב מולקולה ראשוני
const createMolecule = (id) => {
    // מהירות מ-0 (איטי/קר) עד 1 (מהיר/חם)
    const speed = getRandom(0, 1);
    // פיזור מולקולות באופן אקראי על פני כל המיכל בתחילה
    const x = getRandom(MOLECULE_RADIUS, CONTAINER_WIDTH - MOLECULE_RADIUS);
    const y = getRandom(MOLECULE_RADIUS, CONTAINER_HEIGHT - MOLECULE_RADIUS);

    return {
        id,
        x,
        y,
        vx: getRandom(-MOLECULE_SPEED_FACTOR, MOLECULE_SPEED_FACTOR),
        vy: getRandom(-MOLECULE_SPEED_FACTOR, MOLECULE_SPEED_FACTOR),
        speed: speed,
    };
};

const MaxwellsDemonChallengingTheLawsOfThermodynamics = () => {
    const [molecules, setMolecules] = useState([]);
    const [isDemonActive, setIsDemonActive] = useState(false);
    const [demonEntropyCost, setDemonEntropyCost] = useState(0);

    // רפרנס לפריימים של אנימציה
    const animationFrameRef = useRef();

    // אתחול מולקולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const initialMolecules = Array.from({ length: NUM_MOLECULES }, (_, i) => createMolecule(i));
        setMolecules(initialMolecules);
    }, []);

    // לולאת אנימציה למולקולות
    useEffect(() => {
        const animate = () => {
            setMolecules(prevMolecules => {
                return prevMolecules.map(mol => {
                    let { x, y, vx, vy } = mol;

                    // עדכון מיקום
                    x += vx;
                    y += vy;

                    // קפיצה מהקירות
                    if (x - MOLECULE_RADIUS < 0 || x + MOLECULE_RADIUS > CONTAINER_WIDTH) {
                        vx *= -1;
                        x = x - MOLECULE_RADIUS < 0 ? MOLECULE_RADIUS : CONTAINER_WIDTH - MOLECULE_RADIUS;
                    }
                    if (y - MOLECULE_RADIUS < 0 || y + MOLECULE_RADIUS > CONTAINER_HEIGHT) {
                        vy *= -1;
                        y = y - MOLECULE_RADIUS < 0 ? MOLECULE_RADIUS : CONTAINER_HEIGHT - MOLECULE_RADIUS;
                    }

                    // טיפול בהתנגשות עם המחיצה (מפושט)
                    // אם מולקולה חוצה את קו המחיצה (למעט אזור הדלתית)
                    const isLeftHalf = x < PARTITION_X;
                    const isCrossingPartition = (isLeftHalf && x + MOLECULE_RADIUS >= PARTITION_X) ||
                                                (!isLeftHalf && x - MOLECULE_RADIUS <= PARTITION_X);
                    const isNearDoorVertically = y > (CONTAINER_HEIGHT / 2 - DOOR_SIZE / 2) && y < (CONTAINER_HEIGHT / 2 + DOOR_SIZE / 2);

                    if (isCrossingPartition && !isNearDoorVertically) {
                        vx *= -1; // קפיצה מהמחיצה
                        // התאמה מיקום למניעת הידבקות לקיר
                        x = isLeftHalf ? PARTITION_X - MOLECULE_RADIUS : PARTITION_X + MOLECULE_RADIUS;
                    }

                    return { ...mol, x, y, vx, vy };
                });
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    // לוגיקת המיון של השד
    useEffect(() => {
        let sortInterval;
        if (isDemonActive) {
            sortInterval = setInterval(() => {
                setMolecules(prevMolecules => {
                    let sortedCount = 0;
                    const newMolecules = prevMolecules.map(mol => {
                        let { x, y, speed } = mol;
                        const isNearDoorHorizontally = Math.abs(x - PARTITION_X) < DEMON_SORT_THRESHOLD;
                        const isNearDoorVertically =
                            y > (CONTAINER_HEIGHT / 2 - DOOR_SIZE / 2 - MOLECULE_RADIUS) &&
                            y < (CONTAINER_HEIGHT / 2 + DOOR_SIZE / 2 + MOLECULE_RADIUS);

                        if (isNearDoorHorizontally && isNearDoorVertically) {
                            // אם מולקולה חמה (מהירות > 0.5) נמצאת בצד שמאל (הקר), העבר אותה לצד ימין (החם)
                            if (speed > 0.5 && x < PARTITION_X) {
                                sortedCount++;
                                // העברה טלפורטטיבית לחצי הימני, מעט אחרי המחיצה
                                return { ...mol, x: PARTITION_X + MOLECULE_RADIUS + getRandom(5, 20) };
                            }
                            // אם מולקולה קרה (מהירות <= 0.5) נמצאת בצד ימין (החם), העבר אותה לצד שמאל (הקר)
                            if (speed <= 0.5 && x > PARTITION_X) {
                                sortedCount++;
                                // העברה טלפורטטיבית לחצי השמאלי, מעט לפני המחיצה
                                return { ...mol, x: PARTITION_X - MOLECULE_RADIUS - getRandom(5, 20) };
                            }
                        }
                        return mol;
                    });

                    // הגדלת עלות האנטרופיה עבור כל פעולת מיון
                    if (sortedCount > 0) {
                        setDemonEntropyCost(prevCost => prevCost + sortedCount);
                    }
                    return newMolecules;
                });
            }, DEMON_SORT_INTERVAL);
        }

        return () => {
            clearInterval(sortInterval);
        };
    }, [isDemonActive]);


    // קביעת צבע המולקולה לפי מהירותה (חמה/קרה)
    const getMoleculeColor = (molecule) => {
        // אדום למולקולות מהירות/חמות יותר, כחול למולקולות איטיות/קרות יותר
        return molecule.speed > 0.5 ? 'bg-red-500' : 'bg-blue-500';
    };

    // חישוב התפלגות המולקולות לתצוגה
    const hotMoleculesLeft = molecules.filter(m => m.speed > 0.5 && m.x < PARTITION_X).length;
    const coldMoleculesLeft = molecules.filter(m => m.speed <= 0.5 && m.x < PARTITION_X).length;
    const hotMoleculesRight = molecules.filter(m => m.speed > 0.5 && m.x > PARTITION_X).length;
    const coldMoleculesRight = molecules.filter(m => m.speed <= 0.5 && m.x > PARTITION_X).length;

    const totalLeft = hotMoleculesLeft + coldMoleculesLeft;
    const totalRight = hotMoleculesRight + coldMoleculesRight;

    const percentHotLeft = totalLeft > 0 ? (hotMoleculesLeft / totalLeft) * 100 : 0;
    const percentColdLeft = totalLeft > 0 ? (coldMoleculesLeft / totalLeft) * 100 : 0;
    const percentHotRight = totalRight > 0 ? (hotMoleculesRight / totalRight) * 100 : 0;
    const percentColdRight = totalRight > 0 ? (coldMoleculesRight / totalRight) * 100 : 0;

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                השד של מקסוול: מי מנצח – שד או חוק פיזיקלי?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם ייתכן שקיים יצור, קטן ככל שיהיה, שיכול להפר את אחד החוקים היסודיים ביותר של הטבע – החוק השני של התרמודינמיקה? דמיינו שד זעיר המסוגל להפריד מולקולות גז חמות וקרות בתוך מיכל אחד, ובכך ליצור סדר מתוך כאוס, ובאופן חסר תקדים, להפחית את האנטרופיה הכוללת של המערכת. האם זה אפשרי?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית: השד בפעולה</h3>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    לחצו על הכפתור "הפעל שד" כדי לראות כיצד השד מנסה למיין את המולקולות החמות (אדומות) והקרות (כחולות) לתאים נפרדים. שימו לב למד ה"אנטרופיה של השד" שעולה!
                </p>

                <div
                    className="relative border-4 border-gray-700 bg-gray-100 rounded-lg overflow-hidden mb-8"
                    style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
                >
                    {/* מחיצה - חלק עליון */}
                    <div
                        className="absolute bg-gray-700"
                        style={{
                            left: PARTITION_X - 2, // חצי מרוחב הגבול למרכוז
                            top: 0,
                            width: 4,
                            height: (CONTAINER_HEIGHT / 2 - DOOR_SIZE / 2)
                        }}
                    ></div>
                    {/* מחיצה - חלק תחתון */}
                    <div
                        className="absolute bg-gray-700"
                        style={{
                            left: PARTITION_X - 2,
                            top: (CONTAINER_HEIGHT / 2 + DOOR_SIZE / 2),
                            width: 4,
                            height: (CONTAINER_HEIGHT / 2 - DOOR_SIZE / 2)
                        }}
                    ></div>

                    {/* שד (ייצוג ויזואלי מפושט) */}
                    <div
                        className="absolute text-3xl animate-bounce"
                        style={{
                            left: PARTITION_X - 20, // מיקום ליד הדלת
                            top: CONTAINER_HEIGHT / 2 - 20
                        }}
                    >
                        😈
                    </div>

                    {/* מולקולות */}
                    {molecules.map(mol => (
                        <div
                            key={mol.id}
                            className={`absolute rounded-full ${getMoleculeColor(mol)}`}
                            style={{
                                width: MOLECULE_RADIUS * 2,
                                height: MOLECULE_RADIUS * 2,
                                transform: `translate(${mol.x - MOLECULE_RADIUS}px, ${mol.y - MOLECULE_RADIUS}px)`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-md mb-6">
                    <button
                        onClick={() => setIsDemonActive(!isDemonActive)}
                        className={`py-3 px-8 rounded-full text-xl font-semibold transition-all duration-300 shadow-lg
                            ${isDemonActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    >
                        {isDemonActive ? 'עצור שד' : 'הפעל שד'}
                    </button>
                    <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-lg text-indigo-700">אנטרופיית השד:</span>
                        <span className="text-2xl text-purple-700">{demonEntropyCost}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md text-center text-gray-700">
                    <div>
                        <h4 className="font-semibold text-xl text-indigo-700 mb-2">תא שמאלי (קר יותר):</h4>
                        <p>חמות: {hotMoleculesLeft} ({percentHotLeft.toFixed(1)}%)</p>
                        <p>קרות: {coldMoleculesLeft} ({percentColdLeft.toFixed(1)}%)</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl text-indigo-700 mb-2">תא ימני (חם יותר):</h4>
                        <p>חמות: {hotMoleculesRight} ({percentHotRight.toFixed(1)}%)</p>
                        <p>קרות: {coldMoleculesRight} ({percentColdRight.toFixed(1)}%)</p>
                    </div>
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                        <strong>החוק השני של התרמודינמיקה:</strong> זהו אחד החוקים היסודיים ביותר בפיזיקה, הקובע כי במערכת סגורה, האנטרופיה לעולם אינה פוחתת; היא תמיד נשארת קבועה או גדלה. באופן אינטואיטיבי, החוק אומר שמערכות נוטות באופן טבעי לעבור ממצב של סדר למצב של אי-סדר מקסימלי, או כאוס. לדוגמה, חדר נוטה להתבלגן, וקוביית קרח נמסה ומתפזרת במים.
                    </p>
                    <p>
                        <strong>אנטרופיה:</strong> מושג האנטרופיה מתאר מדד לאי-סדר או לכמות המצבים המיקרוסקופיים האפשריים שבהם מערכת יכולה להימצא. ככל שיש יותר מצבים אפשריים, כך האנטרופיה גבוהה יותר. לדוגמה, כאשר טיפת דיו מתפשטת במים, האנטרופיה של המערכת (דיו ומים) גדלה כי יש אינספור דרכים לטיפת הדיו להתפזר באופן אחיד, לעומת דרך אחת להישאר כטיפה מרוכזת.
                    </p>
                    <p>
                        <strong>השד של מקסוול – הניסוי המחשבתי:</strong> בשנת 1867, הפיזיקאי ג'יימס קלרק מקסוול הציע ניסוי מחשבתי (לא ניסוי פיזי שניתן לבצע בפועל) כדי לבחון את גבולות החוק השני. הוא דמיין מיכל גז המחולק לשני תאים על ידי מחיצה, ובמחיצה זו ישנה דלתית זעירה. 'שד' זעיר, בגודל של מולקולה בודדת, עומד ליד הדלתית. השד מסוגל 'לראות' את המולקולות ולקבוע את מהירותן. כאשר מולקולה מהירה מתקרבת לדלתית מהתא "הקר", השד פותח את הדלתית לרגע ומאפשר לה לעבור לתא "החם". כאשר מולקולה איטית מתקרבת מהתא "החם", השד מאפשר לה לעבור לתא "הקר".
                    </p>
                    <p>
                        <strong>הפרה לכאורה של החוק:</strong> לכאורה, פעולת השד הזעיר יוצרת הפרש טמפרטורות בין שני התאים (התא האחד מתחמם והשני מתקרר) ללא השקעת עבודה חיצונית. הדבר נראה כמנוגד ישירות לחוק השני של התרמודינמיקה, משום שהוא יוצר סדר (הפרדת חם מקר) מתוך כאוס (פיזור אחיד של מולקולות) ומפחית את האנטרופיה של הגז במיכל.
                    </p>
                    <p>
                        <strong>הפתרון של ה'פרדוקס':</strong> במשך שנים רבות, ניסוי מחשבתי זה נחשב לפרדוקס. הפתרון הגיע רק במאה ה-20 והוכיח כי חוקי התרמודינמיקה נשמרים תמיד, גם במקרה זה. ההבנה היא שפעולת השד עצמה דורשת אנרגיה ויוצרת אנטרופיה מחוץ לגז:
                        <ul className="list-disc pl-8 mt-2 space-y-2">
                            <li>
                                <strong>הצורך של השד 'לדעת':</strong> כדי למיין את המולקולות, השד חייב 'למדוד' את מהירותן. מדידה זו היא תהליך פיזי הדורש השקעת אנרגיה ועיבוד מידע.
                            </li>
                            <li>
                                <strong>עקרון לנדאואר:</strong> ב-1961, רולף לנדאואר הראה שכל פעולה של מחיקת מידע (לדוגמה, כאשר השד 'שוכח' את מידע המהירות של המולקולות שכבר עברו) גורמת בהכרח לפליטת כמות מינימלית של חום לסביבה, ובכך מגדילה את האנטרופיה הכוללת של המערכת (שד + סביבה).
                            </li>
                            <li>
                                <strong>האנרגיה הנדרשת להפעלת מנגנון הדלת:</strong> גם אם נתעלם מעיבוד המידע, פתיחת וסגירת הדלתית דורשת אנרגיה כלשהי, קטנה ככל שתהיה.
                            </li>
                            <li>
                                <strong>הוכחה שהאנטרופיה הכוללת של המערכת (גז + שד) לעולם לא פוחתת:</strong> בסופו של דבר, האנטרופיה המופחתת בגז מפוצה (ויותר מכך) על ידי האנטרופיה הנוצרת מפעילות השד (מדידה, עיבוד מידע, מחיקת מידע ופעולת הדלת). כך, האנטרופיה הכוללת של היקום (הגז + השד + הסביבה) לעולם אינה פוחתת, והחוק השני נשמר.
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>משמעויות רחבות:</strong> ניסוי השד של מקסוול והפתרון שלו מדגישים את הקשרים העמוקים והבלתי ניתקים בין אנטרופיה, מידע ואנרגיה בפיזיקה. הם מלמדים אותנו שאי אפשר להשיג סדר באופן חופשי לחלוטין, ושיצירת סדר מקומי תמיד באה עם מחיר אנרגטי או אינפורמטיבי במקום אחר במערכת, המגדיל את האנטרופיה הכוללת.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MaxwellsDemonChallengingTheLawsOfThermodynamics;