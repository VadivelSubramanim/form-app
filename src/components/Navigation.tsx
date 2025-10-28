
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/builder" className="text-lg font-semibold text-gray-800">Form.io App</NavLink>
          </div>
          <div className="flex items-center">
            <NavLink 
              to="/builder" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-600 bg-blue-100' : 'text-gray-700 hover:bg-gray-200'}`
              }
            >
              Builder
            </NavLink>
            <NavLink 
              to="/renderer" 
              className={({ isActive }) => 
                `ml-4 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-600 bg-blue-100' : 'text-gray-700 hover:bg-gray-200'}`
              }
            >
              Renderer
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
