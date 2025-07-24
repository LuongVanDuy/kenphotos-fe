import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="pixlmob-login-container">
      <div className="login-content">
        <div className="login-form-section">
          <div className="login-header">
            <h1 className="login-title">Forgot Password</h1>
            <p className="login-subtitle">
              Remember your password? <Link href="/auth/login" className="create-account-link">Login here.</Link>
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: '#7f8c8d', fontSize: '16px' }}>
              Password reset feature will be implemented soon.
            </p>
            <Link href="/auth/login" className="pixlmob-login-btn" style={{ 
              display: 'inline-block', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              color: 'white',
              borderRadius: '8px',
              marginTop: '20px'
            }}>
              Back to Login
            </Link>
          </div>
        </div>

        <div className="login-brand-section">
          <div className="brand-logo">
            <h2 className="brand-name">pixlmob</h2>
            <p className="brand-tagline">
              The secret to success for<br />
              real estate media<br />
              companies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
