"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "hi"
  | "ar"
  | "pt"
  | "id"
  | "ru"
  | "ja"
  | "ko"
  | "it"
  | "tr"
  | "vi";

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir?: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", dir: "ltr" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", dir: "ltr" },
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    // Nav
    "nav.universal": "Universal",
    "nav.youtube": "YouTube",
    "nav.tiktok": "TikTok",
    "nav.instagram": "Instagram",
    "nav.twitter": "Twitter / X",
    "nav.reddit": "Reddit",
    "nav.pinterest": "Pinterest",
    "nav.tagline": "Ultra Fast Downloader",

    // Hero
    "hero.title_part1": "Download Any Video & Audio in",
    "hero.title_part2": "Full 4K Quality",
    "hero.subtitle":
      "Fastest online video downloader for YouTube, TikTok, Instagram, Twitter/X, and 1,000+ sources. No app installation needed.",
    "hero.placeholder": "Paste URL from YouTube, TikTok, Instagram, Facebook, X...",
    "hero.paste": "Paste",
    "hero.download": "Download",
    "hero.processing": "Processing...",
    "hero.quick_test": "Quick Test:",
    "hero.step1": "Connecting to media source...",
    "hero.step2": "Extracting high-definition stream formats...",
    "hero.step3": "Organizing video, audio & thumbnail options...",

    // Download Card
    "card.video": "Video Streams",
    "card.audio": "Audio Only",
    "card.thumbnail": "Cover / Thumbnail",
    "card.resolution": "Resolution",
    "card.format": "Format",
    "card.file_size": "File Size",
    "card.action": "Download",
    "card.downloading": "Downloading...",
    "card.preview": "Stream Preview",

    // Supported Platforms
    "platforms.hub": "Multi-Platform Hub",
    "platforms.title": "Supported Video & Social Platforms",
    "platforms.subtitle":
      "Dedicated download engines tailored specifically for each platform's unique media stream layout.",
    "platforms.open": "Open",

    // Features
    "features.tag": "Why Choose VidSnap",
    "features.title": "Engineered for Speed, Quality & Simplicity",
    "features.subtitle":
      "Everything you need in a modern video downloader, without popups or shady downloads.",
    "features.f1_title": "Crystal Clear 4K & Full HD",
    "features.f1_desc":
      "Save videos in their highest available resolutions—from 720p HD up to 4K 60fps—with peak download speed.",
    "features.f2_title": "100% Watermark-Free",
    "features.f2_desc":
      "Download TikTok videos and Instagram Reels cleanly without distracting logos or overlays for smooth offline viewing.",
    "features.f3_title": "Studio-Quality MP3 Extraction",
    "features.f3_desc":
      "Extract background music, podcasts, and sound clips directly in 320kbps MP3 format with one single click.",
    "features.f4_title": "Lightning Chunked Streaming",
    "features.f4_desc":
      "No waiting for slow server caching. Streams are piped directly in real-time, delivering peak download speeds.",
    "features.f5_title": "Private & Secure by Design",
    "features.f5_desc":
      "No user accounts, no passwords, and zero tracking logs. Your downloads are processed securely and privately.",
    "features.f6_title": "Works Across All Devices",
    "features.f6_desc":
      "Fully responsive in any web browser—iPhone, iPad, Android, macOS, Windows, and Linux without any software install.",

    // How it works
    "how.tag": "Easy Workflow",
    "how.title": "How to Download in 3 Steps",
    "how.subtitle": "No registration, zero installation, works in seconds.",
    "how.s1_title": "Copy the Video URL",
    "how.s1_desc":
      "Open YouTube, TikTok, or Instagram. Tap 'Share' on your favorite video and select 'Copy Link'.",
    "how.s2_title": "Paste & Pick Quality",
    "how.s2_desc":
      "Paste the URL into the VidSnap search bar. Choose your target format: 4K, 1080p, 720p MP4, or MP3 audio.",
    "how.s3_title": "Download Instantly",
    "how.s3_desc":
      "Click 'Download' and your browser saves the video immediately into your local Downloads folder.",

    // Footer
    "footer.desc":
      "Ultra-fast online video and audio downloader with 4K resolution support and watermark removal.",
    "footer.platforms": "Platforms",
    "footer.tools": "Tools",
    "footer.legal": "Legal & Safety",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.dmca": "DMCA & Copyright",
    "footer.contact": "Contact Support",
    "footer.rights": "All rights reserved.",
  },

  es: {
    // Nav
    "nav.universal": "Universal",
    "nav.youtube": "YouTube",
    "nav.tiktok": "TikTok",
    "nav.instagram": "Instagram",
    "nav.twitter": "Twitter / X",
    "nav.reddit": "Reddit",
    "nav.pinterest": "Pinterest",
    "nav.tagline": "Descargador Ultra Rápido",

    // Hero
    "hero.title_part1": "Descarga Cualquier Video y Audio en",
    "hero.title_part2": "Calidad 4K Total",
    "hero.subtitle":
      "El descargador de video en línea más rápido para YouTube, TikTok, Instagram, Twitter/X y más de 1,000 fuentes. Sin instalar apps.",
    "hero.placeholder": "Pega el enlace de YouTube, TikTok, Instagram, Facebook, X...",
    "hero.paste": "Pegar",
    "hero.download": "Descargar",
    "hero.processing": "Procesando...",
    "hero.quick_test": "Prueba Rápida:",
    "hero.step1": "Conectando a la fuente...",
    "hero.step2": "Extrayendo formatos de alta definición...",
    "hero.step3": "Organizando opciones de video, audio y carátula...",

    // Download Card
    "card.video": "Videos",
    "card.audio": "Solo Audio",
    "card.thumbnail": "Portada / Miniatura",
    "card.resolution": "Resolución",
    "card.format": "Formato",
    "card.file_size": "Tamaño",
    "card.action": "Descargar",
    "card.downloading": "Descargando...",
    "card.preview": "Vista previa",

    // Supported Platforms
    "platforms.hub": "Centro Multiplataforma",
    "platforms.title": "Plataformas de Video y Redes Compatibles",
    "platforms.subtitle":
      "Motores de descarga dedicados y optimizados para el formato de cada plataforma.",
    "platforms.open": "Abrir",

    // Features
    "features.tag": "¿Por Qué Elegir VidSnap?",
    "features.title": "Diseñado para Velocidad, Calidad y Simplicidad",
    "features.subtitle":
      "Todo lo que necesitas en un descargador moderno, sin ventanas emergentes ni riesgos.",
    "features.f1_title": "4K y Full HD Nítido",
    "features.f1_desc":
      "Guarda videos en sus resoluciones máximas—desde 720p hasta 4K 60fps—con audio sincronizado.",
    "features.f2_title": "100% Sin Marca de Agua",
    "features.f2_desc":
      "Descarga videos de TikTok y Reels de Instagram sin logos molestos para verlos sin conexión.",
    "features.f3_title": "Extracción MP3 de Calidad Estudio",
    "features.f3_desc":
      "Extrae música de fondo, podcasts y pistas de sonido en formato MP3 a 320kbps con un solo clic.",
    "features.f4_title": "Transmisión Ultrarrápida",
    "features.f4_desc":
      "Sin esperas por almacenamiento lento. Los streams se descargan en tiempo real a máxima velocidad.",
    "features.f5_title": "Privado y Seguro por Diseño",
    "features.f5_desc":
      "Sin cuentas de usuario, sin contraseñas y sin registros de rastreo. Tus descargas son privadas.",
    "features.f6_title": "Funciona en Todos los Dispositivos",
    "features.f6_desc":
      "Totalmente responsivo en cualquier navegador: iPhone, Android, Mac, Windows y Linux.",

    // How it works
    "how.tag": "Flujo Sencillo",
    "how.title": "Cómo Descargar en 3 Pasos",
    "how.subtitle": "Sin registro, sin instalación, funciona en segundos.",
    "how.s1_title": "Copia el Enlace del Video",
    "how.s1_desc":
      "Abre YouTube, TikTok o Instagram. Pulsa 'Compartir' en tu video favorito y elige 'Copiar enlace'.",
    "how.s2_title": "Pega y Elige la Calidad",
    "how.s2_desc":
      "Pega la URL en la barra de búsqueda de VidSnap. Elige el formato: 4K, 1080p, 720p MP4 o MP3.",
    "how.s3_title": "Descarga al Instante",
    "how.s3_desc":
      "Haz clic en 'Descargar' y tu navegador guardará el archivo directamente en tu carpeta de descargas.",

    // Footer
    "footer.desc":
      "Descargador de video y audio en línea ultrarrápido con soporte 4K y sin marcas de agua.",
    "footer.platforms": "Plataformas",
    "footer.tools": "Herramientas",
    "footer.legal": "Legal y Seguridad",
    "footer.terms": "Términos de Servicio",
    "footer.privacy": "Política de Privacidad",
    "footer.dmca": "DMCA y Derechos de Autor",
    "footer.contact": "Contacto y Soporte",
    "footer.rights": "Todos los derechos reservados.",
  },

  fr: {
    // Nav
    "nav.universal": "Universel",
    "nav.youtube": "YouTube",
    "nav.tiktok": "TikTok",
    "nav.instagram": "Instagram",
    "nav.twitter": "Twitter / X",
    "nav.reddit": "Reddit",
    "nav.pinterest": "Pinterest",
    "nav.tagline": "Téléchargeur Ultra Rapide",

    // Hero
    "hero.title_part1": "Téléchargez Vidéos & Audio en",
    "hero.title_part2": "Qualité 4K Totale",
    "hero.subtitle":
      "Le téléchargeur vidéo en ligne le plus rapide pour YouTube, TikTok, Instagram, Twitter/X et plus de 1 000 sources. Sans installer d'application.",
    "hero.placeholder": "Collez le lien YouTube, TikTok, Instagram, Facebook, X...",
    "hero.paste": "Coller",
    "hero.download": "Télécharger",
    "hero.processing": "Traitement...",
    "hero.quick_test": "Test Rapide :",
    "hero.step1": "Connexion à la source...",
    "hero.step2": "Extraction des formats haute définition...",
    "hero.step3": "Organisation des options vidéo et audio...",

    // Download Card
    "card.video": "Flux Vidéo",
    "card.audio": "Audio Seul",
    "card.thumbnail": "Miniature",
    "card.resolution": "Résolution",
    "card.format": "Format",
    "card.file_size": "Taille",
    "card.action": "Télécharger",
    "card.downloading": "Téléchargement...",
    "card.preview": "Aperçu",

    // Features
    "features.tag": "Pourquoi Choisir VidSnap",
    "features.title": "Conçu pour la Vitesse, la Qualité et la Simplicité",
    "features.subtitle":
      "Tout ce dont vous avez besoin dans un téléchargeur moderne, sans publicités intrusives.",
    "features.f1_title": "4K & Full HD Cristallin",
    "features.f1_desc":
      "Enregistrez des vidéos dans les résolutions maximales—du 720p au 4K 60fps.",
    "features.f2_title": "100% Sans Filigrane",
    "features.f2_desc":
      "Téléchargez des vidéos TikTok et Reels Instagram sans logos ni filigranes.",
    "features.f3_title": "Extraction MP3 Qualité Studio",
    "features.f3_desc":
      "Extrayez la musique de fond et les podcasts en MP3 320kbps en un clic.",
    "features.f4_title": "Streaming Ultra-Rapide",
    "features.f4_desc":
      "Téléchargement direct en temps réel à vitesse maximale.",
    "features.f5_title": "Privé & Sécurisé",
    "features.f5_desc":
      "Aucun compte, aucun mot de passe et aucun suivi de navigation.",
    "features.f6_title": "Tous Appareils",
    "features.f6_desc":
      "Fonctionne sur iPhone, Android, Mac, Windows et Linux.",

    // How it works
    "how.tag": "Processus Simple",
    "how.title": "Comment Télécharger en 3 Étapes",
    "how.subtitle": "Sans inscription, sans installation, fonctionne en quelques secondes.",
    "how.s1_title": "Copiez l'URL de la Vidéo",
    "how.s1_desc":
      "Ouvrez YouTube, TikTok ou Instagram et copiez le lien de la vidéo.",
    "how.s2_title": "Collez & Choisissez la Qualité",
    "how.s2_desc":
      "Collez l'URL dans la barre de recherche et choisissez le format souhaité.",
    "how.s3_title": "Téléchargez Instantanément",
    "how.s3_desc":
      "Cliquez sur Télécharger et enregistrez le fichier sur votre appareil.",

    // Footer
    "footer.desc":
      "Téléchargeur vidéo et audio en ligne ultra-rapide avec prise en charge de la 4K.",
    "footer.platforms": "Plateformes",
    "footer.tools": "Outils",
    "footer.legal": "Légal & Sécurité",
    "footer.terms": "Conditions d'utilisation",
    "footer.privacy": "Politique de confidentialité",
    "footer.dmca": "DMCA & Droits d'auteur",
    "footer.contact": "Support & Contact",
    "footer.rights": "Tous droits réservés.",
  },

  de: {
    // Nav
    "nav.universal": "Universal",
    "nav.youtube": "YouTube",
    "nav.tiktok": "TikTok",
    "nav.instagram": "Instagram",
    "nav.twitter": "Twitter / X",
    "nav.reddit": "Reddit",
    "nav.pinterest": "Pinterest",
    "nav.tagline": "Ultraschneller Downloader",

    // Hero
    "hero.title_part1": "Laden Sie Videos & Audio in",
    "hero.title_part2": "Vollständiger 4K-Qualität herunter",
    "hero.subtitle":
      "Schnellster Online-Video-Downloader für YouTube, TikTok, Instagram, Twitter/X und 1.000+ Quellen. Keine Installation erforderlich.",
    "hero.placeholder": "URL von YouTube, TikTok, Instagram, X einfügen...",
    "hero.paste": "Einfügen",
    "hero.download": "Herunterladen",
    "hero.processing": "Verarbeitung...",
    "hero.quick_test": "Schnelltest:",
    "hero.step1": "Verbindung zur Medienquelle...",
    "hero.step2": "HD-Stream-Formate werden extrahiert...",
    "hero.step3": "Video- und Audiooptionen werden vorbereitet...",

    // Download Card
    "card.video": "Video-Streams",
    "card.audio": "Nur Audio",
    "card.thumbnail": "Titelbild",
    "card.resolution": "Auflösung",
    "card.format": "Format",
    "card.file_size": "Dateigröße",
    "card.action": "Herunterladen",
    "card.downloading": "Wird heruntergeladen...",
    "card.preview": "Vorschau",

    // Features
    "features.tag": "Warum VidSnap wählen",
    "features.title": "Entwickelt für Geschwindigkeit, Qualität & Einfachheit",
    "features.subtitle":
      "Alles, was Sie in einem modernen Downloader brauchen, ohne Werbung.",
    "features.f1_title": "Glasklares 4K & Full HD",
    "features.f1_desc":
      "Speichern Sie Videos in maximaler Auflösung von 720p bis 4K 60fps.",
    "features.f2_title": "100% Wasserzeichenfrei",
    "features.f2_desc":
      "TikTok-Videos und Instagram-Reels ohne störende Wasserzeichen speichern.",
    "features.f3_title": "MP3 in Studioqualität",
    "features.f3_desc":
      "Hintergrundmusik und Podcasts direkt als 320kbps MP3 extrahieren.",
    "features.f4_title": "Echtzeit-Streaming",
    "features.f4_desc":
      "Kein langes Warten auf Server. Direkte Verbindung mit voller Geschwindigkeit.",
    "features.f5_title": "Privat & Sicher",
    "features.f5_desc":
      "Keine Konten, keine Passwörter und keine Nachverfolgung.",
    "features.f6_title": "Funktioniert auf allen Geräten",
    "features.f6_desc":
      "Immer einsatzbereit auf iPhone, Android, Mac und Windows.",

    // How it works
    "how.tag": "Einfacher Ablauf",
    "how.title": "In 3 Schritten herunterladen",
    "how.subtitle": "Ohne Registrierung, ohne Installation, sekundenschnell.",
    "how.s1_title": "Video-URL kopieren",
    "how.s1_desc":
      "Öffnen Sie YouTube, TikTok oder Instagram und kopieren Sie den Link.",
    "how.s2_title": "Einfügen & Qualität wählen",
    "how.s2_desc":
      "Fügen Sie die URL ein und wählen Sie das gewünschte Format.",
    "how.s3_title": "Sofort herunterladen",
    "how.s3_desc":
      "Klicken Sie auf Herunterladen und speichern Sie die Datei direkt.",

    // Footer
    "footer.desc":
      "Ultraschneller Video- und Audio-Downloader mit 4K-Unterstützung.",
    "footer.platforms": "Plattformen",
    "footer.tools": "Werkzeuge",
    "footer.legal": "Rechtliches & Sicherheit",
    "footer.terms": "Nutzungsbedingungen",
    "footer.privacy": "Datenschutz",
    "footer.dmca": "DMCA & Urheberrecht",
    "footer.contact": "Support",
    "footer.rights": "Alle Rechte vorbehalten.",
  },

  hi: {
    // Nav
    "nav.universal": "यूनिवर्सल",
    "nav.youtube": "यूट्यूब",
    "nav.tiktok": "टिकटॉक",
    "nav.instagram": "इंस्टाग्राम",
    "nav.twitter": "ट्विटर / X",
    "nav.reddit": "रेडिट",
    "nav.pinterest": "पिंटरेस्ट",
    "nav.tagline": "अल्ट्रा फास्ट डाउनलोडर",

    // Hero
    "hero.title_part1": "कोई भी वीडियो और ऑडियो डाउनलोड करें",
    "hero.title_part2": "फुल 4K क्वालिटी में",
    "hero.subtitle":
      "YouTube, TikTok, Instagram, Twitter/X और 1000+ साइटों के लिए सबसे तेज़ ऑनलाइन वीडियो डाउनलोडर। बिना ऐप इनस्टॉल किए।",
    "hero.placeholder": "YouTube, TikTok, Instagram, X का लिंक यहाँ पेस्ट करें...",
    "hero.paste": "पेस्ट करें",
    "hero.download": "डाउनलोड करें",
    "hero.processing": "प्रोसेसिंग...",
    "hero.quick_test": "त्वरित परीक्षण:",
    "hero.step1": "स्रोत से कनेक्ट हो रहा है...",
    "hero.step2": "हाई-डेफिनिशन फॉर्मेट्स निकाले जा रहे हैं...",
    "hero.step3": "वीडियो, ऑडियो और कवर व्यवस्थित किए जा रहे हैं...",

    // Download Card
    "card.video": "वीडियो स्ट्रीम",
    "card.audio": "केवल ऑडियो",
    "card.thumbnail": "कवर / थंबनेल",
    "card.resolution": "रिज़ॉल्यूशन",
    "card.format": "फॉर्मेट",
    "card.file_size": "फ़ाइल साइज़",
    "card.action": "डाउनलोड",
    "card.downloading": "डाउनलोड हो रहा है...",
    "card.preview": "स्ट्रीम पूर्वावलोकन",

    // Supported Platforms
    "platforms.hub": "मल्टी-प्लेटफ़ॉर्म हब",
    "platforms.title": "समर्थित वीडियो और सोशल प्लेटफ़ॉर्म",
    "platforms.subtitle":
      "प्रत्येक सोशल मीडिया प्लेटफ़ॉर्म के लिए विशेष रूप से अनुकूलित डाउनलोड इंजन।",
    "platforms.open": "खोलें",

    // Features
    "features.tag": "VidSnap क्यों चुनें",
    "features.title": "स्पीड, क्वालिटी और सरलता के लिए निर्मित",
    "features.subtitle":
      "एक आधुनिक वीडियो डाउनलोडर में आपको जो कुछ भी चाहिए, बिना पॉप-अप या विज्ञापनों के।",
    "features.f1_title": "क्रिस्टल क्लियर 4K और फुल HD",
    "features.f1_desc":
      "वीडियो को उच्चतम रिज़ॉल्यूशन में सहेजें—720p से लेकर 4K 60fps तक।",
    "features.f2_title": "100% वॉटरमार्क मुक्त",
    "features.f2_desc":
      "टिकटॉक वीडियो और इंस्टाग्राम रील्स को बिना वॉटरमार्क के सीधे डाउनलोड करें।",
    "features.f3_title": "स्टूडियो-क्वालिटी MP3 एक्सट्रैक्शन",
    "features.f3_desc":
      "एक क्लिक में 320kbps MP3 फॉर्मेट में बैकग्राउंड म्यूज़िक और पॉडकास्ट निकालें।",
    "features.f4_title": "सुपरफास्ट स्पीड",
    "features.f4_desc":
      "सर्वर पर इंतज़ार करने की ज़रूरत नहीं। उच्चतम गति से सीधे अपने फोन में डाउनलोड करें।",
    "features.f5_title": "निजी और पूरी तरह सुरक्षित",
    "features.f5_desc":
      "कोई खाता नहीं, कोई पासवर्ड नहीं। आपकी डाउनलोडिंग पूरी तरह गोपनीय रहती है।",
    "features.f6_title": "सभी डिवाइस पर काम करता है",
    "features.f6_desc":
      "iPhone, Android, Windows, और Mac के किसी भी ब्राउज़र में आसानी से काम करता है।",

    // How it works
    "how.tag": "आसान प्रक्रिया",
    "how.title": "3 आसान चरणों में डाउनलोड करें",
    "how.subtitle": "बिना पंजीकरण, बिना इंस्टॉलेशन, सेकंडों में काम करता है।",
    "how.s1_title": "वीडियो लिंक कॉपी करें",
    "how.s1_desc":
      "YouTube, TikTok या Instagram खोलें और अपने पसंदीदा वीडियो का लिंक कॉपी करें।",
    "how.s2_title": "पेस्ट करें और क्वालिटी चुनें",
    "how.s2_desc":
      "VidSnap में लिंक पेस्ट करें और अपना पसंदीदा फॉर्मेट 4K, 1080p, 720p या MP3 चुनें।",
    "how.s3_title": "तुरंत डाउनलोड करें",
    "how.s3_desc":
      "'डाउनलोड' पर क्लिक करें और फ़ाइल तुरंत आपके फोन या कंप्यूटर में सेव हो जाएगी।",

    // Footer
    "footer.desc":
      "4K रिज़ॉल्यूशन और वॉटरमार्क हटाने की सुविधा के साथ सबसे तेज़ ऑनलाइन वीडियो डाउनलोडर।",
    "footer.platforms": "प्लेटफ़ॉर्म",
    "footer.tools": "टूल्स",
    "footer.legal": "कानूनी व सुरक्षा",
    "footer.terms": "सेवा की शर्तें",
    "footer.privacy": "गोपनीयता नीति",
    "footer.dmca": "DMCA और कॉपीराइट",
    "footer.contact": "सपोर्ट व संपर्क",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
  },

  ar: {
    // Nav
    "nav.universal": "شامل",
    "nav.youtube": "يوتيوب",
    "nav.tiktok": "تيك توك",
    "nav.instagram": "إنستغرام",
    "nav.twitter": "تويتر / X",
    "nav.reddit": "ريديت",
    "nav.pinterest": "بينتيريست",
    "nav.tagline": "أسرع أداة تحميل",

    // Hero
    "hero.title_part1": "قم بتنزيل أي فيديو ومقطع صوتي",
    "hero.title_part2": "بأعلى جودة 4K",
    "hero.subtitle":
      "أسرع أداة لتنزيل الفيديو من يوتيوب، تيك توك، إنستغرام، تويتر والمزيد من 1000 منصة بدون تثبيت أي برامج.",
    "hero.placeholder": "الصق رابط يوتيوب، تيك توك، إنستغرام، فيسبوك هنا...",
    "hero.paste": "لصق",
    "hero.download": "تحميل",
    "hero.processing": "جارٍ المعالجة...",
    "hero.quick_test": "تجربة سريعة:",
    "hero.step1": "الاتصال بمصدر الوسائط...",
    "hero.step2": "استخراج صيغ الفيديو عالية الدقة...",
    "hero.step3": "تجهيز خيارات الفيديو والصوت...",

    // Download Card
    "card.video": "ملفات الفيديو",
    "card.audio": "صوت فقط",
    "card.thumbnail": "صورة الغلاف",
    "card.resolution": "الدقة",
    "card.format": "الصيغة",
    "card.file_size": "الحجم",
    "card.action": "تنزيل",
    "card.downloading": "جارٍ التنزيل...",
    "card.preview": "معاينة المقطع",

    // Features
    "features.tag": "لماذا تختار VidSnap",
    "features.title": "مصمم للسرعة، الجودة والبساطة",
    "features.subtitle":
      "كل ما تحتاجه في أداة تحميل حديثة، بدون إعلانات مزعجة وبأقصى سرعة.",
    "features.f1_title": "دقة 4K فائقة و Full HD",
    "features.f1_desc":
      "حفظ الفيديوهات بأعلى دقة متوفرة من 720p حتى 4K مع صوت متزامن.",
    "features.f2_title": "بدون علامة مائية 100%",
    "features.f2_desc":
      "تحميل فيديوهات تيك توك وريلز إنستغرام بدون أي شعارات أو علامات مائية.",
    "features.f3_title": "استخراج صوت MP3 نقي",
    "features.f3_desc":
      "استخراج الأغاني والمقاطع الصوتية بصيغة MP3 بسرعة وجودة 320kbps.",
    "features.f4_title": "سرعة فائقة ومباشرة",
    "features.f4_desc":
      "بدون انتظار السيرفرات البطيئة، يتم التنزيل مباشرة بأقصى سرعة.",
    "features.f5_title": "خصوصية وأمان تام",
    "features.f5_desc":
      "لا حاجة لإنشاء حساب أو إدخال كلمات مرور. عملياتك مشفرة وخاصة بالكامل.",
    "features.f6_title": "يعمل على جميع الأجهزة",
    "features.f6_desc":
      "متوافق تماماً مع جميع الهواتف الذكية وأجهزة الكمبيوتر.",

    // How it works
    "how.tag": "خطوات بسيطة",
    "how.title": "كيفية التنزيل في 3 خطوات",
    "how.subtitle": "بدون تسجيل، بدون تثبيت برامج، يعمل في ثوانٍ.",
    "how.s1_title": "انسخ رابط الفيديو",
    "how.s1_desc":
      "افتح يوتيوب أو تيك توك أو إنستغرام، واضغط على مشاركة ثم نسخ الرابط.",
    "how.s2_title": "الصق واختر الجودة",
    "how.s2_desc":
      "الصق الرابط في مربع البحث واختر الجودة المناسبة: 4K، 1080p أو MP3.",
    "how.s3_title": "تنزيل فوري",
    "how.s3_desc":
      "اضغط على تنزيل وسيتم حفظ الملف مباشرة على جهازك.",

    // Footer
    "footer.desc":
      "أسرع أداة لتنزيل مقاطع الفيديو والصوت عبر الإنترنت بجودة 4K وبدون علامة مائية.",
    "footer.platforms": "المنصات",
    "footer.tools": "الأدوات",
    "footer.legal": "قانوني وأمان",
    "footer.terms": "شروط الخدمة",
    "footer.privacy": "سياسة الخصوصية",
    "footer.dmca": "حقوق النشر و DMCA",
    "footer.contact": "الدعم والتواصل",
    "footer.rights": "جميع الحقوق محفوظة.",
  },

  pt: {
    // Nav
    "nav.universal": "Universal",
    "nav.youtube": "YouTube",
    "nav.tiktok": "TikTok",
    "nav.instagram": "Instagram",
    "nav.twitter": "Twitter / X",
    "nav.reddit": "Reddit",
    "nav.pinterest": "Pinterest",
    "nav.tagline": "Downloader Ultra Rápido",

    // Hero
    "hero.title_part1": "Baixe Qualquer Vídeo e Áudio em",
    "hero.title_part2": "Qualidade 4K Total",
    "hero.subtitle":
      "O downloader de vídeo online mais rápido para YouTube, TikTok, Instagram, Twitter/X e mais de 1.000 sites. Sem instalar aplicativos.",
    "hero.placeholder": "Cole o link do YouTube, TikTok, Instagram, Facebook, X...",
    "hero.paste": "Colar",
    "hero.download": "Baixar",
    "hero.processing": "Processando...",
    "hero.quick_test": "Teste Rápido:",
    "hero.step1": "Conectando à fonte...",
    "hero.step2": "Extraindo formatos em alta definição...",
    "hero.step3": "Organizando opções de vídeo e áudio...",

    // Download Card
    "card.video": "Vídeos",
    "card.audio": "Apenas Áudio",
    "card.thumbnail": "Capa / Miniatura",
    "card.resolution": "Resolução",
    "card.format": "Formato",
    "card.file_size": "Tamanho",
    "card.action": "Baixar",
    "card.downloading": "Baixando...",
    "card.preview": "Prévia",

    // Features
    "features.tag": "Por que Escolher o VidSnap",
    "features.title": "Projetado para Velocidade, Qualidade e Simplicidade",
    "features.subtitle":
      "Tudo o que você precisa em um downloader moderno, sem anúncios chatos.",
    "features.f1_title": "4K e Full HD Cristalino",
    "features.f1_desc":
      "Salve vídeos nas maiores resoluções disponíveis—de 720p até 4K 60fps.",
    "features.f2_title": "100% Sem Marca d'Água",
    "features.f2_desc":
      "Baixe vídeos do TikTok e Reels do Instagram limpos, sem logos para assistir offline.",
    "features.f3_title": "Extração MP3 de Estúdio",
    "features.f3_desc":
      "Extraia músicas e podcasts em MP3 a 320kbps com apenas um clique.",
    "features.f4_title": "Download em Tempo Real",
    "features.f4_desc":
      "Sem filas em servidores lentos. Conexão direta na velocidade máxima.",
    "features.f5_title": "Privado e Seguro",
    "features.f5_desc":
      "Sem contas, sem senhas e sem rastreamento dos seus downloads.",
    "features.f6_title": "Funciona em Qualquer Aparelho",
    "features.f6_desc":
      "Disponível no iPhone, Android, Mac, Windows e Linux via navegador.",

    // How it works
    "how.tag": "Fluxo Fácil",
    "how.title": "Como Baixar em 3 Passos",
    "how.subtitle": "Sem cadastro, sem instalação, funciona em segundos.",
    "how.s1_title": "Copie o Link do Vídeo",
    "how.s1_desc":
      "Abra o YouTube, TikTok ou Instagram e copie o link do vídeo desejado.",
    "how.s2_title": "Cole e Escolha a Qualidade",
    "how.s2_desc":
      "Cole a URL na barra de busca e selecione o formato 4K, 1080p ou MP3.",
    "how.s3_title": "Baixe Imediatamente",
    "how.s3_desc":
      "Clique em 'Baixar' e o arquivo será salvo no seu dispositivo na hora.",

    // Footer
    "footer.desc":
      "Downloader online ultra-rápido de vídeo e áudio com suporte a 4K e sem marca d'água.",
    "footer.platforms": "Plataformas",
    "footer.tools": "Ferramentas",
    "footer.legal": "Legal e Segurança",
    "footer.terms": "Termos de Uso",
    "footer.privacy": "Política de Privacidade",
    "footer.dmca": "DMCA e Direitos Autorais",
    "footer.contact": "Suporte e Contato",
    "footer.rights": "Todos os direitos reservados.",
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  currentLangInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  currentLangInfo: SUPPORTED_LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vidsnap_lang") as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
        updateHtmlLang(saved);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("vidsnap_lang", lang);
    } catch {}
    updateHtmlLang(lang);
  };

  const updateHtmlLang = (code: LanguageCode) => {
    if (typeof document !== "undefined") {
      const info = SUPPORTED_LANGUAGES.find((l) => l.code === code);
      document.documentElement.lang = code;
      document.documentElement.dir = info?.dir || "ltr";
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    const fallbackDict = TRANSLATIONS.en;
    return fallbackDict[key] || key;
  };

  const currentLangInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLangInfo }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
