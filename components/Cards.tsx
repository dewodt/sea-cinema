import Image from "next/image";
import Link from "next/link";

const Cards = ({
  id,
  title,
  imageUrl,
  ageRating,
}: {
  id: string;
  title: string;
  imageUrl: string;
  ageRating: number;
}) => {
  return (
    <Link href={`/${id}`}>
      <article className="flex w-[225px] flex-col gap-3 font-inter text-custom-white xl:w-[275px] xl:gap-4">
        {/* Image */}
        <Image
          className="aspect-[2/3] w-full rounded-xl object-cover object-center"
          src={imageUrl}
          alt={`${title} Poster}`}
          width={200}
          height={375}
        />

        {/* Title */}
        <div className="flex flex-col gap-2 xl:gap-3">
          <h2 className="line-clamp-2 text-center text-lg font-bold leading-none xl:text-xl xl:leading-none">
            {title}
          </h2>

          {/* Age Rating */}
          <p className="text-center text-base font-medium leading-none xl:text-lg xl:leading-none">{`${ageRating}+`}</p>
        </div>
      </article>
    </Link>
  );
};

export default Cards;
