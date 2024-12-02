import StarRating from "../StarRating";

// Updated CartView Component to Display Product Options
interface CartViewProps {
  productDetails: ProductDetails | null;
  colorOption: string;
  setColorOption: (color: string) => void;
  storageOption: string;
  setStorageOption: (storage: string) => void;
  onNext: () => void;
}
interface ProductDetails {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  colors: string[];
  storage: string[];
  storageModifiers: number[];
  rating: number;
  images: string[];
}
function CartView({
  productDetails,
  colorOption,
  setColorOption,
  storageOption,
  setStorageOption,
  onNext,
}: CartViewProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
      {productDetails ? (
        <div>
          <ProductCardDetails product={productDetails} />
          <div className="mb-4">
            <label className="block mb-2 ">Choose Color:</label>
            {productDetails.colors.map((color) => (
              <button
                key={color}
                className={`p-2 border rounded mr-2 relative mr-4${
                  colorOption === color ? "border-black-500" : ""
                }`}
                onClick={() => setColorOption(color)}
              >
                {colorOption === color && (
                  <span className="absolute bottom-0 right-0 w-full h-full flex justify-end items-end">
                    {/* This is the black half-triangle background with 45 degree cut */}
                    <div
                      className="w-1/2 h-1/2 text-white flex justify-center items-center bg-black-500 pl-3"
                      style={{
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                      }}
                    >
                      &#10003; {/* Checkmark character */}
                    </div>
                  </span>
                )}

                {color}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Choose Storage:</label>
            {productDetails.storage.map((storage, index) => (
              <button
                key={storage}
                className={`p-2 border rounded mr-2 relative mr-4${
                  storageOption === storage ? "border-black-500" : ""
                }`}
                onClick={() => setStorageOption(storage)}
              >
                {storageOption === storage && (
                  <span className="absolute bottom-0 right-0 w-full h-full flex justify-end items-end">
                    <div
                      className="w-1/2 h-1/2 text-white flex justify-center items-center bg-black-500 pl-3"
                      style={{
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                      }}
                    >
                      &#10003;
                    </div>
                  </span>
                )}

                {storage}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}
// Used to display a card that show image on the left. Then on the right top down: name , price, rating. Encompassed in a card with proper border and padding
const ProductCardDetails = ({ product }: { product: ProductDetails }) => {
  return (
    <div className="flex border p-4 rounded-lg">
      <img src={product.images[0]} alt={product.name} className="w-24 h-24" />
      <div className="ml-4">
        <h4 className="font-semibold">{product.name}</h4>
        <p>{product.price.toLocaleString()}₫</p>
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
};

export default CartView;
