import React, { useState, useEffect, useRef } from 'react';

/**
 * TheSecretOfDesirePathsHowPedestriansDesignBetterCities Component
 *
 * המשתמש מוצג למפה אינטראקטיבית של פארק חדש, ריק משבילים מלבד נקודות התחלה וסיום. המשתמש יכול לדמות 'הולכי רגל' רבים (מספר הניתן לכוונון) שמנסים להגיע מנקודה א' לנקודה ב'. ההולכים בוחרים נתיבים באופן אקראי בהתחלה, אך ככל שיותר 'הולכי רגל' עוברים באותם מקומות, 'הדשא' באותם אזורים נשחק, ומסמן את ה'שבילי רצון'. המשתמש יכול להוסיף 'עצים' או 'מכשולים' אחרים, לראות כיצד הנתיבים משתנים בהתאם, ובסופו של דבר להוסיף שבילים 'רשמיים' בהתבסס על השבילים הלא רשמיים שנוצרו. המטרה היא להדגים כיצד התנהגות ספונטנית של משתמשים יכולה לחשוף את המסלולים היעילים ביותר, וכיצד מעצבים יכולים להשתמש במידע הזה כדי לתכנן טוב יותר.
 */
const TheSecretOfDesirePathsHowPedestriansDesignBetterCities = () => {
    const [numPedestrians, setNumPedestrians] = useState(100);
    const [obstacles, setObstacles] = useState([]);
    const [paths, setPaths] = useState([]);
    const [mapData, setMapData] = useState(null); // Store map data (grass wear)
    const mapRef = useRef(null);
    const mapSize = 200; // Define map size
    const startPoint = { x: 10, y: 10 };
    const endPoint = { x: mapSize - 10, y: mapSize - 10 };
    const [isSimulating, setIsSimulating] = useState(false); // Track simulation state
    const [simulationSpeed, setSimulationSpeed] = useState(50); // Delay between steps in ms
    const [showPaths, setShowPaths] = useState(false);


    useEffect(() => {
        // Initialize map data
        const initialMapData = Array(mapSize).fill(null).map(() => Array(mapSize).fill(0));
        setMapData(initialMapData);
    }, [mapSize]);

    const handleNumPedestriansChange = (event) => {
        setNumPedestrians(parseInt(event.target.value, 10));
    };

    const handleAddObstacle = (x, y) => {
        setObstacles([...obstacles, { x, y }]);
    };

    const clearMap = () => {
      setMapData(Array(mapSize).fill(null).map(() => Array(mapSize).fill(0)));
    }

    const simulateStep = (currentMapData, currentPaths) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const newPaths = [...currentPaths];
                let newMapData = currentMapData.map(row => [...row]); // Deep copy

                for (let i = 0; i < numPedestrians; i++) {
                    let currentX = startPoint.x;
                    let currentY = startPoint.y;
                    const path = [{ x: currentX, y: currentY }];

                    while (Math.abs(currentX - endPoint.x) > 1 || Math.abs(currentY - endPoint.y) > 1) {
                        // Simple pathfinding: move closer to the end point
                        const dx = endPoint.x - currentX;
                        const dy = endPoint.y - currentY;

                        let moveX = 0;
                        let moveY = 0;

                        if (Math.abs(dx) > Math.abs(dy)) {
                            moveX = dx > 0 ? 1 : -1;
                        } else {
                            moveY = dy > 0 ? 1 : -1;
                        }

                        const nextX = currentX + moveX;
                        const nextY = currentY + moveY;


                        // Obstacle avoidance (very basic)
                        const isObstacle = obstacles.some(
                            (obstacle) => nextX === obstacle.x && nextY === obstacle.y
                        );

                        if (!isObstacle && nextX >= 0 && nextX < mapSize && nextY >= 0 && nextY < mapSize) {
                            currentX = nextX;
                            currentY = nextY;
                            path.push({ x: currentX, y: currentY });

                            // Update map data (grass wear)
                            newMapData[currentY][currentX] = (newMapData[currentY][currentX] || 0) + 1;
                        } else {
                            // Try other directions
                            const alternatives = [
                                { x: currentX + 1, y: currentY },
                                { x: currentX - 1, y: currentY },
                                { x: currentX, y: currentY + 1 },
                                { x: currentX, y: currentY - 1 },
                            ];

                            const validAlternatives = alternatives.filter(alt => {
                                const isObs = obstacles.some(obstacle => alt.x === obstacle.x && alt.y === obstacle.y);
                                return !isObs && alt.x >= 0 && alt.x < mapSize && alt.y >= 0 && alt.y < mapSize;
                            });

                            if (validAlternatives.length > 0) {
                                const randomIndex = Math.floor(Math.random() * validAlternatives.length);
                                currentX = validAlternatives[randomIndex].x;
                                currentY = validAlternatives[randomIndex].y;
                                path.push({ x: currentX, y: currentY });
                                newMapData[currentY][currentX] = (newMapData[currentY][currentX] || 0) + 1;

                            } else {
                                break; // Give up if no valid moves
                            }
                        }
                    }
                    newPaths.push(path);
                }

                resolve({newMapData, newPaths});

            }, simulationSpeed); // Control the simulation speed
        });
    };

    const simulatePedestrians = async () => {
        if (!mapData || isSimulating) return;

        setIsSimulating(true);
        let currentMapData = mapData;
        let currentPaths = [];

        for (let step = 0; step < 5; step++) { // Simulate multiple steps
            const result = await simulateStep(currentMapData, currentPaths);
            currentMapData = result.newMapData;
            currentPaths = result.newPaths;
            setPaths(currentPaths);
            setMapData(currentMapData);
        }
        setIsSimulating(false);
    };

    const renderMap = () => {
        if (!mapData) return null;

        return (
            <div className="relative">
                {mapData.map((row, y) => (
                    <div key={y} className="flex">
                        {row.map((wear, x) => {
                            let bgColor = `transition-colors duration-200 bg-green-${Math.min(50 + wear * 5, 400)}`; // Adjust color intensity with smooth transition
                            if(wear > 80){
                                bgColor = 'transition-colors duration-200 bg-yellow-500';
                            }
                            if(wear > 150) {
                                bgColor = 'transition-colors duration-200 bg-red-500';
                            }

                            const isObstacle = obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
                            if (isObstacle) {
                                bgColor = 'bg-gray-800'; // Obstacle color
                            }

                            if (x === startPoint.x && y === startPoint.y) {
                                bgColor = 'bg-blue-500 animate-pulse'; // Start point color with pulse animation
                            }

                            if (x === endPoint.x && y === endPoint.y) {
                                bgColor = 'bg-purple-500 animate-pulse'; // End point color with pulse animation
                            }

                            return (
                                <div
                                    key={x}
                                    className={`w-2 h-2 ${bgColor} rounded-sm`}
                                    style={{ width: '5px', height: '5px' }}
                                />
                            );
                        })}
                    </div>
                ))}
                {/* Display paths as lines (optional, for visual debugging) */}
                {showPaths && paths.map((path, index) => (
                    <div key={index} className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <svg width="100%" height="100%" style={{width: '100%', height: '100%'}}>
                            <polyline
                                points={path.map(point => `${point.x * 5},${point.y * 5}`).join(' ')}
                                style={{ fill: 'none', stroke: 'rgba(0,0,255,0.1)', strokeWidth: 1 }}
                            />
                        </svg>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl transition-all duration-300 hover:shadow-inner" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                הסוד בשבילים האבודים: איך הולכי רגל מתכננים ערים טוב יותר?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם שמתם לב פעם לשבילים עוקפי-דשא בפארק או בקמפוס? נראה שהם נוצרו סתם, אבל הם טומנים בחובם סוד עצום על האופן שבו אנחנו באמת משתמשים במרחב. מה השבילים האלה מספרים לנו על איך לתכנן ערים חכמות ויעילות יותר?
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:scale-105">
                {/* TODO: בנה כאן את האינטראקציה המרכזית על פי קונספט האפליקציה. */}
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 animate-bounce">הדגמה אינטראקטיבית</h3>
                <p className="mb-4 text-center">הגדרות הדמיה:</p>
                <div className="flex flex-col md:flex-row items-center justify-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
                    <div>
                        <label htmlFor="numPedestrians" className="mr-2 text-gray-700">מספר הולכי רגל:</label>
                        <input
                            type="number"
                            id="numPedestrians"
                            value={numPedestrians}
                            onChange={handleNumPedestriansChange}
                            className="border border-gray-300 rounded px-2 py-1 w-24 text-center focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="simulationSpeed" className="mr-2 text-gray-700">מהירות הדמיה:</label>
                        <input
                            type="number"
                            id="simulationSpeed"
                            value={simulationSpeed}
                            onChange={(e) => setSimulationSpeed(parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 w-24 text-center focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-4">
                    <button
                        onClick={simulatePedestrians}
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSimulating}
                    >
                        התחל סימולציה
                    </button>
                    <button onClick={clearMap} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                        אפס מפה
                    </button>
                    <button onClick={() => handleAddObstacle(Math.floor(Math.random() * mapSize), Math.floor(Math.random() * mapSize))} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">הוסף מכשול רנדומלי</button>

                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                        <span className="relative">
                            <input type="checkbox" id="showPaths" className="sr-only peer" checked={showPaths} onChange={() => setShowPaths(!showPaths)} />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </span>
                        <span>הצג נתיבים</span>
                    </label>
                </div>


                <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded flex items-center justify-center overflow-hidden">
                    <div ref={mapRef} className="transition-transform duration-300 hover:scale-110">{renderMap()}</div>
                </div>

                {obstacles.length > 0 && (
                    <div className="mt-4">
                        <p className="font-semibold">מכשולים:</p>
                        <ul className="list-disc pl-5">
                            {obstacles.map((obstacle, index) => (
                                <li key={index}>X: {obstacle.x}, Y: {obstacle.y}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center animate-pulse">
                    ההסבר המדעי
                </h2>
                {/* TODO: כתוב כאן את ההסבר המפורט על סמך ראשי הפרקים. השתמש בתגיות p, ul, li, strong וכו'. */}
                <p className="mb-4">
                    <strong>מהם שבילי רצון (Desire Paths) והיכן הם מופיעים?</strong> שבילי רצון הם נתיבים שנוצרים באופן ספונטני על ידי הולכי רגל או רוכבי אופניים, לעיתים קרובות כאמצעי קיצור או עקיפת מכשולים. הם מופיעים בעיקר באזורים פתוחים כמו פארקים, מדשאות, ובקמפוסים אוניברסיטאיים.
                </p>
                <p className="mb-4">
                    <strong>ההיסטוריה של השימוש בשבילי רצון בתכנון עירוני.</strong> כבר בתחילת המאה ה-20, מתכננים עירוניים החלו לשים לב לשבילי רצון ככלי לקבלת מידע על דפוסי התנועה של אנשים. השימוש היזום במידע זה השתכלל עם הזמן.
                </p>
                <p className="mb-4">
                    <strong>כיצד שבילי רצון חושפים את הצרכים האמיתיים של הולכי רגל.</strong> שבילי רצון הם אינדיקציה ישירה לצרכים של המשתמשים במרחב. הם מצביעים על המסלולים הנוחים והיעילים ביותר מנקודת מבטם, שלעיתים קרובות אינה תואמת את התכנון המקורי.
                </p>
                <p className="mb-4">
                    <strong>היתרונות והחסרונות של הסתמכות על שבילי רצון.</strong> היתרון העיקרי הוא שיפור הפונקציונליות והנגישות של המרחב הציבורי. החסרונות יכולים לכלול פגיעה אסתטית בנוף, שחיקת קרקע, ולעיתים גם סכנה בטיחותית (למשל, בשבילים תלולים או לא מתוחזקים).
                </p>
                <p className="mb-4">
                    <strong>דוגמאות בולטות לשימוש מוצלח בשבילי רצון.</strong> ישנם פארקים וקמפוסים רבים בעולם שבהם שבילי רצון נלקחו בחשבון בתכנון השבילים והדרכים. לדוגמה, בפארק מסוים, לאחר שנה של התבוננות בשבילי רצון, הוסיפו שבילים מבטון בדיוק במקומות בהם נוצרו הנתיבים הטבעיים.
                </p>
                <p className="mb-4">
                    <strong>כיצד ניתן להשתמש בטכנולוגיה (כגון ניתוח נתוני GPS) כדי לזהות שבילי רצון באופן אוטומטי.</strong> ניתן להשתמש בנתוני GPS שנאספו ממכשירים ניידים כדי למפות את הנתיבים בהם אנשים הולכים בפועל. ניתוח של נתונים אלו יכול לחשוף שבילי רצון במהירות ובדיוק.
                </p>
                <p>
                    <strong>שבילי רצון כדוגמה לחשיבות של עיצוב ממוקד משתמש.</strong> שבילי רצון מדגישים את החשיבות של התבוננות בהתנהגות המשתמשים והתאמת התכנון לצרכים שלהם. עיצוב ממוקד משתמש מוביל למרחבים ציבוריים יעילים, נוחים ונעימים יותר.
                </p>
            </section>
        </div>
    );
};

export default TheSecretOfDesirePathsHowPedestriansDesignBetterCities;