// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para aceitar JSON no corpo da requisição


// Conexão com MongoDB

mongoose.connect("mongodb+srv://ramsespierre05:WBcfAAzPgJX4TGWT@cluster0.las6d.mongodb.net/gerenciador_tarefas" , {
    
    
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error(err));

// Rotas

// Obter todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Criar nova tarefa
app.post('/tasks', async (req, res) => {
    const { title, description, date, time } = req.body;
    const newTask = new Task({ title, description, date, time });
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Editar tarefa
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.date = req.body.date || task.date;
        task.time = req.body.time || task.time;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Excluir tarefa

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log(task.title);
        
        
        // Verifique se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }

        await task.remove();
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (err) {
        console.log("ERROR TRY CATCH");
        
        res.status(500).json({ message: err.message });
    }
});
// Servidor rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
