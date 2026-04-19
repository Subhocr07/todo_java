'use client';

import { Todo, toggleTodoCompletion, deleteTodo } from '@/lib/api';
import { useState } from 'react';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggle = async () => {
        setIsUpdating(true);
        try {
            const updated = await toggleTodoCompletion(todo.id, todo.completed, todo.title);
            onUpdate(updated);
        } catch (error) {
            console.error('Toggle failed:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsUpdating(true);
        try {
            await deleteTodo(todo.id);
            onDelete(todo.id);
        } catch (error) {
            console.error('Delete failed:', error);
            setIsUpdating(false);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isUpdating ? 'updating' : ''}`}>
            <label className="todo-label">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    disabled={isUpdating}
                    className="todo-checkbox"
                />
                <span className="todo-text">{todo.title}</span>
            </label>
            <button
                onClick={handleDelete}
                disabled={isUpdating}
                className="delete-button"
                aria-label="Delete todo"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trash-icon">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
            </button>
        </div>
    );
}
