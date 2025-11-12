import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/store';
import { mockUsers } from '../utils/mockData';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleLogin = () => {
    const user = mockUsers.find((u) => u.id === selectedUserId);
    if (user) {
      setUser(user);
      navigate('/shop-selector');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-uber-blue flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-6xl font-bold text-white mb-2"
          >
            UBER
          </motion.div>
          <div className="text-xl text-gray-300">Partner Shop</div>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in with your Uber ID to continue
          </p>

          {/* Mock SSO User Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User (SSO Simulation)
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none transition"
              >
                <option value="">Choose a user...</option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.role.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={!selectedUserId}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              <LogIn className="w-5 h-5" />
              Sign in with Uber ID
            </motion.button>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Demo Mode:</strong> This is a simulated SSO login. In production,
              this would integrate with Uber's authentication system.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>© 2024 Uber Technologies Inc.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
