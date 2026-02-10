"use client";

import React, { useEffect, useState } from 'react';

function Home() {
  const [listOfUser, setListOfUser] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/list-users")
      .then(res => res.json())
      .then(data => {
        setListOfUser(data || []); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: Number(age) }),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setName("");
        setAge("");
        setListOfUser(prev => [...prev, { id: prev.length + 1, name, age: Number(age) }]);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-5">
      <form className="grid gap-6 mb-6" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="border px-3 py-2 rounded w-[300px]"
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
          className="border px-3 py-2 rounded w-[300px]"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[150px]"
        >
          Add User
        </button>
      </form>

      {message && <p className="mb-4 font-semibold">{message}</p>}

      <h2 className="text-lg font-bold mb-2">User List:</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {listOfUser.length > 0 ? (
            listOfUser.map(user => (
              <li key={user.id}>{user.name} - {user.age}</li>
            ))
          ) : (
            <li>No users yet</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Home;
