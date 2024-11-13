// src/components/Footer.tsx

"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="trading-footer bg-background-header flex items-center justify-center text-text-secondary">
      <p>&copy; {new Date().getFullYear()} QuantLeap. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
