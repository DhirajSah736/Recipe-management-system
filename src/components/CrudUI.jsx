import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5032/api/recipes";


const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(API_URL);
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSubmit = async () => {
    const newRecipe = { recipeName, ingredients, instructions, category };
  
    console.log("Submitting Recipe:", newRecipe);
  
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { ...newRecipe, id: editingId });
        setRecipes(
          recipes.map((recipe) =>
            recipe.id === editingId ? { ...recipe, ...newRecipe } : recipe
          )
        );
      } else {
        const res = await axios.post(API_URL, newRecipe, {
          headers: { "Content-Type": "application/json" },
        });
        setRecipes([...recipes, res.data]);
      }
  
      setRecipeName("");
      setIngredients("");
      setInstructions("");
      setCategory("");
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
    }
  };
  


  

  const handleEdit = (recipe) => {
    setRecipeName(recipe.recipeName);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setCategory(recipe.category);
    setEditingId(recipe.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center font-weight-bold">Recipe Management System</h2>
      <div className="card p-4 shadow-sm">
        <input type="text" className="form-control mb-2" placeholder="Recipe Name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button className="btn btn-danger w-100" onClick={handleSubmit}>Submit</button>
      </div>
      
      <hr />
      
      <table className="table table-bordered text-center mt-3">
        <thead className="bg-danger text-white">
          <tr>
            <th>SN</th>
            <th>Recipe</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={recipe.id}>
              <td>{index + 1}</td>
              <td>{recipe.recipeName}</td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.instructions}</td>
              <td>{recipe.category}</td>
              <td>
                <button className="btn btn-sm btn-warning mx-1" onClick={() => handleEdit(recipe)}>
                  <FaEdit />
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(recipe.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeManagement;
