import { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface IToast {
  toast: any;
}

const ToastContext = createContext<IToast>({} as any);

export const ToastProvider = ({ children }: any) => (
  <ToastContext.Provider value={{ toast }}>
    {children}
    <div className="toast-wrapper">
      <Toaster
        reverseOrder={false}
        containerStyle={{
          top: 20,
        }}
      />
    </div>
  </ToastContext.Provider>
);

export function useToast() {
  const context = useContext(ToastContext);

  return context;
}
