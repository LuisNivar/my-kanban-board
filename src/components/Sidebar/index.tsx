import { useContext } from "react";
import { SidebarContext } from "../../Context";
import AddButtonItem from "./AddButtonItem";
import Footer from "./Footer";
import Header from "./Header";
import Items from "./Items";
import { MAX_BOARDS } from "./utils";

export default function Sidebar() {
  return (
    <div className="z-10 flex shadow-[0_4px_10px] shadow-black/80 justify-between text-[22px] text-neutral-400 flex-col items-center gap-3 py-3 px-2 rounded-lg h-screen bg-neutral-800">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

function Body() {
  const items = useContext(SidebarContext);

  return (
    <nav className="flex grow flex-col items-center gap-3">
      <Items state={items} />
      {items.length < MAX_BOARDS && <AddButtonItem />}
    </nav>
  );
}
