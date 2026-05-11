import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("login/", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.access);
        navigate("/dashboard");
      } else {
        await API.post("register/", form);
        alert("Registration successful ✅");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#020617",
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.18) 0px, transparent 50%)
        `,
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .custom-input {
            background-color: #1e293b !important;
            border: 1px solid #334155 !important;
            color: white !important;
          }

          .custom-input::placeholder {
            color: #94a3b8;
          }

          .custom-input:focus {
            border-color: #6366f1 !important;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2) !important;
            background-color: #1e293b !important;
            color: white !important;
          }

          .btn-primary-tech {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            border: none;
            color: white;
            transition: all 0.2s ease;
          }

          .btn-primary-tech:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          .password-toggle {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            z-index: 10;
          }

          .dark-card {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(255,255,255,0.05);
            backdrop-filter: blur(12px);
          }

          .dark-label {
            color: #e2e8f0;
          }

          .dark-text {
            color: #f8fafc;
          }

          .dark-muted {
            color: #94a3b8 !important;
          }
        `}
      </style>

      <div
        className="card border-0 p-4 dark-card"
        style={{
          width: "410px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div className="text-center mb-3">
          <img src="logo.png" alt="logo" width={100} height={100} />

          <h4 className="fw-bold mb-1 dark-text">
            {isLogin ? "Sign In" : "Register"}
          </h4>

          <p className="dark-muted mb-0" style={{ fontSize: "13px" }}>
            {isLogin
              ? "Welcome back to AI Quiz"
              : "Join the technical assessment platform"}
          </p>
        </div>

        <div className="card-body p-0 mt-3">
          {!isLogin && (
            <div className="mb-2">
              <label className="form-label small fw-semibold mb-1 dark-label">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control custom-input py-2"
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mb-2">
            <label className="form-label small fw-semibold mb-1 dark-label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="form-control custom-input py-2"
              style={{
                borderRadius: "10px",
                fontSize: "14px",
              }}
              placeholder="name@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small fw-semibold mb-1 dark-label">
              Password
            </label>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control custom-input py-2"
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                  paddingRight: "50px",
                }}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label small fw-semibold mb-1 dark-label">
                Confirm Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                className="form-control custom-input py-2"
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
                placeholder="••••••••"
                value={form.confirm_password}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            className="btn btn-primary-tech w-100 fw-bold py-2 mt-2 shadow-sm"
            style={{
              borderRadius: "10px",
              fontSize: "14px",
            }}
            onClick={handleSubmit}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        <div className="text-center mt-3">
          <p className="dark-muted mb-0" style={{ fontSize: "13px" }}>
            {isLogin ? "New here?" : "Joined before?"}

            <span
              className="ms-2 fw-bold text-decoration-none"
              style={{
                color: "#818cf8",
                cursor: "pointer",
              }}
              role="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create account" : "Log in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}