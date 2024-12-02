"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion"; // Import motion from framer-motion
import ShippingForm from "./Cart/ShippingForm";
import PaymentForm from "./Cart/PaymentForm";
import CartView from "./Cart/CartProductView";
import CustomerForm from "./Cart/CustomerForm";
import useAuthStore from "@/stores/auth.store";
// Define the prop types for the CartModal component
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the types for different steps of the checkout process
type StepType = 1 | 2 | 3 | 4;

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [step, setStep] = useState<StepType>(1);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  // Customer details state
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  // Product selection states
  const [colorOption, setColorOption] = useState<string>("");
  const [storageOption, setStorageOption] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");

  // Shipping and address states
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  // Payment method and info state
  const [paymentMethod, setPaymentMethod] = useState<string>("CreditCard");
  const [shippingMethod, setShippingMethod] = useState<string>("Standard");

  const [promoCodeError, setPromoCodeError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const [subtotal, setSubtotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const nextStep = () => {
    if (!isStepValid()) return;
    setValidationError("");
    setStep((prevStep) => (prevStep + 1) as StepType);
  };

  const prevStep = () => setStep((prevStep) => (prevStep - 1) as StepType);

  const isStepValid = (): boolean => {
    if (step === 1 && (!colorOption || !storageOption)) {
      setValidationError("Please select both color and storage options.");

      console.log("Invalid product options");
      return false;
    }
    if (step === 2 && !checkCustomer(customerDetails)) {
      console.log("Invalid customer");
      return false;
    }
    if (step === 3 && !checkAddress(shippingAddress)) {
      console.log("Invalid address");
      return false;
    }
    if (step === 4 && !checkPayment(paymentDetails)) {
      console.log("Invalid payment");
      return false;
    }

    return true;
  };

  const checkAddress = (address: Address | null) => {
    if (!address) {
      setValidationError("Please provide shipping address.");
      return false;
    }
    if (!address.province || !address.district || !address.address) {
      setValidationError("Please provide shipping address.");
      return false;
    }
    return true;
  };
  const checkPayment = (payment: PaymentDetails | null) => {
    if (paymentMethod === "Cash") return true;

    if (!payment) return false;

    if (
      !payment.cardNumber ||
      !payment.expiryDate ||
      !payment.cvv ||
      !payment.cardHolder
    ) {
      setValidationError("Please provide payment details.");
      return false;
    }
    return true;
  };
  const checkCustomer = (customer: CustomerDetails) => {
    if (!customer) {
      setValidationError("Please provide customer details.");
      return false;
    }
    if (!customer.name || !customer.email || !customer.phoneNumber) {
      setValidationError("Please provide customer details.");
      return false;
    }
    return true;
  };
  useEffect(() => {
    const updateTotalOnStorageOption = async () => {
      const storageSelected = productDetails?.storage.find(
        (storage) => storage === storageOption
      );
      const storageIndex = productDetails?.storage.indexOf(storageSelected);
      const storageModifier = productDetails?.storageModifiers[storageIndex];
      const subTotal = productDetails?.price * storageModifier;
      const taxRate = await fetch("http://localhost:5100/api/order/tax-rate")
        .then((res) => res.json())
        .then((data) => data.taxRate);
      const tax = subTotal * taxRate;
      const total = subTotal + tax + shipping;
      setSubtotal(subTotal);
      setTax(tax);
      setTotal(total);
    };
    if (productDetails) updateTotalOnStorageOption();
  }, [storageOption]);
  // Call on open and close modal
  useEffect(() => {
    const fetchCart = async () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        const taxRate = await fetch("http://localhost:5100/api/order/tax-rate")
          .then((res) => res.json())
          .then((data) => data.taxRate);
        const res = await fetch(
          `http://localhost:5100/api/products/${cartItems[0].id}`
        ).then((res) => res.json());
        const storageSelected = res.storage.find(
          (storage) => storage === storageOption
        );
        const storageIndex = res.storage.indexOf(storageSelected);
        const storageModifier = res.storageModifiers[storageIndex];
        const subTotal = res.price * storageModifier;
        const tax = subTotal * taxRate;
        const total = subTotal + tax + shipping;
        setTax(tax);

        setProductDetails(res);
        setSubtotal(subTotal);
        setTotal(total);
      }
    };
    if (isOpen) fetchCart();
  }, [isOpen, shipping, tax]);

  const handleCheckout = () => {
    const authToken = useAuthStore.getState().token;
    if (!isStepValid()) {
      console.log("Invalid step");
      return;
    }
    // Todo: Handle customer id if logged in
    const orderGeneral = {
      province: shippingAddress?.province || "",
      district: shippingAddress?.district || "",
      address: shippingAddress?.address || "",
      phoneNumber: customerDetails.phoneNumber,
      paymentMethod,
      shippingMethod,
      cardHolder: paymentDetails?.cardHolder || "",
      cardNumber: paymentDetails?.cardNumber || "",
      cardExpiry: paymentDetails?.expiryDate || "",
      cardCvv: paymentDetails?.cvv || "",
      customerName: customerDetails.name,
    };
    const modifierIndex = productDetails?.storage.indexOf(storageOption);
    const orderDetails = {
      productId: productDetails?.id || 0,
      quantity: 1,
      color: colorOption,
      storage: storageOption,
      storageModifier: productDetails?.storageModifiers[modifierIndex || 0],
    };

    const order = { ...orderGeneral, orderDetails: [orderDetails] };
    console.log("Orders", JSON.stringify(order));
    // Sending:
    console.log("Auth token", authToken);
    const res = fetch("http://localhost:5100/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(order),
    });
    console.log("Order placed", res);
    // onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed right-0 top-0 w-2/5 h-full bg-gray-50 shadow-lg overflow-auto rounded-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", damping: 20, stiffness: 300 }}
        className="w-full h-full bg-white overflow-auto"
      >
        <div className="px-8 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            ✕
          </button>
        </div>

        <div className="p-8 flex">
          <div className="w-3/5">
            {validationError && (
              <p className="text-red-500 text-sm mb-4">{validationError}</p>
            )}
            {step === 1 && (
              <CartView
                productDetails={productDetails}
                colorOption={colorOption}
                setColorOption={setColorOption}
                storageOption={storageOption}
                setStorageOption={setStorageOption}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <CustomerForm
                customerDetails={customerDetails}
                setCustomerDetails={setCustomerDetails}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <ShippingForm
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                onNext={nextStep}
                onBack={prevStep}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                setShippingFee={setShipping}
              />
            )}
            {step === 4 && (
              <PaymentForm
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                onSubmit={handleCheckout}
                onBack={prevStep}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}
          </div>

          <div className="w-2/5 ml-8 p-4 bg-gray-100 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>{shipping.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>{tax.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-4 text-xl font-bold">
              <span>Total:</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            {step === 1 && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {promoCodeError && (
                    <p className="text-red-500">{promoCodeError}</p>
                  )}
                </div>

                <button
                  onClick={nextStep}
                  className=" text-white px-4 py-2 w-full rounded bg-black-500 hover:bg-black-600"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
