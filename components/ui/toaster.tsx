// src/components/ui/toaster.tsx

'use client';

import React from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster: React.FC = () => {
  return <HotToaster position="top-right" reverseOrder={false} />;
};
