import { STAT_METRICS } from '../data';
import { 
  Briefcase, 
  Building2, 
  TrendingUp, 
  Store, 
  Users, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const ImpactMetrics = () => {
  const getMetricIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'experience':
        return <Briefcase className="w-4 h-4 text-[#9C7A4A]" />;
      case 'specialization':
        return <Building2 className="w-4 h-4 text-[#9C7A4A]" />;
      case 'performance':
        return <TrendingUp className="w-4 h-4 text-[#9C7A4A]" />;
      case 'operations':
        return <Store className="w-4 h-4 text-[#9C7A4A]" />;
      case 'network':
        return <Users className="w-4 h-4 text-[#9C7A4A]" />;
      case 'culture':
        return <ShieldCheck className="w-4 h-4 text-[#9C7A4A]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#9C7A4A]" />;
    }
  };

  return (
    <section id="metrics" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#9C7A4A]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9C7A4A]/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] border border-[#DCD1BF] text-xs font-semibold text-[#8C6D3F] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quantified Track Record</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E232A] mb-4">
            Two Decades in Numbers
          </h2>
          <p className="text-[#554C40] text-base sm:text-lg leading-relaxed font-normal">
            Every initiative is anchored in commercial outcomes and human excellence — from frontline leadership to high-producing real estate advisory desks.
          </p>
        </div>

        {/* 6 Key Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAT_METRICS.map((stat, idx) => (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              className="group relative bg-white border border-[#E3D9CC] hover:border-[#BFA88D] rounded-2xl p-7 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between -translate-y-0 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle top accent highlight bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#9C7A4A] transition-colors duration-300" />

              <div>
                {/* Header row inside card */}
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2 bg-[#F8F4EE] border border-[#E8DFD1] px-3 py-1.5 rounded-lg group-hover:bg-[#FAF6F0] transition-colors">
                    {getMetricIcon(stat.category)}
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D3F]">
                      {stat.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-medium text-[#A69784] group-hover:text-[#9C7A4A] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Stat Display Number */}
                <div className="font-editorial text-5xl sm:text-6xl font-bold text-[#1E232A] group-hover:text-[#9C7A4A] transition-colors tracking-tight mb-2">
                  {stat.value}
                </div>

                {/* Metric Title */}
                <h3 className="font-editorial text-xl font-semibold text-[#1E232A] mb-1.5 leading-snug">
                  {stat.label}
                </h3>
              </div>

              {/* Subtext and context note */}
              <div className="mt-6 pt-4 border-t border-[#EFE8DC] flex items-start gap-2.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9C7A4A] shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                <p className="text-xs text-[#6B5F4F] leading-relaxed font-normal">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

