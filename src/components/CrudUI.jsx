import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./CrudUI.css";

const API_URL = "http://localhost:5032/api/users"; // Adjust if needed

const CrudUI = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = async () => {
    const newUser = { userName: username, age: parseInt(age) };
    await axios.post(API_URL, newUser);
    setUsers([...users, newUser]);
    setUsername("");
    setAge("");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>CRUD Operation</h2>
        <div className="form-group">
          <input type="text" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <button className="submit-btn" onClick={handleSubmit}>SUBMIT</button>
        </div>
        <div className="table">
          {users.map((user) => (
            <div key={user.id} className="table-row">
              <span>{user.id}</span>
              <span className="name">{user.userName}</span>
              <span>{user.age}</span>
              <button 
                    className="delete-btn" 
                        onClick={() => 
                            axios.delete(`${API_URL}/${user.id}`)}> 
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
