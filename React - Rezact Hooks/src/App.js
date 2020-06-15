import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

function App() {
  const [tech, setTech] = useState([
    'ReactJS',
    'React Native'
  ])

  const [newTech, setNewTech] = useState('')

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech])
  }, [tech, newTech])

  // Executar APENAS 1 VEZ
  useEffect(() => {
    const storageTech = localStorage.getItem('tech')

    if (storageTech) {
      setTech(JSON.parse(storageTech))
    }

    //Component WILL UNMOUNT
    return () => { }
  }, [])

  // Escuta o estado tech
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech))
  }, [tech])

  // 
  const techSize = useMemo(() => tech.length, [tech])

  return (
    <div className="App">
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input onChange={e => setNewTech(e.target.value)}></input>
      <strong>Voce tem {techSize} tecnologias</strong>
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
