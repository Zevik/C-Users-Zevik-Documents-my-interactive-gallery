import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

/**
 * UncannyValleyWhyAreWeAfraidOfRobots Component
 *
 * האפליקציה מציגה סדרה של תמונות, החל מבובות פשוטות ועד לרובוטים שנראים אנושיים להפליא. עבור כל תמונה, המשתמש מתבקש לדרג את רמת אי הנוחות שהוא חש כלפי הדמות, בסקאלה שבין "נעים מאוד" ל"מטריד מאוד". לאחר דירוג מספר תמונות, האפליקציה מציגה גרף הממחיש את הקשר בין מידת הדימיון לאנושיות (ציר ה-X) לבין רמת הנוחות/אי נוחות (ציר ה-Y). הגרף אמור להדגים את צורת ה"עמק" המפורסמת - צניחה חדה בתחושת הנוחות ככל שהדמות מתקרבת לאנושיות, לפני שהיא עולה שוב בדמויות אנושיות לחלוטין.
 */
const UncannyValleyWhyAreWeAfraidOfRobots = () => {
    // TODO: הוסף כאן משתני state, hooks, ופונקציות event handler הדרושים למימוש קונספט האפליקציה.
    const [images, setImages] = useState([
        { id: 1, url: "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47565/slightly-smiling-face-emoji-clipart-xl.png", rating: null, description: "סמיילי", label: "רגשון" },
        { id: 2, url: "https://m.media-amazon.com/images/I/61S3wS-ApRL._AC_UF894,1000_QL80_.jpg", rating: null, description: "בובה מפורטת", label: "בובה" },
        { id: 3, url: "https://static.wikia.nocookie.net/pixar/images/1/15/Woody.png/revision/latest?cb=20230416190803", rating: null, description: "דמות מצוירת", label: "דמות מצוירת" },
        { id: 4, url: "https://cdn.shopify.com/s/files/1/0275/4547/5745/products/il_1588xN.3994204175_t9pm_1024x1024.jpg?v=1678709977", rating: null, description: "רובוט פשוט", label: "רובוט בסיסי" },
        { id: 5, url: "https://ae01.alicdn.com/kf/S879cdf93949a48518268ffc9399ab948N.jpg", rating: null, description: "רובוט מתקדם", label: "רובוט מתקדם" },
        { id: 6, url: "https://i.ytimg.com/vi/jx1-0Q33Ras/maxresdefault.jpg", rating: null, description: "אנדרואיד דמוי אדם", label: "אנדרואיד" }
    ]);
    const [ratings, setRatings] = useState({});
    const [graphData, setGraphData] = useState([]);
    const [showGraph, setShowGraph] = useState(false); // מצב להצגת הגרף
    const [chartInstance, setChartInstance] = useState(null); // לשמור את האובייקט של הגרף

    // פונקציה לטיפול בשינוי דירוג
    const handleRatingChange = (imageId, rating) => {
        setRatings(prevRatings => ({ ...prevRatings, [imageId]: rating }));

        // אופטימיזציה: עדכון התמונה הספציפית בלבד
        setImages(prevImages =>
            prevImages.map(img =>
                img.id === imageId ? { ...img, rating } : img
            )
        );
    };

    // useEffect ליצירת הגרף כאשר הנתונים משתנים ויש מספיק נתונים
    useEffect(() => {
        const validImages = images.filter(img => img.rating !== null);
        setShowGraph(validImages.length === images.length); // הצג גרף רק אם כל התמונות דורגו

        if (validImages.length === images.length) {
            const newGraphData = validImages.map(img => ({
                x: img.label, // שימוש בתוויות במקום ID
                y: img.rating
            }));
            setGraphData(newGraphData);
        } else {
            setGraphData([]);
        }
    }, [ratings, images]);

    // useEffect ליצירת הגרף באמצעות Chart.js
    useEffect(() => {
        if (graphData.length > 0 && showGraph) {
            const ctx = document.getElementById('myChart').getContext('2d');

            // החרבת הגרף הישן לפני יצירת חדש
            if (chartInstance) {
                chartInstance.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: graphData.map(data => data.x),
                    datasets: [{
                        label: 'רמת אי נוחות',
                        data: graphData.map(data => data.y),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.4,
                        fill: false // הסרת המילוי מתחת לקו
                    }]
                },
                options: {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'רמת אי נוחות'
                            },
                            ticks: {
                                stepSize: 1, // הגדרת קפיצות של 1
                                min: 1,        // ערך מינימלי
                                max: 5        // ערך מקסימלי
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'דמיון לאנושיות'
                            }
                        }
                    },
                    animation: {
                        duration: 1000, // משך האנימציה
                        easing: 'easeInOutQuad' // סוג האנימציה
                    },
                    plugins: {
                        legend: {
                            display: false // הסתרת המקרא
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
            setChartInstance(newChartInstance); // שמירת הגרף
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // ניקוי הגרף בפירוק הקומפוננטה
            }
        };
    }, [graphData, showGraph]);

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight animate-pulse">
                העמק המוזר: למה אנחנו מפחדים מרובוטים?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם אי פעם הרגשתם אי נוחות או אפילו פחד כלפי בובה, דמות מצוירת או רובוט שנראה כמעט אנושי? מה גורם לנו להירתע דווקא מהדמיון הזה, ולא ממנו? בואו נצא למסע מטריד אל תוך התודעה שלנו.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">הדגמה אינטראקטיבית</h3>
                <p className="mb-4 text-center">דרג את רמת האי נוחות שלך עבור כל תמונה:</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map(image => (
                        <div key={image.id} className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                            <img
                                src={image.url}
                                alt={image.description}
                                className="mb-3 rounded-md shadow-md w-32 h-32 object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <p className="text-sm text-gray-500 mb-2">{image.description}</p>
                            <div className="flex items-center">
                                <label htmlFor={`rating-${image.id}`} className="mr-2 text-gray-700">רמת אי נוחות:</label>
                                <select
                                    id={`rating-${image.id}`}
                                    value={ratings[image.id] || ""}
                                    onChange={(e) => handleRatingChange(image.id, parseInt(e.target.value))}
                                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-200"
                                >
                                    <option value="">בחר</option>
                                    <option value="1">נעים מאוד</option>
                                    <option value="2">קצת מוזר</option>
                                    <option value="3">לא נעים</option>
                                    <option value="4">מטריד</option>
                                    <option value="5">מטריד מאוד</option>
                                </select>
                            </div>
                            {/* משוב ויזואלי קטן */}
                            {ratings[image.id] && (
                                <div className="mt-2 text-green-600 font-semibold text-sm animate-pulse">
                                    דירגת כ: {ratings[image.id]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* תנאי להצגת הגרף - רק לאחר שכל התמונות דורגו */}
                {showGraph && (
                    <div className="mt-8 w-full">
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">גרף תוצאות</h4>
                        <p className="text-gray-600 mb-4">גרף זה מדגים את הקשר בין מידת הדמיון לאנושיות (ציר ה-X) לבין רמת הנוחות/אי נוחות (ציר ה-Y). שימו לב לצורת העמק!</p>

                        {/* Canvas עבור הגרף */}
                        <canvas id="myChart" width="400" height="200"></canvas>
                    </div>
                )}
                {!showGraph && images.filter(img => img.rating !== null).length > 0 && (
                    <p className="mt-4 text-yellow-500">דרג את כל התמונות כדי לראות את הגרף!</p>
                )}
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                {/* TODO: כתוב כאן את ההסבר המפורט על סמך ראשי הפרקים. השתמש בתגיות p, ul, li, strong וכו'. */}
                <p className="mb-4">
                    <strong>מהו העמק המוזר (Uncanny Valley) וההיסטוריה שלו?</strong>
                    העמק המוזר הוא השערה שלפיה תגובה רגשית של בני אדם כלפי ייצוגים דמויי אדם הופכת לחיובית יותר ככל שהייצוג דומה יותר לבני אדם, אך בנקודה מסוימת חלה ירידה פתאומית בתגובה זו לתגובה של דחייה.
                </p>
                <p className="mb-4">
                    <strong>ההסבר המקורי של מאסאהירו מורי.</strong>
                    מאסאהירו מורי, פרופסור רובוטיקה יפני, הציע את התאוריה בשנת 1970. הוא טען שכאשר מראה של רובוט או בובה הופך קרוב מדי למראה אנושי, צפים פגמים קטנים וגורמים לתחושת אי נוחות.
                </p>
                <p className="mb-4">
                    <strong>הסברים פסיכולוגיים אפשריים:</strong>
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        <strong>תיאוריית ה-mismatch:</strong> חוסר התאמה בין המראה למאפיינים אחרים (כמו תנועה או התנהגות) יוצרת תחושת דיסוננס.
                    </li>
                    <li>
                        <strong>תיאוריית ה-pathogen avoidance:</strong> תכונות דמויות מחלה (כמו עור חיוור) מעוררות תגובת סלידה אינסטינקטיבית.
                    </li>
                    <li>
                        <strong>תיאוריית ה-entity categorization:</strong> קשה לנו לקטלג דמויות שנמצאות "בין הקטגוריות" של אנושי ולא-אנושי.
                    </li>
                </ul>
                <p className="mb-4">
                    <strong>דוגמאות מהחיים האמיתיים:</strong>
                    רובוטים (כמו Sophia), בובות שעווה, סרטים מצוירים (כמו Polar Express), דיפ-פייק.
                </p>
                <p className="mb-4">
                    <strong>ביקורת על תיאוריית העמק המוזר:</strong>
                    האם היא תקפה תרבותית? האם היא תקפה לכל תחום? מחקרים מראים שהתגובה לעמק המוזר יכולה להשתנות בין תרבויות שונות ותלויה גם בהקשר ובסוג הייצוג.
                </p>
                <p className="mb-4">
                    <strong>השלכות אתיות של העמק המוזר בעיצוב רובוטים ובינה מלאכותית:</strong>
                    כיצד עלינו לעצב רובוטים כדי למנוע את אפקט העמק המוזר? האם עלינו לשאוף ליצור רובוטים אנושיים לחלוטין או להשאיר אותם במודע לא-אנושיים?
                </p>
            </section>
        </div>
    );
};

export default UncannyValleyWhyAreWeAfraidOfRobots;