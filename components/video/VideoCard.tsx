import Image from "next/image";
import Author01 from "@/public/images/author-01.jpg";

interface VideoCardProps {
  title: string;
  author: string;
  cover: string;
  authorAvatar?: string;
}

export function VideoCard({
  title,
  author,
  cover,
  authorAvatar,
}: VideoCardProps) {
  return (
    <a
      className="relative group hover:shadow-xl transition duration-150 ease-in-out"
      href="#0"
      data-aos="fade-down"
      data-aos-anchor="[data-aos-id-inpspiration]"
    >
      <img
        className="w-full aspect-square object-cover"
        src={cover}
        width="352"
        height="352"
        alt="Inspiration 01"
      />
      {/* Content on hover */}
      <div className="md:hidden md:group-hover:block absolute bottom-0 left-0 right-0 p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 -mt-4 bg-gradient-to-t from-gray-800 to-transparent opacity-80 pointer-events-none"
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative flex justify-between">
          {/* Left side */}
          <div className="flex items-center">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                className="shrink-0 w-9 h-9 rounded-full mr-4"
                width="36"
                height="36"
              />
            ) : (
              <Image
                className="shrink-0 w-9 h-9 rounded-full mr-4"
                src={Author01}
                width="36"
                height="36"
                alt="Author 01"
              />
            )}
            <div className="truncate">
              <div className="font-bold text-white truncate">{title}</div>
              <div className="text-xs text-white opacity-60 truncate">
                @{author}
              </div>
            </div>
          </div>
          {/* Right side */}
          {/* <div className="flex flex-nowrap items-center ml-2">
              <button className="text-rose-500 hover:text-rose-600">
                <span className="sr-only">Like</span>
                <svg
                  className="fill-current"
                  width="16"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.682 1.318A4.485 4.485 0 0 0 11.5 0 4.377 4.377 0 0 0 8 1.707 4.383 4.383 0 0 0 4.5 0a4.5 4.5 0 0 0-3.182 7.682L8 14l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 11.247l-5.285-5A2.5 2.5 0 0 1 4.5 2c1.437 0 2.312.681 3.5 2.625C9.187 2.681 10.062 2 11.5 2a2.5 2.5 0 0 1 1.785 4.251h-.003Z"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
              <div className="whitespace-nowrap text-sm text-white opacity-90 ml-2">
                4K
              </div>
            </div> */}
        </div>
      </div>
    </a>
  );
}

export function VideoCardGrid({
  title,
  author,
  cover,
  authorAvatar,
}: VideoCardProps) {
  return (
    <a
      className="relative group hover:shadow-xl transition duration-150 ease-in-out h-full"
      href="#0"
      data-aos="fade-down"
      data-aos-anchor="[data-aos-id-inpspiration]"
    >
      <img className="w-full object-cover h-full" src={cover} />
      {/* Content on hover */}
      <div className="md:hidden md:group-hover:block absolute bottom-0 left-0 right-0 p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 -mt-4 bg-gradient-to-t from-gray-800 to-transparent opacity-80 pointer-events-none"
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative flex justify-between">
          {/* Left side */}
          <div className="flex items-center">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                className="shrink-0 w-9 h-9 rounded-full mr-4"
                width="36"
                height="36"
              />
            ) : (
              <Image
                className="shrink-0 w-9 h-9 rounded-full mr-4"
                src={Author01}
                width="36"
                height="36"
                alt="Author 01"
              />
            )}
            <div className="truncate">
              <div className="font-bold text-white truncate">{title}</div>
              <div className="text-xs text-white opacity-60 truncate">
                @{author}
              </div>
            </div>
          </div>
          {/* Right side */}
          {/* <div className="flex flex-nowrap items-center ml-2">
                <button className="text-rose-500 hover:text-rose-600">
                  <span className="sr-only">Like</span>
                  <svg
                    className="fill-current"
                    width="16"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.682 1.318A4.485 4.485 0 0 0 11.5 0 4.377 4.377 0 0 0 8 1.707 4.383 4.383 0 0 0 4.5 0a4.5 4.5 0 0 0-3.182 7.682L8 14l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 11.247l-5.285-5A2.5 2.5 0 0 1 4.5 2c1.437 0 2.312.681 3.5 2.625C9.187 2.681 10.062 2 11.5 2a2.5 2.5 0 0 1 1.785 4.251h-.003Z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
                <div className="whitespace-nowrap text-sm text-white opacity-90 ml-2">
                  4K
                </div>
              </div> */}
        </div>
      </div>
    </a>
  );
}
