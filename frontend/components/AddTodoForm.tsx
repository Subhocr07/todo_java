'use client';

import { useState } from 'react';
import { createTodo, Todo } from '@/lib/api';

interface AddTodoFormProps {
    onAdd: (todo: Todo) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsLoading(true);
        try {
            const newTodo = await createTodo(title);
            onAdd(newTodo);
            setTitle('');
        } catch (error) {
            console.error('Failed to create todo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                className="todo-input"
                autoFocus
            />
            <button type="submit" disabled={isLoading || !title.trim()} className="add-button">
                {isLoading ? 'Wait...' : 'Add Task'}
            </button>
        </form>
    );
}
