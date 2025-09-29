import React from 'react';
import { Briefcase, Plus, Edit, Trash2 } from 'lucide-react';

const Internships = () => {
  const internships = [
    { id: 1, title: "Finance Analyst Intern", applicants: 45, status: "Active" },
    { id: 2, title: "Marketing Associate Intern", applicants: 30, status: "Closed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0F172A]">Manage Internships</h2>
        <button className="bg-[#0EA5A4] text-white px-4 py-2 rounded-lg hover:bg-[#06B6D4] flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Internship
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {internships.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#0F172A]">{job.title}</h3>
                <p className="text-sm text-[#6B7280]">{job.applicants} Applicants</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded hover:bg-gray-100">
                  <Edit className="w-4 h-4 text-[#0EA5A4]" />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
