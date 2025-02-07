import React from 'react';

interface EmailTemplateProps {
    firstName: string;
    imageSrc: string;
  }
  
export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, imageSrc }) => {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.5" }}>
        <h1 style={{ color: "#333" }}>Hi {firstName},</h1>
        <p>Thank you for taking our MBTI Perfume Quiz!</p>
        <p>Your MBTI perfume quiz result is attached as below.</p>
        
        {/* Ensure image is properly displayed in emails */}
        <img src={imageSrc} alt="Perfume Quiz Result" style={{ maxWidth: "100%", borderRadius: "8px" }} />
  
        <p>Enjoy your fragrance journey!</p>
        <p>Best,</p>
        <p><strong>Vision Verse</strong></p>
      </div>
    );
};