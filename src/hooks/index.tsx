import React from 'react';
import { AuthProvider } from './auth';

export const HooksProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
