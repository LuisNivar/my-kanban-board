import HomeContent from "../components/HomePage";

export default function Home() {
  return (
    <section className="select-none flex flex-col gap-3 h-screen w-full py-12 px-36 bg-neutral-900 text-neutral-400">
      <h1 className=" font-bold text-5xl mb-10 text-neutral-300">
        MY{" "}
        <span className="bg-gradient-to-r from-teal-500 from- via-blue-500 via- bg-clip-text text-transparent inline-block">
          KANBAN
        </span>
        BOARD
      </h1>
      <HomeContent />

      <p className=" text-lg italic text-neutral-500">
        Just select one and begin to plan!
      </p>
    </section>
  );
}
