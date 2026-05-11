import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);

  // Theme Toggle State

const { darkMode, setDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top navbar-dark-custom"
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "72px",

        background: darkMode ? "#091A3A" : "#ffffff",

        transition: "all 0.3s ease",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

          .navbar-dark-custom {
            border-bottom: 1px solid rgba(255,255,255,0.05);

            box-shadow:
              0 0 20px rgba(59,130,246,0.12);
          }

          .nav-brand-text {
            background:
              linear-gradient(
                135deg,
                #60a5fa 0%,
                #a78bfa 100%
              );

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            font-size: 22px;
            letter-spacing: -0.5px;
          }

          .nav-link-custom {
            color: #cbd5e1;

            font-weight: 600;
            font-size: 14px;

            padding: 10px 18px;

            border-radius: 12px;

            text-decoration: none;

            display: block;
          }

          .btn-logout-minimal {
            color: #f87171;

            background:
              rgba(239,68,68,0.08);

            border: 1px solid rgba(239,68,68,0.12);

            font-size: 14px;
            font-weight: 700;

            padding: 10px 18px;

            border-radius: 12px;

            width: 100%;
            text-align: left;
          }

          @media (min-width: 992px) {
            .btn-logout-minimal {
              width: auto;
              text-align: center;
            }

            .mobile-divider {
              width: 1px;
              height: 24px;

              background:
                rgba(255,255,255,0.08);

              margin: 0 6px;
            }
          }

          .navbar-toggler {
            border: none;
            padding: 0;
          }

          .navbar-toggler:focus {
            box-shadow: none;
          }

          .toggler-icon {
            width: 26px;
            height: 2px;

            background:
              linear-gradient(
                135deg,
                #60a5fa,
                #a78bfa
              );

            display: block;

            transition: all 0.3s ease;

            position: relative;

            border-radius: 10px;
          }

          .toggler-icon::before,
          .toggler-icon::after {
            content: '';

            width: 26px;
            height: 2px;

            background:
              linear-gradient(
                135deg,
                #60a5fa,
                #a78bfa
              );

            display: block;

            position: absolute;

            transition: all 0.3s ease;

            border-radius: 10px;
          }

          .toggler-icon::before {
            top: -8px;
          }

          .toggler-icon::after {
            bottom: -8px;
          }

          .navbar-toggler[aria-expanded="true"] .toggler-icon {
            background: transparent;
          }

          .navbar-toggler[aria-expanded="true"] .toggler-icon::before {
            transform: rotate(45deg);
            top: 0;
          }

          .navbar-toggler[aria-expanded="true"] .toggler-icon::after {
            transform: rotate(-45deg);
            bottom: 0;
          }

          .logo-img {
            border-radius: 14px;

            box-shadow:
              0 0 15px rgba(59,130,246,0.18),
              0 0 28px rgba(168,85,247,0.12);
          }

          /* Toggle Switch */

          .theme-toggle {
            width: 60px;
            height: 32px;

            background: rgba(255,255,255,0.08);

            border-radius: 50px;

            position: relative;

            cursor: pointer;

            border: 1px solid rgba(255,255,255,0.08);

            transition: all 0.3s ease;
          }

          .toggle-circle {
            width: 24px;
            height: 24px;

            background: linear-gradient(
              135deg,
              #60a5fa,
              #a78bfa
            );

            border-radius: 50%;

            position: absolute;

            top: 3px;

            transition: all 0.3s ease;

            display: flex;
            align-items: center;
            justify-content: center;

            color: white;
            font-size: 12px;

            box-shadow:
              0 0 12px rgba(59,130,246,0.3);
          }

          .toggle-circle.dark {
            left: 4px;
          }

          .toggle-circle.light {
            left: 30px;
          }
        `}
      </style>

      <div className="container-fluid px-md-4">
        {/* Brand */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/dashboard"
        >
          <img
            src="logo.png"
            alt="logo"
            width={52}
            height={52}
            className="logo-img"
          />

          <span className="fw-bold nav-brand-text">
            AI Interview
          </span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className={`collapse navbar-collapse ${
            !isCollapsed ? "show" : ""
          }`}
          id="navbarNav"
        >
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-3 py-3 py-lg-0">

            {/* Theme Toggle */}
            <div
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              <div
                className={`toggle-circle ${
                  darkMode ? "dark" : "light"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </div>
            </div>

            <Link
              className="nav-link-custom"
              to="/dashboard"
              onClick={() => setIsCollapsed(true)}
              style={{
                color: darkMode ? "#cbd5e1" : "#0f172a",
              }}
            >
              Dashboard
            </Link>

            <div className="mobile-divider d-none d-lg-block"></div>

            <button
              className="btn btn-logout-minimal"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2 d-lg-none"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}