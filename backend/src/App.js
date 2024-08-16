// App.js
import React, { useState } from 'react';
import PoseDetection from './components/PoseDetection';
import repContext from './contexts/NC_Context';
function App() {
  const [rep,setRep]=useState(false);
  return (
    <repContext.Provider value={[rep,setRep]}>

    <div className="App">
      <PoseDetection />
    </div>
    </repContext.Provider>
  );
}

export default App;
