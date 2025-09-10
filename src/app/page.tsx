import RocketAnimation from '@/components/RocketAnimation';

export default function Home() {
  return (
    <>
      <section className="relative h-screen">
        <RocketAnimation />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 gap-2">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[100px] font-extrabold tracking-tight leading-none">
            Anirudh Bhardwaj
          </h1>
          <p className="text-lg italic sm:text-xl md:text-2xl lg:text-3xl opacity-70">
            Scroll to begin the journey
          </p>
        </div>
      </section>

      {/* Main content naturally flows after */}
      <main>
        <section className="h-screen grid place-items-center">
          <h2 className="text-4xl font-semibold">About Me</h2>
        </section>

        <section className="h-screen grid place-items-center">
          <h2 className="text-4xl font-semibold">Projects</h2>
        </section>

        <section className="h-screen grid place-items-center">
          <h2 className="text-4xl font-semibold">Contact</h2>
        </section>
      </main>
    </>
  );
}
