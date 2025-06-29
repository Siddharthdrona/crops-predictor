import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    phone: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { fullName, username, phone, password } = form;
    if (!fullName || !username || !phone || !password) {
      alert("❗ Please fill all fields");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/register', form);
      alert("✅ Registered successfully! Please login.");
      navigate('/login');
    } catch (err) {
      alert("❌ Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Create Account</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.passwordInput}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleIcon}
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Register
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #c3ecb2, #7dd3fc)",
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
    maxWidth: "420px",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#0288d1",
    fontWeight: "600",
  },
  input: {
    width: "90%",
    padding: "12px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  passwordInput: {
    width: "85%",
    padding: "12px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    paddingRight: "40px",
  },
  toggleIcon: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0288d1",
    color: "#fff",
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
    color: "#0288d1",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Register;
