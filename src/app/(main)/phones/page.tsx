import { CheckBox, CheckBoxGroup } from "@/components/CheckBox";
import PopularBrandSlider from "@/components/PopularBrandSlider";
import ProductItem from "@/components/ProductItem";
import Text from "@/components/Typography/Text";
import { getProductListAPI } from "@/services/api/product/product-list";
import Link from "next/link";
import { getCategoryUsingNameAPI } from "@/services/api/product/product-list";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  // Get the query parameter from the URL
  const keyword = (await searchParams)?.keyword;
  const category = (await searchParams)?.category;
  const categoryDetail = await getCategoryUsingNameAPI(category as string);
  const sortType = (await searchParams)?.sort;
  const page = parseInt((await searchParams)?.page || "1");
  const limit = parseInt((await searchParams)?.limit || "18");
  const altReq = (await searchParams)?.altReq;
  console.log({ category, sortType, page, limit });
  const productResponse = await getProductListAPI({
    keyword: keyword,
    category,
    sort: sortType,
    page,
    limit,
    altReq,
  });

  const productList = productResponse.products as IProduct[];

  return (
    <div className="px-24 pt-10">
      <PopularBrandSlider />

      {/* Category banner with image and description */}
      {categoryDetail.isBanner && (
        <div className="mt-10 relative w-full">
          <div className="relative w-full h-[400px]">
            <Image
              src={categoryDetail.image as string}
              alt="category banner"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-400 via-black-500  to-transparent rounded-lg" />
          {/* Text content */}
          <div className="absolute inset-0 flex items-center px-10">
            <div className=" text-white p-5 rounded-lg max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">{categoryDetail.name}</h2>
              <p className="text-lg">{categoryDetail.description}</p>
            </div>
          </div>
        </div>
      )}
      {/* Sort options */}
      <div className="bg-secondary-200 rounded-md px-5 py-2 flex items-center mt-10">
        <Text className="mr-16 font-semibold">Sort by: </Text>
        <CheckBoxGroup selected={sortType} className="flex gap-5">
          <Link href={`/phones?sort=price-low-to-high`}>
            <CheckBox title="Price: Low to High" name="price-low-to-high" />
          </Link>
          <Link href={`/phones?sort=price-high-to-low`}>
            <CheckBox title="Price: High to Low" name="price-high-to-low" />
          </Link>
          <Link href={`/phones?sort=most-popular`}>
            <CheckBox title="Most popular" name="most-popular" />
          </Link>
          <Link href={`/phones?sort=newest-arrival`}>
            <CheckBox title="Newest arrival" name="newest-arrival" />
          </Link>
        </CheckBoxGroup>
      </div>

      {/* Product grid */}
      <div className="mt-10 grid grid-cols-6 gap-5">
        {productList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
