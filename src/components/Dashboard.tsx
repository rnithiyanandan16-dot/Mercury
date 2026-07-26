import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ArrowUpRight,
  Lightbulb,
  CheckCircle,
  HandHeart,
  CloudUpload,
} from 'lucide-react';

// ----- MOCK DATA -----
const financials = [
  { label: 'Revenue', value: '$2.4M', change: '↑', positive: true },
  { label: 'Expenses', value: '$1.7M', change: null },
  { label: 'EBITDA', value: '$34K', change: null },
  { label: 'Burn Rate', value: '$112K/mo', change: null },
  { label: 'Profit', value: '$680K', change: null },
  { label: 'EBITDA (adj)', value: '$820K', change: null },
  { label: 'Cash Flow', value: '$112K/mo', change: null },
  { label: 'Runway', value: '24 mo', change: '🕊️ free' },
];

const metrics = [
  { label: 'Productivity Score', value: '94', sub: '📈 +2 pts this week' },
  { label: 'Employee Satisfaction', value: '87', sub: '😊 100% free surveys' },
  { label: 'AI Automation Score', value: '78', sub: '⚡ Agents at work' },
];

const taskTeams = [
  { name: 'Team Alpha', completed: 52, pending: 47, overdue: 8, progress: 8 },
  { name: 'Team Beta', completed: 342, pending: 47, overdue: 8, progress: 8 },
];

const events = [
  { time: 'Today', desc: '3–4 months planning' },
  { time: '29', desc: 'Monthly review' },
  { time: '28', desc: 'Board sync' },
  { time: 'Jan/Feb', desc: 'Q1 strategy offsite' },
  { time: '6h', desc: 'AI workshop (free)' },
  { time: '17', desc: 'Mercury AI release' },
  { time: 'ET', desc: 'Eastern time zone' },
];

const meetings = [
  '11:00 – helieovn Meetings',
  '14:00 – Title Meetings',
  '17:00 – Experation',
  '19:00 – rejdanze Attsction',
];

const deadlines = [
  { text: 'Q3 marketing spend', status: 'Review by Fri', urgent: false },
  { text: 'Supply chain risk', status: '⚠️ Action needed', urgent: true },
  { text: 'Mercury AI update', status: '✅ On track', urgent: false },
];

const agents = [
  { name: 'Finance Buddy', emoji: '🧾', status: 'Idle', desc: 'Auto‑categorizes expenses & flags anomalies' },
  { name: 'HR Helper', emoji: '👥', status: 'Online', desc: 'Benefits, leave policies & pulse surveys' },
  { name: 'Ops Optimizer', emoji: '📊', status: 'Active ⚠️', desc: 'Supply chain & inventory cost‑saving' },
  { name: 'IT Support Bot', emoji: '💻', status: 'Online', desc: 'Resets passwords, provisions access, VPN' },
  { name: 'Growth Scout', emoji: '📈', status: 'Active ✨', desc: '24/7 competitor & emerging market monitoring' },
  { name: 'Tasky', emoji: '⚡', status: 'Running', desc: 'Auto‑assigns overdue tasks & re‑prioritizes' },
];

const apiModels = [
  { name: 'Mercury‑Lite', desc: 'Lightweight text generation for summarization & Q&A.', endpoint: 'https://api.mercutrix.free/v1/mercury-lite', response: `{\n  "status": "success",\n  "output": "Here is your free AI-generated summary.",\n  "tokens": 42,\n  "cost": "$0.0000"\n}` },
  { name: 'Finance‑Net', desc: 'Predicts cash flow trends and anomaly detection.', endpoint: 'https://api.mercutrix.free/v1/finance-net', response: `{\n  "prediction": "upward trend",\n  "confidence": 0.94,\n  "anomalies": 0,\n  "cost": "$0.0000"\n}` },
  { name: 'HR‑Sense', desc: 'Sentiment analysis and employee satisfaction scoring.', endpoint: 'https://api.mercutrix.free/v1/hr-sense', response: `{\n  "satisfaction": 87,\n  "sentiment": "positive",\n  "top_concern": "work-life balance",\n  "cost": "$0.0000"\n}` },
  { name: 'Ops‑Guard', desc: 'Supply chain risk monitoring & inventory optimization.', endpoint: 'https://api.mercutrix.free/v1/ops-guard', response: `{\n  "risk_level": "medium",\n  "component": "X",\n  "recommendation": "diversify supplier",\n  "cost": "$0.0000"\n}` },
  { name: 'Growth‑Scout', desc: 'Identifies emerging markets and competitor moves.', endpoint: 'https://api.mercutrix.free/v1/growth-scout', response: `{\n  "opportunity": "Region Z expansion",\n  "competitor_activity": "low",\n  "potential_gain": "+18%",\n  "cost": "$0.0000"\n}` },
];

// ----- COMPONENTS -----
function FinCard({ label, value, change, positive }: { label: string; value: string; change?: string | null; positive?: boolean }) {
  return (
    <div className="bg-[#181F28] border border-[#2A313C] rounded-xl p-4 hover:border-[#3C4A5A] transition-colors">
      <div className="text-xs text-[#8D9BB0] uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold mt-1 flex items-center gap-1">
        {value}
        {change && (
          <span className={positive ? 'text-emerald-400' : 'text-red-400'}>
            {change}
          </span>
        )}
      </div>
      {label === 'Runway' && <div className="text-xs text-[#6F7E94] mt-1">(free extension)</div>}
    </div>
  );
}

function MetricBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-[#181F28] border border-[#2A313C] rounded-xl p-4">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-[#8D9BB0] mt-1">{label}</div>
      <div className="text-xs text-[#5F738C] mt-1">{sub}</div>
    </div>
  );
}

function TaskCard({ name, completed, pending, overdue, progress }: any) {
  return (
    <div className="bg-[#181F28] border border-[#2A313C] rounded-xl p-4">
      <div className="font-semibold text-[#BCC9DE] text-sm mb-2">📋 {name}</div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <span><span className="font-bold">{completed}</span> Completed</span>
        <span><span className="font-bold">{pending}</span> Pending</span>
        <span><span className="font-bold">{overdue}</span> Overdue</span>
        <span><span className="font-bold">{progress}</span> Progress</span>
      </div>
    </div>
  );
}

function EventItem({ time, desc }: { time: string; desc: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-[#232B36] text-sm last:border-0">
      <span className="text-[#8D9BB0] font-medium">{time}</span>
      <span className="text-[#D0DCEC]">{desc}</span>
    </div>
  );
}

function MeetingItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-[#232B36] text-sm last:border-0">
      <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
      <span>{text}</span>
    </div>
  );
}

function DeadlineItem({ text, status, urgent }: { text: string; status: string; urgent: boolean }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-[#232B36] text-sm last:border-0">
      <span>{text}</span>
      <span className={urgent ? 'text-red-400' : 'text-amber-400'}>{status}</span>
    </div>
  );
}

function AgentCard({ name, emoji, status, desc }: any) {
  const statusClass = status.includes('Idle') ? 'idle' : status.includes('Active') ? 'active' : 'active';
  return (
    <div className="bg-[#1A232E] border border-[#2E3A48] rounded-xl p-3 hover:border-[#4A6A8A] transition-colors">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{emoji} {name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          statusClass === 'idle' ? 'bg-[#3A3A2A] text-yellow-300' : 'bg-[#1F4A3A] text-emerald-300'
        }`}>{status}</span>
      </div>
      <div className="text-xs text-[#98A9C2] mt-1">{desc}</div>
      <div className="text-[10px] text-emerald-400 bg-[#1A3A2A] inline-block px-2 py-0.5 rounded-full mt-1.5">
        <CheckCircle size={10} className="inline mr-1" /> 0 bucks
      </div>
    </div>
  );
}

function ApiCard({ model, onTry }: { model: any; onTry: (idx: number) => void }) {
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState('');
  const handleTry = () => {
    setShowResponse(true);
    setResponseText('⏳ Calling API... (free)');
    setTimeout(() => {
      setResponseText(model.response);
    }, 600);
  };
  return (
    <div className="bg-[#1A232E] border border-[#2E3A48] rounded-xl p-4 hover:border-[#4A6A8A] transition-colors">
      <div className="font-bold text-sm flex items-center gap-2">
        {model.name}
        <span className="text-[10px] text-emerald-400 bg-[#1A3A2A] px-2 py-0.5 rounded-full">FREE</span>
      </div>
      <div className="text-xs text-[#98A9C2] mt-1">{model.desc}</div>
      <div className="text-[11px] font-mono bg-[#0D141C] px-2 py-1 rounded-md text-emerald-400 mt-2 break-all">
        {model.endpoint}
      </div>
      <button
        onClick={handleTry}
        className="mt-3 bg-[#1F5B7A] hover:bg-[#2A7AA0] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition flex items-center gap-1.5"
      >
        <CloudUpload size={12} /> Try
      </button>
      {showResponse && (
        <div className="mt-2 text-xs bg-[#0D141C] border border-[#2A3A4A] rounded-md p-2 text-[#B0C4DD] max-h-24 overflow-y-auto whitespace-pre-wrap">
          {responseText}
        </div>
      )}
    </div>
  );
}

// ----- MAIN DASHBOARD -----
export function Dashboard() {
  const [askInput, setAskInput] = useState('');
  const [askResponse, setAskResponse] = useState('💬 Ask anything – all agents and APIs are 100% free.');

  const handleAsk = () => {
    if (!askInput.trim()) {
      setAskResponse('🤔 Please ask something (remember, it\'s free!).');
      return;
    }
    const quotes = [
      '“That’s a great question! The answer is always free.” – Mercury AI',
      '“Let me consult the agents... They said: $0 and you’re good to go.”',
      '“Processing your request... Done. No charge, as always.”',
      '“I’d love to help! But first, remember – this call costs you nothing.”',
      '“Our AI models are working on it. And yes, the bill is zero.”'
    ];
    setAskResponse(`🧠 ${quotes[Math.floor(Math.random() * quotes.length)]}`);
    setAskInput('');
  };

  return (
    <div className="space-y-6">

      {/* Free Banner */}
      <div className="bg-gradient-to-r from-[#0F2B1D] to-[#1A3A28] border border-emerald-700 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(43,140,94,0.15)]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-2xl text-emerald-300">💎</span>
          <span className="bg-emerald-700 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
            <CheckCircle size={14} /> 100% FREE
          </span>
          <span className="text-emerald-200 font-medium">No credit card · No limits · No jokes (okay, some jokes)</span>
        </div>
        <div className="flex gap-6 text-emerald-200/80 text-sm flex-wrap">
          <span><span className="text-amber-400">“</span> $0.00 – exactly our price</span>
          <span><span className="text-amber-400">“</span> Free as in beer, and we're buying</span>
          <span><span className="text-amber-400">“</span> Your wallet is safe with us</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column (2/3 on large) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Financial Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {financials.map((f, i) => (
              <FinCard key={i} {...f} />
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <MetricBox key={i} {...m} />
            ))}
          </div>

          {/* Task Summaries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {taskTeams.map((team, i) => (
              <TaskCard key={i} {...team} />
            ))}
          </div>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-[#181F28] border border-[#2A313C] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">📅 Upcoming Events</h3>
              <span className="text-xs bg-[#2A3A4A] px-3 py-1 rounded-full text-[#B0C4DD]">Free entry</span>
            </div>
            {events.map((e, i) => (
              <EventItem key={i} {...e} />
            ))}
          </div>

          {/* Meetings */}
          <div className="bg-[#181F28] border border-[#2A313C] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">🕒 Today's Meetings</h3>
              <span className="text-xs bg-[#2A3A4A] px-3 py-1 rounded-full text-[#B0C4DD]">0$ cost</span>
            </div>
            {meetings.map((m, i) => (
              <MeetingItem key={i} text={m} />
            ))}
            <div className="text-xs text-[#5F738C] mt-2">🤝 Recommended Addition: Free coffee for all</div>
          </div>

          {/* Deadlines */}
          <div className="bg-[#181F28] border border-[#2A313C] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">⏳ Deadlines</h3>
              <span className="text-xs bg-[#2A3A4A] px-3 py-1 rounded-full text-[#B0C4DD]">no late fees</span>
            </div>
            {deadlines.map((d, i) => (
              <DeadlineItem key={i} {...d} />
            ))}
            <div className="text-xs text-[#5F738C] mt-2">⏰ All extensions are $0 – just ask Mercury</div>
          </div>
        </div>
      </div>

      {/* Mercury AI + Free Agents + API Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

        {/* Mercury AI */}
        <div className="bg-[#0E1A26] border border-[#1F5B7A] rounded-2xl p-5 shadow-[0_0_30px_rgba(41,128,185,0.08)]">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={22} className="text-emerald-400" />
            <h3 className="font-semibold text-emerald-300">MERCURY AI ACTIVE</h3>
            <span className="ml-auto text-xs bg-[#1F4A3A] text-emerald-300 px-3 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle size={12} /> $0 / mo
            </span>
          </div>
          <div className="space-y-2">
            <div className="bg-[#13222F] border-l-4 border-red-400 rounded-lg p-3 text-sm">
              <AlertCircle size={16} className="inline mr-2 text-red-400" />
              <strong>Risk Alert:</strong> Supply chain dependency noted for component X
            </div>
            <div className="bg-[#13222F] border-l-4 border-emerald-400 rounded-lg p-3 text-sm">
              <TrendingUp size={16} className="inline mr-2 text-emerald-400" />
              <strong>Growth Opportunity:</strong> Market for product Y expanding in region Z
            </div>
            <div className="bg-[#13222F] border-l-4 border-amber-400 rounded-lg p-3 text-sm">
              <Lightbulb size={16} className="inline mr-2 text-amber-400" />
              <strong>Recommended Action:</strong> Review Q3 marketing spend allocation
            </div>
          </div>
          <div className="text-sm text-[#6F8AA8] mt-3 italic flex items-center gap-1">
            <span className="text-amber-400">“</span> I cost nothing, yet I give everything. – Mercury AI
          </div>
        </div>

        {/* Free Aid Agents */}
        <div className="bg-[#181F28] border border-[#2A313C] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <HandHeart size={18} className="text-emerald-400" />
              FREE AID AGENTS
            </h3>
            <span className="text-xs bg-emerald-700 text-white px-3 py-0.5 rounded-full">6 active · $0</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agents.map((a, i) => (
              <AgentCard key={i} {...a} />
            ))}
          </div>

          {/* Ask Bar */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={askInput}
              onChange={(e) => setAskInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask any agent anything (free, obviously)..."
              className="flex-1 bg-[#0D141C] border border-[#2A3A4A] rounded-full px-4 py-2 text-sm text-white placeholder:text-[#5F738C] focus:outline-none"
            />
            <button
              onClick={handleAsk}
              className="bg-[#1F5B7A] hover:bg-[#2A7AA0] text-white text-sm font-semibold px-5 rounded-full transition flex items-center gap-1"
            >
              <ArrowUpRight size={16} /> Ask
            </button>
          </div>
          <div className="text-sm text-[#B0C4DD] mt-2 min-h-6">{askResponse}</div>
        </div>
      </div>

      {/* Free AI API Models */}
      <div className="bg-[#181F28] border border-[#2A313C] rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CloudUpload size={18} className="text-amber-400" />
            FREE AI API MODELS
          </h3>
          <span className="text-xs bg-emerald-700 text-white px-3 py-0.5 rounded-full">5 models · $0</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {apiModels.map((model, idx) => (
            <ApiCard key={idx} model={model} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[#5F738C] border-t border-[#1F2A33] pt-6 mt-6">
        <span className="text-amber-400">“</span> Every feature, every API call, every agent – absolutely <strong className="text-emerald-400">$0</strong>. Forever. <span className="text-amber-400">”</span>
        <div className="text-xs text-[#4A5A6A] mt-1">Built with ❤️ and zero dollars.</div>
      </div>
    </div>
  );
}
