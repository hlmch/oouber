import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import ShopSelector from './pages/ShopSelector';
import FleetPartnerCart from './pages/FleetPartnerCart';
import ManagerSend from './pages/ManagerSend';
import { useStore } from './stores/store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/shop-selector" element={<ProtectedRoute><ShopSelector /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><FleetPartnerCart /></ProtectedRoute>} />
          <Route path="/manager-send" element={<ProtectedRoute><ManagerSend /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default App;
