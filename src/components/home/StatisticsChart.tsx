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

// Sample data for chart
const chartData = [
  { name: 'Jan', experiences: 40 },
  { name: 'Feb', experiences: 55 },
  { name: 'Mar', experiences: 70 },
  { name: 'Apr', experiences: 90 },
  { name: 'May', experiences: 120 },
  { name: 'Jun', experiences: 150 },
  { name: 'Jul', experiences: 180 },
];

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

// Custom hook for counting animation
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

function StatCard({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp(stat.value, 2000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-[#E67E22]/10 text-[#E67E22] flex items-center justify-center">
        {stat.icon}
      </div>
      <div>
        <p className="text-sm text-[#9C908A]">{stat.label}</p>
        <p className="text-2xl font-bold text-[#3E2723]">
          {stat.value === 4.8 ? count.toFixed(1) : count}
          {stat.suffix}
        </p>
      </div>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section className="py-20 md:py-28 bg-[#FFF8F0]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-[#E67E22]/20 text-[#E67E22] text-xs font-bold tracking-[0.15em] uppercase mb-6 shadow-sm">
            Our Impact
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2723] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SavorSpot by the Numbers
          </h2>
          <p className="text-[#9C908A] text-lg max-w-xl mx-auto">
            We’re growing every day thanks to food lovers like you.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-[#3E2723] mb-6">
            Monthly Experiences
          </h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9C908A" />
                <YAxis stroke="#9C908A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  cursor={{ fill: '#E67E22', fillOpacity: 0.1 }}
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
