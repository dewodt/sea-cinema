import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export const generateStaticParams = async () => {
  const movies = await prisma.movie.findMany();

  return movies.map((movie) => ({ id: movie.id }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const movie = await prisma.movie.findUnique({ where: { id: id } });

  // If no movie is found
  if (!movie) {
    return {
      title: `Error 404 | SEA Cinema`,
      description: "Page is not found",
    };
  }

  return {
    title: `${movie.title} | SEA Cinema`,
    description: `${movie.description}`,
  };
};

const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const movie = await prisma.movie.findUnique({ where: { id: id } });

  // If no movie is found
  if (!movie) {
    return notFound();
  }

  // Get times
  const timeNow = new Date().getTime();
  const timeRelease = movie.releaseDate.getTime();
  const timeToday00 = new Date().setHours(0, 0, 0, 0);
  const timeTomorrow00 = timeToday00 + 24 * 60 * 60 * 1000;

  // Schedule
  const scheduleToday = Array.from({ length: 4 }, (_, index) => {
    const hour = 12 + 3 * index;
    const timeTodayIndex = new Date().setHours(hour, 0, 0, 0);
    return {
      buttonText: `${hour}:00`,
      buttonDisabled: timeNow > timeTodayIndex,
      buttonLink: `/${movie.id}/${timeTodayIndex}`,
    };
  });

  const scheduleTomorrow = Array.from({ length: 4 }, (_, index) => {
    const hour = 12 + 3 * index;
    const timeTomorrowIndex =
      new Date().setHours(hour, 0, 0, 0) + 24 * 60 * 60 * 1000;
    return {
      buttonText: `${hour}:00`,
      buttonDisabled: timeNow > timeTomorrowIndex,
      buttonLink: `/${movie.id}/${timeTomorrowIndex}`,
    };
  });

  // If movie is found
  return (
    <main className="flex flex-auto justify-center px-5 py-10 font-inter text-custom-white xl:py-20">
      <article className="flex w-full max-w-2xl flex-col gap-5 xl:max-w-3xl">
        {/* Header */}
        <div className="flex flex-row items-center gap-4">
          {/* Age Rating */}
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-custom-light-red text-base font-bold">
            {movie.ageRating}+
          </div>
          {/* Title */}
          <h1 className="line-clamp-2 text-2xl font-bold text-custom-light-red xl:text-3xl">
            {movie.title}
          </h1>
        </div>

        {/* Image and schedule */}
        <div className="flex flex-col gap-5 sm:flex-row">
          <Image
            className="aspect-[2/3] w-[225px] self-center rounded-xl object-cover object-center sm:self-start xl:w-[275px]"
            src={movie.imageUrl}
            alt={`${movie.title} Poster}`}
            width={200}
            height={375}
          />

          {/* Schedule */}
          <div className="flex flex-col gap-3">
            {/* Today */}
            {timeToday00 >= timeRelease && (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">
                  {new Date(timeToday00).toLocaleDateString("en-US")} (Today)
                </h2>
                <div className="flex flex-row flex-wrap gap-3">
                  {scheduleToday.map((schedule, index) => {
                    return (
                      <Link key={index} href={schedule.buttonLink}>
                        <Button
                          color="trans-red"
                          paddingX="13px"
                          paddingY="10px"
                          disabled={schedule.buttonDisabled}
                        >
                          <span className="text-sm">{schedule.buttonText}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tomorrow */}
            {timeTomorrow00 >= timeRelease && (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">
                  {new Date(timeTomorrow00).toLocaleDateString("en-US")}{" "}
                  (Tomorrow)
                </h2>
                <div className="flex flex-row flex-wrap gap-3">
                  {scheduleTomorrow.map((schedule, index) => {
                    return (
                      <Link key={index} href={schedule.buttonLink}>
                        <Button
                          color="trans-red"
                          paddingX="13px"
                          paddingY="10px"
                          disabled={schedule.buttonDisabled}
                        >
                          <span className="text-sm">{schedule.buttonText}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Movie Description */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Release Date</h2>
            <p className="text-base font-normal">
              {new Date(movie.releaseDate).toLocaleDateString("en-US")}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Description</h2>
            <p className="text-justify text-base font-normal">
              {movie.description}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
};

export default MovieDetail;