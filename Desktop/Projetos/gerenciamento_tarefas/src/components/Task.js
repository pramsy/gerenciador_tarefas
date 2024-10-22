// src/components/Task.js
import React, { useState } from 'react';

const Task = ({ task, onDelete, onEdit,onToggleCompleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedDate, setEditedDate] = useState(task.date);
    const [editedTime, setEditedTime] = useState(task.time);

    const handleEdit = () => {
        onEdit(task._id, editedTitle, editedDescription, editedDate, editedTime);
        setIsEditing(false); // Fecha o modo de edição
    };

    return (
        
        <div className="task">
            {isEditing ? (
                <>
                    
                    <input 
                        type="text" 
                        value={editedTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        value={editedDescription} 
                        onChange={(e) => setEditedDescription(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        value={editedDate} 
                        onChange={(e) => setEditedDate(e.target.value)} 
                    />
                    <input 
                        type="time" 
                        value={editedTime} 
                        onChange={(e) => setEditedTime(e.target.value)} 
                    />
                    <button onClick={handleEdit}>Salvar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Data: {task.date}</p>
                    <p>Hora: {task.time}</p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={() => onDelete(task._id)}>Excluir</button>
                    <button onClick={() => onToggleCompleted(task._id)}>
                        {task.completed ? 'Desmarcar' : 'Concluir'}
                    </button>
                </>
            )}
        </div>
    );
}


export default Task;


