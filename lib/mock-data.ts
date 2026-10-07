export type LayerKey = 'industry' | 'faculty' | 'curriculum' | 'resources' | 'students' | 'career'

export const layerColor: Record<LayerKey, string> = {
  industry: '#F59E0B',
  faculty: '#0F766E',
  curriculum: '#A78BFA',
  resources: '#B45309',
  students: '#FF7085',
  career: '#2DD4BF',
}

export const layers: { key: LayerKey; n: string; title: string; tag: string; body: string; points: string[] }[] = [
  { key: 'industry', n: '01', title: 'Industry Intelligence', tag: 'Detect', body: 'Live demand signals from job boards, employer panels and sector reports — mapped to skills.', points: ['Demand scoring', 'Role → skill graphs', 'Quarterly trend shifts'] },
  { key: 'faculty', n: '02', title: 'Faculty GrowthHub', tag: 'Develop', body: 'Continuous, personal development for every educator. Development, not filtering.', points: ['4-dimension profile', 'Targeted pathways', 'Assess → Reassess'] },
  { key: 'curriculum', n: '03', title: 'Curriculum Engine', tag: 'Adapt', body: 'Gap detection across syllabi with recommendations routed to academic authorities.', points: ['Coverage mapping', 'Module proposals', 'Board-ready reviews'] },
  { key: 'resources', n: '04', title: 'Resource & FLOSS Hub', tag: 'Enable', body: 'Audit licenses, match open-source alternatives, and migrate labs without disruption.', points: ['License audit', 'Smart matching', 'Shared deployments'] },
  { key: 'students', n: '05', title: 'Student Career Portal', tag: 'Verify', body: 'A unified, verified skill profile — beyond CGPA-only visibility.', points: ['Skill clusters', 'Stackable credentials', 'Readiness score'] },
  { key: 'career', n: '06', title: 'Career & Feedback', tag: 'Measure', body: 'Placement, alumni and employer patterns flow back as curriculum signals.', points: ['Employer ratings', 'Alumni progression', 'Signal loopback'] },
]

export const loopSteps = [
  { t: 'Industry Signals', d: 'Demand for skills is captured continuously.' },
  { t: 'Skill Mapping', d: 'Signals are mapped to a shared skill graph.' },
  { t: 'Gap Detection', d: 'Coverage is compared against syllabi and faculty.' },
  { t: 'Action', d: 'AI recommends. Humans decide.' },
  { t: 'Implementation', d: 'Modules, training and resources roll out.' },
  { t: 'Outcome Tracking', d: 'Credentials, placements and ratings are measured.' },
  { t: 'Feedback', d: 'Outcomes become the next round of signals.' },
]

export const ripples = [
  { t: 'Industry demand rises', s: 'GenAI roles +42% QoQ', c: '#F59E0B' },
  { t: 'Added to skill map', s: 'LLM Ops · Prompt Eng.', c: '#F59E0B' },
  { t: 'Coverage checked', s: '14 courses scanned', c: '#A78BFA' },
  { t: 'Gap found', s: 'Partial · 31% coverage', c: '#A78BFA' },
  { t: 'Faculty needs flagged', s: '6 educators matched', c: '#0F766E' },
  { t: 'Resources found', s: '3 FLOSS stacks ready', c: '#B45309' },
  { t: 'Pathway opens', s: 'Elective + lab module', c: '#FF7085' },
  { t: 'Students earn credentials', s: '212 badges issued', c: '#FF7085' },
  { t: 'Employers give feedback', s: '4.6 / 5 readiness', c: '#2DD4BF' },
]

export const problems = [
  { t: 'Faculty development', s: 'Periodic, never continuous.' },
  { t: 'Curriculum updates', s: 'Slow, semester-bound.' },
  { t: 'Software & resources', s: 'Fragmented, costly.' },
  { t: 'Student skills', s: 'Separate from curriculum.' },
  { t: 'Placement & alumni', s: 'Delayed and disconnected.' },
]

export const stakeholders = [
  { t: 'Students', c: '#FF7085', b: 'Verified skills, clear pathways and visibility beyond CGPA.', stat: '+38%', sl: 'career readiness' },
  { t: 'Faculty', c: '#0F766E', b: 'Continuous, personal growth aligned to what is actually changing.', stat: '3.2×', sl: 'upskilling velocity' },
  { t: 'Universities', c: '#F59E0B', b: 'A living curriculum and measurable alignment with industry.', stat: '−61%', sl: 'gap-to-action time' },
  { t: 'Government', c: '#A78BFA', b: 'NEP-aligned evidence on outcomes, credits and open-source adoption.', stat: '₹4.2Cr', sl: 'license savings / yr' },
  { t: 'Industry', c: '#2DD4BF', b: 'Graduates ready on day one — and a voice that shapes the syllabus.', stat: '4.6/5', sl: 'employer rating' },
]

const spark = (base: number, n = 12, v = 6) => Array.from({ length: n }, (_, i) => ({ i, v: Math.round(base + Math.sin(i / 1.6) * v + i * (v / 4)) }))

export const kpis = [
  { label: 'Open skill gaps', value: 47, suffix: '', delta: '-12 this term', good: true, color: '#F59E0B', spark: spark(60, 12, 4).map((d, i) => ({ ...d, v: 70 - i * 2 + (i % 3) })) },
  { label: 'Gaps closed', value: 128, suffix: '', delta: '+34 this term', good: true, color: '#A78BFA', spark: spark(80) },
  { label: 'Faculty growth', value: 23.4, suffix: '%', delta: '+4.1 pts', good: true, color: '#0F766E', spark: spark(14, 12, 3), decimals: 1 },
  { label: 'License savings', value: 4.2, prefix: '₹', suffix: 'Cr', delta: '+₹1.1Cr YoY', good: true, color: '#B45309', spark: spark(2, 12, 1), decimals: 1 },
  { label: 'Placement rate', value: 87, suffix: '%', delta: '+6 pts', good: true, color: '#FF7085', spark: spark(78, 12, 3) },
  { label: 'Employer score', value: 4.6, suffix: '/5', delta: '+0.4', good: true, color: '#2DD4BF', spark: spark(4, 12, 0.3), decimals: 1 },
]

export const heatSkills = ['GenAI', 'Cloud', 'Cybersec', 'Data Eng.', 'DevOps', 'IoT', 'Rust', 'UX']
export const heatDepts = ['CSE', 'ECE', 'Mech', 'Civil', 'MBA', 'Design']
export const heatmap: number[][] = [
  [82, 64, 71, 58, 66, 22, 40, 18],
  [44, 38, 52, 30, 29, 74, 31, 12],
  [21, 18, 12, 26, 15, 48, 8, 20],
  [14, 22, 9, 18, 11, 36, 4, 10],
  [38, 46, 28, 42, 12, 9, 2, 54],
  [33, 12, 8, 14, 6, 18, 3, 86],
]

export type Rec = { id: string; title: string; layer: LayerKey; rationale: string; impact: string; confidence: number }
export const recommendations: Rec[] = [
  { id: 'r1', title: 'Add GenAI practical module to CS-402 Machine Learning', layer: 'curriculum', rationale: 'GenAI demand +42% QoQ across 1,240 regional postings; CS-402 covers 31% of required outcomes.', impact: '~420 students / yr', confidence: 92 },
  { id: 'r2', title: 'Enroll 6 ECE faculty in Cloud-Native Fundamentals cohort', layer: 'faculty', rationale: 'Emerging-tech awareness scores below 2.8 for faculty mapped to Cloud electives.', impact: '4 courses unblocked', confidence: 86 },
  { id: 'r3', title: 'Migrate Mech CAD lab from AutoCAD to FreeCAD', layer: 'resources', rationale: '82% feature parity for coursework; ₹38L annual license spend.', impact: '₹38L / yr saved', confidence: 79 },
  { id: 'r4', title: 'Introduce Cybersecurity Operations elective (Sem 6)', layer: 'curriculum', rationale: 'Employer panel flagged SOC readiness as top-3 hiring gap two cycles in a row.', impact: '+1 credit pathway', confidence: 88 },
]

export const loopHealth = { score: 78, days: 19, prevDays: 46 }

export const facultyRadar = [
  { d: 'Subject knowledge', now: 86, prev: 80 },
  { d: 'Digital & tech skills', now: 64, prev: 48 },
  { d: 'Emerging-tech', now: 58, prev: 36 },
  { d: 'Teaching practice', now: 79, prev: 74 },
]
export const facultyGrowth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((m, i) => ({ m, score: 58 + i * 3 + (i % 2) * 2, peer: 56 + i * 1.5 }))
export const facultyTimeline = [
  { date: 'Aug 2026', t: 'Completed: Applied LLMs for Educators', k: 'Certification', c: '#0F766E' },
  { date: 'Jun 2026', t: 'Workshop: Flipped classroom design', k: 'Workshop', c: '#A78BFA' },
  { date: 'Apr 2026', t: 'Reassessment — Digital skills +16', k: 'Assessment', c: '#F59E0B' },
  { date: 'Feb 2026', t: 'Started: AWS Cloud Practitioner', k: 'Course', c: '#2DD4BF' },
]
export const facultyGaps = [
  { t: 'Generative AI in coursework', lvl: 42, why: 'Linked to 3 courses you teach' },
  { t: 'Cloud architecture basics', lvl: 55, why: 'Required for CS-411 refresh' },
  { t: 'Assessment design for projects', lvl: 61, why: 'Peer-review flagged' },
]
export const facultyCourses = [
  { t: 'Prompting & Evaluation for Educators', k: 'Course', h: '12h', p: 'NPTEL' },
  { t: 'Cloud-Native in the Classroom', k: 'Workshop', h: '2 days', p: 'AWS Academy' },
  { t: 'Google Cloud Digital Leader', k: 'Certification', h: '20h', p: 'Google' },
]

export const curriculumKanban = {
  proposed: [
    { id: 'k1', t: 'GenAI module in CS-402', d: 'CSE', tag: 'Update subject' },
    { id: 'k2', t: 'Edge AI lab for IoT', d: 'ECE', tag: 'Practical module' },
  ],
  review: [
    { id: 'k3', t: 'Cybersecurity Ops elective', d: 'CSE', tag: 'New elective' },
    { id: 'k4', t: 'AWS cert credit mapping', d: 'CSE', tag: 'Certification' },
  ],
  approved: [{ id: 'k5', t: 'Data viz with Python', d: 'MBA', tag: 'Update subject' }],
  rejected: [{ id: 'k6', t: 'Blockchain minor', d: 'CSE', tag: 'New elective' }],
}

export const trendingSkills = [
  { s: 'Generative AI', demand: 96, trend: 42, roles: 'ML Engineer, AI PM', cat: 'AI' },
  { s: 'Cloud Security', demand: 89, trend: 28, roles: 'SecOps, Cloud Eng.', cat: 'Security' },
  { s: 'Data Engineering', demand: 84, trend: 17, roles: 'Data Eng., Analyst', cat: 'Data' },
  { s: 'Kubernetes', demand: 78, trend: 12, roles: 'SRE, DevOps', cat: 'Cloud' },
  { s: 'Embedded Rust', demand: 61, trend: 34, roles: 'Firmware Eng.', cat: 'Systems' },
  { s: 'UX Research', demand: 58, trend: -4, roles: 'Product Designer', cat: 'Design' },
  { s: 'EV Powertrain', demand: 66, trend: 22, roles: 'Mech Design Eng.', cat: 'Core' },
  { s: 'PLC / SCADA', demand: 49, trend: -9, roles: 'Automation Eng.', cat: 'Core' },
].map((r) => ({ ...r, spark: Array.from({ length: 8 }, (_, i) => ({ i, v: r.demand - (7 - i) * (r.trend / 10) + (i % 2) * 2 })) }))
export const demandQuarters = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'].map((q, i) => ({ q, genai: 40 + i * 9, cloud: 52 + i * 5, cyber: 48 + i * 6, data: 55 + i * 4 }))

export const flossMatches = [
  { from: 'MATLAB', to: 'GNU Octave', parity: 91, cost: 1240000, progress: 74 },
  { from: 'AutoCAD', to: 'FreeCAD', parity: 82, cost: 3800000, progress: 46 },
  { from: 'Photoshop', to: 'GIMP', parity: 78, cost: 620000, progress: 88 },
  { from: 'SPSS', to: 'R + JASP', parity: 94, cost: 910000, progress: 62 },
]

export const studentSkills = [
  { k: 'Academic', v: 82 },
  { k: 'Technical', v: 71 },
  { k: 'Projects & internships', v: 64 },
  { k: 'Certifications', v: 58 },
  { k: 'Aptitude', v: 76 },
  { k: 'Professional', v: 69 },
]
export const targetRoles = ['ML Engineer', 'Cloud Engineer', 'Data Analyst', 'SecOps Analyst']
export const roleGaps: Record<string, { s: string; have: number; need: number }[]> = {
  'ML Engineer': [{ s: 'MLOps', have: 30, need: 75 }, { s: 'Deep Learning', have: 55, need: 80 }, { s: 'System design', have: 40, need: 65 }],
  'Cloud Engineer': [{ s: 'Kubernetes', have: 20, need: 70 }, { s: 'Networking', have: 45, need: 70 }, { s: 'IaC (Terraform)', have: 15, need: 60 }],
  'Data Analyst': [{ s: 'SQL', have: 70, need: 85 }, { s: 'Dashboards', have: 50, need: 75 }, { s: 'Statistics', have: 60, need: 75 }],
  'SecOps Analyst': [{ s: 'SIEM tools', have: 10, need: 65 }, { s: 'Threat modeling', have: 25, need: 60 }, { s: 'Linux', have: 60, need: 80 }],
}

export const credentials = [
  { t: 'GenAI Practitioner', issuer: 'Vidyachakra × NASSCOM', code: 'VC-GAI-7F3K-2026', lvl: 'Level 2', c: '#A78BFA', date: 'Aug 2026' },
  { t: 'Cloud Foundations', issuer: 'AWS Academy', code: 'AWS-CF-91QX-2026', lvl: 'Level 1', c: '#F59E0B', date: 'May 2026' },
  { t: 'Secure Coding', issuer: 'CERT-In Partner Lab', code: 'SC-44LM-2026', lvl: 'Level 1', c: '#2DD4BF', date: 'Mar 2026' },
  { t: 'Data Storytelling', issuer: 'Dept. of Design', code: 'DS-0Z8P-2025', lvl: 'Level 2', c: '#FF7085', date: 'Dec 2025' },
  { t: 'Open-Source Contributor', issuer: 'FOSSEE, IIT Bombay', code: 'FOS-3HJ2-2025', lvl: 'Level 1', c: '#B45309', date: 'Oct 2025' },
  { t: 'Professional Communication', issuer: 'Career Cell', code: 'PC-77RT-2025', lvl: 'Level 1', c: '#0F766E', date: 'Aug 2025' },
]

export const placementData = [
  { y: '2022', placed: 71, higher: 12, entre: 3 },
  { y: '2023', placed: 74, higher: 13, entre: 4 },
  { y: '2024', placed: 79, higher: 11, entre: 5 },
  { y: '2025', placed: 83, higher: 10, entre: 5 },
  { y: '2026', placed: 87, higher: 9, entre: 6 },
]
export const alumniProgression = [
  { yr: 'Y0', ctc: 6.2, role: 1 },
  { yr: 'Y1', ctc: 7.4, role: 1.3 },
  { yr: 'Y3', ctc: 11.8, role: 2.1 },
  { yr: 'Y5', ctc: 18.6, role: 3.2 },
]
export const employerFeedback = [
  { e: 'Infosys', role: 'Systems Engineer', rating: 5, note: 'Cloud basics noticeably stronger this cohort.' },
  { e: 'Tata Elxsi', role: 'Embedded Eng.', rating: 4, note: 'Good fundamentals; more RTOS exposure needed.' },
  { e: 'Zoho', role: 'Product Dev', rating: 5, note: 'Project portfolios are excellent signals.' },
  { e: 'L&T Technology', role: 'Design Eng.', rating: 4, note: 'FreeCAD fluency transferred well.' },
  { e: 'Razorpay', role: 'SDE-1', rating: 3, note: 'System design depth still a gap.' },
]

export const successMetrics = [
  { t: 'Faculty', c: '#0F766E', m: [['Faculty on active pathways', '78%'], ['Avg. reassessment gain', '+14 pts']] },
  { t: 'Curriculum', c: '#A78BFA', m: [['Gap → approved action', '19 days'], ['Outcomes mapped to industry', '84%']] },
  { t: 'Resources', c: '#B45309', m: [['Labs on FLOSS', '62%'], ['Annual savings', '₹4.2Cr']] },
  { t: 'Students', c: '#FF7085', m: [['Verified credentials / student', '3.4'], ['Readiness score (avg)', '72']] },
  { t: 'Career outcomes', c: '#2DD4BF', m: [['Placement rate', '87%'], ['Employer rating', '4.6 / 5']] },
]

export const aiResponses: Record<string, { title: string; body: string; rationale: string; layer: LayerKey }> = {
  'Identify skill gaps': { title: 'Top 3 institution-wide skill gaps', body: 'GenAI (CSE 31% coverage), Cloud Security (ECE 22%), Data Engineering (MBA 18%). Combined, these affect ~1,140 students this year.', rationale: 'Cross-referenced 1,240 regional postings against 214 course outcome statements and 96 faculty profiles.', layer: 'industry' },
  'Analyse curriculum': { title: 'CS-402 needs a practical GenAI module', body: 'Theory coverage is strong (82%), but applied outcomes — fine-tuning, evaluation, RAG — are absent. Suggest a 4-week lab block in weeks 9–12.', rationale: 'Outcome mapping vs. top-50 GenAI job descriptions; peer institutions added similar modules in 2025.', layer: 'curriculum' },
  'Match skill → course': { title: 'Kubernetes → CS-411 Cloud Computing', body: 'Best fit is CS-411 Unit 4 (Containers). Mapping enables 1 academic credit via the validated module "K8s Foundations".', rationale: 'Highest outcome overlap (0.81) and faculty readiness score above threshold.', layer: 'students' },
  'Summarise cohort feedback': { title: '2026 cohort: strong cloud, weak system design', body: 'Employers rated readiness 4.6/5. Positive: cloud fluency, portfolios. Recurring gap: system design depth (raised by 7 of 22 employers).', rationale: 'Clustered 22 employer reviews and 340 alumni pulse responses.', layer: 'career' },
  'Recommend resources': { title: 'Switch Mech CAD lab to FreeCAD', body: 'FreeCAD covers 82% of lab exercises; remaining 18% via OpenSCAD. Estimated savings ₹38L/yr with a 2-week faculty bridge workshop.', rationale: 'Feature audit of 46 lab exercises; FOSSEE migration playbooks available.', layer: 'resources' },
}
