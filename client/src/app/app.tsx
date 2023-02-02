import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home';
import { Ticket } from './routes/Ticket';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Ticket />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
