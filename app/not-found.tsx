import Link from "next/link";
import Button from "@/components/Button";

const NotFound = () => {
  return (
    <main className="flex flex-auto flex-col items-center justify-center gap-4 px-5 py-10 xl:gap-6">
      <h1 className="text-center font-inter text-4xl font-bold leading-none text-custom-light-red xl:text-5xl xl:leading-none">
        Error 404
      </h1>
      <p className="text-center font-inter text-lg font-bold leading-tight text-custom-white xl:text-xl xl:leading-tight">
        The page you&apos;re looking for doesn&apos;t exist
      </p>
      <Link href="/">
        <Button type="button" color="red" paddingX="30px" paddingY="15px">
          Home
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
