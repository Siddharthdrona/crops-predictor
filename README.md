# 🌱 Crop Prediction Web App

A full-stack Crop Prediction web application that helps farmers and agricultural users determine the best crop to grow based on real-time environmental and soil data. The project includes a machine learning-powered backend and a modern ReactJS frontend.

---

## 🗂 Project Structure

```

siddharthdrona-crops-predictor/
├── README.md                   # Root project documentation
├── backend/                   # Flask backend API and ML model
│   ├── app.py
│   ├── crop\_data.csv
│   ├── crop\_model.pkl
│   ├── feature\_selector.pkl
│   └── model\_train.py
└── crop-predictor/            # ReactJS frontend
├── README.md
├── package.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── reportWebVitals.js
├── setupTests.js
└── pages/
├── CropDetailPage.js
├── Login.js
├── Predictform.css
├── PredictForm.js
├── Register.js
└── ResultPage.js

````

---

## 🌾 Features

- Predicts most suitable crop based on:
  - Temperature
  - Humidity
  - pH
  - Soil type
  - Land size (acres)
  - Water availability
- ML model built using Random Forest
- User-friendly ReactJS frontend
- LocalStorage-based login/register system
- Image and seasonal information for each crop
- Multilingual support (e.g., Hindi descriptions)
- Extendable for chatbot & MSP support (future scope)

---

## ⚙️ Technologies Used

- **Frontend:** ReactJS, CSS, JSX
- **Backend:** Python, Flask, Scikit-learn
- **Model:** Random Forest Classifier
- **Other:** Axios, LocalStorage

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/siddharthdrona-crops-predictor.git
cd siddharthdrona-crops-predictor
````

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt  # manually list or create this file
python app.py
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd crop-predictor
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🧪 Sample API Request

**POST** `/predict`

```json
{
  "temperature": 28,
  "humidity": 70,
  "ph": 6.5,
  "soil": "loamy",
  "acres": 2,
  "water": 2000
}
```

**Response:**

```json
{
  "crop": "rice",
  "confidence": 0.91
}
```

---

## 📌 To-Do / Future Enhancements

* 🔁 Add chatbot with OpenAI for crop-related queries
* 💬 Voice-based crop interaction
* 💸 Show Minimum Support Price (MSP) per crop
* ☁️ Integrate real-time weather API
* 🧾 Save user prediction history in database

---

## 📜 License

MIT License — feel free to use and modify.

---

## 👨‍💻 Author

**Siddharth Drona**
🌐 GitHub: [@SiddharthDrona](https://github.com/Siddharthdrona)
