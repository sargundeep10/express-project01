import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  const fetchdata = () => {
    fetch("http://localhost:4000/fetched-data")
      .then((response) => response.json())
      .then(data => setData(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchdata();
  }, [])

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
      .then(() => {
        fetchdata();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (userId) => {
    const userEdit = data.find(user => user.id === userId);
    setUserName(userEdit.user_name);
    setUserPassword(userEdit.user_password);
    setEditUserId(userId);
  }

  const handleUpdate = (userId) => {
    fetch(`http://localhost:4000/user/${editUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_name: userName, user_password: userPassword })
    })
      .then(response => response.json())
      .then(updatedUser => {
        const updatedUsers = users.map(user => updatedUser);
        setUsers(updatedUsers);
        setData(updatedUsers);
        setUserName('');
        setUserPassword('');
        setEditUserId(null);
      })
      .then(() => {
        fetchdata();
      })
      .catch(error => console.error(error));
  }

  const handleDelete = (userId) => {
    fetch(`http://localhost:4000/user/${userId}`, {
      method: 'DELETE',
    })
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .then(() => {
        fetchdata();
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div className="App">
      <h2>USER REGISTRATION FORM</h2>
      <form >
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
        />
        <label>Password:</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="User Password"
        />
        <button className='buttonMain' type="button" onClick={handleAddUser} >REGISTER</button>
        <button className='buttonMain' type="button" onClick={handleUpdate}>UPDATE</button>
        
      </form>
      <br></br><br></br>

    </div>
    

      <div>
        <table>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Password</th>
              <th>Actions </th>

            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i}>
                <td>{user.user_name}</td>
                <td>{user.user_password}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(user.id)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(user.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;