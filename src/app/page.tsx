export default function Home() {
  return (
    <main className="bg-gray-100 h-full">
      <article
        className="container mx-auto p-4 flex items-center justify-center h-full"
        data-testid="welcome-message"
      >
        <p className="text-4xl text-gray-800">Bienvenido</p>
      </article>
    </main>
  );
}
