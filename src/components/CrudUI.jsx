import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./CrudUI.css";

const API_URL = "http://localhost:5032/api/recipes";

const CrudUI = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const handleSubmit = async () => {
    if (!recipeName || !ingredients || !instructions || !category) return;

    const newRecipe = { recipeName, ingredients, instructions, category };
    try {
      const response = await axios.post(API_URL, newRecipe);
      setRecipes([...recipes, response.data]);
      setRecipeName("");
      setIngredients("");
      setInstructions("");
      setCategory("");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Recipe Management System</h2>
        <div className="form-group">
          <input type="text" placeholder="Recipe Name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <button className="submit-btn" onClick={handleSubmit}>SUBMIT</button>
        </div>
        <div className="table">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="table-row">
              <span>{recipe.recipeName}</span>
              <span>{recipe.ingredients}</span>
              <span>{recipe.instructions}</span>
              <span>{recipe.category}</span>
              <button className="delete-btn" onClick={() => handleDelete(recipe.id)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrudUI;
