import clsx from "clsx";
import DropdownMenu, {
  CheckboxItemProps,
  OptionProps,
} from "./UI/DropdownMenu";

type ActionProps = OptionProps & {
  label: string;
  icon?: React.ReactNode;
};

export function Action({ label, icon, variant, ...props }: ActionProps) {
  return (
    <DropdownMenu.Item variant={variant} {...props}>
      <button
        className={clsx("flex items-center gap-2 w-full", !icon && "ml-6")}
      >
        {icon} <span>{label}</span>
      </button>
    </DropdownMenu.Item>
  );
}

export function CheckAction({ label, ...props }: CheckboxItemProps) {
  return <DropdownMenu.CheckboxItem label={label} {...props} />;
}
