import React from 'react';
import { Briefcase, Building, FileText, Bell, Users, Award, BarChart2, GitPullRequest, LogOut, Plus, Check, Handshake } from 'lucide-react';

const Industry = () => {
  return (
    <div className="bg-[#FAFBFC] min-h-screen font-sans">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Briefcase className="w-8 h-8 text-[#0EA5A4]" />
              <h1 className="text-2xl font-bold text-[#0F172A]">Prashikshana</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Bell className="w-6 h-6 text-[#6B7280] hover:text-[#0EA5A4] transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] text-white text-xs rounded-full flex items-center justify-center">4</span>
              </div>
              <div className="flex items-center space-x-3">
                <img src="https://i.pravatar.cc/40?u=company" alt="Company Logo" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-[#0F172A]">[Company Name]</p>
                  <p className="text-sm text-[#6B7280]">Industry Sector</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-[#6B7280] hover:text-[#EF4444] transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Card - Full Span */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Welcome back, [Company Name]!</h2>
                <p className="text-[#6B7280]">Leading in [Industry Sector]</p>
              </div>
              <button className="bg-[#0EA5A4] text-white px-4 py-2 rounded-lg hover:bg-[#06B6D4] transition-colors">Edit Profile</button>
            </div>
            <div className="mt-6 flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                  <Briefcase className="w-6 h-6 text-[#0EA5A4]" />
                  <p><span className="font-bold text-[#0F172A]">10</span> Internships Posted</p>
              </div>
              <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-[#0EA5A4]" />
                  <p><span className="font-bold text-[#0F172A]">150</span> Applications Received</p>
              </div>
              <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-[#0EA5A4]" />
                  <p><span className="font-bold text-[#0F172A]">8</span> Hires Made</p>
              </div>
            </div>
          </div>

          {/* Internship Postings Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Post New Internships</h3>
            <p className="text-sm text-[#6B7280] mb-4">Attract top talent with clear opportunities.</p>
            <button className="w-full bg-[#0EA5A4] text-white py-2 rounded-lg hover:bg-[#06B6D4] transition-colors">Post a New Internship</button>
          </div>

          {/* Application Management Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Manage Applications</h3>
            <p className="text-sm text-[#6B7280] mb-4">Review, shortlist, and manage candidates.</p>
             <button className="w-full bg-[#0EA5A4] text-white py-2 rounded-lg hover:bg-[#06B6D4] transition-colors">Review Applications</button>
          </div>

          {/* Notifications Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0F172A]">Notifications</h3>
              <span className="bg-[#F59E0B] text-white text-xs font-bold px-2 py-1 rounded-full">4 NEW</span>
            </div>
            <div className="space-y-3">
                <p className="text-sm text-[#10B981]">New Application: [Student Name]</p>
                <p className="text-sm text-[#0EA5A4]">High-Match Candidate: 90% Fit</p>
                <p className="text-sm text-[#F59E0B]">Interview Feedback Due</p>
                <p className="text-sm text-[#EF4444]">Compliance Reminder: Update NEP Credits</p>
            </div>
          </div>

          {/* Candidate Skills & Matching Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Candidate Skills & Matching</h3>
            <p className="text-sm text-[#6B7280] mb-4">Evaluate readiness and find the perfect fit.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="font-semibold">[Student Name]</p>
                    <span className="text-xs bg-[#10B981] text-white px-2 py-1 rounded-full">Communication: Certified</span>
                </div>
                <div>
                    <p className="font-semibold">[Student Name]</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div className="bg-[#F59E0B] h-2.5 rounded-full" style={{width: "70%"}}></div>
                    </div>
                     <p className="text-xs text-[#F59E0B] text-right">70%</p>
                </div>
            </div>
            <p className="text-sm text-[#6B7280] mt-4">AI Match Rate: <span className="text-[#0EA5A4] font-bold">85%</span> (Based on your role requirements)</p>
            <a href="#" className="text-[#0EA5A4] font-semibold mt-2 inline-block hover:underline">Request Quiz from Candidates</a>
          </div>

          {/* Reports & Compliance Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Hiring Reports & NEP Compliance</h3>
            <p className="text-sm text-[#6B7280] mb-4">Generate audit-ready documents and track progress.</p>
            <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
                <p className="font-semibold text-[#0F172A]">Q2 Hiring Report Ready</p>
                <p className="text-[#6B7280]">50 Apps | 10 Hires | 30% Rural</p>
            </div>
            <button className="w-full bg-[#0EA5A4] text-white py-2 rounded-lg hover:bg-[#06B6D4] transition-colors">Create Compliance Summary</button>
            <div className="flex items-center space-x-2 mt-3 text-sm text-[#0EA5A4] hover:text-[#06B6D4] cursor-pointer">
                <FileText className="w-4 h-4"/>
                <span>Digital Signature for Offer Letters</span>
            </div>
          </div>

          {/* NEP Integration & Analytics Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">NEP Credits & Hiring Analytics</h3>
            <p className="text-sm text-[#6B7280] mb-4">Track credits and visualize your hiring funnel.</p>
            <p className="font-semibold text-[#0F172A]">Internship Credits Assigned: <span className="text-[#0EA5A4]">20</span></p>
            <div className="mt-4">
                <p className="text-sm font-semibold text-[#0F172A]">Hiring Pipeline</p>
                <div className="flex items-center justify-between text-xs text-center mt-2">
                    <div className="w-1/3">
                        <p className="font-bold text-lg text-[#0F172A]">150</p>
                        <p className="text-[#6B7280]">Applied</p>
                    </div>
                    <div className="w-1/3">
                        <p className="font-bold text-lg text-[#0F172A]">30</p>
                        <p className="text-[#6B7280]">Shortlisted</p>
                    </div>
                    <div className="w-1/3">
                        <p className="font-bold text-lg text-[#0F172A]">8</p>
                        <p className="text-[#6B7280]">Hired</p>
                    </div>
                </div>
            </div>
             <p className="text-xs text-gray-500 mt-4 text-center">Integrated with Student ERPs for credit transfer.</p>
          </div>

          {/* College Partnerships & MOU Card */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Manage College Partnerships & MOUs</h3>
            <p className="text-sm text-[#6B7280] mb-4">Build and maintain your academic network.</p>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <p className="font-semibold">[College Name]</p>
                    <p className="text-sm text-[#6B7280]">MOU Signed: <span className="text-[#10B981] font-semibold">Active</span> | Students Referred: 20</p>
                </div>
                <div>
                    <p className="font-semibold">[Another College]</p>
                    <p className="text-sm text-[#6B7280]">MOU: <span className="text-[#F59E0B] font-semibold">Draft</span> | Expiry: Dec 2024</p>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                 <button className="bg-[#0EA5A4] text-white py-2 px-4 rounded-lg hover:bg-[#06B6D4] transition-colors">Invite New Colleges</button>
                 <button className="bg-transparent border border-[#0EA5A4] text-[#0EA5A4] py-2 px-4 rounded-lg hover:bg-[#0EA5A4] hover:text-white transition-colors">Upload & Sign MOU</button>
            </div>
          </div>

          {/* Quick Actions & Milestones Card */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-bold text-[#0F172A]">Quick Actions & Upcoming Milestones</h3>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <button className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors space-y-2">
                    <Plus className="w-6 h-6 text-[#0EA5A4]" />
                    <span className="text-sm font-semibold text-[#0F172A]">Post Internship</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors space-y-2">
                    <Users className="w-6 h-6 text-[#0EA5A4]" />
                    <span className="text-sm font-semibold text-[#0F172A]">Review Apps</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors space-y-2">
                    <Check className="w-6 h-6 text-[#0EA5A4]" />
                    <span className="text-sm font-semibold text-[#0F172A]">Shortlist</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors space-y-2">
                    <Handshake className="w-6 h-6 text-[#0EA5A4]" />
                    <span className="text-sm font-semibold text-[#0F172A]">Reach Out</span>
                </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors space-y-2 col-span-2 md:col-span-1">
                    <BarChart2 className="w-6 h-6 text-[#0EA5A4]" />
                    <span className="text-sm font-semibold text-[#0F172A]">Generate Report</span>
                </button>
            </div>
             <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <p className="font-semibold text-red-700">High Priority: Interview Round</p>
                    <p className="text-sm text-red-600">May 15</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <p className="font-semibold text-orange-700">MOU Renewal</p>
                    <p className="text-sm text-orange-600">May 20</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-700">Offer Deadline</p>
                    <p className="text-sm text-green-600">June 1</p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Industry;
