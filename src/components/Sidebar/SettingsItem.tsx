import { GoGear as SettingIcon } from "react-icons/go";
import { Link } from "react-router-dom";
import Tooltip from "../UI/Tooltip";

export default function SettingsItem() {
  return (
    <Tooltip text="Settings">
      <Link
        to={"/settings"}
        className="group transition-colors hover:rotate-180 hover:bg-neutral-700/60 rounded-lg p-2.5"
      >
        <SettingIcon className="transition-transform group-hover:rotate-45" />
      </Link>
    </Tooltip>
  );
}
