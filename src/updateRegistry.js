// src/updateRegistry.js

const fs = require('fs');
const path = require('path');

// הגדרת נתיבים
const componentsDir = path.join(__dirname, 'components');
const registryFile = path.join(__dirname, 'componentRegistry.js');

console.log('Running component registry update script...');
console.log(`Scanning directory: ${componentsDir}`);

try {
    // 1. קריאת כל הקבצים מתיקיית הקומפוננטות
    const componentFiles = fs.readdirSync(componentsDir)
        .filter(file => file.endsWith('.jsx') || file.endsWith('.tsx')); // סנן רק קבצי JSX/TSX

    if (componentFiles.length === 0) {
        console.warn('No component files found in the components directory. Exiting.');
        return;
    }

    console.log(`Found ${componentFiles.length} components.`);

    // 2. יצירת הצהרות ייבוא (import statements)
    const importStatements = componentFiles.map(file => {
        const componentName = path.parse(file).name; // שם הקובץ ללא סיומת
        return `import ${componentName} from './components/${file}';`;
    }).join('\n');


    // פונקציית עזר להמרת שם קובץ לשם קריא
    function formatComponentName(fileName) {
        // מסיר סיומת .jsx
        const nameWithoutExtension = path.parse(fileName).name;
        // מחלק את השם לפי אותיות גדולות ויוצר רווחים
        const words = nameWithoutExtension.replace(/([a-z])([A-Z])/g, '$1 $2');
        return words;
    }

    // 3. יצירת רשומות המערך
    const arrayEntries = componentFiles.map(file => {
        const componentName = path.parse(file).name;
        const displayName = formatComponentName(file);

        return `
    {
        name: "${displayName}",
        component: <${componentName} />,
        description: "תיאור לקומפוננטה זו יתווסף בהמשך." 
    }`;
    }).join(',');

    // 4. הרכבת התוכן המלא של הקובץ החדש
    const fileContent = `// ##################################################################
// #      !!! קובץ זה נוצר באופן אוטומטי על ידי סקריפט !!!       #
// #          כל שינוי ידני בקובץ זה יימחק בהרצה הבאה          #
// ##################################################################

import React from 'react';

// Component Imports
${importStatements}

// הוסף כאן ייבוא של קומפוננטות חדשות בעתיד

export const components = [${arrayEntries}
];
`;

    // 5. כתיבת התוכן החדש לקובץ הרישום (דריסה מלאה)
    fs.writeFileSync(registryFile, fileContent);

    console.log('✅ componentRegistry.js has been successfully updated!');
    console.log('Next step: You may want to manually update the descriptions in the generated file.');

} catch (error) {
    console.error('❌ An error occurred while updating the component registry:');
    console.error(error);
}