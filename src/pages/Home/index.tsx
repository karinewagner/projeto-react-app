import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card, CardProps } from '../../components/Card'

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);



  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); /* O nome dos ... (tres pontos) é spread operator */
  }

/*Se precisar tratar de coisas assincronas no useEffect, a forma correta da estrutura é: */
  
useEffect(() => {
  async function fetchData() {
    const response = await fetch('https://api.github.com/users/karinewagner');
    const data = await response.json() as ProfileResponse;
    console.log("DADOS ===>", data);
    
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
  }

    fetchData();

}, []);

/*Se precisar tratar de coisas sincronas no useEffect, a forma correta da estrutura é:

useEffect(() => {
  fetch('https://api.github.com/users/karinewagner')
  .then(response => response.json())
  .then(data => {
    setUser({
      name: data.name,
      avatar: data.avatar_url,
    })
  })
}, []); */

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>

      </header>


      <input type="text" placeholder="Digite o nome..." onChange = {e => setStudentName(e.target.value)}/>
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
        <Card 
          key={student.time}
          name={student.name} 
          time={student.time} />
        ))
      }

    </div>
  )
}
