import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const PinLogin = () => {
  const [pin, setPin] = useState('');
  const { login, error, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length === 4) {
      login(pin);
    }
  };

  const handlePinChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
    }
  };

  const handleNumpadClick = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">LZ</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Snack La Zone</h1>
          <p className="text-gray-600 mt-2">Entrez votre code PIN</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors"
                >
                  {pin.length > index ? '•' : ''}
                </div>
              ))}
            </div>
            <input
              type="password"
              className="absolute opacity-0 w-0 h-0"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              autoFocus
              maxLength={4}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || pin.length !== 4}
            className="w-full py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumpadClick(num.toString())}
              className="py-4 bg-gray-100 rounded-lg text-xl font-semibold hover:bg-gray-200 transition active:bg-gray-300"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="py-4 bg-gray-100 rounded-lg text-xl font-semibold hover:bg-gray-200 transition active:bg-gray-300"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinLogin;