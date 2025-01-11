import { SidebarProvider } from "../../SidebarProvider";
import AddButtonItem from "./AddButtonItem";
import Footer from "./Footer";
import Header from "./Header";
import Items from "./Items";

export default function Sidebar() {
  return (
    <SidebarProvider>
      <div className="flex justify-between text-[22px] text-neutral-400 flex-col items-center gap-3 py-3 px-2 rounded-lg h-screen bg-neutral-800">
        <Header />
        <Body />
        <Footer />
      </div>
    </SidebarProvider>
  );
}

function Body() {
  return (
    <nav className="flex grow flex-col items-center gap-3">
      <Items />
      <AddButtonItem />
    </nav>
  );
}
