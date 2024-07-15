import React from 'react';
import './ResetPasswordComplete.css';

const ResetPasswordComplete = () => {
  return (
    <div className="reset-password-complete-container">
      <h1>Password Reset Complete</h1>
      <p>Your password has been set. You can now <a href="/login">log in</a> with your new password.</p>
    </div>
  );
};

export default ResetPasswordComplete;
