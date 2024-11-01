import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
import SingleRecipeModal from "./SingleRecipeModal";
import { useAuth } from "@/context/AuthContext";

const RecipeCard = ({ recipe, refetch }) => {
  const { user } = useAuth(); // Get the logged-in user from context

  const [openSingleRecipeModal, setOpenSingleRecipeModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const { data: recipeData } = useQuery({
    queryKey: ["recipe-details", selectedRecipeId],
    queryFn: () => HttpKit.getRecipeDetails(selectedRecipeId),
  });
  console.log(recipeData);
  const handleCardClick = (id) => {
    setSelectedRecipeId(id);
    setOpenSingleRecipeModal(true);
  };
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, recipe];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Recipe added to cart!");
    const existingUserCart =
      JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
    const updatedUserCart = [...existingUserCart, recipe];
    localStorage.setItem(
      `cart_${user.username}`,
      JSON.stringify(updatedUserCart)
    );
  };
  return (
    <>
      <SingleRecipeModal
        recipe={recipeData}
        open={openSingleRecipeModal}
        setOpen={setOpenSingleRecipeModal}
        refetch={refetch}
      />
      <div className="group space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10">
        <div
          onClick={() => {
            handleCardClick(recipe.idMeal);
          }}
          className="space-y-6 bg-white px-4 py-4 text-center hover:cursor-pointer"
        >
          <Image
            className="mx-auto rounded-2xl"
            src={recipe?.strMealThumb}
            alt="Recipe"
            loading="lazy"
            width={500}
            height={500}
          />
          <h3 className="text-2xl font-semibold text-yellow-900">
            {recipe?.strMeal}
          </h3>
          <p className="text-gray-700">
            Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
            consectetur ullam tempora ipsa iste officia sed officiis! Incidunt
            ea animi officiis.
          </p>
        </div>
        <button
          onClick={addToCart}
          type="button"
          title="Start buying"
          className="w-full py-3 px-6 text-center rounded-xl transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max invisible  group-hover:visible"
        >
          <p className="flex items-center gap-2 block text-yellow-900 font-semibold text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Add To Cart
          </p>
        </button>
      </div>
    </>
  );
};

export default RecipeCard;
