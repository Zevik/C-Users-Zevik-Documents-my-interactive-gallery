// src/index.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { components } from './componentRegistry';
import './index.css';


const App = () => {
    // State לאחסון האינדקס של הקומפוננטה שנבחרה כעת
    const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

    // פונקציה לטיפול בבחירת קומפוננטה מהרשימה
    const handleSelectComponent = (index) => {
        setSelectedComponentIndex(index);
    };

    // פונקציה לחזרה למסך הראשי
    const handleBackToMenu = () => {
        setSelectedComponentIndex(null);
    };

    // קומפוננטת כרטיס לבחירת הדמיה
    const ComponentCard = ({ componentInfo, onSelect, index }) => (
        <div
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer border border-indigo-100"
            onClick={() => onSelect(index)}
        >
            <h3 className="text-2xl font-bold text-violet-700 mb-2">{componentInfo.name}</h3>
            <p className="text-gray-600">{componentInfo.description}</p>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* אם נבחרה קומפוננטה, הצג אותה. אחרת, הצג את התפריט */}
                {selectedComponentIndex !== null ? (
                    <div>
                        <button
                            onClick={handleBackToMenu}
                            className="mb-8 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                        >
                            → חזור לתפריט הראשי
                        </button>
                        {/* רנדור הקומפוננטה שנבחרה */}
                        {components[selectedComponentIndex].component}
                    </div>
                ) : (
                    <div>
                        <header className="text-center mb-12">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-violet-800 mb-4">
                                גלריית הדמיות אינטראקטיביות
                            </h1>
                            <p className="text-xl text-indigo-600">
                                בחרו נושא מהרשימה כדי להתחיל לחקור וללמוד
                            </p>
                        </header>
                        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {components.map((comp, index) => (
                                <ComponentCard
                                    key={index}
                                    componentInfo={comp}
                                    onSelect={handleSelectComponent}
                                    index={index}
                                />
                            ))}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);