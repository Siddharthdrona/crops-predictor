import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("username", res.data.username);
      navigate("/predict");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Welcome Back</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={styles.footer}>
          New user? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    transition: "all 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#1976d2",
    fontWeight: "600",
  },
  input: {
    width: "70%",
    padding: "12px",
    fontSize: "15px",
    marginLeft: "10%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    width: "77%",
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "#fff",
    marginLeft: "10%",
    fontSize: "16px",
    fontWeight: "500",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default LoginPage;
