import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  studentsStorage,
  internshipsStorage,
  companiesStorage,
  mentorsStorage,
  logbookStorage,
  creditsStorage,
  notificationsStorage,
  formatDate,
} from '../utils/helpers'
import { 
  Users,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Bell,
  Settings,
  ChevronDown,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  ArrowRight,
  MessageSquare,
  Calendar,
  UserPlus,
} from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, color = 'text-primary-600', bg = 'bg-primary-50' }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
)

const SectionHeader = ({ id, title, icon: Icon, subtitle }) => (
  <div id={id} className="flex items-center mb-6">
    <div className="p-3 bg-primary-600 text-white rounded-xl mr-4">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  </div>
)

const Faculty = () => {
  const { user, logout } = useAuth()

  const [students, setStudents] = useState([])
  const [internships, setInternships] = useState([])
  const [companies, setCompanies] = useState([])
  const [mentors, setMentors] = useState([])
  const [logbooks, setLogbooks] = useState([])
  const [credits, setCredits] = useState([])
  const [notifications, setNotifications] = useState([])

  // UI state
  const [search, setSearch] = useState('')
  const [batch, setBatch] = useState('all')
  const [department, setDepartment] = useState('all')
  const [mentorFilter, setMentorFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [reviewModal, setReviewModal] = useState({ open: false, entry: null })
  const [studentModal, setStudentModal] = useState({ open: false, student: null })

  useEffect(() => {
    // Load from localStorage
    setStudents(studentsStorage.getStudents())
    setInternships(internshipsStorage.getInternships())
    setCompanies(companiesStorage.getCompanies())
    setMentors(mentorsStorage.getMentors())
    setLogbooks(logbookStorage.getEntries())
    setCredits(creditsStorage.getCredits())
    setNotifications(notificationsStorage.get())
  }, [])

  // Derived helpers
  const companyById = useMemo(() => Object.fromEntries(companies.map(c => [c.id, c])), [companies])
  const internshipById = useMemo(() => Object.fromEntries(internships.map(i => [i.id, i])), [internships])
  const mentorById = useMemo(() => Object.fromEntries(mentors.map(m => [m.id, m])), [mentors])

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = search.trim() === '' || s.name.toLowerCase().includes(search.toLowerCase()) || (internshipById[s.internshipId]?.title || '').toLowerCase().includes(search.toLowerCase())
      const matchesBatch = batch === 'all' || s.batch === batch
      const matchesDept = department === 'all' || s.department === department
      const matchesMentor = mentorFilter === 'all' || s.mentorId === mentorFilter
      const matchesStatus = statusFilter === 'all' || (s.mentorshipStatus || '').toLowerCase() === statusFilter
      return matchesSearch && matchesBatch && matchesDept && matchesMentor && matchesStatus
    })
  }, [students, search, batch, department, mentorFilter, statusFilter, internshipById])

  // Stats
  const stats = useMemo(() => {
    const pendingApprovals = logbooks.filter(l => l.status === 'pending').length
    const activeInternships = new Set(students.map(s => s.internshipId)).size
    const studentsNeedingMentor = students.filter(s => (s.mentorshipStatus || 'Unassigned') === 'Unassigned').length
    const ongoingMentorships = students.filter(s => (s.mentorshipStatus || '').toLowerCase() === 'in-progress' || (s.mentorshipStatus || '').toLowerCase() === 'assigned').length
    const completedReports = credits.length
    return { pendingApprovals, activeInternships, studentsNeedingMentor, ongoingMentorships, completedReports }
  }, [logbooks, students, credits])

  // Actions
  const approveLogbook = (id) => {
    logbookStorage.updateEntryStatus(id, 'approved')
    setLogbooks(logbookStorage.getEntries())
    const entry = logbooks.find(e => e.id === id)
    if (entry) {
      // Increase progress for the student (mock)
      const s = students.find(st => st.studentId === entry.studentId || st.name === entry.studentName)
      if (s) {
        const newProgress = Math.min(100, (s.progress || 0) + 5)
        studentsStorage.updateStudent(s.id, { progress: newProgress })
        setStudents(studentsStorage.getStudents())
      }
      notificationsStorage.add({ type: 'approval', message: `Approved logbook for ${entry.studentName}` })
      setNotifications(notificationsStorage.get())
    }
  }

  const rejectLogbook = (id, feedback = '') => {
    logbookStorage.updateEntryStatus(id, 'rejected')
    setLogbooks(logbookStorage.getEntries())
    const entry = logbooks.find(e => e.id === id)
    notificationsStorage.add({ type: 'rejection', message: `Requested changes for ${entry?.studentName}: ${feedback}` })
    setNotifications(notificationsStorage.get())
  }

  const bulkApprove = (ids) => {
    ids.forEach(approveLogbook)
  }

  const assignMentor = (studentId, mentorId) => {
    const mentor = mentorsStorage.assign(studentId, mentorId)
    if (mentor) {
      setMentors(mentorsStorage.getMentors())
      setStudents(studentsStorage.getStudents())
      notificationsStorage.add({ type: 'mentorship', message: `Assigned ${mentor.name} to ${studentsStorage.getStudents().find(s => s.id === studentId)?.name}` })
      setNotifications(notificationsStorage.get())
      alert(`Assigned ${mentor.name}. ${mentor.capacityLeft} slots left`)
    } else {
      alert('Mentor has no capacity left.')
    }
  }

  const exportCreditsCSV = () => {
    const rows = [['Student','Internship','Credits','Approved By','Date']]
    credits.forEach(c => {
      const student = students.find(s => s.id === c.studentId)
      const internship = internships.find(i => i.id === c.internshipId)
      rows.push([
        student?.name || '',
        internship?.title || '',
        String(c.credits || 0),
        c.approvedBy || '',
        c.date || ''
      ])
    })
    const csv = rows.map(r => r.map(field => `"${String(field).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'credit-history.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Simple components
  const Badge = ({ children, color = 'bg-gray-100 text-gray-700' }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${color}`}>{children}</span>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 text-white rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="font-semibold text-gray-900">Prashikshan — Faculty Dashboard</div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#students" className="text-gray-700 hover:text-primary-600">Student Monitoring</a>
            <a href="#logbook" className="text-gray-700 hover:text-primary-600">Logbook</a>
            <a href="#credits" className="text-gray-700 hover:text-primary-600">Credit Mapping</a>
            <a href="#mentorship" className="text-gray-700 hover:text-primary-600">Mentorship</a>
            <a href="#reports" className="text-gray-700 hover:text-primary-600">Reports</a>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Settings"><Settings className="w-5 h-5 text-gray-600"/></button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100" aria-label="Profile Menu">
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">{(user?.email||'F')[0]}</div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button onClick={logout} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900" aria-label="Logout">Logout</button>
          </div>
        </div>
      </div>

      <main className="container-custom py-8 space-y-12">
        {/* Hero + Stats */}
        <section className="">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome, {user?.email ? `Prof. ${user.email.split('@')[0]}` : 'Professor'} — Manage internships & mentorships.</h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard title="Active Internships" value={stats.activeInternships} icon={Users} />
            <StatCard title="Pending Approvals" value={stats.pendingApprovals} icon={ClipboardCheck} color="text-yellow-600" bg="bg-yellow-50" />
            <StatCard title="Completed Reports" value={stats.completedReports} icon={FileText} color="text-green-600" bg="bg-green-50" />
            <StatCard title="Need Mentorship" value={stats.studentsNeedingMentor} icon={UserPlus} color="text-red-600" bg="bg-red-50" />
            <StatCard title="Ongoing Mentorships" value={stats.ongoingMentorships} icon={BookOpen} color="text-indigo-600" bg="bg-indigo-50" />
          </div>
        </section>

        {/* Student Monitoring */}
        <section>
          <SectionHeader id="students" title="Student Monitoring" icon={Users} subtitle="Track progress and manage mentorships" />

          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student or internship" className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500" />
              </div>
              <select value={batch} onChange={e=>setBatch(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
                <option value="all">All Batches</option>
                {[...new Set(students.map(s=>s.batch))].map(b=> <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={department} onChange={e=>setDepartment(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
                <option value="all">All Departments</option>
                {[...new Set(students.map(s=>s.department))].map(d=> <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={mentorFilter} onChange={e=>setMentorFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
                <option value="all">All Mentors</option>
                {mentors.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
                <option value="all">Any Status</option>
                {['unassigned','assigned','in-progress','completed'].map(s=> <option key={s} value={s}>{s.replace('-',' ')}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Internship</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Start — End</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3">Mentor</th>
                  <th className="px-4 py-3">Last Logbook</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map(s => {
                  const intn = internshipById[s.internshipId]
                  const comp = companyById[intn?.companyId]
                  const mentor = mentorById[s.mentorId]
                  return (
                    <tr key={s.id} className="text-sm">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">{s.name[0]}</div>
                          <div>
                            <div className="font-medium text-gray-900">{s.name}</div>
                            <div className="text-gray-500">Batch {s.batch} • {s.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{intn?.title || '-'}</td>
                      <td className="px-4 py-3">{comp?.name || '-'}</td>
                      <td className="px-4 py-3">{intn ? `${formatDate(intn.startDate)} — ${formatDate(intn.endDate)}` : '-'}</td>
                      <td className="px-4 py-3">
                        <div className="w-32 bg-gray-100 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${s.progress || 0}%` }} />
                        </div>
                      </td>
                      <td className="px-4 py-3">{mentor ? mentor.name : <Badge>Unassigned</Badge>}</td>
                      <td className="px-4 py-3">{s.lastLogDate ? formatDate(s.lastLogDate) : '-'}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button onClick={()=>setStudentModal({ open: true, student: s })} className="px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100">View</button>
                        <button className="px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100">Message</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Logbook Approvals */}
        <section>
          <SectionHeader id="logbook" title="Logbook & Report Approvals" icon={ClipboardCheck} subtitle="Review and approve submissions" />

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-600"><Filter className="w-4 h-4" /><span>Pending Submissions</span></div>
              <button onClick={()=>bulkApprove(logbooks.filter(l=>l.status==='pending').map(l=>l.id))} className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm">Bulk Approve</button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {logbooks.filter(l=>l.status==='pending').map(entry => (
                <div key={entry.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{entry.studentName}</div>
                      <div className="text-sm text-gray-600">{entry.company}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(entry.date)} • {entry.hours} hours</div>
                    </div>
                    <Badge color="bg-yellow-100 text-yellow-700">Pending</Badge>
                  </div>
                  <p className="text-gray-700 mt-3 line-clamp-3">{entry.description}</p>
                  <div className="flex items-center space-x-2 mt-4">
                    <button onClick={()=>setReviewModal({ open: true, entry })} className="px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm">Review</button>
                    <button onClick={()=>approveLogbook(entry.id)} className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm">Approve</button>
                    <button onClick={()=>rejectLogbook(entry.id, 'Please elaborate your work for the day.')} className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-sm text-red-700">Request Changes</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credit Mapping */}
        <section>
          <SectionHeader id="credits" title="Credit Mapping" icon={FileText} subtitle="Assign credits to completed internships" />
          <CreditMapping students={students} internships={internships} onSave={(entry)=>{
            creditsStorage.addCredit(entry)
            setCredits(creditsStorage.getCredits())
            notificationsStorage.add({ type: 'credits', message: `Credits assigned for ${students.find(s=>s.id===entry.studentId)?.name}` })
            setNotifications(notificationsStorage.get())
          }} />

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-4">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="font-medium text-gray-900">Credit History</div>
              <button onClick={exportCreditsCSV} className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"><Download className="w-4 h-4"/><span>Export CSV</span></button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-2">Student</th>
                    <th className="px-4 py-2">Internship</th>
                    <th className="px-4 py-2">Credits</th>
                    <th className="px-4 py-2">Approved By</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {credits.map(c => (
                    <tr key={c.id}>
                      <td className="px-4 py-2">{students.find(s=>s.id===c.studentId)?.name}</td>
                      <td className="px-4 py-2">{internships.find(i=>i.id===c.internshipId)?.title}</td>
                      <td className="px-4 py-2">{c.credits}</td>
                      <td className="px-4 py-2">{c.approvedBy}</td>
                      <td className="px-4 py-2">{formatDate(c.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Mentorship */}
        <section>
          <SectionHeader id="mentorship" title="Mentorship" icon={MessageSquare} subtitle="Assign mentors and track status" />

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
              {/* Simple board via status dropdown */}
              {['Unassigned','Assigned','In-Progress','Completed'].map(col => (
                <div key={col} className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-4 py-3 font-medium text-gray-900">{col}</div>
                  <div className="px-4 pb-4 grid md:grid-cols-2 gap-3">
                    {students.filter(s => (s.mentorshipStatus || 'Unassigned').toLowerCase() === col.toLowerCase().replace(' ','-')).map(s => (
                      <div key={s.id} className="border border-gray-100 rounded-lg p-3">
                        <div className="font-medium text-gray-900">{s.name}</div>
                        <div className="text-sm text-gray-600">{internshipById[s.internshipId]?.title}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="w-24 bg-gray-100 h-2 rounded-full"><div className="bg-primary-600 h-2 rounded-full" style={{ width: `${s.progress||0}%` }} /></div>
                          <select value={s.mentorshipStatus?.toLowerCase() || 'unassigned'} onChange={(e)=>{
                            const value = e.target.value
                            studentsStorage.updateStudent(s.id, { mentorshipStatus: value.replace(/\b\w/g, m=>m.toUpperCase()).replace('-','-') })
                            setStudents(studentsStorage.getStudents())
                          }} className="px-2 py-1 border rounded-lg text-sm">
                            {['unassigned','assigned','in-progress','completed'].map(st => <option key={st} value={st}>{st}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <select defaultValue={s.mentorId || ''} onChange={(e)=>assignMentor(s.id, e.target.value)} className="px-2 py-1 border rounded-lg text-sm">
                            <option value="">Select mentor</option>
                            {mentors.map(m => <option key={m.id} value={m.id}>{m.name} ({m.capacityLeft})</option>)}
                          </select>
                          <button className="px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm">Message</button>
                          <button className="px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm">Schedule</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mentor directory and tiny analytics */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-3">Mentor Directory</div>
                <div className="space-y-3">
                  {mentors.map(m => (
                    <div key={m.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                      <div>
                        <div className="font-medium text-gray-900">{m.name}</div>
                        <div className="text-sm text-gray-600">{m.department} • {m.capacityLeft} slots left</div>
                      </div>
                      <button onClick={()=>{
                        const target = students.find(s => !s.mentorId)
                        if (target) assignMentor(target.id, m.id)
                      }} className="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm">Assign</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-3">Mentorship Analytics</div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>Avg response time: 12h</div>
                  <div>Mentor load: {mentors.reduce((a,m)=>a+(m.capacityLeft||0),0)} total slots available</div>
                  <div>% improved: 68%</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-2">Mentor Resources</div>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li><a className="text-primary-600" href="#">Guidelines (PDF)</a></li>
                  <li><a className="text-primary-600" href="#">Evaluation Rubric</a></li>
                  <li><a className="text-primary-600" href="#">Communication Templates</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Reports & Analytics */}
        <section>
          <SectionHeader id="reports" title="Reports & Analytics" icon={FileText} subtitle="Overview of internships and mentorships" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="font-medium text-gray-900 mb-2">Completion by Department</div>
              <div className="h-40 bg-gray-50 rounded-lg flex items-end space-x-2 p-2">
                {[30,60,45,70].map((h,i)=> <div key={i} className="flex-1 bg-primary-200 rounded-t" style={{ height: `${h}%`}} />)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="font-medium text-gray-900 mb-2">Mentor Workload</div>
              <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-sm">Pie (placeholder)</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="font-medium text-gray-900 mb-2">Top Partner Companies</div>
              <ul className="text-sm text-gray-700 list-disc pl-5">
                {companies.slice(0,5).map(c=> <li key={c.id}>{c.name}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <SectionHeader id="notifications" title="Notifications & Activity" icon={Bell} />
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-2">
              {notifications.map(n => (
                <div key={n.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                  <div className="text-sm text-gray-800">{n.message}</div>
                  {!n.read && <button onClick={()=>{ notificationsStorage.markRead(n.id); setNotifications(notificationsStorage.get()) }} className="px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs">Mark read</button>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Modal */}
        {reviewModal.open && (
          <div className="modal-overlay" onClick={(e)=> e.target===e.currentTarget && setReviewModal({ open:false, entry:null })}>
            <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xl font-semibold text-gray-900">Logbook Review</div>
                    <div className="text-sm text-gray-600">{reviewModal.entry.studentName} • {formatDate(reviewModal.entry.date)}</div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100" onClick={()=>setReviewModal({ open:false, entry:null })} aria-label="Close">✕</button>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-800 whitespace-pre-wrap">{reviewModal.entry.description}</div>
                  <div className="flex items-center space-x-2">
                    <button onClick={()=>{ approveLogbook(reviewModal.entry.id); setReviewModal({ open:false, entry:null }) }} className="px-4 py-2 rounded-lg bg-green-600 text-white">Approve</button>
                    <button onClick={()=>{ rejectLogbook(reviewModal.entry.id, 'Please add more details.'); setReviewModal({ open:false, entry:null }) }} className="px-4 py-2 rounded-lg bg-red-50 text-red-700">Request Changes</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Student Detail Modal */}
        {studentModal.open && (
          <div className="modal-overlay" onClick={(e)=> e.target===e.currentTarget && setStudentModal({ open:false, student:null })}>
            <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-semibold text-gray-900">{studentModal.student.name}</div>
                  <button className="p-2 rounded-lg hover:bg-gray-100" onClick={()=>setStudentModal({ open:false, student:null })} aria-label="Close">✕</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div><span className="text-gray-500">Batch:</span> {studentModal.student.batch}</div>
                  <div><span className="text-gray-500">Department:</span> {studentModal.student.department}</div>
                  <div><span className="text-gray-500">Mentor:</span> {mentorById[studentModal.student.mentorId]?.name || 'Unassigned'}</div>
                  <div><span className="text-gray-500">Progress:</span> {studentModal.student.progress}%</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 py-8 mt-8">
        <div className="container-custom text-sm text-gray-600 flex flex-wrap items-center justify-between">
          <div>© {new Date().getFullYear()} Prashikshan</div>
          <div className="space-x-4">
            <a href="/" className="hover:text-primary-600">Home</a>
            <a href="/guide" className="hover:text-primary-600">Internship Guide</a>
            <a href="#" className="hover:text-primary-600">Privacy</a>
            <a href="mailto:team@prashikshan.example" className="hover:text-primary-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

const CreditMapping = ({ students, internships, onSave }) => {
  const [studentId, setStudentId] = useState('')
  const [internshipId, setInternshipId] = useState('')
  const [credits, setCredits] = useState('')

  useEffect(()=>{
    // Suggest credits by internship duration (rough)
    const intn = internships.find(i=>i.id===internshipId)
    if (intn) {
      const start = new Date(intn.startDate)
      const end = new Date(intn.endDate)
      const days = Math.max(1, Math.round((end-start)/(1000*60*60*24)))
      const suggested = Math.min(20, Math.max(2, Math.round(days/15)))
      setCredits(String(suggested))
    }
  }, [internshipId, internships])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="grid md:grid-cols-4 gap-3">
        <input list="student-list" value={studentId} onChange={e=>setStudentId(e.target.value)} placeholder="Select Student (ID)" className="px-3 py-2 border rounded-lg" />
        <datalist id="student-list">
          {students.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </datalist>

        <select value={internshipId} onChange={e=>setInternshipId(e.target.value)} className="px-3 py-2 border rounded-lg">
          <option value="">Select Internship</option>
          {internships.map(i=> <option key={i.id} value={i.id}>{i.title}</option>)}
        </select>

        <input type="number" value={credits} onChange={e=>setCredits(e.target.value)} placeholder="Credits" className="px-3 py-2 border rounded-lg" />

        <button onClick={()=>{
          if (!studentId || !internshipId || !credits) return alert('Fill all fields')
          const student = students.find(s=>s.id===studentId)
          onSave({ studentId, internshipId, credits: Number(credits), approvedBy: 'Faculty' })
          setStudentId(''); setInternshipId(''); setCredits('')
          alert(`Saved credits for ${student?.name || 'student'}`)
        }} className="bg-primary-600 text-white rounded-lg px-4 py-2">Save</button>
      </div>
    </div>
  )
}

export default Faculty
