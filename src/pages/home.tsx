import HomeContent from "../components/HomePage";
import Footer from "../components/HomePage/Footer";

export default function Home() {
  return (
    <section className="relative select-none flex flex-col gap-3 h-screen w-full py-8 lg:py-12 px-12 lg:px-36 bg-neutral-900 text-neutral-400">
      <h1 className="font-bold text-4xl lg:text-5xl mb-8 lg:mb-10 text-neutral-300">
        MY{" "}
        <span className="bg-gradient-to-r from-teal-500 from- via-blue-500 via- bg-clip-text text-transparent inline-block">
          KANBAN
        </span>
        BOARD
      </h1>
      <HomeContent />

      <p className="text-lg italic text-neutral-500">
        Just select one and begin to plan!
      </p>

      <Footer />
    </section>
  );
}
