// src/App.js
//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './components/Task';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  // Carregar as tarefas do back-end
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
        .then(response => setTasks(response.data))
        .catch(error => console.error(error));
    }, []);

    // Função para adicionar uma nova tarefa
    const addTask = (e) => {
      e.preventDefault();
      const newTask = {
          title: newTaskTitle,
          description: newTaskDescription,
          date: newTaskDate,
          time: newTaskTime,
        };
      axios.post('http://localhost:5000/tasks', newTask)
          .then(response => setTasks([...tasks, response.data]))
          .catch(error => console.error(error));

      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDate('');
      setNewTaskTime('');
    };
    // Função para editar tarefa
    const editTask = (id, newTitle, newDescription, newDate, newTime) => {
        const updatedTask = {
            title: newTitle,
            description: newDescription,
            date: newDate,
            time: newTime
        };    

        // Atualizando no back-end
        axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
            .then((response) => {
                // Atualiza apenas a tarefa editada no estado
                setTasks(tasks.map(task =>
                    task._id === id ? response.data : task  // Atualiza apenas a tarefa com o ID correto
                ));
            })
            .catch(error => console.error(error));
    };


    // Função para excluir tarefa
    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)  // Certifique-se de passar o _id correto aqui
            .then(() => {
                setTasks(tasks.filter(task => task._id !== id));  // Atualiza o estado após exclusão
            })
            .catch(error => console.error(error));
    };

   
    // Função para marcar tarefa como concluída
    const toggleCompleted = (id) => {
        // Encontre a tarefa que está sendo alterada
        const taskToUpdate = tasks.find(task => task._id === id);
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };  // Inverte o estado de "completed"

        // Envia a atualização para o back-end
        axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
            .then(response => {
                // Atualiza a lista de tarefas no estado do front-end
                setTasks(tasks.map(task =>
                    task._id === id ? response.data : task
                ));
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="App">
            <h1>Gerenciador de Tarefas</h1>

            {/* Formulário para adicionar nova tarefa */}
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Título da Tarefa"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição da Tarefa"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                />
                <input
                    type="time"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                />
                <button type="submit">Adicionar Tarefa</button>
            </form>

            
            {/* Lista de tarefas */}
            {tasks.map(task => (
                <Task
                    key={task._id}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    onToggleCompleted={toggleCompleted}
                />
            ))}
        </div>
    );
}

export default App;
