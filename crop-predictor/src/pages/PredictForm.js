import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Predictform.css";

function PredictForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    N: "80",
    P: "30",
    K: "48",
    temperature: "28",
    humidity: "70",
    ph: "6.5",
    soil: "loamy",
    acres: "2",
    water: "2000",
    region: "southern",
    season: "kharif",
    rainfall: "0",
  });

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getRainfallEstimate = (region, season, temperature) => {
    temperature = parseFloat(temperature);
    if (region === "northern" && season === "kharif" && temperature >= 35)
      return 800;
    if (region === "southern" && season === "rabi") return 300;
    if (region === "eastern" && season === "kharif") return 1000;
    if (region === "western" && season === "summer") return 200;
    if (region === "central") return 500;
    return 600;
  };

  const [feedback, setFeedback] = useState({});
  const [regionScores, setRegionScores] = useState({});
 const seasonCrops = {
  kharif: ["Paddy", "Cotton", "Maize", "Soybean"],
  rabi: ["Wheat", "Gram", "Mustard", "Barley"],
  zaid: ["Watermelon", "Cucumber", "Bitter Gourd", "Muskmelon"],
};


  useEffect(() => {
    const updatedRainfall = getRainfallEstimate(
      form.region,
      form.season,
      form.temperature
    );
    setForm((prev) => ({ ...prev, rainfall: updatedRainfall.toString() }));
  }, [form.region, form.season, form.temperature]);

  useEffect(() => {
    const { temperature, humidity, ph, rainfall, region } = form;
    const newFeedback = {};
    const rain = parseFloat(rainfall);
    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);
    const phVal = parseFloat(ph);

    const regionRain = {
      southern: [700, 900],
      central: [500, 800],
      northern: [900, 1500],
    };

    const scores = {};
    Object.entries(regionRain).forEach(([reg, [min, max]]) => {
      if (!isNaN(rain)) {
        let score = 0;
        if (rain >= min && rain <= max) score = 0.6;
        else if (rain > max) score = 0.45;
        else score = 0.3;
        scores[reg] = Math.round(score * 1000) / 10;
      }
    });
    setRegionScores(scores);

    if (!isNaN(temp))
      newFeedback.temperature =
        temp < 18 || temp > 32
          ? `⚠️ Temp ${temp}°C not ideal (18–32°C)`
          : `✅ Temp ${temp}°C is ideal`;

    if (!isNaN(hum))
      newFeedback.humidity =
        hum < 45 || hum > 83
          ? `⚠️ Humidity ${hum}% not ideal (45–83%)`
          : `✅ Humidity ${hum}% is ideal`;

    if (!isNaN(phVal))
      newFeedback.ph =
        phVal < 5.5 || phVal > 7.5
          ? `⚠️ pH ${phVal} not ideal (5.5–7.5)`
          : `✅ pH ${phVal} is ideal`;

    if (!isNaN(rain)) {
      const [min, max] = regionRain[region] || [600, 800];
      newFeedback.rainfall =
        rain < min
          ? `⚠️ Rainfall ${rain}mm low for ${region}`
          : rain > max
          ? `⚠️ Rainfall ${rain}mm high for ${region}`
          : `✅ Rainfall ${rain}mm is suitable`;
    }

    setFeedback(newFeedback);
  }, [form]);

  const handleSubmit = async () => {
    const numericForm = Object.fromEntries(
      Object.entries(form).map(([k, v]) =>
        ["soil", "region", "season"].includes(k) ? [k, v] : [k, parseFloat(v)]
      )
    );

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", numericForm);
      navigate("/result", {
        state: {
          input: numericForm,
          suggestions: res.data.suggestions,
          npk: res.data.npk,
        },
      });
    } catch (err) {
      alert("Prediction failed: " + (err.response?.data?.error || err.message));
    }
  };

  const soilDistributionTelangana = {
    red: 24,
    black: 40,
    alluvial: 12,
    laterite: 10,
    sandy: 5,
    loamy: 6,
    clay: 2,
    peaty: 1,
  };

  const help = {
    N: "Nitrogen (kg/ha) — 0 to 140",
    P: "Phosphorus (kg/ha) — 5 to 100",
    K: "Potassium (kg/ha) — 5 to 150",
    temperature: "Temperature (°C) — 10 to 45",
    humidity: "Humidity (%) — 10 to 100",
    ph: "pH Level — 4.0 to 9.0 (Ideal: 6.0–7.5)",
    acres: "Land Area (in acres)",
    water: "Water Capacity (Litres per day)",
  };

  const units = {
    N: "kg/ha",
    P: "kg/ha",
    K: "kg/ha",
    temperature: "°C",
    humidity: "%",
    ph: "pH",
    acres: "acres",
    water: "L/day",
  };

  return (
    <div className="form-container">
      <div className="user-bar">
        👤 <strong>{username}</strong>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      <h2>🌾 Smart Crop Recommendation</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Season</label>
          <select name="season" value={form.season} onChange={handleChange}>
            {Object.keys(seasonCrops).map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Region</label>
          <select name="region" value={form.region} onChange={handleChange}>
            <option value="southern">Southern</option>
            <option value="northern">Northern</option>
            <option value="central">Central</option>
            <option value="eastern">Eastern</option>
            <option value="western">Western</option>
          </select>
        </div>

        <div className="form-group full">
          <label>🌧️ Estimated Rainfall</label>
          <input type="text" value={`${form.rainfall} mm/year`} readOnly />
          {feedback.rainfall && <p className="feedback">{feedback.rainfall}</p>}
        </div>

        <div className="form-group full">
          <label>Soil Type</label>
          <select name="soil" value={form.soil} onChange={handleChange}>
            {Object.keys(soilDistributionTelangana).map((soil) => (
              <option key={soil} value={soil}>
                {soil.charAt(0).toUpperCase() + soil.slice(1)}
              </option>
            ))}
          </select>
          <div className="soil-preview">
            <img src={`/soils/${form.soil}.png`} alt={form.soil} />
            <span>{form.soil.charAt(0).toUpperCase() + form.soil.slice(1)} Soil</span>
          </div>
          <div className="soil-distribution">
            <h4>📊 Telangana Soil Coverage</h4>
            <p>{soilDistributionTelangana[form.soil]}%</p>
          </div>
        </div>

        <div className="form-group">
          <label>
            Water ({units.water})
            <span className="tooltip">ⓘ<span className="tooltiptext">{help.water}</span></span>
          </label>
          <input name="water" value={form.water} type="number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Acres ({units.acres})
            <span className="tooltip">ⓘ<span className="tooltiptext">{help.acres}</span></span>
          </label>
          <input name="acres" value={form.acres} type="number" onChange={handleChange} />
        </div>

        {["temperature", "humidity", "ph"].map((key) => (
          <div className="form-group" key={key}>
            <label>
              {key.toUpperCase()} ({units[key]})
              <span className="tooltip">ⓘ<span className="tooltiptext">{help[key]}</span></span>
            </label>
            <input
              name={key}
              value={form[key]}
              type="number"
              step="any"
              onChange={handleChange}
              placeholder={help[key]}
            />
            {feedback[key] && <p className="feedback">{feedback[key]}</p>}
          </div>
        ))}
      </div>

      <button className="predict-button" onClick={handleSubmit}>
        🔍 Predict Crop
      </button>

      {form.season && seasonCrops[form.season] && (
        <div className="season-crops">
          <h4>🌱 Crops for {form.season} season:</h4>
          <ul>
            {seasonCrops[form.season].map((crop, idx) => (
              <li key={idx}>{crop}</li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(regionScores).length > 0 && (
        <div className="region-scores">
          <h4>🗺️ Regional Rainfall Suitability:</h4>
          <ul>
            {Object.entries(regionScores).map(([region, score]) => (
              <li key={region}>
                {region.charAt(0).toUpperCase() + region.slice(1)}: {score}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PredictForm;
