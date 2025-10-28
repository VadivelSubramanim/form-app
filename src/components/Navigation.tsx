import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg border-b-2 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div>
              <NavLink to="/builder" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Form.io Studio
              </NavLink>
              <p className="text-xs text-gray-500">Build beautiful forms effortlessly</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <NavLink 
              to="/builder" 
              className={({ isActive }) => 
                `px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'text-white bg-blue-600 shadow-md' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                }`
              }
            >
              🛠️ Builder
            </NavLink>
            <NavLink 
              to="/renderer" 
              className={({ isActive }) => 
                `px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'text-white bg-blue-600 shadow-md' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                }`
              }
            >
              👁️ Preview
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
