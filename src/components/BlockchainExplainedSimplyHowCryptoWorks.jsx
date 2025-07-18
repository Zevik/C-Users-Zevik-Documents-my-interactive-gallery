import React, { useState, useEffect } from 'react';

/**
 * BlockchainExplainedSimplyHowCryptoWorks Component
 *
 * הסימולציה תאפשר למשתמש 'לבנות' בלוק חדש בשרשרת. המשתמש יתבקש להזין מספר עסקאות או נתונים לדוגמה (למשל, 'יוסי שילם 10 שקלים לשרה'). בצד המסך תופיע שרשרת קיימת של מספר בלוקים. לאחר ההזנה, המערכת תדגים באופן ויזואלי את תהליך יצירת הבלוק: 1. הצגת הנתונים שהוזנו בתוך בלוק ריק. 2. חישוב ה-Hash של הבלוק הקודם וצירופו לבלוק החדש. 3. אנימציה של 'כרייה' – חישוב ה-Hash של הבלוק החדש, תוך שינוי ערך ה-Nonce עד למציאת Hash העומד בדרישות (לדוגמה, מתחיל במספר מסוים של אפסים). 4. כאשר נמצא Hash תקף, הבלוק החדש 'נוסף' באופן ויזואלי לשרשרת הקיימת. התובנה המרכזית: המשתמש יבין כיצד כל בלוק מקושר לקודמו באמצעות Hash קריפטוגרפי, וכיצד תהליך הכרייה (Proof of Work) מבטיח את אבטחת השרשרת ומונע זיופים על ידי הפיכת יצירת בלוקים חדשים למשימה הדורשת מאמץ חישובי משמעותי.
 */
const BlockchainExplainedSimplyHowCryptoWorks = () => {
    // --- Blockchain Simulation Logic ---
    const DIFFICULTY = 4; // Number of leading zeros required for the hash

    // A simple, deterministic, non-cryptographic hash function for demonstration
    // (This is NOT a secure cryptographic hash like SHA256, but serves for visual simulation)
    const calculateHash = (index, previousHash, timestamp, data, nonce) => {
        const stringToHash = `${index}-${previousHash}-${timestamp}-${JSON.stringify(data)}-${nonce}`;
        let hash = 0;
        for (let i = 0; i < stringToHash.length; i++) {
            const char = stringToHash.charCodeAt(i);
            hash = (hash << 5) - hash + char; // Simple JS string hash algorithm
            hash |= 0; // Convert to 32bit integer
        }
        // Return a hex string, padded for visual consistency, to simulate a fixed-length hash
        // We ensure it looks like a longer hash by padding with '0's and slicing.
        return Math.abs(hash).toString(16).padStart(40, '0').slice(0, 40);
    };

    const createGenesisBlock = () => {
        const initialTimestamp = Date.now();
        return {
            index: 0,
            timestamp: initialTimestamp,
            data: "בלוק ראשוני (Genesis Block)",
            previousHash: "0", // Genesis block has no previous hash
            nonce: 0,
            hash: calculateHash(0, "0", initialTimestamp, "בלוק ראשוני (Genesis Block)", 0)
        };
    };

    const [blockchain, setBlockchain] = useState(() => [createGenesisBlock()]);
    const [pendingTransactions, setPendingTransactions] = useState('');
    const [miningState, setMiningState] = useState('idle'); // 'idle', 'preparing', 'mining', 'found', 'adding'
    const [currentNonce, setCurrentNonce] = useState(0);
    const [currentBlockHash, setCurrentBlockHash] = useState('');
    const [newBlockCandidate, setNewBlockCandidate] = useState(null); // The block currently being mined

    const mineNewBlock = async () => {
        if (!pendingTransactions.trim()) {
            alert("אנא הזן עסקאות או נתונים לבלוק החדש.");
            return;
        }

        setMiningState('preparing');
        const lastBlock = blockchain[blockchain.length - 1];
        const newIndex = lastBlock.index + 1;
        const newTimestamp = Date.now();
        const previousHash = lastBlock.hash;
        const data = pendingTransactions.trim();

        let nonce = 0;
        let currentHash = '';
        let found = false;

        setNewBlockCandidate({
            index: newIndex,
            timestamp: newTimestamp,
            data: data,
            previousHash: previousHash,
            nonce: nonce,
            hash: 'ממתין לחישוב...'
        });

        setMiningState('mining');
        setCurrentNonce(nonce);
        
        const mineIteration = () => {
            if (found) return; // Stop if found in a previous iteration

            currentHash = calculateHash(newIndex, previousHash, newTimestamp, data, nonce);
            setCurrentBlockHash(currentHash);
            setCurrentNonce(nonce);

            if (currentHash.substring(0, DIFFICULTY) === "0".repeat(DIFFICULTY)) {
                found = true;
                setMiningState('found');
                const minedBlock = {
                    index: newIndex,
                    timestamp: newTimestamp,
                    data: data,
                    previousHash: previousHash,
                    nonce: nonce,
                    hash: currentHash
                };
                setNewBlockCandidate(minedBlock);

                setTimeout(() => {
                    setMiningState('adding');
                    setBlockchain(prevChain => [...prevChain, minedBlock]);
                    setPendingTransactions('');
                    setMiningState('idle'); // Reset state to allow new mining
                    setNewBlockCandidate(null); // Clear candidate block
                    setCurrentNonce(0); // Reset nonce display
                    setCurrentBlockHash(''); // Reset hash display
                }, 1000); // Small delay before adding block for visual effect
                return;
            }

            nonce++;
            // Use setTimeout to avoid blocking the UI and simulate mining progress.
            // Add a slight delay for visual effect for every 100 nonces, allowing more frequent UI updates.
            const delay = nonce % 100 === 0 ? 1 : 0; 
            
            if (nonce < 1000000) { // Limit nonce attempts to prevent infinite loops in demo
                setTimeout(mineIteration, delay);
            } else {
                setMiningState('error');
                alert("כרייה נכשלה: לא נמצא Hash תקין במספר ניסיונות סביר. נסה שוב עם נתונים אחרים.");
                // Reset states to allow user to try again after failure
                setMiningState('idle'); 
                setNewBlockCandidate(null); 
                setCurrentNonce(0); 
                setCurrentBlockHash(''); 
            }
        };

        mineIteration();
    };

    // --- End Blockchain Simulation Logic ---

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                בלוקצ'יין בפשטות: איך עובדת הטכנולוגיה שמאחורי הקריפטו?
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                האם תהיתם פעם איך כסף דיגיטלי, כמו ביטקוין, יכול לעבור מיד ליד מבלי שיהיה בנק מרכזי שיפקח עליו? איך מובטח שאף אחד לא יזייף עסקאות או יוציא את אותו הכסף פעמיים? הסוד טמון בטכנולוגיה מהפכנית שנקראת בלוקצ'יין.
            </p>

            {/* האינטראקציה הראשית */}
            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">הדגמה אינטראקטיבית: צור בלוק חדש!</h3>

                <div className="w-full flex flex-col md:flex-row gap-6">
                    {/* Input and Mining Control */}
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                        <label htmlFor="transactions" className="block text-lg font-medium text-gray-700 mb-2">
                            הזן עסקאות/נתונים לבלוק החדש:
                        </label>
                        <textarea
                            id="transactions"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                            rows="4"
                            placeholder="לדוגמה: יוסי שילם 10 שקלים לשרה, אלי קנה קפה..."
                            value={pendingTransactions}
                            onChange={(e) => setPendingTransactions(e.target.value)}
                            disabled={miningState !== 'idle'}
                        ></textarea>
                        <button
                            onClick={mineNewBlock}
                            disabled={miningState !== 'idle' || !pendingTransactions.trim()}
                            className={`mt-4 w-full py-3 px-6 rounded-lg text-white text-lg font-semibold transition-all duration-300
                            ${miningState === 'idle' && pendingTransactions.trim()
                                ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2'
                                : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            {miningState === 'idle' ? 'התחל כריית בלוק חדש' : 'כורה... אנא המתן'}
                        </button>

                        {(miningState === 'mining' || miningState === 'found') && (
                            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-center">
                                <p className="font-semibold text-yellow-800">
                                    {miningState === 'mining' ? 'מחשב Hash מתאים (Proof of Work)...' : 'Hash תקין נמצא!'}
                                </p>
                                <p className="text-gray-700">Nonce: <span className="font-mono text-purple-700">{currentNonce}</span></p>
                                <p className="text-gray-700">Hash נוכחי: <span className="font-mono break-all text-purple-700">{currentBlockHash || '...'}</span></p>
                                <p className="text-gray-700">דרישת קושי: Hash מתחיל ב-<span className="font-mono text-green-700">{'"' + "0".repeat(DIFFICULTY) + '"'}</span></p>
                            </div>
                        )}
                        {miningState === 'adding' && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-center text-green-800 font-semibold">
                                הבלוק החדש מתווסף לשרשרת!
                            </div>
                        )}
                    </div>

                    {/* New Block Candidate Display */}
                    {newBlockCandidate && (
                        <div className="flex-1 p-4 bg-purple-50 rounded-lg shadow-inner border border-purple-200">
                            <h4 className="text-xl font-bold text-purple-700 mb-4">בלוק חדש בתהליך:</h4>
                            <div className="bg-white p-4 rounded-lg shadow-md border border-purple-300">
                                <p className="text-sm text-gray-600"><strong>אינדקס:</strong> {newBlockCandidate.index}</p>
                                <p className="text-sm text-gray-600"><strong>Hash קודם:</strong> <span className="font-mono text-blue-700 break-all">{newBlockCandidate.previousHash}</span></p>
                                <p className="text-sm text-gray-600"><strong>נתונים:</strong> <span className="font-medium">{newBlockCandidate.data}</span></p>
                                <p className="text-sm text-gray-600"><strong>Nonce:</strong> <span className="font-mono text-green-700">{newBlockCandidate.nonce}</span></p>
                                <p className="text-sm text-gray-600"><strong>Hash נוכחי:</strong> <span className={`font-mono break-all ${miningState === 'found' || miningState === 'adding' ? 'text-green-700' : 'text-gray-500'}`}>{currentBlockHash || newBlockCandidate.hash}</span></p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Blockchain Display */}
                <div className="mt-12 w-full">
                    <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">שרשרת הבלוקים הקיימת:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blockchain.map((block, index) => (
                            <div key={block.index} className={`relative p-6 bg-white rounded-xl shadow-lg border-2 ${index === blockchain.length - 1 ? 'border-indigo-500 transform scale-105' : 'border-gray-200'} transition-all duration-300 ease-in-out`}>
                                <div className="absolute top-2 right-2 text-xs font-semibold text-gray-400">#{block.index}</div>
                                <h4 className="text-lg font-bold text-purple-700 mb-2">בלוק #{block.index}</h4>
                                <p className="text-sm text-gray-600 mb-1"><strong>זמן:</strong> {new Date(block.timestamp).toLocaleString('he-IL')}</p>
                                <p className="text-sm text-gray-600 mb-1"><strong>נתונים:</strong> <span className="font-medium text-gray-800">{block.data}</span></p>
                                <p className="text-sm text-gray-600 mb-1"><strong>Hash קודם:</strong> <span className="font-mono text-blue-600 break-all">{block.previousHash.substring(0, 15)}...</span></p>
                                <p className="text-sm text-gray-600 mb-1"><strong>Nonce:</strong> <span className="font-mono text-green-600">{block.nonce}</span></p>
                                <p className="text-sm text-gray-600"><strong>Hash:</strong> <span className="font-mono text-violet-700 break-all">{block.hash.substring(0, 15)}...</span></p>
                                {index < blockchain.length - 1 && (
                                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-300 z-10 animate-pulse"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* הסבר מדעי/תיאורטי */}
            <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                    ההסבר המדעי
                </h2>
                <p className="mb-4 text-lg">
                    <strong>מהו בלוקצ'יין?</strong> בלוקצ'יין הוא למעשה ספר חשבונות דיגיטלי, מבוזר ובלתי ניתן לשינוי. במקום שגורם מרכזי אחד (כמו בנק) ינהל את כל הנתונים, המידע מפוזר על פני רשת של מחשבים (צמתים), וכל בלוק מידע חדש מתווסף לשרשרת באופן כרונולוגי וקריפטוגרפי.
                </p>

                <p className="mb-4 text-lg">
                    <strong>אבני הבניין של הבלוקצ'יין:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
                    <li>
                        <strong>בלוק:</strong> כל בלוק הוא 'דף' בספר החשבונות. הוא מכיל קבוצה של נתונים או עסקאות (לדוגמה, עסקאות ביטקוין), את ה-Hash (חתימה דיגיטלית) של הבלוק הקודם בשרשרת, וערך ייחודי הנקרא Nonce.
                    </li>
                    <li>
                        <strong>Hash (פונקציית גיבוב):</strong> זהו מזהה ייחודי, כמו "טביעת אצבע" דיגיטלית, לכל בלוק. פונקציית גיבוב קריפטוגרפית ממירה כל קלט (נתוני הבלוק) לפלט בעל אורך קבוע, שנראה אקראי לחלוטין. שינוי אפילו של תו אחד קטן בנתוני הבלוק ישנה את ה-Hash שלו באופן דרמטי. ה-Hash קריטי לאבטחה ולקישוריות: כל בלוק מכיל את ה-Hash של קודמו, וכך נוצרת שרשרת בלתי ניתנת לניתוק.
                    </li>
                    <li>
                        <strong>Nonce:</strong> זהו מספר המשמש פעם אחת בלבד. בתהליך ה'כרייה', הכורים משנים את ערך ה-Nonce שוב ושוב, כדי לשנות את ה-Hash של הבלוק הנוכחי, עד שהם מוצאים Hash העומד בדרישות מסוימות (לדוגמה, מתחיל במספר מסוים של אפסים).
                    </li>
                </ul>

                <p className="mb-4 text-lg">
                    <strong>כיצד נוצר בלוק חדש (תהליך הכרייה - Proof of Work):</strong> כדי להוסיף בלוק חדש לשרשרת, כורה (או מחשב) צריך לפתור "חידה" חישובית. החידה היא למצוא ערך Nonce כזה, שכאשר הוא משולב עם נתוני הבלוק וה-Hash הקודם, ה-Hash של הבלוק החדש יעמוד בדרישת קושי מסוימת (לדוגמה, יתחיל בארבעה אפסים). תהליך זה דורש מאמץ חישובי משמעותי, וזוהי הוכחת עבודה (Proof of Work). מי שמוצא את הפתרון ראשון, זוכה לתגמול (כמו ביטקוין חדשים) ובלוקו מתווסף לשרשרת.
                </p>

                <p className="mb-4 text-lg">
                    <strong>כיצד הבלוקים מקושרים זה לזה:</strong> הקשר בין הבלוקים הוא לב הבלוקצ'יין. כל בלוק חדש מכיל את ה-Hash של הבלוק שקדם לו. אם מישהו מנסה לשנות נתונים בבלוק ישן, ה-Hash שלו ישתנה באופן מיידי, וכך גם ה-Hash של כל הבלוקים הבאים אחריו בשרשרת. שרשרת ה-Hashes הזו היא מה שהופך את הבלוקצ'יין למאובטח.
                </p>

                <p className="mb-4 text-lg">
                    <strong>למה הבלוקצ'יין מאובטח וקשה לזיוף?</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
                    <li>
                        <strong>בלתי-משתנה (Immutability):</strong> ברגע שבלוק נוסף לשרשרת, כמעט בלתי אפשרי לשנות אותו. כל שינוי ידרוש חישוב מחדש של ה-Hash של הבלוק המשתנה ושל כל הבלוקים הבאים אחריו, מה שדורש כוח חישוב עצום.
                    </li>
                    <li>
                        <strong>מבוזרות (Decentralization):</strong> הבלוקצ'יין מופץ על פני אלפי מחשבים. כדי לזייף עסקה, יש לשנות אותה ביותר מ-50% מהעותקים של הבלוקצ'יין בו-זמנית, משימה כמעט בלתי אפשרית.
                    </li>
                    <li>
                        <strong>הקושי לשנות נתונים בדיעבד:</strong> תהליך הכרייה דורש השקעת אנרגיה וזמן. שינוי בלוק אחד מחייב "כרייה מחדש" של כל הבלוקים שבאים אחריו, מה שהופך תקיפה כזו ללא כדאית מבחינה כלכלית וחישובית.
                    </li>
                </ul>

                <p className="mb-4 text-lg">
                    <strong>יישומים נפוצים של בלוקצ'יין:</strong> מעבר למטבעות קריפטוגרפיים כמו ביטקוין ואת'ריום, לבלוקצ'יין יש מגוון רחב של יישומים פוטנציאליים: ניהול שרשרת אספקה (למעקב אחר מוצרים), זכויות יוצרים (לרישום בעלות על יצירות), מערכות הצבעה מאובטחות, ניהול רשומות רפואיות ועוד.
                </p>
            </section>
        </div>
    );
};

export default BlockchainExplainedSimplyHowCryptoWorks;