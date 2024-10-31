"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState(""); //search recipe by ingredient
  // const [searchType, setSearchType] = useState("query"); //search recipe by name

  const queryClient = useQueryClient();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getTopRecipes,
  });

  useEffect(() => {
    refetch();
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleSearch = async () => {
    try {
      let searchResults;
      if (searchType === "query") {
        searchResults = await HttpKit.searchRecipesByName(searchInput);
      } else {
        searchResults = await HttpKit.searchRecipesByIngredient(searchInput);
      }
      setRecipes(searchResults);
      setSearchInput("");
    } catch (error) {
      console.error("Error fetching search results:", error);
      setRecipes([]);
      setSearchInput("");
    }
  };

  if (isLoading)
    return (
      <div className="container m-auto px-6 py-6 md:px-12 lg:pt-[4.8rem] lg:px-7">
        Loading recipes...
      </div>
    );
  if (isError)
    return (
      <div className="container m-auto px-6 py-6 md:px-12 lg:pt-[4.8rem] lg:px-7">
        Error loading recipes: {isError.message}
      </div>
    );

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl text-yellow-900 text-center font-bold">
          Top Recipes
        </h1>
        {/* Search form */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="w-full mt-12"
          >
            <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder="Search your favorite ingredient"
                className="w-full p-4 rounded-full outline-none bg-transparent "
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                // onClick={() => handleSearch()}
                type="submit"
                title="search"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">
                  Search
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {recipes.length > 0 ? (
                <>
                  {recipes?.map((recipe) => (
                    <RecipeCard
                      key={recipe?.idMeal}
                      recipe={recipe}
                      refetch={refetch}
                    />
                  ))}
                </>
              ) : (
                <p>No recipes found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
