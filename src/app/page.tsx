import RocketAnimation from '@/components/RocketAnimation';

export default function Home() {
  return (
    <>
      {/* Rocket intro section */}
      <section className="relative h-screen">
        <RocketAnimation />
        <div className="absolute inset-0 grid place-items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Anirudh Bhardwaj
          </h1>
          <p className="mt-4 text-lg opacity-70">Scroll to begin the journey</p>
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
