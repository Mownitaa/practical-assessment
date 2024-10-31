import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const HttpKit = {
  getAllRecipes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=`);
      return response.data.meals ? response.data.meals : [];
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      throw error;
    }
  },
  getTopRecipes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=American`);
      return response.data.meals ? response.data.meals.slice(0, 12) : [];
    } catch (error) {
      console.error("Error fetching top recipes:", error);
      throw error;
    }
  },

  searchRecipesByName: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
      // , {
      //   params: { s: query },
      // });
      return response.data.meals || [];
      // return response.data.meals ? response.data.meals : "Results not found";
    } catch (error) {
      console.error("Error fetching recipes by name:", error);
      throw error;
    }
  },

  searchRecipesByIngredient: async (ingredient) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/filter.php?i=${ingredient}`
      );
      //   , {
      //   params: { i: ingredient },
      // });
      return response.data.meals || [];
      // return response.data.meals ? response.data.meals : "Results not found";
    } catch (error) {
      console.error("Error fetching recipes by ingredient:", error);
      throw error;
    }
  },

  getRecipeDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      //   , {
      //   params: { i: id },
      // })
      // .then((res) => res.json());
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { c: category },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by category:", error);
      throw error;
    }
  },

  filterByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { a: area },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by area:", error);
      throw error;
    }
  },
};

export default HttpKit;
