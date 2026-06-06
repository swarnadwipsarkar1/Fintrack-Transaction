"use client";
import { useState } from "react";

export default function AuthModal({ onLogin }) {
  const [view, setView] = useState("main"); // main, otp, forgot-email, forgot-reset
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleMainSubmit = (e) => {
    e.preventDefault();
    if (isLoginTab) {
      // Simulate login
      onLogin();
    } else {
      // Simulate register
      if (password.length < 6) {
        alert("Password must contain at least 6 letters");
        return;
      }
      setView("otp");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div id="auth-modal" className="modal-overlay active" style={{ display: "flex", opacity: 1, pointerEvents: "auto", background: "rgba(0, 0, 0, 0.95)", zIndex: 9999 }}>
      <div className="modal-content" style={{ maxWidth: 400, width: "100%" }}>
        
        {/* VIEW 1: LOGIN / REGISTER */}
        {view === "main" && (
          <div id="auth-view-main">
            <div className="modal-header" style={{ justifyContent: "center", borderBottom: "none", marginBottom: 10 }}>
              <h2 style={{ fontSize: 24 }}>Welcome to FinTrack</h2>
            </div>

            <div className="auth-tabs" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button 
                className="submit-btn" 
                style={{ flex: 1, background: isLoginTab ? "var(--accent-blue)" : "var(--bg-hover)", color: isLoginTab ? "#fff" : "var(--text)" }}
                onClick={() => setIsLoginTab(true)}
              >
                Login
              </button>
              <button 
                className="submit-btn" 
                style={{ flex: 1, background: !isLoginTab ? "var(--accent-blue)" : "var(--bg-hover)", color: !isLoginTab ? "#fff" : "var(--text)" }}
                onClick={() => setIsLoginTab(false)}
              >
                Register
              </button>
            </div>

            <form id="auth-form" noValidate onSubmit={handleMainSubmit}>
              <div className="form-group" style={{ marginBottom: 15 }}>
                <label htmlFor="auth-email">Email Address</label>
                <input 
                  type="email" 
                  id="auth-email" 
                  required 
                  autoComplete="email" 
                  style={{ width: "100%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: 15 }}>
                <label htmlFor="auth-password">Password</label>
                <input 
                  type="password" 
                  id="auth-password" 
                  required 
                  minLength="6" 
                  autoComplete="current-password" 
                  style={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {!isLoginTab && (
                <div className="form-group" id="auth-confirm-group" style={{ marginBottom: 15 }}>
                  <label htmlFor="auth-confirm-password">Confirm Password</label>
                  <input 
                    type="password" 
                    id="auth-confirm-password" 
                    autoComplete="new-password" 
                    style={{ width: "100%" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}

              {isLoginTab && (
                <div id="auth-forgot-wrap" style={{ textAlign: "right", marginBottom: 25 }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setView("forgot-email"); }} style={{ color: "var(--accent-blue)", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <button type="submit" className="submit-btn" style={{ width: "100%", fontSize: 16 }}>
                {isLoginTab ? "Login" : "Register"}
              </button>
            </form>
          </div>
        )}

        {/* VIEW 2: OTP VERIFICATION */}
        {view === "otp" && (
          <div id="auth-view-otp" style={{ textAlign: "center" }}>
            <div className="modal-header" style={{ justifyContent: "center", borderBottom: "none", marginBottom: 5 }}>
              <h2 style={{ fontSize: 24 }}>Verify Email</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
              We sent a 6-digit code to <br/><b style={{ color: "var(--text-primary)" }}>{email}</b>
            </p>

            <form noValidate onSubmit={handleOtpSubmit}>
              <div className="form-group" style={{ marginBottom: 25 }}>
                <input 
                  type="text" 
                  placeholder="000000" 
                  maxLength="6" 
                  required 
                  style={{ width: "100%", textAlign: "center", fontSize: 24, letterSpacing: "0.5em", padding: 15 }} 
                />
              </div>
              <button type="submit" className="submit-btn" style={{ width: "100%", fontSize: 16, marginBottom: 15 }}>
                Verify OTP
              </button>
              <a href="#" onClick={(e) => { e.preventDefault(); setView("main"); }} style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none" }}>
                &larr; Back
              </a>
            </form>
          </div>
        )}

        {/* VIEW 3: FORGOT PASSWORD (EMAIL) */}
        {view === "forgot-email" && (
          <div id="auth-view-forgot-email">
            <div className="modal-header" style={{ justifyContent: "center", borderBottom: "none", marginBottom: 5 }}>
              <h2 style={{ fontSize: 24 }}>Reset Password</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 15, textAlign: "center" }}>
              Enter your email to receive a secure password reset link.
            </p>
            <div style={{ background: "rgba(255, 68, 68, 0.1)", borderLeft: "3px solid var(--danger-color)", padding: 10, marginBottom: 20, borderRadius: 4 }}>
              <p style={{ fontSize: 13, color: "var(--danger-color)", margin: 0, textAlign: "center" }}>
                <strong>⚠️ Important:</strong> The reset link is automated and will likely go to your <strong>Spam / Junk</strong> folder.
              </p>
            </div>

            <form noValidate onSubmit={(e) => { e.preventDefault(); setView("forgot-reset"); }}>
              <div className="form-group" style={{ marginBottom: 25 }}>
                <label>Email Address</label>
                <input type="email" required style={{ width: "100%" }} />
              </div>
              <button type="submit" className="submit-btn" style={{ width: "100%", fontSize: 16, marginBottom: 15 }}>
                Send Reset Mail
              </button>
              <div style={{ textAlign: "center" }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setView("main"); }} style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none" }}>
                  &larr; Back to Login
                </a>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 4: FORGOT PASSWORD (RESET) */}
        {view === "forgot-reset" && (
          <div id="auth-view-forgot-reset">
            <div className="modal-header" style={{ justifyContent: "center", borderBottom: "none", marginBottom: 5 }}>
              <h2 style={{ fontSize: 24 }}>New Password</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, textAlign: "center" }}>
              Enter your new password below.
            </p>

            <form noValidate onSubmit={(e) => { e.preventDefault(); setView("main"); }}>
              <div className="form-group" style={{ marginBottom: 15 }}>
                <label>New Password</label>
                <input type="password" required style={{ width: "100%" }} />
              </div>
              <div className="form-group" style={{ marginBottom: 25 }}>
                <label>Confirm New Password</label>
                <input type="password" required style={{ width: "100%" }} />
              </div>
              <button type="submit" className="submit-btn" style={{ width: "100%", fontSize: 16 }}>
                Reset Password
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
