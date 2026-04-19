export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: string;
}

const API_BASE_URL = 'http://localhost:8080/api/todos';

export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(API_BASE_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
}

export async function toggleTodoCompletion(id: number, currentStatus: boolean, title: string): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus, title })
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete todo');
}
