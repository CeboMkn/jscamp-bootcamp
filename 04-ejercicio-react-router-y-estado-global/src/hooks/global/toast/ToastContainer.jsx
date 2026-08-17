import { useState, useEffect } from 'react';
import style from './toast.module.css';

export default function ToastContainer() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleToast = (e) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 3000);
    };
    
    window.addEventListener('toast', handleToast);
    return () => window.removeEventListener('toast', handleToast);
  }, []);

  if (!toast) return null;
  
  return (
    <div className={`${style.toast} ${style[`toast-${toast.type}`]}`}>
      {toast.message}
    </div>
  );
}