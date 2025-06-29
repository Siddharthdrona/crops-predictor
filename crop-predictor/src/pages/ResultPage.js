import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { input, suggestions, fertilizer, npk} = location.state || {};

  const [lang, setLang] = React.useState("en");

  if (!input || !suggestions || suggestions.length === 0) {
    return (
      <div style={styles.container}>
        <h3>No prediction found.</h3>
        <button style={styles.button} onClick={() => navigate("/")}>
          ⬅️ Go Back
        </button>
      </div>
    );
  }

  const handleCropClick = (crop) => {
    navigate(`/crop/${crop.crop.toLowerCase()}`, {
      state: { cropData: crop },
    });
  };

  const translations = {
    en: {
      topSuggestions: "🌾 Predicted Crop",
      otherSuggestions: "🌿 Other Crop Suggestions",
      probability: "📊 Probability",
      msp: "💰 MSP",
      season: "🌱 Season",
      inputDetails: "📋 Input Details",
      fertilizerSuggestion: "🧪 Fertilizer Suggestion",
      npk: "🧫 NPK Recommendation",
      predictAgain: "🔁 Predict Again",
    },
    hi: {
      topSuggestions: "🌾 भविष्यवाणी की गई फसल",
      otherSuggestions: "🌿 अन्य फसल सुझाव",
      probability: "📊 संभाव्यता",
      msp: "💰 न्यूनतम समर्थन मूल्य (एमएसपी)",
      season: "🌱 ऋतु",
      inputDetails: "📋 इनपुट विवरण",
      fertilizerSuggestion: "🧪 उर्वरक सुझाव",
      npk: "🧫 एनपीके सिफारिश",
      predictAgain: "🔁 फिर से भविष्यवाणी करें",
    },
    te: {
      topSuggestions: "🌾 అంచనా వేసిన పంట",
      otherSuggestions: "🌿 ఇతర పంట సూచనలు",
      probability: "📊 సంభావ్యత",
      msp: "💰 కనీస మద్దతు ధర (MSP)",
      season: "🌱 ఋతువు",
      inputDetails: "📋 ఇన్పుట్ వివరాలు",
      fertilizerSuggestion: "🧪 ఎరువుల సూచన",
      npk: "🧫 ఎన్‌పికె సిఫారసు",
      predictAgain: "🔁 మళ్ళీ అంచనా వేయండి",
    },
  };

  const cropTranslations = {
    rice: { hi: "धान", te: "బియ్యం" },
    wheat: { hi: "गेहूं", te: "గోధుమ" },
    maize: { hi: "मक्का", te: "మొక్కజొన్న" },
    barley: { hi: "जौ", te: "యవము" },
    sugarcane: { hi: "गन्ना", te: "చెరకు" },
    cotton: { hi: "कपास", te: "పత్తి" },
    soybean: { hi: "सोयाबीन", te: "సోయాబీన్" },
    jowar: { hi: "ज्वार", te: "జొన్న" },
    bajra: { hi: "बाजरा", te: "సజ్జలు" },
    groundnut: { hi: "मूंगफली", te: "వేరుసెనగ" },
    bengalgram: { hi: "चना", te: "శనగ" },
    urad: { hi: "उड़द", te: "మినుములు" },
    moong: { hi: "मूंग", te: "పెసర్లు" },
    mustard: { hi: "सरसों", te: "ఆవాలు" },
    onion: { hi: "प्याज़", te: "ఉల్లిపాయ" },
    potato: { hi: "आलू", te: "బంగాళాదుంప" },
    tomato: { hi: "टमाटर", te: "టమోటా" },
    cabbage: { hi: "पत्ता गोभी", te: "కోసు" },
    cauliflower: { hi: "फूल गोभी", te: "పూసు కోసు" },
    peas: { hi: "मटर", te: "బాటానీలు" },
    jute: { hi: "जूट", te: "జూట్" },
    tobacco: { hi: "तंबाकू", te: "తంబాకూ" },
    pulses: { hi: "दालें", te: "పప్పులు" },
    pigeonpeas: { hi: "अरहर", te: "పెసరపప్పు" },
    mango: { hi: "आम", te: "మామిడి" },
    watermelon: { hi: "तरबूज", te: "పుచ్చకాయ" },
    papaya: { hi: "पपीता", te: "పపాయి" },
    pomegranate: { hi: "अनार", te: "దానిమ్మ" },
  };

const cropTips = {
  wheat: "🌾 Wheat grows best in well-drained loamy soil under cool, dry climates. Ideal for Rabi season. Irrigate at crown root initiation and flowering stages.",
  rice: "🌾 Rice (Paddy) is best suited for loamy or clay soil with high rainfall. Ideal for Kharif season. Maintain standing water in early growth stages.",
  maize: "🌽 Maize requires fertile, well-drained soil and warm temperatures. Apply nitrogen-rich fertilizers and ensure proper spacing.",
  barley: "🌾 Barley grows best in cool, dry climates and well-drained sandy loam soil. Suitable for Rabi season and requires minimal irrigation.",
  sugarcane: "🍬 Sugarcane is a perennial crop grown in tropical climates. Requires fertile loamy soil and high water supply. Irrigation at regular intervals is key.",
  cotton: "🌱 Cotton thrives in black soil with warm temperatures. Ideal for Kharif season. Avoid waterlogging and manage pests like bollworms.",
  soybean: "🌱 Soybean prefers well-drained loamy soil. Suitable for Kharif season. Phosphorus-rich fertilization enhances nodulation.",
  jowar: "🌾 Jowar (Sorghum) grows well in red or black soil. Drought-resistant and ideal for semi-arid regions. Needs nitrogen early in growth.",
  bajra: "🌾 Bajra (Pearl Millet) is suited for dry climates with sandy soil. Kharif season crop that tolerates drought and poor soil fertility.",
  groundnut: "🥜 Groundnut prefers sandy loam soils with moderate rainfall. Gypsum at pegging stage improves pod development.",
  bengalgram: "🌱 Bengal Gram (Chana) grows best in black or loamy soil with low moisture. Ideal for Rabi season with limited irrigation.",
  urad: "🌱 Urad (Black Gram) prefers well-drained loamy soils. Grown during Kharif, requires moderate rainfall and short growing duration.",
  moong: "🌱 Moong (Green Gram) is a short-duration Kharif crop. Grows in sandy loam soils with moderate rainfall.",
  mustard: "🌿 Mustard grows best in loamy or clay loam soil. Requires cool temperatures and is ideal for Rabi season with minimal water.",
  onion: "🧅 Onion is grown throughout the year. Prefers well-drained sandy loam soil and moderate temperatures.",
  potato: "🥔 Potato prefers cool climates and well-drained loamy soil. Ideal for Rabi season with good irrigation.",
  tomato: "🍅 Tomato grows in all seasons. Requires fertile, well-drained soil and consistent watering. Sensitive to extreme temperatures.",
  cabbage: "🥬 Cabbage is a Rabi crop requiring cool weather. Grows best in sandy or clay loam soil rich in organic matter.",
  cauliflower: "🥦 Cauliflower prefers cool climates with rich, well-drained soil. Best grown in Rabi season with consistent moisture.",
  peas: "🌱 Peas are Rabi crops suited for cool climates and loamy soil. Require moderate irrigation and good drainage.",
  watermelon: "🍉 Watermelon needs warm climate and sandy or loamy soil. Kharif season crop requiring good drainage and mulching.",
};

  const cropKey = suggestions[0]?.crop?.toLowerCase();
  const tip = cropTips[cropKey] || "This is a recommended crop based on your soil and weather input. Ensure optimal practices for best yield.";

  const cropSeasons = {
    wheat: "Rabi",
    rice: "Kharif",
    maize: "Kharif",
    barley: "Rabi",
    sugarcane: "Perennial",
    cotton: "Kharif",
    soybean: "Kharif",
    jowar: "Kharif",
    bajra: "Kharif",
    groundnut: "Kharif",
    bengalgram: "Rabi",
    urad: "Kharif",
    moong: "Kharif",
    mustard: "Rabi",
    onion: "All Season",
    potato: "Rabi",
    tomato: "All Season",
    cabbage: "Rabi",
    cauliflower: "Rabi",
    peas: "Rabi",
    watermelon: "Kharif",
  };

  const getSeasonColor = (season) => {
    switch ((season || "").toLowerCase()) {
      case "kharif":
        return "#4caf50";
      case "rabi":
        return "#ff9800";
      case "zaid":
        return "#03a9f4";
      case "perennial":
        return "#8e24aa";
      case "all season":
        return "#607d8b";
      default:
        return "#9e9e9e";
    }
  };

  const getTranslatedName = (crop) => {
    const name = crop.toLowerCase();
    return cropTranslations[name]?.[lang] || crop;
  };

  const t = translations[lang];
  const topCrop = suggestions[0];
  const otherCrops = suggestions.slice(1);

  return (
    <div style={styles.container}>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={styles.langSelector}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>

      <h2 style={styles.subtitle}>{t.topSuggestions}</h2>
      <div style={styles.cardGrid}>
        <div
          style={{ ...styles.cropCard, cursor: "pointer" }}
          onClick={() => handleCropClick(topCrop)}>
          <img
            src={`/crops/${topCrop.crop.toLowerCase()}.png`}
            alt={topCrop.crop}
            style={{ ...styles.cropImage, width: 450, height: 450 }}
          />
          <div style={styles.cropHeader}>
            <h4 style={styles.cropName}>{getTranslatedName(topCrop.crop)}</h4>
            <span
              style={{
                ...styles.seasonTag,
                backgroundColor: getSeasonColor(
                  cropSeasons[topCrop.crop.toLowerCase()] || "Unknown"
                ),
              }}>
              {cropSeasons[topCrop.crop.toLowerCase()] || "?"}
            </span>
          </div>
          <p style={styles.cropDetail}>
            {t.probability}: <strong>{topCrop.probability}%</strong>
          </p>
          <p style={styles.cropDetail}>
            {t.msp}:{" "}
            {topCrop.msp !== "N/A" ? (
              <strong>₹{topCrop.msp.toLocaleString("en-IN")}</strong>
            ) : (
              "N/A"
            )}
          </p>
          <p style={styles.cropDetail}>{tip}</p>
        </div>
      </div>

      {otherCrops.length > 0 && (
        <>
          <h3 style={styles.subtitle}>{t.otherSuggestions}</h3>
          <div style={{ ...styles.cardGrid, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
            {otherCrops.map((item, index) => (
              <div
                key={index}
                style={{ ...styles.cropCard, cursor: "pointer" }}
                onClick={() => handleCropClick(item)}>
                <img
                  src={`/crops/${item.crop.toLowerCase()}.png`}
                  alt={item.crop}
                  style={{ ...styles.cropImage, width: 250, height: 300 }}
                />
                <div style={styles.cropHeader}>
                  <h4 style={styles.cropName}>{getTranslatedName(item.crop)}</h4>
                  <span
                    style={{
                      ...styles.seasonTag,
                      backgroundColor: getSeasonColor(
                        cropSeasons[item.crop.toLowerCase()] || "Unknown"
                      ),
                    }}>
                    {cropSeasons[item.crop.toLowerCase()] || "?"}
                  </span>
                </div>
                <p style={styles.cropDetail}>
                  {t.probability}: <strong>{item.probability}%</strong>
                </p>
                <p style={styles.cropDetail}>
                  {t.msp}:{" "}
                  {item.msp !== "N/A" ? (
                    <strong>₹{item.msp.toLocaleString("en-IN")}</strong>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 style={styles.subtitle}>{t.inputDetails}</h3>
      <div style={styles.inputGrid}>
        {Object.entries(input).map(([key, value]) => (
          <div key={key} style={styles.inputCard}>
            <strong style={styles.param}>{key.toUpperCase()}</strong>
            <span style={styles.value}>{value}</span>
          </div>
        ))}
      </div>

      {fertilizer && (
        <>
          <h3 style={styles.subtitle}>{t.fertilizerSuggestion}</h3>
          <div style={styles.fertilizerBox}>{fertilizer}</div>
        </>
      )}

      {npk && (
        <>
          <h3 style={styles.subtitle}>{t.npk}</h3>
          <div style={styles.fertilizerBox}>{npk}</div>
        </>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button style={styles.button} onClick={() => navigate("/")}>
          {t.predictAgain}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f9fafb",
    minHeight: "100vh",
    color: "#333",
  },
  subtitle: {
    marginTop: "30px",
    fontSize: "22px",
    color: "#1e88e5",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  langSelector: {
    padding: "6px 10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  fertilizerBox: {
    backgroundColor: "#e8f5e9",
    borderLeft: "5px solid #66bb6a",
    padding: "15px 20px",
    marginTop: "10px",
    borderRadius: "6px",
    fontSize: "16px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  cropCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
    textAlign: "center",
    border: "1px solid #e0e0e0",
  },
  cropImage: {
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  cropHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  cropName: {
    fontSize: "18px",
    color: "#2e7d32",
  },
  cropDetail: {
    margin: 0,
    fontSize: "14px",
    color: "#333",
  },
  seasonTag: {
    padding: "4px 8px",
    fontSize: "12px",
    color: "#fff",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "default",
  },
  inputGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  inputCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 0 8px rgba(0,0,0,0.06)",
    textAlign: "center",
    border: "1px solid #e0e0e0",
  },
  param: {
    display: "block",
    color: "#1e88e5",
    marginBottom: "6px",
    fontSize: "14px",
  },
  value: {
    fontSize: "16px",
    color: "#333",
  },
};

export default ResultPage;
