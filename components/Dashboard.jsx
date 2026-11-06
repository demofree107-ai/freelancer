'use client';

import { ArrowRight, BookOpen, CalendarCheck, CalendarDays, ClipboardList, GraduationCap, Plus, School, Users, Wallet } from 'lucide-react';

export function CampusIllustration() {
  return <svg className="campus-art" viewBox="0 0 340 224" fill="none" aria-hidden="true">
    <path d="M61 187V113C61 50 100 13 167 13s105 37 105 100v74" fill="#EFC67D"/>
    <circle cx="235" cy="59" r="18" fill="#F9EBD2"/>
    <path d="M0 188h340" stroke="#E6C280" strokeWidth="2"/>
    <path d="M76 142l93-61 93 61v46H76v-46Z" fill="#FAF2E1"/>
    <path d="m66 146 103-68 103 68" stroke="#D38362" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="M96 133v55h146v-55l-73-48-73 48Z" fill="#FFF8EA"/>
    <path d="M145 188v-26a24 24 0 0 1 48 0v26" fill="#32675D"/>
    <path d="M169 139v49" stroke="#F3D8AD" strokeWidth="2"/>
    <rect x="111" y="141" width="19" height="24" rx="2" fill="#A8C3AE"/><path d="M120.5 141v24m-9.5-12h19" stroke="#FFF8EA" strokeWidth="2"/>
    <rect x="208" y="141" width="19" height="24" rx="2" fill="#A8C3AE"/><path d="M217.5 141v24m-9.5-12h19" stroke="#FFF8EA" strokeWidth="2"/>
    <circle cx="169" cy="117" r="11" fill="#E6B671"/><path d="M169 111v7l4 3" stroke="#FFF8EA" strokeWidth="2" strokeLinecap="round"/>
    <path d="M29 187c0-18 10-31 23-31 14 0 24 13 24 31M255 187c0-22 12-36 27-36s27 14 27 36" fill="#7CA892"/>
    <path d="M42 187c0-12 7-21 16-21 10 0 17 9 17 21M266 187c0-13 8-23 18-23s18 10 18 23" fill="#A3C5A7"/>
    <path d="M96 37v15m-7.5-7.5h15M47 92v10m-5-5h10M291 110v12m-6-6h12" stroke="#F9EBD2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M121 199h97" stroke="#E6C280" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

function Metric({ icon: Icon, tone, label, value, note, onClick }) {
  return <button className="metric-card" onClick={onClick}>
    <span className={`metric-icon ${tone}`}><Icon size={19} strokeWidth={1.8}/></span>
    <span className="metric-label">{label}</span>
    <span className="metric-value">{value}</span>
    <span className="metric-note">{note}</span>
    <ArrowRight className="metric-arrow" size={16}/>
  </button>;
}

export default function Dashboard({ user, data, permissions, onNavigate, onAddStudent, display }) {
  const allowed = key => permissions.includes(key);
  const students = data.students || [];
  const classes = data.classes || [];
  const staff = data.staff || [];
  const attendance = data.attendance || [];
  const invoices = data.invoices || [];
  const payments = data.payments || [];
  const exams = data.exams || [];
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  const dateLabel = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
  const records = attendance.filter(x => String(x.date).slice(0, 10) === today);
  const present = records.filter(x => x.status === 'present').length;
  const percent = records.length ? Math.round(present * 100 / records.length) : null;
  const outstanding = Math.max(0, invoices.reduce((sum, x) => sum + Number(x.amount), 0) - payments.reduce((sum, x) => sum + Number(x.amount), 0));
  const upcoming = exams.filter(x => String(x.exam_date).slice(0, 10) >= today).sort((a, b) => String(a.exam_date).localeCompare(String(b.exam_date))).slice(0, 3);
  const name = user.name.trim().split(/\s+/)[0];
  const metrics = [
    {icon:GraduationCap, tone:'sage', label:'Students', value:students.length.toLocaleString(), note:'Profiles in your view', group:'people'},
    allowed('staff') ? {icon:Users,tone:'peach',label:'Staff members',value:staff.length.toLocaleString(),note:'People in your school',group:'people',entity:'staff'} : {icon:School,tone:'peach',label:'Classes',value:classes.length.toLocaleString(),note:'Classes in your view',group:'people',entity:'classes'},
    allowed('attendance') ? {icon:CalendarCheck,tone:'lavender',label:'Present today',value:percent===null?'—':`${percent}%`,note:records.length?`${present} of ${records.length} marked present`:'No attendance recorded yet',group:'attendance'} : {icon:ClipboardList,tone:'lavender',label:'Invoices',value:invoices.length.toLocaleString(),note:'Invoices in your view',group:'fees',entity:'invoices'},
    allowed('invoices') ? {icon:Wallet,tone:'butter',label:'Outstanding fees',value:`₹${outstanding.toLocaleString('en-IN')}`,note:'Balance across visible invoices',group:'fees',entity:'invoices'} : {icon:BookOpen,tone:'butter',label:'Upcoming exams',value:exams.filter(x=>String(x.exam_date).slice(0,10)>=today).length.toLocaleString(),note:'Scheduled in your view',group:'academics',entity:'exams'}
  ];
  return <div className="dashboard">
    <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"/> {dateLabel}</div><h1>Welcome back, {name}<span className="welcome-period">.</span></h1><p>Here’s your school day, all in one place.</p></div><span className="academic-pill"><span className="live-dot"/> Your workspace</span></div>
    <section className="hero-card" aria-label="School overview">
      <div className="hero-copy"><div className="hero-kicker"><span>✳</span> MADE FOR YOUR SCHOOL DAY</div><h2>Good things grow<br/><em>here.</em></h2><p>From the first bell to the final report, keep everything moving together.</p><button className="hero-button" onClick={()=>onNavigate('people','students')}>Explore students <ArrowRight size={16}/></button></div>
      <div className="hero-art"><span className="hero-art-label">A LITTLE MORE ROOM TO LEARN</span><CampusIllustration/></div>
      <div className="hero-index">01 / YOUR WORKSPACE</div>
    </section>
    <div className="section-heading"><div><span className="section-index">01</span><h2>At a glance</h2></div><span className="section-caption">A quick look at your school</span></div>
    <div className="metrics-grid">{metrics.map(metric=><Metric key={metric.label} {...metric} onClick={()=>onNavigate(metric.group,metric.entity)}/>)}</div>
    <div className="dashboard-grid">
      <section className="panel students-panel"><div className="panel-heading"><div><div className="panel-kicker">YOUR COMMUNITY</div><h2>Recent students <span className="count-pill">{students.length}</span></h2><p>The latest additions to your student list.</p></div><button className="text-button" onClick={()=>onNavigate('people','students')}>View all <ArrowRight size={15}/></button></div>
        {students.length?<div className="student-list"><div className="list-label"><span>STUDENT</span><span>CLASS</span><span>STATUS</span></div>{students.slice(0,5).map((s,i)=><div className="student-row" key={s.id}><span className={`student-avatar a${i}`}>{s.name.slice(0,1)}</span><span className="student-name"><strong>{s.name}</strong><small>{s.admission_no}</small></span><span className="student-class">{display(s.class_id,'class_id',data)}</span><span className={`status status-${s.status}`}>{s.status}</span></div>)}</div>:<div className="empty-dash"><div className="empty-illustration"><span className="empty-illustration-back"/><GraduationCap size={27} strokeWidth={1.5}/></div><strong>A place for every student</strong><p>Student profiles will appear here once they’re added.</p>{user.role==='admin'&&<button className="text-button" onClick={onAddStudent}><Plus size={15}/> Add your first student</button>}</div>}
      </section>
      <div className="dashboard-side">
        {allowed('attendance')&&<section className="panel attendance-panel"><div className="panel-heading"><div><div className="panel-kicker">TODAY’S SNAPSHOT</div><h2>Attendance</h2><p>Student attendance for today.</p></div><button className="round-link" onClick={()=>onNavigate('attendance','attendance')} aria-label="View attendance"><ArrowRight size={17}/></button></div><div className="attendance-content"><div className="attendance-ring" style={{'--progress':`${percent||0}%`}}><div><strong>{percent===null?'—':`${percent}%`}</strong><small>present</small></div></div><div className="attendance-details"><strong>{records.length ? `${present} ${present===1?'student':'students'} present` : 'No records yet'}</strong><p>{records.length ? `${records.length} attendance ${records.length===1?'record':'records'} today` : 'Today’s attendance will show up here.'}</p><button className="text-button" onClick={()=>onNavigate('attendance','attendance')}>View attendance <ArrowRight size={14}/></button></div></div></section>}
        {allowed('exams')?<section className="panel schedule-panel"><div className="panel-heading"><div><div className="panel-kicker">LOOKING AHEAD</div><h2>Upcoming exams</h2></div><button className="text-button" onClick={()=>onNavigate('academics','exams')}>View all <ArrowRight size={15}/></button></div>{upcoming.length?<div className="upcoming-list">{upcoming.map(exam=><div className="upcoming-row" key={exam.id}><div className="date-tile"><span>{new Date(`${String(exam.exam_date).slice(0,10)}T12:00:00`).toLocaleString('en',{month:'short'})}</span><strong>{String(exam.exam_date).slice(8,10)}</strong></div><div><strong>{exam.subject}</strong><small>{exam.name} · {display(exam.class_id,'class_id',data)}</small></div><ArrowRight size={15}/></div>)}</div>:<div className="schedule-empty"><span><CalendarDays size={18}/></span><p>No upcoming exams scheduled.</p></div>}</section>:<section className="panel schedule-panel"><div className="panel-heading"><div><div className="panel-kicker">YOUR WORKSPACE</div><h2>Keep things moving</h2><p>Find your school records in one place.</p></div></div><button className="workspace-action" onClick={()=>onNavigate('fees','invoices')}><Wallet size={17}/> View invoices <ArrowRight size={16}/></button></section>}
      </div>
    </div>
    <div className="bottom-line"><span>✳</span> A little more space for what matters.</div>
  </div>;
}
