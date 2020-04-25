import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchData();
  },[])

  async function fetchData() {
    const { data } = await api.get('/repositories');
    setRepositories(data);
  }


  async function handleAddRepository() {
    const response = await api.post('repositories', 
    {
      title: `repository ${Date.now()}`,
      url: `http://repository ${Date.now()}`,
      techs:["React", "NodeJs"] 
    })
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`repositories/${id}`);

    if(resp.status === 204){
      const repo = repositories.filter( repo => repo.id !== id );
      setRepositories(repo);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
              <li key={repository.id}>
                  {repository.title}
                  <button onClick={()=>handleRemoveRepository(repository.id)}>Remover</button>
              </li>
        ))}         
      </ul> 
      <button onClick={handleAddRepository}>Adicionar</button> 
    </div>
  );
}

export default App;
