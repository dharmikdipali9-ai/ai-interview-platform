import { useTheme } from "../context/ThemeContext"; // Adjust path as needed

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      style={{
        backgroundColor: darkMode ? "#091A3A" : "#ffffff",
        borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
        padding: "20px 0",
        fontFamily: "'Inter', sans-serif",
        boxShadow: darkMode 
          ? "0 -4px 20px rgba(59,130,246,0.05)" 
          : "0 -2px 10px rgba(0,0,0,0.02)",
        transition: "all 0.3s ease",
        
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

          .footer-text {
            color: ${darkMode ? "#cbd5e1" : "#64748b"};
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s ease;
          }
         
          a{
            text-decoration : none;
          }

          .footer-highlight {
            color: ${darkMode ? "#60a5fa" : "#3b82f6"};
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .footer-wrapper {
              flex-direction: column;
              gap: 8px;
              text-align: center;
            }
          }
        `}
      </style>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center footer-wrapper">
          {/* Left Side */}
          <div className="footer-text">
            All Rights Reserved | Copyright © 2026
          </div>

          {/* Right Side */}
          <div className="footer-text">
            Designed & Developed by{" "}
             <a href="https://www.linkedin.com/in/dipalidharmik/" target="_blank"><span className="footer-highlight">
              Dipali Dharmik 
            </span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}