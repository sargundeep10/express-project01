import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [data , setData ] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/fetched-data")
    .then((response) => response.json())
    .then(data => setData(data))
    .catch((error) => console.log(error));
  })

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/user', {
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

  const handleEditUser = (user) =>{
  };

  const handleDelete =(userId) => {
    fetch(`http://localhost:4000/user/${userId}`, {
      method: 'DELETE',
    })
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .catch(error => console.error(error));
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
        <button type="submit" >Add User</button>
      </form>
      <br></br><br></br>
      <div>
        <table>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {data.map((user, i) => (
              <tr key={i}>
                <td>{user.user_name}</td>
                <td>{user.user_password}</td>
                <td>
                <button type = "submit" onClick={() => handleEditUser}>Update</button>
                <button type = "submit" onClick={() => handleDelete(user.id) }>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;





