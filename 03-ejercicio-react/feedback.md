Holaa!

Me saco el sombrero con tu ejercicio, es el más completo que he visto hasta ahora :)
Muy bien hecho!! Entendiste muy bien los conceptos y quiero destacar la implementación del Router y del debounce, siempre hay problemas con eso y en este caso, lo has hecho MUY bien

Dejamos varios comentarios por el código, para que se te sea más fácil leerlos, miralos en este orden:
- main.jsx
- App.jsx
- Home.jsx
- Search.jsx

Luego todo lo que sigue dentro de cada archivo

---

Espero ayude el feedback que te fuimos dando
Y sobre tus preguntas en `dudas.md`:

Tu código quedó muy bien estructurado, se me hizo fácil leerlo. Luego si se usa un patrón u otro, es indiferente, lo que importa es que el código sea declarativo y que sea fácil de entender, y esas dos cosas las cumpliste muy bien

Sobre el toast, hay muchas (pero me gustan dos) alternativas para hacerlo sin librerías:
1. CustomEvents
2. ContextAPI

Voy a explicarlo por:

## Con CustomEvents

```jsx
// toast.js - Sistema de eventos
export const showToast = (message, type = 'info') => {
  window.dispatchEvent(new CustomEvent('toast', { 
    detail: { message, type } 
  }));
};

// ToastContainer.jsx
import { useState, useEffect } from 'react';

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
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
}

// Uso en cualquier componente
import { showToast } from './toast';

function MyComponent() {
  return (
    <button onClick={() => showToast('¡Guardado!', 'success')}>
      Guardar
    </button>
  );
}
```

## Con ContextAPI

```jsx
// ToastContext.jsx
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// App.jsx
import { ToastProvider } from './ToastContext';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

// Uso en componente
import { useToast } from './ToastContext';

function MyComponent() {
  const { showToast } = useToast();
  
  return (
    <button onClick={() => showToast('¡Guardado!', 'success')}>
      Guardar
    </button>
  );
}
```

Mi favorita es con CustomEvents :) Pero son gustos, me gusta más así para evitar englobar todo el código en un provider

Son cosas nuevas así que con calma, cualquier duda de esto me dices!