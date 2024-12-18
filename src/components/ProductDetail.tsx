/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { getProductDetailAPI } from "@/services/api/product/product-detail";
import ProductItem from "./ProductItem";
import { CheckBox, CheckBoxGroup } from "./CheckBox";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import { getSimilarProducts } from "@/services/api/product/getSimilar";
import {
  createReview,
  updateReview,
  getProductReviews,
  deleteReview,
} from "@/services/api/product/review-op";
interface ProductDetailProps {
  productId: string;
}

import { isLoggedIn } from "@/services/api/auth/getCurrentUserInfo";

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductDetailAPIResponse>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [newReview, setNewReview] = useState<IReview>({} as IReview);
  const [isUserLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const notify = () => toast.success("Product added to cart!");
  useEffect(() => {
    fetchReviews(productId);
    isLoggedIn().then((data) => setIsLoggedIn(data));

    fetchProductDetail(productId);
    getSimilarProducts(productId).then((data) => setSimilarProducts(data));
    // Check if user is logged in
  }, []);
  // Reviews stuffs
  const fetchReviews = async (productId: string) => {
    const data = await getProductReviews(productId);
    setReviews(data);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewSubmit = async () => {
    if (!newReview.content) {
      toast.error("Please provide a review content!");
      return;
    }
    const reviewData = {
      ProductId: parseInt(productId),
      Rating: newReview.rating,
      Content: newReview.content,
    };
    try {
      await createReview(
        reviewData.ProductId.toString(),
        reviewData.Content,
        reviewData.Rating
      );
      toast.success("Review submitted successfully!");
      setNewReview({} as IReview);
      fetchReviews(productId); // Refresh the reviews
    } catch (error) {
      toast.error("You have already reviewed this product!");
    }
  };

  const fetchProductDetail = async (productId: string) => {
    const data = await getProductDetailAPI(productId);
    if (data) setProduct(data);
    setDisplayPrice(data.discount_price ? data.discount_price : data.price);
    setSelectedColor(data.colors[0]);
    setSelectedOption(data.storage[0]);
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [displayPrice, setDisplayPrice] = useState<number>(0);
  // Line-through price, if discount price is available
  const [oldDisplayPrice, setOldDisplayPrice] = useState<number>(0);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (selectedOption) {
      const option = product.storage.find(
        (item: string) => item === selectedOption
      );

      if (option) {
        const price = product.discount_price
          ? product.discount_price
          : product.price;
        const oldPrice = product.price;
        setDisplayPrice(
          price * product.storageModifiers[product.storage.indexOf(option)]
        );
        setOldDisplayPrice(
          oldPrice * product.storageModifiers[product.storage.indexOf(option)]
        );
        console.log("STORAGE: ", option);
        console.log(
          "Multipler: ",
          product.storageModifiers[product.storage.indexOf(option)]
        );

        console.log("PRICE: ", displayPrice);
      }
    }
  }, [selectedOption]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addToCart = () => {
    // Set local storage. Only 1 item
    const item = {
      id: product.id,
      quantity,
    };

    localStorage.setItem("cart", JSON.stringify([item]));
    notify();
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4">
        Home {">"} Iphone {">"} Iphone 15 Series {">"} {product.name}
      </nav>
      <h1 className="text-4xl font-bold text-black-500 mb-4">{product.name}</h1>
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
        <div className="relative w-full h-96 flex items-center justify-center border-black-100 border-solid border-opacity-70 border-2">
          <img
            src={product.images[currentIndex]}
            alt={`product-image-${currentIndex}`}
            className=" rounded-lg object-contain h-full w-2/3"
          />
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-5xl text-black-500 px-4 py-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-5xl text-black-500 px-4 py-2 rounded-full"
          >
            ›
          </button>
        </div>

        <div className="w-full md:w-1/2 px-4">
          <div className="flex items-baseline space-x-2 mb-2">
            <p className="text-4xl font-bold text-black">
              {displayPrice.toLocaleString()} đ
            </p>
            {product.discount_price > 0.0 && (
              <p className="text-lg text-gray-500 line-through">
                {oldDisplayPrice.toLocaleString()} đ
              </p>
            )}
          </div>

          <StarRating rating={product.rating} />
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Option</h2>
            <CheckBoxGroup
              selected={selectedOption || ""}
              setSelected={setSelectedOption}
              className="flex gap-2"
            >
              {product.storage.map((option: string) => (
                <CheckBox
                  key={option}
                  title={option}
                  name={option}
                  className={`border px-4 py-2 rounded-lg  focus:outline-none`}
                ></CheckBox>
              ))}
            </CheckBoxGroup>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Color</h2>
            <CheckBoxGroup
              selected={selectedColor || ""}
              setSelected={setSelectedColor}
              className="flex gap-2"
            >
              {product.colors.map((color: string) => (
                <CheckBox
                  key={color}
                  className={`flex items-center gap-2 border px-4 py-2 rounded-lg focus:outline-none`}
                  name={color}
                  title={
                    <>
                      <span
                        className="inline-block w-4 h-4 mr-2 rounded-full"
                        style={{ backgroundColor: color }}
                      ></span>
                      <span>{color}</span>
                    </>
                  }
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </CheckBoxGroup>
          </div>

          <div className="flex items-center mt-6 space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                className="px-4 py-2 text-white bg-black-500 hover:bg-black-400"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-4 py-2 text-white bg-black-500 hover:bg-black-400"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <button
              className="text-white bg-black-500 px-6 py-2 rounded-lg flex items-center justify-center w-full md:w-auto hover:bg-black-400"
              onClick={addToCart}
            >
              Add to cart <br />
              <svg
                color="white"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66669 22.6667H23.1056C24.3723 22.6667 25.0056 22.6667 25.5217 22.4379C25.9768 22.2362 26.3663 21.9111 26.6462 21.4995C26.9636 21.0326 27.0769 20.4095 27.3035 19.1633L29.1045 9.25756C29.1831 8.82565 29.2223 8.60969 29.1617 8.44107C29.1084 8.29313 29.0046 8.16876 28.8686 8.08993C28.7136 8.00008 28.4941 8.00008 28.0551 8.00008H6.66669M2.6665 2.66675H4.42171C4.7453 2.66675 4.90709 2.66675 5.03794 2.72585C5.15327 2.77795 5.25139 2.86179 5.32084 2.96759C5.39962 3.08762 5.42486 3.24743 5.47532 3.56705L9.19102 27.0998C9.24148 27.4194 9.26672 27.5792 9.34551 27.6992C9.41495 27.805 9.51307 27.8889 9.6284 27.941C9.75925 28.0001 9.92105 28.0001 10.2446 28.0001H25.3332"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div className="bg-gray-200 py-2 rounded-t-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Product Details
            </h2>
          </div>
          <p className="text-gray-700 mb-4 leading-loose">
            {product.description}
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-md border border-gray-300">
          <div className="bg-gray-200 py-2 rounded-t-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Specifications
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-y-3 ">
            {/* Specs is object key-pair value  */}
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex mt-2">
                <span className="font-semibold text-gray-800 w-1/3">{key}</span>
                <span className="text-gray-700 w-2/3">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>

        {isUserLoggedIn ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <div className="bg-gray-200 py-2 rounded-t-lg">
              <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                Submit a Review
              </h2>
            </div>
            <div className="mt-4">
              <div className="mb-4">
                <label className="font-semibold text-gray-700">Rating</label>
                <select
                  name="rating"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating > 1 && "s"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="font-semibold text-gray-700">Review</label>
                <textarea
                  name="content"
                  value={newReview.content}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Write your review here..."
                />
              </div>
              <button
                onClick={handleReviewSubmit}
                className="text-white bg-black-500 px-6 py-2 rounded-lg hover:bg-black-400"
              >
                Submit Review
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div className="bg-gray-200 py-2 rounded-t-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Reviews
            </h2>
          </div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="mt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">{review.username}</span>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 mt-2">{review.content}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Similar Products
        </h2>
        <div className=" grid grid-cols-6 gap-5">
          {similarProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
