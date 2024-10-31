import Image from "next/image";
import React, { useState } from "react";
import SingleRecipeModal from "./SingleRecipeModal";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
const RecipeCard = ({ recipe, refetch }) => {
  const [openSingleRecipeModal, setOpenSingleRecipeModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const { data: recipeData } = useQuery({
    queryKey: ["recipe-details", selectedRecipeId],
    queryFn: () => HttpKit.getRecipeDetails(selectedRecipeId),
    // HttpKit.getRecipeDetails(selectedRecipeId)
  });
  console.log(recipeData);
  const handleCardClick = (id) => {
    setSelectedRecipeId(id);
    setOpenSingleRecipeModal(true);
  };

  // if (isLoading) return <div>Loading recipes...</div>;
  // if (isError) return <div>Error loading recipes: {isError.message}</div>;
  return (
    <>
      <SingleRecipeModal
        recipe={recipeData}
        open={openSingleRecipeModal}
        setOpen={setOpenSingleRecipeModal}
        // recipe={selectedRecipe}
        // setSelectedRecipe={setSelectedRecipe}
        refetch={refetch}
      />
      <div
        onClick={() => {
          handleCardClick(recipe.idMeal);
          // setOpenSingleRecipeModal(true);
        }}
        className="group space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
      >
        <Image
          className="mx-auto rounded-2xl"
          src={recipe?.strMealThumb}
          alt="Recipe"
          loading="lazy"
          width={500}
          height={500}
        />
        <h3 className="text-2xl font-semibold text-gray-800">
          {recipe?.strMeal}
        </h3>
        <p>
          Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
          consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
          animi officiis.
        </p>
        <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
          <button className="text-primary">Click to see details</button>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
