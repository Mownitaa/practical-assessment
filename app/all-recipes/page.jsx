"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "@/components/Recipes/RecipeCard";
import axios from "axios";

const AllRecipes = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [mainIngredient, setMainIngredient] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
      setFilteredRecipes(data);
    }

    const fetchCategories = async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(res.data.categories);
    };

    const fetchAreas = async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      setAreas(res.data.meals);
    };
    fetchCategories();
    fetchAreas();
  }, [data]);

  const handleFilter = () => {
    const results = recipes.filter((recipe) => {
      return (
        (mainIngredient ? recipe.strIngredient1 === mainIngredient : true) &&
        (category ? recipe.strCategory === category : true) &&
        (area ? recipe.strArea === area : true)
      );
    });
    {
      results.length === 0
        ? setError("No recipes found for the selected filters.")
        : setError("");
    }
    setFilteredRecipes(results);
  };
  const handleReset = () => {
    setMainIngredient("");
    setCategory("");
    setArea("");
    setFilteredRecipes(recipes);
    setError("");
  };
  // const handleChangeMainIngredient = (e) => {
  //   setMainIngredient(e.target.value);
  //   handleFilter(); // Call handleFilter on change
  // };

  // const handleChangeCategory = (e) => {
  //   setCategory(e.target.value);
  //   handleFilter(); // Call handleFilter on change
  // };

  // const handleChangeArea = (e) => {
  //   setArea(e.target.value);
  //   handleFilter(); // Call handleFilter on change
  // };

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
  if (isError)
    return (
      <div className="container m-auto px-6 pt-40 md:px-12 lg:pt-[4.8rem] lg:px-7">
        Error loading recipes: {isError.message}
      </div>
    );

  return (
    <div className="relative bg-yellow-50 z-10">
      <div className="container m-auto px-6 pt-12 lg:pt-20 md:px-12 lg:px-7">
        <div className="container mx-12 pt-8 pb-6 space-x-1">
          <div>
            {/* <select onChange={handleChangeMainIngredient} value={mainIngredient}> */}
            <select
              className="p-2 font-bold text-yellow-900 rounded-xl bottom-2"
              onChange={(e) => setMainIngredient(e.target.value)}
            >
              <option value="">All Ingredients</option>
              {recipes.map((recipe) => (
                <option key={recipe.idMeal} value={recipe.strIngredient1}>
                  {recipe.strIngredient1}
                </option>
              ))}
            </select>

            <select
              className="p-2 font-bold text-yellow-900 rounded-xl bottom-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              {/* <select onChange={handleChangeCategory} value={category}> */}
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.idCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>

            {/* <select onChange={handleChangeArea} value={area}> */}
            <select
              className="p-2 font-bold text-yellow-900 rounded-xl bottom-2"
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">All Areas</option>
              {areas.map((area) => (
                <option key={area.strArea} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 space-x-2">
            <button
              className="w-auto text-yellow-900 px-4 py-1 bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 font-bold rounded bottom-2"
              onClick={handleFilter}
            >
              Filter
            </button>
            <button
              className="w-auto text-yellow-900 px-4 py-1 bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 font-bold rounded bottom-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        {error && (
          <p className="container py-4" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="relative pb-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {filteredRecipes?.map((recipe) => (
                <RecipeCard
                  key={recipe?.idMeal}
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

export default AllRecipes;
