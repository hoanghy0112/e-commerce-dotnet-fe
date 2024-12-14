"use client";

import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

import MAIN_HERO_IMAGE from "@/assets/introductions/main-hero.png";
import SUB_HERO_1_IMAGE from "@/assets/introductions/sub-hero-1.png";
import SUB_HERO_2_IMAGE from "@/assets/introductions/sub-hero-2.png";
import SUB_HERO_3_IMAGE from "@/assets/introductions/sub-hero-3.png";
import CHEVRON from "@/assets/icons/chevron-right-white.svg";
import { useEffect } from "react";
import { increaseViewCount } from "@/services/api/stats/trackViewCount";
import { useRouter } from "next/navigation";
export default function HomeCover() {
  const router = useRouter();
  useEffect(() => {
    increaseViewCount("home")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {/* Samsung S22 Banner */}
      <div className=" relative">
        <Image
          className=" w-full h-[440px] xl:h-[600px] object-fill hover:cursor-pointer"
          src={MAIN_HERO_IMAGE}
          alt="Main hero"
          onClick={() => router.push("/phones?category=S22-Series")}
        />
        <PrimaryButton
          className=" absolute bottom-5 left-10 w-40"
          onClick={() => router.push("/phones?category=S22-Series")}
        >
          <p className=" w-full flex justify-center gap-2">
            See more <Image src={CHEVRON} alt="chevron" />
          </p>
        </PrimaryButton>
      </div>
      <div className=" mt-8 flex gap-8">
        <Image
          // Reno 8 section
          className=" w-full h-[300px] xl:h-[400px] object-fill hover:cursor-pointer"
          src={SUB_HERO_1_IMAGE}
          alt="First sub-hero"
          onClick={() => router.push("/phones?category=Reno 8")}
        />
        <Image
          // Vivo Y100 section
          className=" w-full h-[300px] xl:h-[400px] object-fill hover:cursor-pointer"
          src={SUB_HERO_2_IMAGE}
          alt="Second sub-hero"
          onClick={() => router.push("/phones?category=Vivo Y100")}
        />
        <Image
          // Iphone15 section
          className=" w-full h-[300px] xl:h-[400px] object-fill hover:cursor-pointer"
          src={SUB_HERO_3_IMAGE}
          alt="Third sub-hero"
          onClick={() => router.push("/phones?category=Iphone 15")}
        />
      </div>
    </div>
  );
}
