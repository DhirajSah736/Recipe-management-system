// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import "./CrudUI.css";

// const API_URL = "http://localhost:5032/api/recipes";

// const CrudUI = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [recipeName, setRecipeName] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [category, setCategory] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   const fetchRecipes = async () => {
//     const res = await axios.get(API_URL);
//     setRecipes(res.data);
//   };

//   const handleSubmit = async () => {
//     const newRecipe = { 
//       recipeName, 
//       ingredients, 
//       instructions, 
//       category 
//     };
  
//     try {
//       if (editingId) {
//         // Editing an existing recipe
//         await axios.put(`${API_URL}/${editingId}`, { id: editingId, ...newRecipe });
//       } else {
//         // Adding a new recipe (No ID should be included)
//         const res = await axios.post(API_URL, newRecipe);
//         setRecipes([...recipes, res.data]); // Append new recipe to state
//       }
  
//       // Reset the form after submission
//       setRecipeName("");
//       setIngredients("");
//       setInstructions("");
//       setCategory("");
//       setEditingId(null);
//       fetchRecipes(); // Refresh UI with updated data
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };
  
  

//   const handleEdit = (recipe) => {
//     setEditingId(recipe.id);
//     setRecipeName(recipe.recipeName);
//     setIngredients(recipe.ingredients);
//     setInstructions(recipe.instructions);
//     setCategory(recipe.category);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${API_URL}/${id}`);
//     setRecipes(recipes.filter((recipe) => recipe.id !== id));
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h2>Recipe Management System</h2>
//         <div className="form-group">
//           <input type="text" placeholder="Recipe Name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
//           <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
//           <input type="text" placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
//           <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
//           <button className="submit-btn" onClick={handleSubmit}>{editingId ? "Update" : "Submit"}</button>
//         </div>
//         <div className="table">
//           {recipes.map((recipe) => (
//             <div key={recipe.id} className="table-row">
//               <span>{recipe.id}</span>
//               <span className="name">{recipe.recipeName}</span>
//               <span>{recipe.ingredients}</span>
//               <span>{recipe.instructions}</span>
//               <span>{recipe.category}</span>
//               <button className="edit-btn" onClick={() => handleEdit(recipe)}><FaEdit /></button>
//               <button className="delete-btn" onClick={() => handleDelete(recipe.id)}><FaTrash /></button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CrudUI;







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
    const newRecipe = { 
      id: editingId, 
      recipeName, 
      ingredients, 
      instructions, 
      category 
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, newRecipe);
      } else {
        const res = await axios.post(API_URL, newRecipe);
        setRecipes([...recipes, res.data]);
      }

      setRecipeName("");
      setIngredients("");
      setInstructions("");
      setCategory("");
      setEditingId(null);
      fetchRecipes(); 
    } catch (error) {
      console.error("Error submitting data:", error);
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
