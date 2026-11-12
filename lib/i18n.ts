// In-house English / Hindi localization dictionary for FlameLens
// Zero external dependencies, typed, reliable.

export type Language = "en" | "hi";
export type Audience = "Astronaut" | "Engineer" | "Student";

export interface Translations {
  insightsTitle: string;
  insightsSubtitle: string;
  audienceLabel: string;
  audienceAstronaut: string;
  audienceEngineer: string;
  audienceStudent: string;
  audienceAstronautDesc: string;
  audienceEngineerDesc: string;
  audienceStudentDesc: string;
  languageLabel: string;
  suggestedQuestionsLabel: string;
  inputPlaceholder: string;
  sendButton: string;
  thinking: string;
  sourcesCited: string;
  copyButton: string;
  copiedButton: string;
  fallbackNotice: string;
  generateBriefButton: string;
  briefTitle: string;
  briefSubtitle: string;
  briefScenarioLabel: string;
  briefPrintButton: string;
  briefCloseButton: string;
  verifyNotice: string;
  keyTakeawaysTitle: string;
  keyTakeawaysSubtitle: string;
  keyTakeaway1: string;
  keyTakeaway2: string;
  keyTakeaway3: string;
  keyTakeaway4: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    insightsTitle: "AI Fire-Safety Intelligence Assistant",
    insightsSubtitle:
      "Evidence-backed fire safety insights from ISS microgravity combustion records.",
    audienceLabel: "Target Audience Perspective",
    audienceAstronaut: "Astronaut / Crew",
    audienceEngineer: "Spacecraft Engineer",
    audienceStudent: "Student / Researcher",
    audienceAstronautDesc: "Checklists, smoke drift, egress windows, life-support impact.",
    audienceEngineerDesc: "NASA-STD-6001 material screening, low-flow peaks, extinction kinetics.",
    audienceStudentDesc: "Zero-g flame physics, absent buoyancy, cool flames, spherical halos.",
    languageLabel: "Language",
    suggestedQuestionsLabel: "Suggested Mission Inquiries",
    inputPlaceholder: "Ask about microgravity combustion, material flammability, or suppression...",
    sendButton: "Ask Assistant",
    thinking: "Analyzing microgravity combustion records...",
    sourcesCited: "Evidence Sources Cited",
    copyButton: "Copy Response",
    copiedButton: "Copied!",
    fallbackNotice: "Deterministic response grounded in verified flight records.",
    generateBriefButton: "Generate Mission Fire-Safety Brief",
    briefTitle: "Mission Fire-Safety Assessment Brief",
    briefSubtitle: "Mission-planning summary generated from microgravity flight telemetry.",
    briefScenarioLabel: "Mission Operational Scenario",
    briefPrintButton: "Print / Save PDF",
    briefCloseButton: "Close Brief",
    verifyNotice: "Verify against the original source.",
    keyTakeawaysTitle: "Executive Fire-Safety Takeaways",
    keyTakeawaysSubtitle: "Key findings across 22 microgravity flight experiments.",
    keyTakeaway1: "Low-Flow Peak (1–10 cm/s): Still air starves flames; light ventilation feeds O₂ without cooling, maximizing spread.",
    keyTakeaway2: "Artemis 34% O₂ Hazard: Enriched 34% oxygen speeds flame spread ~62% and ignites standard Nomex textiles.",
    keyTakeaway3: "Invisible Cool Flames: Droplet fuels sustain silent 500–750 K reactions after flameout and reignite if air resumes.",
    keyTakeaway4: "Vehicle-Scale Duct Risk: SAFFIRE showed full-scale fabrics burn at lower O₂ limits than small lab racks predict.",
  },
  hi: {
    insightsTitle: "एआई अग्नि सुरक्षा बुद्धिमत्ता सहायक",
    insightsSubtitle:
      "चंद्रमा और मंगल मिशनों के लिए माइक्रोग्रैविटी दहन डेटा से साक्ष्य-आधारित सुरक्षा अंतर्दृष्टि प्रदान करता है।",
    audienceLabel: "लक्षित दर्शक दृष्टिकोण",
    audienceAstronaut: "अंतरिक्ष यात्री / दल",
    audienceEngineer: "अंतरिक्ष यान इंजीनियर",
    audienceStudent: "छात्र / शोधकर्ता",
    audienceAstronautDesc: "परिचालन चेकलिस्ट, आपातकालीन धुआं प्रसार, निकासी खिड़की, जीवन-रक्षक प्रभाव।",
    audienceEngineerDesc: "सामग्री योग्यता (NASA-STD-6001), कम-प्रवाह ज्वलनशीलता शिखर, आंशिक दबाव, शमन गतिशीलता।",
    audienceStudentDesc: "मूलभूत शून्य-गुरुत्व ज्वाला भौतिकी, उत्प्लावन का अभाव, शीतल ज्वाला रसायन, गोलाकार आभामंडल।",
    languageLabel: "भाषा",
    suggestedQuestionsLabel: "सुझाए गए मिशन प्रश्न",
    inputPlaceholder: "माइक्रोग्रैविटी दहन, सामग्री ज्वलनशीलता या शमन विधियों के बारे में पूछें...",
    sendButton: "पूछें",
    thinking: "माइक्रोग्रैविटी दहन रिकॉर्ड का विश्लेषण हो रहा है...",
    sourcesCited: "उद्धृत साक्ष्य स्रोत",
    copyButton: "उत्तर कॉपी करें",
    copiedButton: "कॉपी हो गया!",
    fallbackNotice: "ह्यूरिस्टिक मोड: सत्यापित उड़ान रिकॉर्ड से नियम-आधारित उत्तर तैयार किया गया।",
    generateBriefButton: "मिशन अग्नि सुरक्षा संक्षिप्त रिपोर्ट बनाएं",
    briefTitle: "मिशन अग्नि सुरक्षा मूल्यांकन रिपोर्ट",
    briefSubtitle: "माइक्रोग्रैविटी दहन टेलीमेट्री से तैयार आधिकारिक मिशन योजना सारांश।",
    briefScenarioLabel: "मिशन परिचालन परिदृश्य",
    briefPrintButton: "प्रिंट / पीडीएफ सेव करें",
    briefCloseButton: "बंद करें",
    verifyNotice: "मूल स्रोत से सत्यापन करें।",
    keyTakeawaysTitle: "प्रमुख अग्नि सुरक्षा निष्कर्ष",
    keyTakeawaysSubtitle: "22 माइक्रोग्रैविटी उड़ान प्रयोगों से प्राप्त उच्च स्तरीय अनुभवजन्य निष्कर्ष।",
    keyTakeaway1: "चरम ज्वलनशीलता खतरा (1–10 सेमी/सेकंड): शांत हवा में आग बुझ जाती है, लेकिन हल्का वेंटिलेशन ज्वाला को ठंडा किए बिना ऑक्सीजन देता रहता है, जिससे आग तेजी से फैलती है।",
    keyTakeaway2: "आर्टेमिस 34% O₂ खतरा: 34% ऑक्सीजन वाला अन्वेषण वातावरण ज्वाला प्रसार को अत्यधिक तेज करता है और सामान्य नोमेक्स कपड़ों को भी ज्वलनशील बना देता है।",
    keyTakeaway3: "अदृश्य शीतल ज्वालाएं (Cool Flames): बूंद और तरल ईंधन कम तापमान (500–750 K) पर बिना दिखाई दिए जलते रह सकते हैं और हवा चलने पर पुनः भड़क सकते हैं।",
    keyTakeaway4: "यान-पैमाने पर डक्ट जोखिम: SAFFIRE प्रयोग ने सिद्ध किया कि बड़े कपड़े और बहुलक प्रयोगशाला की छोटी नलियों की तुलना में कम ऑक्सीजन में भी आग पकड़ते हैं।",
  },
};
