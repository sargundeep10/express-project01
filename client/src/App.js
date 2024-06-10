import './App.css';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [users, setUsers] = useState([]);

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name: userName, user_password: userPassword }),
    })
      .then(response => response.json())
      .then(newUser => {
        setUsers([...users, newUser]);
        setUserName('');
        setUserPassword('');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="App">
      <h1>Users List</h1>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
          required
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="User Password"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;










