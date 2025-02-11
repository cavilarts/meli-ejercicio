import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Spinner() {
  return (
    <section
      className="flex justify-center items-center h-screen w-screen"
      data-testid="spinner-component"
    >
      <AiOutlineLoading3Quarters
        className="animate-spin text-5xl text-black"
        data-testid="spinner"
      />
    </section>
  );
}

Spinner.displayName = Object.keys(Spinner).join("");

export { Spinner };
