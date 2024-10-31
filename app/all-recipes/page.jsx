"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "@/components/Recipes/RecipeCard";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (isLoading)
    return (
      <div className="container m-auto px-6 pt-40 md:px-12 lg:pt-[4.8rem] lg:px-7">
        Loading recipes...
      </div>
    );
  if (error)
    return (
      <div className="container m-auto px-6 pt-40 md:px-12 lg:pt-[4.8rem] lg:px-7">
        Error loading recipes: {error.message}
      </div>
    );

  return (
    <div className="relative bg-yellow-50 z-10">
      <div className="container m-auto px-6 pt-40 md:px-12 lg:pt-[4.8rem] lg:px-7">
        {/* <h1 className="text-3xl text-yellow-900 text-center font-bold">
          View All Recipes
        </h1> */}
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {recipes?.map((recipe) => (
                <RecipeCard
                  key={recipe?.id}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
