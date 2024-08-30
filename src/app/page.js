import Image from "next/image";
import imageLogo from "../../public/images/varsol.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center font-serif text-5xl font-semibold text-sky-500 mb-8">
        <h1>VARSOL</h1>
        <h2 className="text-3xl text-gray-700">Sushi Bar</h2>
      </div>

      <div className="relative w-full max-w-4xl h-96 shadow-lg rounded-lg overflow-hidden">
        <Image
          src={imageLogo}
          layout="fill"
          objectFit="cover"
          alt="image"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
