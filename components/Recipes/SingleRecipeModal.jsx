import React from "react";
import Modal from "../Modal";
import Image from "next/image";

const SingleRecipeModal = ({ recipe, open, setOpen }) => {
  if (!open || !recipe) return null;

  console.log(recipe);
  return (
    <Modal className="relative" open={open} setOpen={setOpen}>
      <h1 className="font-bold fs-1 text-yellow-900">{recipe?.strMeal}</h1>
      <Image
        className="mx-auto rounded-2xl"
        src={recipe?.strMealThumb}
        alt="Recipe"
        loading="lazy"
        width={500}
        height={250}
      />
      <h1 className="font-bold fs-1 text-yellow-900">Ingredients:</h1>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith("strIngredient") && recipe[key])
          .map((key, index) => (
            <li key={index}>
              {recipe[key]} - {recipe[`strMeasure${index + 1}`]}
            </li>
          ))}
      </ul>
      <h1 className="font-bold fs-1 text-yellow-900">Instructions:</h1>
      <p>{recipe.strInstructions}</p>
    </Modal>
  );
};

export default SingleRecipeModal;
