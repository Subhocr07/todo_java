'use client';

import { useState, useEffect } from 'react';
import { Todo, fetchTodos } from '@/lib/api';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const data = await fetchTodos();
            setTodos(data.sort((a, b) => a.id - b.id)); // sort by ID
            setError(null);
        } catch (err) {
            setError('Failed to load tasks. Ensure the Spring Boot backend is running.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = (newTodo: Todo) => {
        setTodos(prev => [...prev, newTodo]);
    };

    const handleUpdate = (updatedTodo: Todo) => {
        setTodos(prev => prev.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    };

    const handleDelete = (id: number) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="todo-container">
            <h1 className="title">Tasks</h1>
            
            <AddTodoForm onAdd={handleAdd} />

            {error && <div className="error-message">{error}</div>}

            <div className="todo-list">
                {isLoading ? (
                    <div className="loading">Loading tasks...</div>
                ) : todos.length === 0 ? (
                    <div className="empty-state">No tasks yet. Add one above!</div>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
            
            {!isLoading && todos.length > 0 && (
                <div className="stats">
                    {todos.filter(t => t.completed).length} / {todos.length} completed
                </div>
            )}
        </div>
    );
}
