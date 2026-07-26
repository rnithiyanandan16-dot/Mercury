import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 max-w-[calc(100%-72px)] ml-[72px]">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
