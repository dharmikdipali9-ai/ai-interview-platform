import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const technologies = [
    "HTML", "CSS", "JavaScript", "React", "Python", "Django", "Flask",
    "Node.js", "Express.js", "MongoDB", "SQL", "Java", "C", "C++",
    "C#", "PHP", "TypeScript", "Bootstrap", "Tailwind CSS", "Git",
    "Docker", "AWS", "Machine Learning", "Data Structures", "Algorithms",
  ];

  const filteredTech = technologies.filter((tech) =>
    tech.toLowerCase().includes(search.toLowerCase())
  );

  const startQuiz = async (role) => {
    if (!role.trim()) {
      alert("Please enter a technology");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("interviews/generate/", { role });
      localStorage.setItem("questions", JSON.stringify(res.data.questions));
      localStorage.setItem("interview_id", String(res.data.interview_id));
      navigate(`/interview/${res.data.interview_id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        backgroundColor: darkMode ? "#020617" : "#f8fafc",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.3s ease",
        backgroundImage: darkMode
          ? `radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 35%),
             radial-gradient(circle at bottom right, rgba(168,85,247,0.15), transparent 35%)`
          : `radial-gradient(circle at top left, rgba(59,130,246,0.05), transparent 35%),
             radial-gradient(circle at bottom right, rgba(168,85,247,0.05), transparent 35%)`,
      }}
    >
      <style>
        {`
          /* Unified Card Styles */
          .tech-card {
            background: ${darkMode ? "rgba(15, 23, 42, 0.85)" : "#ffffff"};
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.08)"};
            backdrop-filter: blur(14px);
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            position: relative;
            box-shadow: ${darkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"};
          }

          .tech-card:hover {
            transform: translateY(-8px);
            border-color: #6366f1;
            box-shadow: ${
              darkMode 
              ? "0 0 25px rgba(59,130,246,0.25), 0 0 45px rgba(168,85,247,0.18)" 
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            };
          }

          /* Search Input Styling */
          .search-input {
            background: ${darkMode ? "rgba(15,23,42,0.9)" : "#ffffff"} !important;
            border: 2px solid ${darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"} !important;
            color: ${darkMode ? "#ffffff" : "#0f172a"} !important;
            transition: all 0.2s ease;
          }

          .search-input:focus {
            border-color: #6366f1 !important;
            background: ${darkMode ? "rgba(15,23,42,1)" : "#ffffff"} !important;
            box-shadow: 0 0 0 4px ${darkMode ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)"} !important;
          }

          /* Navigation/Buttons */
          .logout-link {
            color: ${darkMode ? "#cbd5e1" : "#475569"};
            border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
            transition: all 0.2s ease;
          }

          .logout-link:hover {
            background: ${darkMode ? "#1e293b" : "#f1f5f9"};
            color: ${darkMode ? "#ffffff" : "#0f172a"};
          }

          .btn-tech-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            border: none;
            color: white;
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
            transition: all 0.25s ease;
          }

          .btn-tech-primary:hover:not(:disabled) {
            transform: scale(1.02);
            box-shadow: 0 12px 20px -3px rgba(59, 130, 246, 0.4);
            opacity: 0.95;
          }

          .glass-box {
            background: ${darkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)"};
            border: 1px solid ${darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.06)"};
            backdrop-filter: blur(12px);
          }
            /* Update the search input base */
.search-input {
  background: ${darkMode ? "rgba(15,23,42,0.9)" : "#ffffff"} !important;
  border: 2px solid ${darkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"} !important;
  color: ${darkMode ? "#ffffff" : "#0f172a"} !important;
  transition: all 0.2s ease;
}

/* Explicitly target the placeholder for different engines */
.search-input::placeholder {
  color: ${darkMode ? "#94a3b8" : "#64748b"} !important;
  opacity: 1; /* Browser defaults often lower opacity */
}

/* For older versions of Chrome/Safari/Edge */
.search-input::-webkit-input-placeholder {
  color: ${darkMode ? "#94a3b8" : "#64748b"} !important;
}

/* For Firefox */
.search-input::-moz-placeholder {
  color: ${darkMode ? "#94a3b8" : "#64748b"} !important;
  opacity: 1;
}
        `}
      </style>

      <div className="container">
        {/* Header */}
        <div className={`d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom ${darkMode ? 'border-secondary' : 'border-light'}`}>
          <div>
            <h1
              className="fw-bold mb-1"
              style={{
                color: darkMode ? "#f8fafc" : "#0f172a",
                letterSpacing: "-1px",
              }}
            >
              Assessment{" "}
              <span style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Hub
              </span>
            </h1>
            <p className="mb-0 fw-medium small" style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
              Ready to test your expertise?
            </p>
          </div>

          <button className="btn px-3 py-2 logout-link d-flex align-items-center gap-2 rounded-3"
            onClick={() => { localStorage.clear(); navigate("/"); }}>
            <span className="fw-semibold">Sign Out</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7">
            <div className="position-relative">
              <input
                type="text"
                className="form-control search-input py-3 ps-5"
                style={{ borderRadius: "16px", fontSize: "1.05rem" }}
                placeholder="What skill do you want to assess?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="position-absolute start-0 top-50 translate-middle-y ms-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#94a3b8" : "#64748b"} strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* AI Generate Box */}
        {search.trim() !== "" && !technologies.some(t => t.toLowerCase() === search.toLowerCase()) && (
          <div className="text-center p-5 mb-5 rounded-4 glass-box shadow-sm">
            <div className="mb-3 display-6">✨</div>
            <h4 className="fw-bold mb-2" style={{ color: darkMode ? "#f8fafc" : "#1e293b" }}>
              Generate Custom Assessment for "{search}"
            </h4>
            <p className="mb-4 mx-auto" style={{ maxWidth: "500px", color: darkMode ? "#94a3b8" : "#64748b" }}>
              Our AI engine will craft a unique set of technical questions specifically for this technology.
            </p>
            <button className="btn btn-tech-primary px-5 py-3 fw-bold" style={{ borderRadius: "14px" }} onClick={() => startQuiz(search)} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Start AI Interview 🚀"}
            </button>
          </div>
        )}

        {/* Technology Grid */}
        <div className="row g-4">
          {filteredTech.map((tech, index) => (
            <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
              <div className="card tech-card h-100 rounded-4 p-4 text-center border-0" onClick={() => startQuiz(tech)} style={{ cursor: "pointer" }}>
                <div className="mx-auto mb-4 d-flex align-items-center justify-content-center icon-box"
                  style={{
                    width: "72px", height: "72px", borderRadius: "20px", fontSize: "34px",
                    background: tech === "HTML" ? "linear-gradient(135deg,#e44d26,#f16529)" : 
                                tech === "CSS" ? "linear-gradient(135deg,#264de4,#2965f1)" :
                                tech === "JavaScript" ? "linear-gradient(135deg,#f7df1e,#f0db4f)" :
                                tech === "React" ? "linear-gradient(135deg,#61dafb,#2563eb)" :
                                tech === "Python" ? "linear-gradient(135deg,#3776ab,#ffd43b)" :
                                tech === "Django" ? "linear-gradient(135deg,#092e20,#44b78b)" :
                                "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                    boxShadow: darkMode ? "0 0 20px rgba(59,130,246,0.15)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}>
                  <span style={{ color: tech === "JavaScript" ? "#111827" : "white" }}>
                    {/* Simplified Emoji selector - icons unchanged as requested */}
                    {tech === "HTML" ? "🌐" : tech === "CSS" ? "🎨" : tech === "JavaScript" ? "⚡" : tech === "React" ? "⚛️" : tech === "Python" ? "🐍" : tech === "Django" ? "🎯" : tech === "Flask" ? "🧪" : tech === "Node.js" ? "🟢" : tech === "MongoDB" ? "🍃" : tech === "SQL" ? "🗄️" : tech === "Java" ? "☕" : tech === "C" ? "💻" : tech === "C++" ? "➕" : tech === "PHP" ? "🐘" : tech === "TypeScript" ? "🔷" : tech === "Bootstrap" ? "🅱️" : tech === "Tailwind CSS" ? "🌬️" : tech === "Git" ? "🔀" : tech === "Docker" ? "🐳" : tech === "AWS" ? "☁️" : tech === "Machine Learning" ? "🤖" : tech === "Data Structures" ? "📚" : "🧠"}
                  </span>
                </div>
                <h6 className="fw-bold mb-3" style={{ color: darkMode ? "#f8fafc" : "#1e293b", fontSize: "1.1rem" }}>
                  {tech}
                </h6>
                <div className="mt-auto">
                  <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill small fw-bold neon-badge"
                       style={{ 
                          background: darkMode ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)",
                          color: darkMode ? "#fff" : "#4f46e5",
                          border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.2)"}`
                       }}>
                    Take Quiz <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}