import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Ensure this path is correct

export default function Quiz() {
  const { darkMode } = useTheme(); // Access the current theme state
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");
  const interview_id = Number(localStorage.getItem("interview_id"));
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  const allAnswered =
    responses.length === questions.length &&
    responses.every((r) => r?.selected);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (allAnswered) {
        submit();
      } else {
        alert("Time is up! Please answer all questions.");
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleOptionChange = (option) => {
    const updated = [...responses];
    updated[currentQuestion] = { selected: option };
    setResponses(updated);
  };

  const submit = async () => {
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("interviews/submit/", {
        interview_id,
        responses,
      });
      localStorage.setItem("score", res.data.score);
      localStorage.setItem("total", res.data.total);
      navigate("/result");
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    } finally {
      setLoading(false);
    }
  };

  const q = questions[currentQuestion];

  return (
    <div
      className="min-vh-100"
      style={{
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
          .glass-card {
            background: ${darkMode ? "rgba(15, 23, 42, 0.82)" : "#ffffff"};
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.08)"};
            backdrop-filter: blur(14px);
            box-shadow: ${darkMode 
              ? "0 0 25px rgba(59,130,246,0.08), 0 0 45px rgba(168,85,247,0.08)" 
              : "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"};
          }

          .question-option {
            transition: all 0.2s ease;
            border-radius: 14px;
            background: ${darkMode ? "rgba(15,23,42,0.75)" : "#fcfcfd"};
          }

          .question-option:hover {
            transform: translateY(-2px);
            border-color: #6366f1 !important;
            box-shadow: ${darkMode 
              ? "0 0 20px rgba(99,102,241,0.15)" 
              : "0 4px 12px rgba(99,102,241,0.1)"};
          }

          .navbar-custom {
            background: ${darkMode ? "rgba(2,6,23,0.85)" : "rgba(255,255,255,0.9)"};
            backdrop-filter: blur(12px);
            border-bottom: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "#e2e8f0"};
          }

          .timer-box {
            background: ${darkMode ? "rgba(127,29,29,0.25)" : "#fee2e2"};
            color: ${darkMode ? "#fda4af" : "#b91c1c"};
            border: 1px solid ${darkMode ? "rgba(244,63,94,0.2)" : "#fecaca"};
          }

          .badge-glow {
            background: ${darkMode ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)"};
            color: ${darkMode ? "#a5b4fc" : "#4f46e5"};
            border: 1px solid ${darkMode ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.2)"};
          }

          .nav-btn {
            color: ${darkMode ? "#94a3b8" : "#64748b"};
            transition: all 0.25s ease;
          }

          .nav-btn:hover:not(:disabled) {
            color: #3b82f6;
          }

          .btn-glow {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            border: none;
            color: white;
            box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
          }
        `}
      </style>

      {/* Header */}
      <nav className="navbar navbar-custom py-3 px-4 sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold" style={{ color: darkMode ? "#f8fafc" : "#0f172a" }}>
            <span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI
            </span>{" "}
            Interview Assessment
          </span>

          <div className="d-flex align-items-center gap-3">
            <span className="small fw-medium d-none d-sm-inline" style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
              Time Remaining:
            </span>
            <div className="timer-box px-3 py-2 rounded-3 fw-bold">
              <i className="bi bi-clock-history me-2"></i>
              {formatTime()}
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4 px-4 px-md-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="glass-card rounded-4 p-4 sticky-top" style={{ top: "100px" }}>
              <h6 className="fw-bold mb-3 text-uppercase small" style={{ letterSpacing: "1px", color: darkMode ? "#94a3b8" : "#64748b" }}>
                Progress
              </h6>

              <div className="d-flex flex-wrap gap-2 mb-4">
                {questions.map((_, index) => {
                  const isActive = currentQuestion === index;
                  const isAnswered = responses[index];
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className="progress-box d-flex align-items-center justify-content-center rounded-3 fw-bold cursor-pointer"
                      style={{
                        width: "42px", height: "42px", cursor: "pointer",
                        transition: "all 0.2s",
                        border: "1px solid",
                        borderColor: isActive ? "#3b82f6" : "transparent",
                        background: isActive 
                          ? "linear-gradient(135deg,#3b82f6,#8b5cf6)" 
                          : isAnswered 
                            ? (darkMode ? "rgba(34,197,94,0.15)" : "#dcfce7") 
                            : (darkMode ? "rgba(255,255,255,0.05)" : "#f1f5f9"),
                        color: isActive 
                          ? "white" 
                          : isAnswered 
                            ? (darkMode ? "#4ade80" : "#15803d") 
                            : (darkMode ? "#94a3b8" : "#64748b"),
                      }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-top" style={{ borderColor: darkMode ? "rgba(255,255,255,0.05)" : "#e2e8f0" }}>
                <div className="d-flex justify-content-between mb-2 small">
                  <span style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>Answered</span>
                  <span className="fw-bold text-success">{responses.filter(Boolean).length}</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>Remaining</span>
                  <span className="fw-bold text-danger">{questions.length - responses.filter(Boolean).length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Area */}
          <div className="col-lg-9">
            <div className="glass-card rounded-4 p-4 p-md-5 mb-4">
              <div className="mb-4">
                <span className="badge px-3 py-2 rounded-pill badge-glow">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              <h5 className="fw-bold mb-4" style={{ color: darkMode ? "#f8fafc" : "#1e293b", lineHeight: "1.6" }}>
                {q?.question}
              </h5>

              <div className="row g-3">
                {q?.options.map((opt, i) => {
                  const isSelected = responses[currentQuestion]?.selected === opt;

                  return (
                    <div key={i} className="col-12">
                      <div
                        onClick={() => handleOptionChange(opt)}
                        className="question-option d-flex align-items-center p-3 border-2"
                        style={{
                          cursor: "pointer",
                          border: `2px solid ${isSelected ? "#6366f1" : (darkMode ? "rgba(255,255,255,0.05)" : "#e2e8f0")}`,
                          backgroundColor: isSelected ? (darkMode ? "rgba(99,102,241,0.12)" : "#eef2ff") : "transparent"
                        }}
                      >
                        <div
                          className="me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "24px", height: "24px", borderRadius: "50%",
                            border: `2px solid ${isSelected ? "#6366f1" : (darkMode ? "rgba(255,255,255,0.2)" : "#cbd5e1")}`,
                            backgroundColor: isSelected ? "#6366f1" : "transparent",
                          }}
                        >
                          {isSelected && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "white" }} />}
                        </div>

                        <span className="fw-medium" style={{ color: isSelected ? (darkMode ? "#c4b5fd" : "#4338ca") : (darkMode ? "#e2e8f0" : "#475569") }}>
                          {opt}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top" style={{ borderColor: darkMode ? "rgba(255,255,255,0.05)" : "#e2e8f0" }}>
                <button
                  className="btn btn-link text-decoration-none fw-bold nav-btn"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  <i className="bi bi-chevron-left me-2"></i> Previous
                </button>

                <div>
                  {currentQuestion < questions.length - 1 ? (
                    <button className="btn btn-glow px-4 py-2 fw-bold rounded-3" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                      Next Question
                    </button>
                  ) : (
                    <div className="text-end">
                      <button className="btn btn-glow fw-bold px-4 py-2 rounded-3" onClick={submit} disabled={loading || !allAnswered}>
                        {loading ? "Grading..." : "Submit Assessment"}
                      </button>
                      {!allAnswered && (
                        <p className="text-danger mt-2 mb-0 small fw-bold">Please answer all questions.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}