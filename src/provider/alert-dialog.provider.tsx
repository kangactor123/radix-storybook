import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { AlertDialog, type AlertDialogProps } from "../components/alert-dialog";

type AlertDialogContextProps = {
  alertDialogProps: AlertDialogProps;
  open: (value: AlertDialogProps) => void;
  close: () => void;
};

const init = () => {};
const initialProps: AlertDialogProps = {
  open: false,
  title: "",
  onClickClose: init,
  actionButtonLabel: "확인",
};

const AlertDialogContext = createContext<AlertDialogContextProps>({
  open: init,
  close: init,
  alertDialogProps: initialProps,
});

const AlertDialogProvider = (props: PropsWithChildren) => {
  const [alertDialogProps, setAlertDialogProps] =
    useState<AlertDialogProps>(initialProps);

  const close = useCallback(
    () => setAlertDialogProps((prev) => ({ ...prev, open: false })),
    []
  );
  const open = useCallback((props: AlertDialogProps) => {
    setAlertDialogProps((prev) => ({ ...prev, ...props, open: true }));
  }, []);

  return (
    <AlertDialogContext.Provider value={{ open, close, alertDialogProps }}>
      {props.children}
      <AlertDialog {...alertDialogProps} />
    </AlertDialogContext.Provider>
  );
};

export type { AlertDialogContextProps };
export { AlertDialogProvider, AlertDialogContext };
