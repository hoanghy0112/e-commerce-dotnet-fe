import { getNewArrivalsAPI } from "@/services/api/product/product-list";
import Image from "next/image";
import Section from "./Section";
import NewArrivalProductItem from "./NewArrivalProductItem";
import PrimaryButton from "./PrimaryButton";
import NEW_ARRIVAL from "@/assets/introductions/new-arrival.png";
import CHEVRON from "@/assets/icons/chevron-right-white.svg";
export default async function NewArrivalSection() {
  const { products } = await getNewArrivalsAPI().then((res) => res);
  return (
    <Section title="New Arrivals" url="/phones?sort=new-arrivals-only">
      <div className=" relative flex gap-10">
        <Image
          className=" w-2/3 rounded-md object-contain"
          src={NEW_ARRIVAL}
          alt="New arrival introduction"
        />

        <PrimaryButton className=" absolute w-36 bottom-10 left-10">
          <p className=" w-full pl-3 flex justify-center gap-2">
            Buy now <Image src={CHEVRON} alt="chevron" />
          </p>
        </PrimaryButton>
        <div className=" w-1/3 flex flex-col gap-10">
          {products.slice(0, 2).map((product) => (
            <NewArrivalProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Section>
  );
}
