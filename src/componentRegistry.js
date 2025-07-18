// src/componentRegistry.js

import React from 'react';
import AntBrainSwarmIntelligence from './components/AntBrainSwarmIntelligence.jsx';
import AntikytheraMechanism from './components/AntikytheraMechanism.jsx';
import BanachTarskiParadoxOneBallTwoBalls from './components/BanachTarskiParadoxOneBallTwoBalls.jsx';
import BlockchainExplainedSimplyHowCryptoWorks from './components/BlockchainExplainedSimplyHowCryptoWorks.jsx';
import DunningKrugerEffectWhyWeDontKnowThatWeDontKnow from './components/DunningKrugerEffectWhyWeDontKnowThatWeDontKnow.jsx';
import EpigeneticsEnvironmentActivatesGenes from './components/EpigeneticsEnvironmentActivatesGenes.jsx';
import HerdImmunityTheCommunityShield from './components/HerdImmunityTheCommunityShield.jsx';
import HowNoiseCancellingHeadphonesWork from './components/HowNoiseCancellingHeadphonesWork.jsx';
import KochSnowflakeInfinityInFiniteness from './components/KochSnowflakeInfinityInFiniteness.jsx';
import LightFromDarknessAJourneyIntoSonoluminescence from './components/LightFromDarknessAJourneyIntoSonoluminescence.jsx';
import MaillardReaction from './components/MaillardReaction.jsx';
import MaxwellsDemonChallengingTheLawsOfThermodynamics from './components/MaxwellsDemonChallengingTheLawsOfThermodynamics.jsx';
import MayanWritingSystemDeciphering from './components/MayanWritingSystemDeciphering.jsx';
import OctopusIntelligenceProblemSolving from './components/OctopusIntelligenceProblemSolving.jsx';
import PagerankAlgorithmSimplified from './components/PagerankAlgorithmSimplified.jsx';
import PangolinSecretsArmorAndSurvival from './components/PangolinSecretsArmorAndSurvival.jsx';
import PrisonersDilemmaWhenPersonalLogicRuinsCommonInterest from './components/PrisonersDilemmaWhenPersonalLogicRuinsCommonInterest.jsx';
import QuantumEntanglement from './components/QuantumEntanglement.jsx';
import SuspensionBridgesTheSecretBehindThePhysicalGiant from './components/SuspensionBridgesTheSecretBehindThePhysicalGiant.jsx';
import TheChaosOfAButterflyABreezeThatChangesTheWorld from './components/TheChaosOfAButterflyABreezeThatChangesTheWorld.jsx';
import TheDancingPlagueOf1518TheMysteryThatBewilderedEurope from './components/TheDancingPlagueOf1518TheMysteryThatBewilderedEurope.jsx';
import TheGreatEmuWar from './components/TheGreatEmuWar.jsx';
import ThePowerOfBeliefPlaceboEffect from './components/ThePowerOfBeliefPlaceboEffect.jsx';
import ThePowerOfWeakTiesWhyDistantAcquaintanceOpensDoors from './components/ThePowerOfWeakTiesWhyDistantAcquaintanceOpensDoors.jsx';
import TheSecretOfDesirePathsHowPedestriansDesignBetterCities from './components/TheSecretOfDesirePathsHowPedestriansDesignBetterCities.jsx';
import TheseusShipParadox from './components/TheseusShipParadox.jsx';
import TimeTravelTwinParadox from './components/TimeTravelTwinParadox.jsx';
import TrolleyProblem from './components/TrolleyProblem.jsx';
import UncannyValleyWhyAreWeAfraidOfRobots from './components/UncannyValleyWhyAreWeAfraidOfRobots.jsx';

export const components = [
    {
        name: "מוח הנמלים - אינטליגנציה נחילית",
        description: "גלו כיצד נמלים פועלות יחד כמוח אחד גדול ליצירת פתרונות מורכבים",
        component: <AntBrainSwarmIntelligence />
    },
    {
        name: "מנגנון אנטיקיתרה - המחשב העתיק",
        description: "המכונה היוונית המסתורית שחזתה את תנועות הכוכבים לפני 2000 שנה",
        component: <AntikytheraMechanism />
    },
    {
        name: "פרדוקס בנך-טרסקי - כדור אחד הופך לשניים",
        description: "איך מתמטיקה יכולה להכפיל כדור לשני כדורים זהים בגודל המקורי",
        component: <BanachTarskiParadoxOneBallTwoBalls />
    },
    {
        name: "בלוקצ'יין פשוט - כיצד קריפטו עובד",
        description: "הבנה פשוטה ונגישה של הטכנולוגיה מאחורי המטבעות הדיגיטליים",
        component: <BlockchainExplainedSimplyHowCryptoWorks />
    },
    {
        name: "אפקט דנינג-קרוגר - למה אנחנו לא יודעים שאנחנו לא יודעים",
        description: "המנגנון הפסיכולוגי שגורם לאנשים לא מיומנים להעריך יתר על המידה את עצמם",
        component: <DunningKrugerEffectWhyWeDontKnowThatWeDontKnow />
    },
    {
        name: "אפיגנטיקה - הסביבה מפעילה גנים",
        description: "כיצד הסביבה והתנהגויות שלנו משפיעות על ביטוי הגנים מבלי לשנות את ה-DNA",
        component: <EpigeneticsEnvironmentActivatesGenes />
    },
    {
        name: "חסינות עדר - המגן הקהילתי",
        description: "איך חיסונים של חלק מהאוכלוסייה מגנים על כולם",
        component: <HerdImmunityTheCommunityShield />
    },
    {
        name: "אוזניות ביטול רעש - כיצד הן עובדות",
        description: "הטכנולוגיה המרתקת מאחורי יצירת שקט באמצעות גלי קול הפוכים",
        component: <HowNoiseCancellingHeadphonesWork />
    },
    {
        name: "פתית שלג קוך - אינסוף בסופיות",
        description: "הצורה הגיאומטרית שמוכיחה שיכול להיות היקף אינסופי בשטח סופי",
        component: <KochSnowflakeInfinityInFiniteness />
    },
    {
        name: "אור מחושך - מסע אל הסונולומינסנציה",
        description: "התופעה המדהימה שבה בועות קוטנות יוצרות אור בטמפרטורות גבוהות מהשמש",
        component: <LightFromDarknessAJourneyIntoSonoluminescence />
    },
    {
        name: "תגובת מייאר - הקסם מאחורי הטעם והריח של אוכל מבושל",
        description: "התהליך הכימי שיוצר את הטעמים והריחות המופלאים של אוכל מבושל",
        component: <MaillardReaction />
    },
    {
        name: "שד מקסוול - מאתגר את חוקי התרמודינמיקה",
        description: "הניסוי המחשבתי שמטלטל את ההבנה שלנו על האנטרופיה והחוק השני",
        component: <MaxwellsDemonChallengingTheLawsOfThermodynamics />
    },
    {
        name: "פיענוח כתב המאיה - פתיחת חלון לעבר",
        description: "הסיפור המרתק של פיענוח אחת מערכות הכתב העתיקות והמורכבות בעולם",
        component: <MayanWritingSystemDeciphering />
    },
    {
        name: "תבונת התמנון - פתרון בעיות ברמה גבוהה",
        description: "חקירת האינטליגנציה המדהימה של יצורים ללא עמוד שדרה",
        component: <OctopusIntelligenceProblemSolving />
    },
    {
        name: "אלגוריתם PageRank - איך גוגל דירגה את האינטרנט",
        description: "האלגוריתם שחולל מהפכה בחיפוש ברשת ויצר את אימפריית גוגל",
        component: <PagerankAlgorithmSimplified />
    },
    {
        name: "סודות הפנגולין - שריון וישרדות",
        description: "הייצור היחיד עם קשקשים שהוא גם סמל לפגיעות ולחוסן בטבע",
        component: <PangolinSecretsArmorAndSurvival />
    },
    {
        name: "דילמת האסיר - כשההיגיון האישי הורס את האינטרס הכללי",
        description: "המצב הקלאסי בתורת המשחקים שמסביר התנהגויות חברתיות ופוליטיות",
        component: <PrisonersDilemmaWhenPersonalLogicRuinsCommonInterest />
    },
    {
        name: "הסתבכות קוונטית - הקשר המסתורי",
        description: "התופעה המדהימה שבה חלקיקים מקושרים ברגש ללא קשר למרחק ביניהם",
        component: <QuantumEntanglement />
    },
    {
        name: "גשרים תלויים - הסוד מאחורי הענק הפיזי",
        description: "איך הנדסה חכמה מאפשרת לגשרים להחזיק טונות של משקל על פרושים ענקיים",
        component: <SuspensionBridgesTheSecretBehindThePhysicalGiant />
    },
    {
        name: "כאוס הפרפר - נשיבה שמשנה את העולם",
        description: "איך שינויים זעירים יכולים לגרום לתוצאות דרמטיות - תורת הכאוס",
        component: <TheChaosOfAButterflyABreezeThatChangesTheWorld />
    },
    {
        name: "מגפת הריקוד של 1518 - התעלומה שהדהימה את אירופה",
        description: "האירוע ההיסטורי המוזר שבו מאות אנשים רקדו עד מוות ללא הפסקה",
        component: <TheDancingPlagueOf1518TheMysteryThatBewilderedEurope />
    },
    {
        name: "מלחמת האמו הגדולה - כשציפורים ניצחו צבא",
        description: "הסיפור המופלא על מלחמה בין חיילים אוסטרליים לציפורי אמו - ומי ניצח",
        component: <TheGreatEmuWar />
    },
    {
        name: "כוח האמונה - אפקט הפלצבו",
        description: "איך המוח שלנו יכול לרפא את הגוף באמצעות אמונה בלבד",
        component: <ThePowerOfBeliefPlaceboEffect />
    },
    {
        name: "כוח הקשרים החלשים - למה מכרים רחוקים פותחים דלתות",
        description: "מדוע אנשים שאנחנו בקושי מכירים לעתים עוזרים לנו יותר מחברים קרובים",
        component: <ThePowerOfWeakTiesWhyDistantAcquaintanceOpensDoors />
    },
    {
        name: "סוד שבילי הרצון - איך הולכי רגל מעצבים ערים טובות יותר",
        description: "איך שבילים לא מתוכננים שנוצרים על ידי הולכי רגל מלמדים אותנו על עיצוב עירוני",
        component: <TheSecretOfDesirePathsHowPedestriansDesignBetterCities />
    },
    {
        name: "פרדוקס ספינת תזאוס - מה עושה אותנו אנחנו",
        description: "השאלה הפילוסופית הקלאסית על זהות ושינוי לאורך זמן",
        component: <TheseusShipParadox />
    },
    {
        name: "פרדוקס התאומים - מסע בזמן למתחילים",
        description: "איך מהירות גבוהה יכולה לגרום לתאום אחד להזדקן לאט יותר מהשני",
        component: <TimeTravelTwinParadox />
    },
    {
        name: "בעיית הרכבת - דילמה מוסרית קלאסית",
        description: "האם מותר להציל חמישה אנשים על ידי הריגת אדם אחד? דילמה שבוחנת את המוסר שלנו",
        component: <TrolleyProblem />
    },
    {
        name: "עמק האימה - למה אנחנו מפחדים מרובוטים",
        description: "התופעה הפסיכולוגית שגורמת לנו לחוש אי נוחות מדמויות כמעט אנושיות",
        component: <UncannyValleyWhyAreWeAfraidOfRobots />
    }
];
