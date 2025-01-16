import * as DialogPrimitive from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";
import { GoX as CloseIcon } from "react-icons/go";

export type DialogProps = DialogPrimitive.DialogProps;
function Dialog({ children, ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

function Trigger({ children, ...props }: DialogPrimitive.DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger {...props} asChild>
      {children}
    </DialogPrimitive.Trigger>
  );
}

export type DialogContentProps = PropsWithChildren & {
  title: string;
  description?: string;
};
function Content({ children, title, description }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-neutral-900/80 data-[state=open]:animate-overlayShow" />
      <DialogPrimitive.Content className="fixed border-neutral-600 border left-1/2 top-1/2 max-h-[85vh] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-800 p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <DialogPrimitive.Title className="mb-3 cursor-default text-lg font-medium text-neutral-200">
          {title}
        </DialogPrimitive.Title>

        <DialogPrimitive.Description className="mb-5 text-base leading-normal text-neutral-300 ">
          {description}
        </DialogPrimitive.Description>
        {children}
        <DialogPrimitive.Close asChild>
          <button
            className="absolute right-3 top-3 inline-flex size-8 appearance-none items-center justify-center rounded-lg text-neutral-400 hover:bg-red-800/20 hover:text-red-300 focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export type DialogButtonProps = DialogPrimitive.DialogCloseProps & {
  variant: "default" | "secondary" | "danger";
};

function Button({ variant, ...props }: DialogButtonProps) {
  let style;
  switch (variant) {
    case "danger":
      style = "text-neutral-50 bg-red-700 hover:bg-red-600";
      break;
    case "secondary":
      style = "text-neutral-300 bg-neutral-700/30 hover:bg-neutral-700";
      break;
    default:
      style = "bg-neutral-50  text-neutral-900 hover:bg-neutral-200";
      break;
  }

  return (
    <DialogPrimitive.Close {...props} asChild>
      <button
        className={`${style} transition-colors inline-flex items-center justify-center rounded  px-4 py-3 text-sm font-medium leading-none focus:outline-none `}
        aria-label="Close"
      >
        {props.children}
      </button>
    </DialogPrimitive.Close>
  );
}

export default Object.assign(Dialog, { Trigger, Content, Button });
