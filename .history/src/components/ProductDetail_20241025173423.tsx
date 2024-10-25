"use client";

import { useState } from 'react';

const ProductDetail = () => {
  const [selectedOption, setSelectedOption] = useState('512GB');
  const [selectedColor, setSelectedColor] = useState('Pink');
  const [quantity, setQuantity] = useState(1);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (action: string) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Your Product Detail component code */}
    </div>
  );
};

export default ProductDetail;
