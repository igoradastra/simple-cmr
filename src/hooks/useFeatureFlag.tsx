import { useState, useEffect } from 'react';

export const useFeatureFlag = (featureName: string) => {
  const [isEnabled, setIsEnabled] = useState(() => {
    // Check localStorage first
    const localStorageValue = localStorage.getItem(featureName);
    if (localStorageValue !== null) {
      return localStorageValue === 'true';
    }
    
    // Check environment variables
    const envVarName = `VITE_${featureName}`;
    if (import.meta.env[envVarName] !== undefined) {
      return import.meta.env[envVarName] === 'true';
    }
    
    // Check cookies
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === featureName) {
        return value === 'true';
      }
    }
    
    // Default to false if no value is found
    return false;
  });

  useEffect(() => {
    // Listen for changes in cookies or local storage
    const checkForChanges = () => {
      const localStorageValue = localStorage.getItem(featureName);
      const cookieValue = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith(`${featureName}=`))
        ?.split('=')[1];
      
      const newValue = (localStorageValue === 'true' || cookieValue === 'true');
      
      if (isEnabled !== newValue) {
        setIsEnabled(newValue);
      }
    };

    window.addEventListener('storage', checkForChanges);
    
    // Check periodically for cookie changes
    const interval = setInterval(checkForChanges, 1000);
    
    return () => {
      window.removeEventListener('storage', checkForChanges);
      clearInterval(interval);
    };
  }, [featureName, isEnabled]);

  return isEnabled;
};