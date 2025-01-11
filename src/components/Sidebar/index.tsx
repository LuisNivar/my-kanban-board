import { SidebarProvider } from "../../SidebarProvider";
import AddButtonItem from "./AddButtonItem";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function Sidebar() {
  return (
    <SidebarProvider>
      <div className="flex justify-between text-[22px] text-neutral-400 flex-col items-center gap-3 py-3 px-2 rounded-lg h-screen bg-neutral-800">
        <nav className="flex flex-col items-center gap-3">
          <Header />
          <Body />
          <AddButtonItem />
        </nav>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
