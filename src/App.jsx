import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './context/UserContext';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Navbar />
        <Outlet />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
