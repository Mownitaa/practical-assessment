"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <div className="relative bg-yellow-50 z-10">
      <div className="container m-auto px-6 py-6 pt-40 md:px-12 lg:pt-[4.8rem] lg:px-7">
        {/* <h1 className="pt-20 text-3xl text-yellow-900 font-bold">
          This is the cart page
        </h1> */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="pt-20 grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-2">
            {cartItems.map((item, index) => (
              <>
                <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-md mb-4">
                  <Image
                    className="w-20 h-20 object-cover mr-4"
                    src={item?.strMealThumb}
                    alt="Recipe"
                    loading="lazy"
                    width={50}
                    height={50}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item?.strMeal}</h3>
                    <button
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
