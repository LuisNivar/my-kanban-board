import { GoGear as SettingIcon } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "../UI/Tooltip";

export default function SettingsItem() {
  const { pathname } = useLocation();
  //FIXME:
  const isActive = pathname.includes("settings");

  return (
    <Tooltip text="Settings">
      <Link
        to={"/settings"}
        className={`group transition-colors hover:rotate-180 hover:bg-neutral-700/60 rounded-lg p-2.5 ${
          isActive && "bg-teal-700 hover:bg-teal-600 text-neutral-100"
        }`}
      >
        <SettingIcon className="transition-transform group-hover:rotate-45" />
      </Link>
    </Tooltip>
  );
}
