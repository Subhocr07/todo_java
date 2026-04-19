import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="main-content">
      <div className="blobs-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="app-wrapper">
        <TodoList />
      </div>
    </main>
  );
}
