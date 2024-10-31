import React from "react";
import Modal from "../Modal";
import Image from "next/image";

const SingleRecipeModal = ({ recipe, open, setOpen }) => {
  if (!open || !recipe) return null;

  console.log(recipe);
  return (
    <Modal className="relative w-75" open={open} setOpen={setOpen}>
      <Image
        className="mx-auto rounded-2xl"
        src={recipe?.strMealThumb}
        alt="Recipe"
        loading="lazy"
        width={400}
        height={250}
      />
      <h1 className="mt-4 font-bold text-2xl text-yellow-900">
        {recipe?.strMeal}
      </h1>
      <h1 className="font-semibold mt-4 text-xl text-yellow-700">
        Ingredients:
      </h1>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith("strIngredient") && recipe[key])
          .map((key, index) => (
            <li className="text-gray-700" key={index}>
              {recipe[key]} - {recipe[`strMeasure${index + 1}`]}
            </li>
          ))}
      </ul>
      <h1 className="mt-4 font-semibold text-xl text-yellow-700">
        Instructions:
      </h1>
      <p className="text-gray-700">{recipe.strInstructions}</p>
    </Modal>
  );
};

export default SingleRecipeModal;
