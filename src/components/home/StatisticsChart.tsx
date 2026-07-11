'use client';

import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Users, UtensilsCrossed, Star, Award } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

/* -------------------------------------------------- */
/*  Sample chart data                                 */
/* -------------------------------------------------- */
const chartData = [
  { name: 'Jan', experiences: 40 },
  { name: 'Feb', experiences: 55 },
  { name: 'Mar', experiences: 70 },
  { name: 'Apr', experiences: 90 },
  { name: 'May', experiences: 120 },
  { name: 'Jun', experiences: 150 },
  { name: 'Jul', experiences: 180 },
];

/* -------------------------------------------------- */
/*  Stat item type                                    */
/* -------------------------------------------------- */
interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
}

const stats: StatItem[] = [
  {
    icon: <UtensilsCrossed className="w-6 h-6" />,
    label: 'Total Experiences',
    value: 345,
    suffix: '+',
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Happy Foodies',
    value: 2150,
    suffix: '+',
  },
  {
    icon: <Star className="w-6 h-6" />,
    label: 'Average Rating',
    value: 4.8,
    suffix: '',
  },
  {
    icon: <Award className="w-6 h-6" />,
    label: 'Local Hosts',
    value: 85,
    suffix: '+',
  },
];

/* -------------------------------------------------- */
/*  Count-up animation hook                           */
/* -------------------------------------------------- */
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, end, duration, start]);

  return { count, ref };
}

/* -------------------------------------------------- */
/*  Stat Card (dark version)                          */
/* -------------------------------------------------- */
function StatCard({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp(stat.value, 2000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:bg-white/15 transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-[#E67E22]/20 text-[#E67E22] flex items-center justify-center">
        {stat.icon}
      </div>
      <div>
        <p className="text-sm text-white/70">{stat.label}</p>
        <p className="text-2xl font-bold text-white">
          {stat.value === 4.8 ? count.toFixed(1) : count}
          {stat.suffix}
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Main Statistics Section                           */
/* -------------------------------------------------- */
export default function Statistics() {
  return (
    <section className="py-20 md:py-28 bg-[#3B2F2F] relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E67E22]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-[#E67E22]/20 text-[#E67E22] text-xs font-bold tracking-[0.15em] uppercase mb-6">
            Our Impact
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SavorSpot by the Numbers
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            We’re growing every day thanks to food lovers like you.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Monthly Experiences
          </h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#3B2F2F',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.75rem',
                    color: '#FFF',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                  cursor={{ fill: '#E67E22', fillOpacity: 0.15 }}
                  labelStyle={{ color: '#FFF' }}
                />
                <Bar
                  dataKey="experiences"
                  fill="#E67E22"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
