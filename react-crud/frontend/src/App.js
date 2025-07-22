import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5050';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await axios.post(`${API}/login`, { username, password });
      setToken(res.data.token);
    } catch {
      setErr('Invalid credentials');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {err && <div style={{color:'red'}}>{err}</div>}
    </form>
  );
}

function Items({ token, logout }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(null);
  const [error, setError] = useState('');
  // Axios instance with auth header
  const authAxios = axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` }
  });
  // Fetch items
  const fetchItems = async () => {
    try {
      const res = await authAxios.get('/items');
      setItems(res.data);
    } catch (e) {
      setError('Session expired'); logout();
    }
  };
  useEffect(() => { fetchItems(); }, []);
  // Create or Edit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    if (edit) {
      await authAxios.put(`/items/${edit.id}`, { name });
      setEdit(null);
    } else {
      await authAxios.post('/items', { name });
    }
    setName('');
    fetchItems();
  };
  // Start Edit
  const onEdit = (item) => {
    setEdit(item); setName(item.name);
  };
  // Delete
  const onDelete = async (id) => {
    await authAxios.delete(`/items/${id}`);
    fetchItems();
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2>Items</h2>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Item Name" />
        <button type="submit">{edit ? 'Save' : 'Add'}</button>
        {edit && <button type="button" onClick={()=>{setEdit(null);setName('');}}>Cancel</button>}
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={()=>onEdit(item)}>Edit</button>
            <button onClick={()=>onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {error && <div style={{color:'red'}}>{error}</div>}
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const logout = () => { setToken(''); localStorage.removeItem('token'); }
  useEffect(() => { if (token) localStorage.setItem('token', token); }, [token]);
  return (
    <div style={{maxWidth:400, margin:'2rem auto', fontFamily:'sans-serif'}}>
      {!token ? <Login setToken={setToken} /> : <Items token={token} logout={logout} />}
    </div>
  );
}

export default App;
