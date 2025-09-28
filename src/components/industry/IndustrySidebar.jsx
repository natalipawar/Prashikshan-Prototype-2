import React from 'react';
import { Briefcase, BarChart2, Users, FileText, GitPullRequest, LogOut, Building } from 'lucide-react';

const IndustrySidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart2 },
    { id: 'internships', name: 'Internships', icon: Briefcase },
    { id: 'applications', name: 'Applications', icon: Users },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'partnerships', name: 'Partnerships', icon: GitPullRequest },
  ];

  return (
    <div className="bg-white w-64 min-h-screen p-4 flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex items-center space-x-4 p-4 mb-8">
          <Building className="w-10 h-10 text-[#0EA5A4]" />
          <h1 className="text-2xl font-bold text-[#0F172A]">Prashikshana</h1>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                  activeItem === item.id
                    ? 'bg-[#0EA5A4] text-white shadow-md'
                    : 'text-[#6B7280] hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-semibold">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-[#6B7280] hover:bg-red-50 hover:text-red-600">
          <LogOut className="w-6 h-6" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default IndustrySidebar;
