import { PropsWithChildren } from "react";

type FieldProps = PropsWithChildren & { label: string; htmlFor: string };
export function Field({ children, label, htmlFor }: FieldProps) {
  return (
    <fieldset className="flex items-center gap-5">
      <label className="w-24 text-right text-sm" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </fieldset>
  );
}
