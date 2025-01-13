import SidebarSection from "../components/Settings/SidebarSection";

export default function Settings() {
  return (
    <div className="h-screen w-full py-12 px-32 bg-neutral-900 text-neutral-400">
      <h1 className="font-bold text-3xl mb-6 text-neutral-300">Settings</h1>
      <SidebarSection />
    </div>
  );
}
