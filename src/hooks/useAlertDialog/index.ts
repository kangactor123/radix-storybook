import { useCallback, useContext } from "react";
import { AlertDialogProps } from "../../components/alert-dialog";
import {
  AlertDialogContext,
  AlertDialogContextProps,
} from "../../provider/alert-dialog.provider";

type OpenAlertDialogProps = Omit<AlertDialogProps, "open" | "onClickClose">;
type UseAlertDialogResult = {
  open: (props: OpenAlertDialogProps) => void;
  close: () => void;
};

const useAlertDialog = (): UseAlertDialogResult => {
  const alertContext = useContext<AlertDialogContextProps>(AlertDialogContext);

  const closeDialog = useCallback(() => {
    alertContext.close();
  }, [alertContext]);

  const openDialog = useCallback(
    (props: OpenAlertDialogProps) => {
      alertContext.open({
        ...props,
        open: true,
        onClickClose: closeDialog,
      });
    },
    [alertContext, closeDialog]
  );

  return {
    open: openDialog,
    close: closeDialog,
  };
};

export type { OpenAlertDialogProps };
export { useAlertDialog };
