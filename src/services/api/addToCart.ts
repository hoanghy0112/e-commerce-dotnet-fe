export default function AddToCartAPI(productId: string, quantity: number) {
  const item = {
    id: productId,
    quantity: quantity,
  };
  localStorage.setItem("cart", JSON.stringify([item]));
}
