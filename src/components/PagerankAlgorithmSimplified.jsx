import React, { useState, useEffect, useRef } from 'react';

/**
 * PagerankAlgorithmSimplified Component
 *
 * המשתמש יראה גרף של 5-7 דפי אינטרנט המקושרים ביניהם. כל דף ייוצג כעיגול. גודל העיגול יציין את ה-PageRank שלו. המשתמש יוכל לגרור את העיגולים ולשנות את הקישורים ביניהם (להוסיף, להסיר, לשנות כיוון). בכל שינוי, הסימולציה תחשב ותעדכן את גודל העיגולים בהתאם ל-PageRank החדש. המשתמש יראה בזמן אמת כיצד מספר הקישורים הנכנסים (in-links) משפיע על הדירוג של כל דף, וכיצד קישור מדף בעל דירוג גבוה משפיע יותר מקישור מדף בעל דירוג נמוך.
 */
const PagerankAlgorithmSimplified = () => {
    // מצב הקודקודים בגרף. כל קודקוד מכיל מידע על המיקום, ה-PageRank והתווית שלו.
    const [nodes, setNodes] = useState([
        { id: 1, x: 50, y: 50, pagerank: 1, label: "A" },
        { id: 2, x: 200, y: 150, pagerank: 1, label: "B" },
        { id: 3, x: 350, y: 50, pagerank: 1, label: "C" },
        { id: 4, x: 50, y: 300, pagerank: 1, label: "D" },
        { id: 5, x: 350, y: 300, pagerank: 1, label: "E" }
    ]);
    // מצב הקשתות בגרף. כל קשת מציינת קישור בין שני קודקודים.
    const [edges, setEdges] = useState([
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 3, target: 1 },
        { source: 4, target: 1 },
        { source: 5, target: 4 }
    ]);
    // מקדם הדעיכה (Damping Factor) של האלגוריתם. משפיע על ההתכנסות של ה-PageRank.
    const [dampingFactor, setDampingFactor] = useState(0.85);
    // מספר האיטרציות שהאלגוריתם ירוץ. משפיע על דיוק ה-PageRank.
    const [iterationCount, setIterationCount] = useState(100);
    // מצב עבור קודקוד שנגרר כרגע
    const [draggingNode, setDraggingNode] = useState(null);

    // התייחסות לאלמנט ה-SVG כדי לקבל את המיקום שלו על המסך.
    const svgRef = useRef(null);

    // אפקט צדדי שמחשב את ה-PageRank בכל פעם שהקודקודים, הקשתות, מקדם הדעיכה או מספר האיטרציות משתנים.
    useEffect(() => {
        calculatePageRank();
    }, [nodes, edges, dampingFactor, iterationCount]);

    // פונקציה שמחשבת את ה-PageRank של כל קודקוד בגרף.
    const calculatePageRank = () => {
        const numNodes = nodes.length;
        const initialPageRank = 1 / numNodes;
        let newPageranks = nodes.map(() => initialPageRank);

        // לולאה שרצה מספר פעמים כמספר האיטרציות.
        for (let i = 0; i < iterationCount; i++) {
            newPageranks = nodes.map((node, index) => {
                let sum = 0;
                edges.forEach(edge => {
                    if (edge.target === node.id) {
                        const sourceNode = nodes.find(n => n.id === edge.source);
                        const outLinks = edges.filter(e => e.source === edge.source).length;
                        sum += sourceNode.pagerank / outLinks;
                    }
                });
                return (1 - dampingFactor) / numNodes + dampingFactor * sum;
            });

            // נרמול ה-PageRank. מוודא שסכום ה-PageRank של כל הקודקודים הוא 1.
            const sumPageranks = newPageranks.reduce((acc, val) => acc + val, 0);
            newPageranks = newPageranks.map(pr => pr / sumPageranks);


            // עדכון ה-PageRank של הקודקודים.
            setNodes(prevNodes =>
                prevNodes.map((node, index) => ({
                    ...node,
                    pagerank: newPageranks[index]
                }))
            );
        }
    };

    // פונקציה שמטפלת בגרירת קודקוד.
    const handleNodeDrag = (nodeId, dx, dy) => {
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === nodeId ? { ...node, x: node.x + dx, y: node.y + dy } : node
            )
        );
    };

    // פונקציה שמוסיפה קשת חדשה בין שני קודקודים.
    const handleAddEdge = (sourceId, targetId) => {
        if (!edges.some(edge => edge.source === sourceId && edge.target === targetId)) {
            setEdges([...edges, { source: sourceId, target: targetId }]);
        }
    };

    // פונקציה שמסירה קשת קיימת בין שני קודקודים.
    const handleRemoveEdge = (sourceId, targetId) => {
        setEdges(prevEdges => prevEdges.filter(edge => !(edge.source === sourceId && edge.target === targetId)));
    };

    // פונקציה שמטפלת בשינוי מקדם הדעיכה.
    const handleDampingFactorChange = (e) => {
        setDampingFactor(parseFloat(e.target.value));
    };

    // פונקציה שמטפלת בשינוי מספר האיטרציות.
    const handleIterationCountChange = (e) => {
        setIterationCount(parseInt(e.target.value, 10));
    };

    // פונקציה שמחשבת את רדיוס הקודקוד בהתאם ל-PageRank שלו.
    const getNodeRadius = (pagerank) => {
        return 20 + pagerank * 50;
    };

    // פונקציה שמחזירה צבע בהתאם ל-pagerank
    const getNodeColor = (pagerank) => {
        const intensity = Math.min(pagerank * 255, 255); // הגבל את הערך המקסימלי ל-255
        const red = 255 - intensity;
        const green = 255;
        const blue = 255;

        return `rgb(${red}, ${green}, ${blue})`;
    };

    // פונקציה המטפלת בתחילת גרירה של קודקוד
    const handleNodeMouseDown = (e, nodeId) => {
        e.preventDefault(); // מניעת התנהגות ברירת מחדל של גרירה
        setDraggingNode(nodeId);
    };

    //פונקציה המטפלת בתזוזה של העכבר בזמן גרירה
    const handleMouseMove = (e) => {
        if (!draggingNode) return;

        const svgElement = svgRef.current;
        const svgRect = svgElement.getBoundingClientRect();
        const newX = e.clientX - svgRect.left;
        const newY = e.clientY - svgRect.top;

        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === draggingNode ? { ...node, x: newX, y: newY } : node
            )
        );
    };

    // פונקציה המטפלת בסיום הגרירה
    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                סוד הדירוג של גוגל: PageRank בפשטות
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                איך גוגל ידע איזה דף אינטרנט להציג ראשון בתוצאות החיפוש? האם זה קשור רק למילות המפתח או שיש משהו נוסף? גלו את האלגוריתם ששינה את פני האינטרנט.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <p className="mb-4 text-center">גרור את העיגולים כדי לשנות את מיקומם. הוסף או הסר קישורים כדי לראות כיצד ה-PageRank משתנה.</p>

                <div className="flex items-center mb-4">
                    <label htmlFor="dampingFactor" className="mr-2 text-gray-700">Damping Factor:</label>
                    <input
                        type="number"
                        id="dampingFactor"
                        min="0"
                        max="1"
                        step="0.05"
                        value={dampingFactor}
                        onChange={handleDampingFactorChange}
                        className="border rounded p-2 w-20 text-black focus:ring-2 focus:ring-indigo-200 transition-shadow duration-200"
                    />
                </div>

                <div className="flex items-center mb-4">
                    <label htmlFor="iterationCount" className="mr-2 text-gray-700">Iterations:</label>
                    <input
                        type="number"
                        id="iterationCount"
                        min="1"
                        max="500"
                        step="10"
                        value={iterationCount}
                        onChange={handleIterationCountChange}
                        className="border rounded p-2 w-20 text-black focus:ring-2 focus:ring-indigo-200 transition-shadow duration-200"
                    />
                </div>


                <svg
                    width="500"
                    height="400"
                    ref={svgRef}
                    className="border border-gray-300 bg-gray-100 rounded cursor-grab active:cursor-grabbing"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <defs>
                        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                            <path d="M0 0 L10 5 L0 10 Z" fill="gray" />
                        </marker>
                    </defs>
                    {edges.map((edge, index) => {
                        const sourceNode = nodes.find(node => node.id === edge.source);
                        const targetNode = nodes.find(node => node.id === edge.target);
                        if (!sourceNode || !targetNode) return null;

                        return (
                            <line
                                key={index}
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke="gray"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                                className="transition-all duration-300" // הוספת אנימציה לקווים
                            />
                        );
                    })}
                    {nodes.map(node => (
                        <g key={node.id}
                           className="transition-all duration-300 hover:scale-105" // הוספת אנימציה לקודקודים
                        >
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={getNodeRadius(node.pagerank)}
                                fill={getNodeColor(node.pagerank)}
                                stroke="blue"
                                strokeWidth="3"
                                style={{ cursor: 'grab' }}
                                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                                className="transition-all duration-300" // הוספת אנימציה למעגלים
                            >
                                <title>{`PageRank: ${node.pagerank.toFixed(2)}`}</title>
                            </circle>
                            <text
                                x={node.x}
                                y={node.y + 5}
                                textAnchor="middle"
                                fontSize="12"
                                fill="black"
                                style={{ pointerEvents: 'none', userSelect: 'none' }}
                            >
                                {node.label}
                            </text>
                        </g>
                    ))}

                </svg>

                <div className="mt-4 flex space-x-4">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={() => handleAddEdge(1, 5)}>הוסף קישור מ-A ל-E</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={() => handleRemoveEdge(1, 2)}>הסר קישור מ-A ל-B</button>
                </div>

            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p>
                    <strong>מה זה PageRank ולמה הוא חשוב?</strong><br />
                    PageRank הוא אלגוריתם שפותח על ידי לארי פייג' וסרגיי ברין בגוגל, ומטרתו היא לדרג דפי אינטרנט על פי חשיבותם. החשיבות נקבעת על פי כמות ואיכות הקישורים הנכנסים לדף. PageRank היה אחד הגורמים המרכזיים בהצלחת גוגל בתחילת דרכה, מכיוון שהוא איפשר למצוא את הדפים הרלוונטיים ביותר עבור שאילתות חיפוש.
                </p>

                <p>
                    <strong>איך PageRank עובד: הסבר אינטואיטיבי על בסיס קישורים נכנסים ויוצאים.</strong><br />
                    דמיינו שכל דף אינטרנט הוא קול בבחירות. ככל שיש יותר קולות (קישורים נכנסים) לדף מסוים, כך הוא נחשב חשוב יותר. בנוסף, קולות מדפים חשובים יותר (דפים עם PageRank גבוה) שווים יותר. דף שמקבל קישורים מדפים רבים ואיכותיים יקבל PageRank גבוה יותר.
                </p>

                <p>
                    <strong>נוסחת PageRank (הסבר פשוט ומופשט, בלי צורך בידע מתמטי מתקדם).</strong><br />
                    הנוסחה הבסיסית של PageRank היא:
                    PR(A) = (1-d) + d * (PR(T1)/C(T1) + ... + PR(Tn)/C(Tn))
                    כאשר:
                    <ul>
                        <li>PR(A) הוא ה-PageRank של הדף A.</li>
                        <li>PR(Ti) הוא ה-PageRank של הדפים שמקשרים לדף A.</li>
                        <li>C(Ti) הוא מספר הקישורים היוצאים מהדפים שמקשרים לדף A.</li>
                        <li>d הוא מקדם ה-'damping factor'.</li>
                    </ul>
                    במילים פשוטות, ה-PageRank של דף מחושב על ידי סכימת חלק מתוך ה-PageRank של הדפים המקשרים אליו, מחולק במספר הקישורים היוצאים מהם.
                </p>

                <p>
                    <strong>מקדם ה-'damping factor' (הסבר על החשיבות שלו).</strong><br />
                    מקדם ה-'damping factor' (בדרך כלל 0.85) מייצג את ההסתברות שגולש ימשיך לגלוש באינטרנט על ידי לחיצה על קישור. בלעדיו, האלגוריתם עלול להתכנס לערכים לא ריאליים. הוא מונע מצב שבו כל ה-PageRank מצטבר בדף אחד.
                </p>

                <p>
                    <strong>מגבלות PageRank והאלגוריתמים המתקדמים של גוגל כיום.</strong><br />
                    PageRank הוא אלגוריתם פשוט יחסית, ויש לו מגבלות. הוא לא מתחשב בתוכן הדף, ברלוונטיות הקישורים, או בספאם קישורים. גוגל כיום משתמשת באלגוריתמים מורכבים יותר שמשלבים מאות גורמים נוספים, כמו BERT, כדי להעריך את איכות ורלוונטיות הדפים.
                </p>

                <p>
                    <strong>סיכום: PageRank כבסיס למנועי חיפוש מודרניים.</strong><br />
                    PageRank היה פריצת דרך משמעותית בתחום מנועי החיפוש, והוא שימש כבסיס לאלגוריתמים מתקדמים יותר. הוא לימד אותנו שקישורים הם מדד חשוב לאיכות ורלוונטיות של דפי אינטרנט, ושהם יכולים לשמש לדירוג תוצאות חיפוש בצורה יעילה.
                </p>
            </section>
        </div>
    );
};

export default PagerankAlgorithmSimplified;