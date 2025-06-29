import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CropDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData } = location.state || {};

  const [lang, setLang] = React.useState("en");

  if (!cropData) {
    return (
      <div style={styles.container}>
        <h3>❌ No crop data available.</h3>
        <button style={styles.button} onClick={() => navigate("/")}>⬅️ Go Back</button>
      </div>
    );
  }

  const translations = {
    en: {
      probability: "Probability",
      msp: "MSP",
      season: "Season",
      ideal_temp: "Ideal Temperature",
      ph_range: "pH Range",
      rainfall: "Rainfall Requirement",
      soil_type: "Soil Type",
      water_needs: "Water Needs",
      description: "This is a recommended crop based on your soil and weather input. Ensure optimal practices for best yield.",
      back: "Back to Results",
    },
    hi: {
      probability: "संभाव्यता",
      msp: "न्यूनतम समर्थन मूल्य (एमएसपी)",
      season: "ऋतु",
      ideal_temp: "आदर्श तापमान",
      ph_range: "pH सीमा",
      rainfall: "वर्षा आवश्यकता",
      soil_type: "मिट्टी का प्रकार",
      water_needs: "जल आवश्यकता",
      description: "यह आपकी मिट्टी और मौसम के अनुसार अनुशंसित फसल है। सर्वोत्तम उपज के लिए उपयुक्त तरीकों का पालन करें।",
      back: "परिणामों पर लौटें",
    },
    te: {
      probability: "సంభావ్యత",
      msp: "కనీస మద్దతు ధర (MSP)",
      season: "ఋతువు",
      ideal_temp: "ఆదర్శ ఉష్ణోగ్రత",
      ph_range: "pH శ్రేణి",
      rainfall: "వర్షపాతం అవసరం",
      soil_type: "నేల రకం",
      water_needs: "నీటి అవసరం",
      description: "ఇది మీ నేల మరియు వాతావరణ ఆధారంగా సిఫార్సు చేయబడిన పంట. ఉత్తమ దిగుబడి కోసం సరైన విధానాలను అనుసరించండి.",
      back: "ఫలితాలకు తిరిగి వెళ్ళు",
    },
  };

  const t = translations[lang];

  const getSeasonColor = (season) => {
    switch ((season || "").toLowerCase()) {
      case "kharif": return "#4caf50";
      case "rabi": return "#ff9800";
      case "zaid": return "#03a9f4";
      case "perennial": return "#8e24aa";
      case "all season": return "#607d8b";
      default: return "#9e9e9e";
    }
  };

  const cropInfo = {
    wheat: {
      temperature: "10–25°C",
      ph: "6.0–7.0",
      rainfall: "30–100 cm",
      soil: "Well-drained loamy",
      water: "Moderate",
    },
    rice: {
      temperature: "20–30°C",
      ph: "5.5–6.5",
      rainfall: "100–200 cm",
      soil: "Clayey",
      water: "High",
    },
    sugarcane: {
      temperature: "20–35°C",
      ph: "6.5–7.5",
      rainfall: "75–150 cm",
      soil: "Alluvial/loam",
      water: "Very High",
    },
    maize: {
      temperature: "18–27°C",
      ph: "5.5–7.5",
      rainfall: "50–100 cm",
      soil: "Well-drained loamy",
      water: "Moderate",
    },
    // Add more crops as needed
  };

  const cropDetails = cropInfo[cropData.crop.toLowerCase()] || {};

  return (
    <div style={styles.container}>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={styles.select}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>

      <h2 style={styles.title}>
        {cropData.crop.toUpperCase()} {" "}
        <span
          style={{
            ...styles.seasonBadge,
            backgroundColor: getSeasonColor(cropData.season),
          }}
          title={`Season: ${cropData.season}`}
        >
          {cropData.season}
        </span>
      </h2>

      <img
        src={`/crops/${cropData.crop.toLowerCase()}.png`}
        alt={cropData.crop}
        style={styles.image}
      />

      <div style={styles.detailsBox}>
        <p><strong>{t.probability}:</strong> {cropData.probability}%</p>
        <p><strong>{t.msp}:</strong> {cropData.msp !== "N/A" ? `₹${cropData.msp.toLocaleString("en-IN")}` : "N/A"}</p>
        <p><strong>{t.ideal_temp}:</strong> {cropDetails.temperature || "N/A"}</p>
        <p><strong>{t.ph_range}:</strong> {cropDetails.ph || "N/A"}</p>
        <p><strong>{t.rainfall}:</strong> {cropDetails.rainfall || "N/A"}</p>
        <p><strong>{t.soil_type}:</strong> {cropDetails.soil || "N/A"}</p>
        <p><strong>{t.water_needs}:</strong> {cropDetails.water || "N/A"}</p>
        <p><strong>{t.description}</strong></p>
      </div>

      <button style={styles.button} onClick={() => navigate(-1)}>🔙 {t.back}</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#fff",
    minHeight: "100vh",
    color: "#333",
  },
  select: {
    padding: "6px 10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#2e7d32",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  seasonBadge: {
    fontSize: "14px",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "bold",
    display: "inline-block",
  },
  image: {
    width: "80%",
    maxWidth: "300px",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  detailsBox: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    lineHeight: "1.8",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#1e88e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default CropDetailPage;
