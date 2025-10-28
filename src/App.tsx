import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormBuilderScreen from './screens/FormBuilderScreen';
import FormRendererScreen from './screens/FormRendererScreen';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navigation />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/builder" element={<FormBuilderScreen />} />
            <Route path="/renderer" element={<FormRendererScreen />} />
            <Route path="*" element={<Navigate to="/builder" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;