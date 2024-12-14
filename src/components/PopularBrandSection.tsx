import BRAND_LOGOS from "@/constants/brand-logos";
import Section from "./Section";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function PopularBrandSection() {
  return (
    <Section title="Popular Brand">
      <div className=" flex flex-row gap-8 flex-wrap">
        {BRAND_LOGOS.map(({ name, key, image }) => (
          <a
            key={key}
            href={`/phones?category=${name}`}
            className={twMerge(
              " w-48 h-24 grid place-items-center rounded-lg bg-neutral-100 hover:bg-neutral-200",
              "duration-200"
            )}
            target="_blank"
          >
            <Image src={image} alt={`${name} brand logo`} />
          </a>
        ))}
      </div>
    </Section>
  );
}
