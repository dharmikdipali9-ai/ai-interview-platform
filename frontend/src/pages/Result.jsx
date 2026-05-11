import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Import your theme hook

export default function Result() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const s = localStorage.getItem("score");
    const t = localStorage.getItem("total");

    if (s === null || t === null) {
      navigate("/");
    } else {
      setScore(Number(s));
      setTotal(Number(t));
    }
  }, [navigate]);

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= percentage) {
        start = percentage;
        clearInterval(interval);
      }
      setAnimatedPercentage(start);
    }, 20);
    return () => clearInterval(interval);
  }, [percentage]);

  const getFeedback = () => {
    if (percentage >= 80)
      return {
        title: "Excellent!",
        msg: "Strong command over this technology.",
        color: "#3b82f6",
        icon: "🚀",
      };
    if (percentage >= 50)
      return {
        title: "Good Attempt!",
        msg: "Solid foundation with room for growth.",
        color: "#8b5cf6",
        icon: "👍",
      };
    return {
      title: "Keep Learning",
      msg: "Review concepts and try again.",
      color: darkMode ? "#94a3b8" : "#64748b",
      icon: "📚",
    };
  };

  const feedback = getFeedback();

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#020617" : "#f8fafc",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.3s ease",
        backgroundImage: darkMode
          ? `radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 30%),
             radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 30%)`
          : `radial-gradient(circle at top left, rgba(59,130,246,0.05), transparent 40%),
             radial-gradient(circle at bottom right, rgba(168,85,247,0.05), transparent 40%)`,
      }}
    >
      <style>
        {`
          .result-card {
            background: ${darkMode ? "rgba(15, 23, 42, 0.88)" : "#ffffff"};
            border-radius: 22px;
            width: 100%;
            max-width: 380px;
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.08)"};
            backdrop-filter: blur(14px);
            box-shadow: ${darkMode 
              ? "0 0 30px rgba(59,130,246,0.12), 0 0 50px rgba(168,85,247,0.08)" 
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"};
            transition: all 0.35s ease;
          }

          .score-circle {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto 20px;
            position: relative;
            background:
              radial-gradient(
                closest-side,
                ${darkMode ? "#0f172a" : "#ffffff"} 82%,
                transparent 83% 100%
              ),
              conic-gradient(
                #3b82f6 calc(var(--percentage) * 1%),
                ${darkMode ? "#1e293b" : "#e2e8f0"} 0
              );
            box-shadow: ${darkMode 
              ? "0 0 25px rgba(59,130,246,0.22)" 
              : "0 10px 15px -3px rgba(59,130,246,0.2)"};
          }

          .feedback-box {
            background: ${darkMode ? "rgba(15,23,42,0.7)" : "#f8fafc"};
            border-radius: 16px;
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "#e2e8f0"};
          }

          .btn-outline-custom {
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"};
            background: ${darkMode ? "rgba(15,23,42,0.75)" : "transparent"};
            color: ${darkMode ? "#cbd5e1" : "#475569"};
            font-weight: 700;
            padding: 12px;
            border-radius: 14px;
            transition: all 0.3s ease;
          }

          .btn-outline-custom:hover {
            background: ${darkMode ? "rgba(59,130,246,0.12)" : "#f1f5f9"};
            color: ${darkMode ? "#93c5fd" : "#1e293b"};
          }

          .btn-primary-gradient {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            border: none;
            color: white;
            font-weight: 700;
            padding: 12px;
            border-radius: 14px;
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
          }
        `}
      </style>

      <div className="result-card p-4 text-center">
        <h6
          className="fw-semibold text-uppercase small mb-2"
          style={{
            letterSpacing: "2px",
            color: darkMode ? "#94a3b8" : "#64748b",
          }}
        >
          Assessment Complete
        </h6>

        <h2 className="fw-bold mb-4" style={{ color: darkMode ? "#f8fafc" : "#0f172a" }}>
          Your <span style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Result</span>
        </h2>

        {/* Animated Circle */}
        <div
          className="score-circle"
          style={{
            "--percentage": animatedPercentage,
          }}
        >
          <span
            className="fw-extrabold"
            style={{
              fontSize: "36px",
              color: feedback.color,
              lineHeight: "1.2",
            }}
          >
            {animatedPercentage}%
          </span>
          <span
            style={{
              fontSize: "11px",
              color: darkMode ? "#94a3b8" : "#64748b",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            SCORE
          </span>
        </div>

        {/* Score Breakdown */}
        <div className="mb-4">
          <h4 className="fw-bold mb-0" style={{ color: darkMode ? "#f8fafc" : "#1e293b" }}>
            {score}
            <span className="fw-normal" style={{ fontSize: "18px", color: darkMode ? "#64748b" : "#94a3b8" }}>
              {" "}/ {total} Correct
            </span>
          </h4>
        </div>

        {/* Feedback Section */}
        <div className="feedback-box p-3 mb-4">
          <div className="fs-2 mb-2">{feedback.icon}</div>
          <h5 className="fw-bold mb-1" style={{ color: feedback.color }}>
            {feedback.title}
          </h5>
          <p className="small mb-0" style={{ color: darkMode ? "#cbd5e1" : "#475569", lineHeight: "1.5" }}>
            {feedback.msg}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-3">
          <button
            className="btn btn-primary-gradient"
            onClick={() => {
              localStorage.removeItem("score");
              localStorage.removeItem("total");
              navigate("/dashboard");
            }}
          >
            Back to Dashboard
          </button>

          <button
            className="btn btn-outline-custom"
            onClick={() => navigate(-1)}
          >
            Retry Assessment
          </button>
        </div>
      </div>
    </div>
  );
}