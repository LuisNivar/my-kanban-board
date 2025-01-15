import { XCircleIcon } from "./Icons";
import Dialog, { DialogProps } from "./UI/Dialog";

type DeleteDialogProps = DialogProps & { onConfirm: () => void };
export default function DeleteDialog({
  children,
  onConfirm,
  ...props
}: DeleteDialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content title="Confirm delete">
        <div className="flex gap-6 flex-col">
          <span className="flex gap-3 text-neutral-300 items-center">
            <XCircleIcon className="text-4xl" />
            <p>Are you sure you want to delete it?</p>
          </span>
          <span className="flex gap-2 items-center justify-center">
            <Dialog.Button variant="secondary">Cancel</Dialog.Button>
            <Dialog.Button onClick={() => onConfirm()} variant="danger">
              Confirm
            </Dialog.Button>
          </span>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
