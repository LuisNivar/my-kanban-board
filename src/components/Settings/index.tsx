import BackgrounbdSection from "./Background/BackgroundSection";
import SidebarSection from "./SidebarSection";

export default function SettingsContent() {
  return (
    <div className="h-screen w-full py-12 px-32 bg-neutral-900 text-neutral-400">
      <h1 className="font-bold text-3xl mb-6 text-neutral-100 [text-shadow:_0_2px_4px_rgb(22_22_22_/_0.8)]">
        Settings
      </h1>
      <div className="flex items-start gap-3">
        <SidebarSection />
        <BackgrounbdSection />
        {/* TODO: Add in the future */}
        {/* <GeneralSection /> */}
      </div>
    </div>
  );
}
