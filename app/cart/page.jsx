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
        <h1 className="text-3xl text-yellow-900 font-bold">
          This is the cart page
        </h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li className="flex justify-center align-center" key={index}>
                <Image
                  className="mx-auto rounded-2xl"
                  src={item?.strMealThumb}
                  alt="Recipe"
                  loading="lazy"
                  width={50}
                  height={50}
                />
                <p>{item?.strMeal}</p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
