import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Video as VideoIconLucide, MessageSquare, Calendar as CalendarIcon } from "lucide-react";
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const DashboardStats = ({ videosCount, pendingReviewsCount, upcomingDeadlinesCount }) => {
  const stats = [
    {
      title: 'Total Videos',
      value: videosCount,
      icon: <VideoIconLucide className="h-4 w-4 text-muted-foreground" />,
      link: '/dashboard/videos',
      linkText: 'View all videos',
      delay: 0.1,
    },
    {
      title: 'Pending Reviews',
      value: pendingReviewsCount,
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
      linkText: 'Awaiting your feedback',
      delay: 0.2,
    },
    {
      title: 'Upcoming Deadlines',
      value: upcomingDeadlinesCount,
      icon: <CalendarIcon className="h-4 w-4 text-muted-foreground" />,
      link: '/dashboard/calendar',
      linkText: 'View calendar',
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <MotionCard
          key={stat.title}
          className="bg-card border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: stat.delay }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            {stat.link ? (
              <Link to={stat.link} className="text-xs text-muted-foreground hover:text-white transition-colors">
                {stat.linkText}
              </Link>
            ) : (
              <p className="text-xs text-muted-foreground">{stat.linkText}</p>
            )}
          </CardContent>
        </MotionCard>
      ))}
    </div>
  );
};

export default DashboardStats;