import { PropsWithChildren } from "react";

type FieldProps = PropsWithChildren & { label: string; htmlFor: string };
export function Field({ children, label, htmlFor }: FieldProps) {
  return (
    <fieldset className="h-8 flex justify-between items-center gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </fieldset>
  );
}
