import React from 'react';
import Routes from './routes.js';

import { UserProvider } from './providers/UserProvider'

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes />
      </div>
    </UserProvider>
  );
}

export default App;
