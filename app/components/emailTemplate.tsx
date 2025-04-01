import React from 'react';

interface EmailTemplateProps {
    firstName: string;
  }
  
export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.5" }}>
        <h2 style={{ color: "#333" }}>Dear {firstName},</h2>
        <p>Thank you for taking our MBTI Perfume Quiz!</p>
        <p>Your MBTI perfume quiz result is attached as below.</p>
        <p>Enjoy your fragrance journey!</p>
        <p>Best,</p>
        <p><strong>Vision Verse</strong></p>
      </div>
    );
};