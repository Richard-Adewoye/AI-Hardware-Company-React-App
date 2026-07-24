import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  QrCode,
  Sparkles,
  Star,
  UserPlus,
  Send,
  ExternalLink,
  Shield,
  Layers,
  Cpu,
  ArrowRight,
  Heart,
  MessageSquare,
  Search
} from 'lucide-react';
import { Company, Project, PromptTemplate, Review } from '../types';

interface ModalsProps {
  activeModal: string | null;
  onClose: () => void;
  companies: Company[];
  projects: Project[];
  prompts: PromptTemplate[];
  reviews: Review[];
  selectedCompany: Company;
  selectedProject: Project | null;
  onSelectCompany: (company: Company) => void;
  onAddReview: (review: Review) => void;
  isDarkMode?: boolean;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  companies,
  projects,
  prompts,
  reviews,
  selectedCompany,
  selectedProject,
  onSelectCompany,
  onAddReview,
  isDarkMode = false,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [promptCategoryFilter, setPromptCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCompany, setNewReviewCompany] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  if (!activeModal) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      role: 'Technology Partner',
      company: newReviewCompany || 'Innovative Labs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'Just now',
    };

    onAddReview(newRev);
    setNewReviewAuthor('');
    setNewReviewCompany('');
    setNewReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col border transition-colors ${
          isDarkMode
            ? 'bg-slate-900 border-cyan-500/40 text-slate-100 shadow-[0_0_40px_rgba(6,182,212,0.25)]'
            : 'bg-white border-neutral-200 shadow-2xl text-neutral-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-neutral-50/80 border-neutral-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-cyan-400 animate-ping' : 'bg-neutral-900'}`} />
            <h2 className={`text-base font-bold capitalize ${isDarkMode ? 'text-cyan-300' : 'text-neutral-900'}`}>
              {activeModal === 'all-companies' && 'AI Companies Directory'}
              {activeModal === 'portfolio' && 'Featured AI & 3D Portfolio'}
              {activeModal === 'download-app' && 'Download Aempore Mobile App'}
              {activeModal === 'reviews' && 'Partner Reviews & Testimonials'}
              {activeModal === 'invite' && 'Invite Friends & Colleagues'}
              {activeModal === 'prompts' && 'AI Prompt Engineering Templates'}
              {activeModal === 'ecosystem' && 'Ecosystem & Technical Support'}
              {activeModal === 'join' && 'Join Aempore Early Access Waitlist'}
              {activeModal === 'project-detail' && selectedProject?.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDarkMode
                ? 'hover:bg-slate-800 text-slate-400 hover:text-cyan-300'
                : 'hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* 1. All Companies Directory Modal */}
          {activeModal === 'all-companies' && (
            <div className="space-y-4">
              <p className="text-neutral-500">
                Explore leading AI hardware and neural software research labs in our ecosystem.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companies.map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => {
                      onSelectCompany(comp);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      comp.id === selectedCompany.id
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{comp.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          comp.id === selectedCompany.id
                            ? 'bg-neutral-800 text-neutral-300'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {comp.category}
                      </span>
                    </div>

                    <p
                      className={`text-[11px] leading-relaxed mb-3 line-clamp-2 ${
                        comp.id === selectedCompany.id ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {comp.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={
                          comp.id === selectedCompany.id ? 'text-emerald-400' : 'text-emerald-600 font-semibold'
                        }
                      >
                        {comp.completedProjects} Projects
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Portfolio Showcase Modal */}
          {activeModal === 'portfolio' && (
            <div className="space-y-4">
              <p className="text-neutral-500">
                Aempore AI's flagship portfolio of 3D machineries, spatial optical tracking, and neural models.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-2xl border border-neutral-200 bg-neutral-50 hover:bg-white transition-all space-y-2 group"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-bold text-[10px]">
                        {proj.number}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900">{proj.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 font-semibold">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-neutral-500 text-[11px] line-clamp-2">{proj.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[9px] font-medium text-neutral-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Download App Modal */}
          {activeModal === 'download-app' && (
            <div className="flex flex-col items-center text-center space-y-5 py-4">
              <div className="p-4 rounded-3xl bg-neutral-900 text-white shadow-xl">
                <QrCode className="w-28 h-28" />
              </div>

              <div className="space-y-1 max-w-sm">
                <h3 className="text-lg font-black text-neutral-900">Scan to Install Aempore Studio</h3>
                <p className="text-neutral-500 text-xs">
                  Access real-time telemetry, remote 3D machine controls, and prompt suites directly on iOS and Android.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopy('app-link', 'https://aemporeai.io/app')}
                  className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-800 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === 'app-link' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiedId === 'app-link' ? 'Link Copied!' : 'Copy Direct Link'}
                </button>
              </div>
            </div>
          )}

          {/* 4. See Reviews Modal */}
          {activeModal === 'reviews' && (
            <div className="space-y-6">
              {/* Existing Reviews List */}
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-neutral-900">{rev.author}</div>
                          <div className="text-[10px] text-neutral-500">
                            {rev.role} • {rev.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>

              {/* Submit Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-neutral-100/80 border border-neutral-200 space-y-3">
                <h4 className="font-bold text-neutral-900">Leave a Partner Testimonial</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company / Agency"
                    value={newReviewCompany}
                    onChange={(e) => setNewReviewCompany(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <textarea
                  placeholder="Share your experience working with Aempore AI..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 h-20 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors"
                >
                  Post Review
                </button>
              </form>
            </div>
          )}

          {/* 5. Invite Friends Modal */}
          {activeModal === 'invite' && (
            <div className="space-y-4">
              <p className="text-neutral-500">
                Invite your engineering team and collaborators to access Aempore AI's 3D workspace.
              </p>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <label className="font-bold text-neutral-800 block">Your Exclusive Referral Link</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://aemporeai.io/invite?ref=AEMPORE-2023"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 font-mono text-xs"
                  />
                  <button
                    onClick={() => handleCopy('invite-link', 'https://aemporeai.io/invite?ref=AEMPORE-2023')}
                    className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
                  >
                    {copiedId === 'invite-link' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedId === 'invite-link' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. List of Prompts Modal */}
          {activeModal === 'prompts' && (
            <div className="space-y-4">
              <p className="text-neutral-500">
                Curated prompt templates for 3D glass rendering, optical classification, and behavior clusters.
              </p>

              <div className="space-y-3">
                {prompts.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{p.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700">
                        {p.category}
                      </span>
                    </div>
                    <p className="p-2.5 rounded-xl bg-white border border-neutral-200 font-mono text-[11px] text-neutral-700 leading-relaxed">
                      {p.promptText}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-neutral-400">{p.copiesCount} engineers copied</span>
                      <button
                        onClick={() => handleCopy(p.id, p.promptText)}
                        className="px-3 py-1 rounded-full bg-neutral-900 text-white font-semibold flex items-center gap-1 hover:bg-neutral-800 transition-colors"
                      >
                        {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === p.id ? 'Copied' : 'Copy Prompt'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Ecosystem & Support Modal */}
          {activeModal === 'ecosystem' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    API Status: 100% Operational
                  </div>
                  <p className="text-[11px] text-emerald-800">Latency: 12ms across European regions.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="font-bold text-neutral-900">SDK Version</div>
                  <p className="text-[11px] text-neutral-500">v2.4.1 (Rust & Node.js Edge bindings)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <h4 className="font-bold text-neutral-900">Strategic Partners</h4>
                <p className="text-neutral-500 leading-relaxed">
                  Qclay Agency • OpenAI Enterprise • Nvidia Inception • Zurich Robotics Guild
                </p>
              </div>
            </div>
          )}

          {/* 8. Join Waitlist Modal */}
          {activeModal === 'join' && (
            <div className="space-y-4">
              {waitlistSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold">
                    ✓
                  </div>
                  <h3 className="font-bold text-emerald-900 text-base">You're on the early access list!</h3>
                  <p className="text-emerald-700 text-xs">
                    We'll notify you as soon as our next batch of 3D kinetic units and API keys are dispatched.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (emailInput) setWaitlistSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <p className="text-neutral-500">
                    Get priority access to Aempore AI's next-generation 3D machinery telemetry APIs.
                  </p>

                  <input
                    type="email"
                    placeholder="Enter your work email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Submit Early Access Request
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 9. Project Detail Modal */}
          {activeModal === 'project-detail' && selectedProject && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-neutral-900">{selectedProject.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 font-semibold text-[11px]">
                    {selectedProject.status}
                  </span>
                </div>

                <p className="text-neutral-600 leading-relaxed text-xs">{selectedProject.description}</p>
              </div>

              <div className="space-y-1 pt-2">
                <span className="font-bold text-neutral-800 block">Tech Stack & Frameworks</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
