import { useLanguage } from "@/contexts/LanguageContext";

interface Translations {
  // Landing page
  title: string;
  subtitle: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  getStarted: string;
  multiLanguageTitle: string;
  multiLanguageDescription: string;
  expertKnowledgeTitle: string;
  expertKnowledgeDescription: string;
  assistanceTitle: string;
  assistanceDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  startChatting: string;

  // Chat page
  welcomeTitle: string;
  welcomeDescription: string;
  askQuestionsTitle: string;
  askQuestionsDescription: string;
  multipleLanguagesTitle: string;
  multipleLanguagesDescription: string;
  inputPlaceholder: string;
  inputHint: string;
  inputHintMobile: string;
  charactersMinimum: string;
  connectionError: string;
  connectionErrorDescription: string;
  documentUploaded: string;
  documentUploadedDescription: string;
  uploadFailed: string;
  sources: string;
  home: string;
  language: string;
}

const translations: Record<string, Translations> = {
  en: {
    title: "Nile Tech AI Farm Advisory",
    subtitle: "Your intelligent farming assistant",
    heroTitle: "Transform Your Farm with",
    heroHighlight: "AI-Powered Advice",
    heroDescription:
      "Get expert agricultural guidance in your preferred language. Our AI assistant helps with crop management, soil health, pest control, and sustainable farming practices.",
    getStarted: "Get Started",
    multiLanguageTitle: "Multi-Language Support",
    multiLanguageDescription:
      "Available in English, Amharic, Tigrigna, Afaan Oromo, and Somali for farmers across different regions",
    expertKnowledgeTitle: "Expert Knowledge",
    expertKnowledgeDescription:
      "Access comprehensive agricultural expertise covering crops, livestock, soil management, and more",
    assistanceTitle: "24/7 Assistance",
    assistanceDescription:
      "Get instant answers to your farming questions anytime, anywhere, with reliable AI guidance",
    ctaTitle: "Ready to Revolutionize Your Farming?",
    ctaDescription:
      "Join thousands of farmers who are already using AI to make smarter decisions and increase their yields.",
    startChatting: "Start Chatting Now",
    welcomeTitle: "Welcome to AI Farm Advisory!",
    welcomeDescription:
      "I'm your intelligent farming assistant. Ask me anything about agriculture, crop management, soil health, pest control, or farming techniques.",
    askQuestionsTitle: "Ask Questions",
    askQuestionsDescription:
      "Get expert advice on farming practices and crop management",
    multipleLanguagesTitle: "Multiple Languages",
    multipleLanguagesDescription:
      "Available in English, Amharic, Tigrigna, Afaan Oromo, and Somali",
    inputPlaceholder: "Ask any agricultural question...",
    inputHint:
      "Press Enter to send, Shift+Enter for new line, minimum 2 characters",
    inputHintMobile: "Minimum 2 characters required",
    charactersMinimum: "characters minimum",
    connectionError: "Connection Error",
    connectionErrorDescription: "Failed to send message",
    documentUploaded: "Document Uploaded",
    documentUploadedDescription:
      "has been processed and added to the knowledge base.",
    uploadFailed: "Upload Failed",
    sources: "Sources",
    home: "Home",
    language: "Language",
  },
  am: {
    title: "ናይል ኬር AI የግብርና አማካሪ",
    subtitle: "የእርስዎ ዘመናዊ የግብርና አማካሪ",
    heroTitle: "እርሻዎን ለወጡ በ",
    heroHighlight: "AI-የተደገፈ ምክር",
    heroDescription:
      "በእርስዎ የሚወዱት ቋንቋ ባለሙያ የግብርና መምሪያ ያግኙ። የእኛ AI አማካሪ በሰብል አያያዝ፣ የአፈር ጤንነት፣ የተባይ መቆጣጠሪያ እና ዘላቂ የግብርና ልምዶች ይረዳል።",
    getStarted: "ይጀምሩ",
    multiLanguageTitle: "ባለብዙ ቋንቋ ድጋፍ",
    multiLanguageDescription:
      "በእንግሊዝኛ፣ አማርኛ፣ ትግርኛ፣ አፋን ኦሮሞ እና ሶማሊኛ ለተለያዩ ክልሎች ገበሬዎች ይገኛል",
    expertKnowledgeTitle: "የባለሙያ ዕውቀት",
    expertKnowledgeDescription:
      "ሰብሎችን፣ እንስሳትን፣ የአፈር አያያዝን እና ሌሎችንም የሚሸፍን ሰፊ የግብርና ብልህነት ይድረሱ",
    assistanceTitle: "24/7 እርዳታ",
    assistanceDescription:
      "በማንኛውም ጊዜ፣ በማንኛውም ቦታ፣ አስተማማኝ AI መመሪያ ለእርሻ ጥያቄዎች ፈጣን መልስ ያግኙ",
    ctaTitle: "የእርሻ ስራዎን ለመቀየር ዝግጁ ነዎት?",
    ctaDescription:
      "ቀድሞውንም AI ተጠቅመው ብልጥ ውሳኔ የሚወስዱና ምርታቸውን የሚጨምሩ በሺዎች የሚቆጠሩ ገበሬዎች ይቀላቀሉ።",
    startChatting: "ውይይት ይጀምሩ",
    welcomeTitle: "ወደ AI የግብርና አማካሪ እንኳን በደህና መጣችሁ!",
    welcomeDescription:
      "እኔ የእርስዎ ዘመናዊ የግብርና አማካሪ ነኝ። ስለ ግብርና፣ የሰብል አያያዝ፣ የአፈር ጤንነት፣ የተባይ መቆጣጠሪያ ወይም የእርሻ ቴክኒኮች ማንኛውንም ያንሱ።",
    askQuestionsTitle: "ጥያቄዎችን ይጠይቁ",
    askQuestionsDescription: "ስለ የእርሻ ልምዶች እና የሰብል አያያዝ ባለሙያ ምክር ያግኙ",
    multipleLanguagesTitle: "በርካታ ቋንቋዎች",
    multipleLanguagesDescription: "በእንግሊዝኛ፣ አማርኛ፣ ትግርኛ፣ አፋን ኦሮሞ እና ሶማሊኛ ይገኛል",
    inputPlaceholder: "ማንኛውንም የግብርና ጥያቄ ይጠይቁ...",
    inputHint: "ለመላክ Enter ይጫኑ፣ አዲስ መስመር ለማግኘት Shift+Enter ይጫኑ፣ ቢያንስ 2 ቁምፊዎች",
    inputHintMobile: "ቢያንስ 2 ቁምፊዎች ያስፈልጋል",
    charactersMinimum: "ቁምፊዎች ቢያንስ",
    connectionError: "የግንኙነት ስህተት",
    connectionErrorDescription: "መልዕክት መላክ አልተሳካም",
    documentUploaded: "ሰነድ ተሰቅሏል",
    documentUploadedDescription: "ተሰርቷል እና ወደ እውቀት ማከማቻ ተጨምሯል።",
    uploadFailed: "መስቀል አልተሳካም",
    sources: "ምንጮች",
    home: "ቤት",
    language: "ቋንቋ",
  },
  ti: {
    title: "ናይል ኬር AI የእርሻ አማካሪ",
    subtitle: "ናይኩም ብልሒ እርሻ አማካሪ",
    heroTitle: "እርሻኹም ቀይሩ ብ",
    heroHighlight: "AI-ዝተደገፈ ምኽሪ",
    heroDescription:
      "ብዝደለኹዎ ቋንቋ ባህርያዊ የእርሻ መምሪያ ተቐበሉ። ናይ AI አማካሪና ብሰብል ምሕላው፣ ናይ መሬት ጥዕና፣ ናይ ተባዕ ምቁጽጻር እና ዘላቂ እርሻ ልምዳት ይሕግዝኹም።",
    getStarted: "ጀምሩ",
    multiLanguageTitle: "ብዙሕ ቋንቋ ደገፍ",
    multiLanguageDescription:
      "ብእንግሊዝኛ፣ አማርኛ፣ ትግርኛ፣ አፋን ኦሮሞ እና ሶማሊኛ ንተፈላለዩ ከባቢታት ገበሬታት ይርከብ",
    expertKnowledgeTitle: "ባላዕርፍቲ ፍልጠት",
    expertKnowledgeDescription:
      "ሰብላት፣ እንስሳት፣ ናይ መሬት ምሕላው፣ እምባኣር ዝሸፍን ሰፊሕ እርሻዊ ብልሒ ተበጻሕዎ",
    assistanceTitle: "24/7 ሓገዝ",
    assistanceDescription:
      "ንእርሻ ሕቶታትኹም ፈጣን መልሲ ረኺብኩም፣ ኣብ ዝኾነ እዋን፣ ኣብ ዝኾነ ቦታ፣ ንቡር AI መምርሒ ዝስዕብ",
    ctaTitle: "እርሻኹም ንምቕይር ድሉዋት ድዩ?",
    ctaDescription:
      "ቐድሞውን AI ተጠቒሞም ብልሒ ውሳኔ ዝወስዱን ፍርያቶም ዝውስኹን በሺሓት ዝቑጸሩ ገበሬታት ተመላለሱ።",
    startChatting: "ዘረባ ጀምሩ",
    welcomeTitle: "ናብ AI እርሻ አማካሪ እንተኣመንዎም!",
    welcomeDescription:
      "አነ ናይኩም ብልሒ እርሻ አማካሪ እየ። ስለ እርሻ፣ ናይ ሰብል ምሕላው፣ ናይ መሬት ጥዕና፣ ናይ ተባዕ ምቁጽጻር ወይ ናይ እርሻ ቴክኒካት ዝኾነ ሕቶ ሕተቱኒ።",
    askQuestionsTitle: "ሕቶታት ሕተቱ",
    askQuestionsDescription: "ስለ እርሻ ልምዳት እና ናይ ሰብል ምሕላው ባላዕርፍ ምኽሪ ተቐበሉ",
    multipleLanguagesTitle: "ብዙሓት ቋንቋታት",
    multipleLanguagesDescription: "ብእንግሊዝኛ፣ አማርኛ፣ ትግርኛ፣ አፋን ኦሮሞ እና ሶማሊኛ ይርከብ",
    inputPlaceholder: "ዝኾነ እርሻዊ ሕቶ ሕተቱ...",
    inputHint: "ንምልኣክ Enter ተጠቐሙ፣ አዲስ መስመር ንምርካብ Shift+Enter ተጠቐሙ፣ ቢያንስ 2 ቁላፍ",
    inputHintMobile: "ቢያንስ 2 ቁላፍ ይፈላል",
    charactersMinimum: "ቁላፍ ቅድሚ ቢያንስ",
    connectionError: "ናይ ርክብ ስህተት",
    connectionErrorDescription: "መልእኽቲ ምልኣክ አይተሳእለን",
    documentUploaded: "ሰነድ ተላእኺ",
    documentUploadedDescription: "ተሰርሖ እናወጸሞ ናብ እዋቀት ማከማቻ ተወሲኹ።",
    uploadFailed: "ምልኣክ አይተሳእለን",
    sources: "ምንጪታት",
    home: "ገዝ",
    language: "ቋንቋ",
  },
  om: {
    title: "Nile Care AI Gorsaa Qonnaa",
    subtitle: "Gorsituu qonnaa hubannoo qabu keessan",
    heroTitle: "Qonnaa keessan jijjiiruu",
    heroHighlight: "AI-n Deeggare Gorsa",
    heroDescription:
      "Afaan fedhaniin gorsa ogeessa qonnaa argadhaa. Gorsituu AI keenya bulchiinsa midhaan, fayyaa lafaa, to'annaa balaa fi gocha qonnaa itti fufiinsa qabuu keessa isin gargaara.",
    getStarted: "Jalqabaa",
    multiLanguageTitle: "Deeggarsa Afaan Hedduu",
    multiLanguageDescription:
      "Afaan Ingiliffaa, Amaarikaa, Tigiriinyaa, Afaan Oromoo fi Somaalee keessatti qonnaan bultootaa naannoo adda addaatiif ni argama",
    expertKnowledgeTitle: "Beekumsa Ogeessaa",
    expertKnowledgeDescription:
      "Midhaan, horii, bulchiinsa lafaa fi kanneen biroo kan hammate bal'aa ta'e beekumsa qonnaa argadhaa",
    assistanceTitle: "Gargaarsa 24/7",
    assistanceDescription:
      "Gaaffii qonnaa keessaniif deebii ariifataa yeroo kamiyyuu, bakka kamiyyuuttii, qajeelfama AI amanamaa ta'een argadhaa",
    ctaTitle: "Qonnaa keessan warraaqsiisuuf qophii dha?",
    ctaDescription:
      "Kumootaan lakka'aman qonnaan bultootaa duraan iyyuu AI fayyadamanii murtoo ogeessaa kennanii fi oomisha isaanii dabalachaa jiran waliin makamaa.",
    startChatting: "Haasa'uu jalqabaa",
    welcomeTitle: "Gorsaa AI Qonnaa baadhaa baga nagaan dhuftan!",
    welcomeDescription:
      "Ani gorsituu qonnaa hubannoo qabu keessan. Waa'ee qonnaa, bulchiinsa midhaan, fayyaa lafaa, to'annaa balaa ykn tooftaa qonnaa kamiyyuu na gaafadhaa.",
    askQuestionsTitle: "Gaaffii Gaafadhaa",
    askQuestionsDescription:
      "Gocha qonnaa fi bulchiinsa midhaan irratti gorsa ogeessaa argadhaa",
    multipleLanguagesTitle: "Afaanoota Hedduu",
    multipleLanguagesDescription:
      "Afaan Ingiliffaa, Amaarikaa, Tigiriinyaa, Afaan Oromoo fi Somaalee keessatti ni argama",
    inputPlaceholder: "Gaaffii qonnaa kamiyyuu gaafadhaa...",
    inputHint:
      "Erguf Enter dhiibbaa, sarara haara argachuuf Shift+Enter dhiibbaa, yoo xiqqaate qubee 2",
    inputHintMobile: "Yoo xiqqaate qubee 2 barbaachisa",
    charactersMinimum: "qubee yoo xiqqaate",
    connectionError: "Dogongora Walitti Dhufeenya",
    connectionErrorDescription: "Ergaa erguu hin dandeenye",
    documentUploaded: "Galmeen Ol kaafame",
    documentUploadedDescription:
      "hojjetamee fi gara kuusaa beekumsaatti dabalamee jira.",
    uploadFailed: "Ol kaafuun Kufate",
    sources: "Maddoota",
    home: "Mana",
    language: "Afaan",
  },
  so: {
    title: "Nile Care AI La-taliye Beeraha",
    subtitle: "La-taliyahayga beeralaynimo ee garaadka leh",
    heroTitle: "Beertaada ku beddel",
    heroHighlight: "Talo AI-ku Taageero",
    heroDescription:
      "Ku hel talo khabiir ah oo beer-gal ah luuqadda aad doorbato. Kaaliyaha AI-ga ayaa kaa caawinaya maaraynta dalagga, caafimaadka dhulka, xakamaynta cayayaanka iyo dhaqamada beeraha joogtada ah.",
    getStarted: "Bilow",
    multiLanguageTitle: "Taageerada Luqado Badan",
    multiLanguageDescription:
      "Waxay ku heli karaan Ingiriis, Amxaari, Tigrinya, Afaan Oromo iyo Soomaali beeralayda gobolado kala duwan",
    expertKnowledgeTitle: "Aqoonta Khabiirada",
    expertKnowledgeDescription:
      "Hel aqoon ballaaran oo beer-gal ah oo daboolaya dalagga, xoolaha, maaraynta dhulka iyo kuwo kale",
    assistanceTitle: "Caawimo 24/7",
    assistanceDescription:
      "Hel jawaabo degdeg ah su'aalaha beerahaaga ah waqti kasta, meel kasta, oo leh hagitaan AI la isku hallayn karo",
    ctaTitle: "Ma diyaar u tahay inaad wax ka beddesho beerahaaga?",
    ctaDescription:
      "Ku biir kumanaan beeraley ah oo durba isticmaalaya AI si ay u gaadhaan go'aan caqli-gal ah oo ay u kordhiyaan wax soo saarkoodii.",
    startChatting: "Bilow Sheekada Hadda",
    welcomeTitle: "Ku soo dhawow AI La-taliye Beeraha!",
    welcomeDescription:
      "Waxaan ahay la-taliyahayga beeralaynimo ee garaadka leh. Wax kasta oo ku saabsan beeraha, maaraynta dalagga, caafimaadka dhulka, xakamaynta cayayaanka ama farsamooyinka beeraha i weydii.",
    askQuestionsTitle: "Su'aalo Weydii",
    askQuestionsDescription:
      "Hel talo khabiir ah oo ku saabsan dhaqamada beeraha iyo maaraynta dalagga",
    multipleLanguagesTitle: "Luqado Badan",
    multipleLanguagesDescription:
      "Waxaa lagu heli karaa Ingiriis, Amxaari, Tigrinya, Afaan Oromo iyo Soomaali",
    inputPlaceholder: "Weydii su'aal kasta oo beer-gal ah...",
    inputHint:
      "Riix Enter si aad u dirto, Shift+Enter xariiq cusub u hel, ugu yaraan 2 xarfo",
    inputHintMobile: "Ugu yaraan 2 xarfo ayaa loo baahan yahay",
    charactersMinimum: "xarfo ugu yaraan",
    connectionError: "Khalad Xidhiidh",
    connectionErrorDescription: "Fariin dirista lama guuleysan",
    documentUploaded: "Dukumeenti la Soo Galiyay",
    documentUploadedDescription:
      "waa la sameeyay oo waxaa lagu daray kaydka aqoonta.",
    uploadFailed: "Soo Galinta ma Guuleysan",
    sources: "Ilaha",
    home: "Guriga",
    language: "Luuqad",
  },
};

export function useTranslations() {
  const { currentLanguage, changeLanguage, language, availableLanguages } =
    useLanguage();

  // Fallback to English if translation is missing
  const t = translations[currentLanguage] || translations["en"];

  return {
    t,
    currentLanguage,
    language,
    changeLanguage,
    availableLanguages,
  };
}
