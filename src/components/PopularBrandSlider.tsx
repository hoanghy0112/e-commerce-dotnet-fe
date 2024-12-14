"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";
import FaChevronRight from "@/assets/icons/chevron-right.svg";
import FaChevronLeft from "@/assets/icons/chevron-left.svg";
import BRAND_LOGOS from "@/constants/brand-logos";
import "@/components/AdditionalStylings/HideScrollbar.css";
export default function PopularBrandSlider() {
  const router = useRouter();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -500, behavior: "smooth" }); // Adjust scroll distance as needed
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 500, behavior: "smooth" }); // Adjust scroll distance as needed
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-4 rounded-full shadow-md hover:bg-gray-200 z-10"
      >
        <Image
          src={FaChevronLeft}
          alt="left arrow"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll no-scrollbar gap-6 px-8 py-4"
      >
        {BRAND_LOGOS.map(({ name, key, image }) => (
          <div
            key={key}
            className="min-w-[160px] h-24 flex items-center justify-center bg-neutral-100 rounded-lg hover:bg-neutral-200 cursor-pointer "
            onClick={() => router.replace(`/phones/?category=${name}`)}
          >
            <Image
              src={image}
              alt={`${name} brand logo`}
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
      >
        <Image
          src={FaChevronRight}
          alt="right arrow"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>
    </div>
  );
}
