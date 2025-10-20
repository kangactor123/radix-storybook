import type { PropsWithChildren } from "react";
import { createContext, useCallback, useState } from "react";

import * as ToastMessage from "@radix-ui/react-toast";

import { Toast, type ToastProps as ToastComponentProps } from "../toast";

// ✅ CSS Module 반영
import styles from "./styles.module.css";

type ToastProps = Omit<ToastComponentProps, "onOpenChange"> & { id?: string };

type ToastContextProps = {
  toastProps: Map<string, ToastProps>;
  open: (value: ToastProps) => void;
};

const ToastContext = createContext<ToastContextProps>({
  open: () => {},
  toastProps: new Map(),
});

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastProps, setToastProps] = useState<Map<string, ToastProps>>(
    new Map()
  );

  const open = useCallback((props: ToastProps) => {
    const id = Date.now().toString();

    setToastProps((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { ...props, id, isOpen: true });
      return newMap;
    });
  }, []);

  return (
    <ToastContext.Provider value={{ open, toastProps }}>
      <ToastMessage.Provider>
        {children}

        {Array.from(toastProps.values()).map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onOpenChange={(open) => {
              setToastProps((prev) => {
                const newMap = new Map(prev);
                newMap.set(toast.id || "", { ...toast, isOpen: open });
                return newMap;
              });
            }}
          />
        ))}

        {/* ✅ CSS Module className 변경 완료 */}
        <ToastMessage.Viewport
          aria-label="viewport"
          className={styles.viewport}
          data-position={
            Array.from(toastProps.values()).at(-1)?.position || "bottom-right"
          }
          data-testid="toast-viewport"
          hotkey={["Escape"]}
        />
      </ToastMessage.Provider>
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
export type { ToastContextProps };
