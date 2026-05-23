import React from 'react';
import { Link } from 'react-router-dom';
import { useSession, logout } from 'modelence/client';
import { Star, Calendar, Home, Hash, Flame, LogOut, BookOpen, Moon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const features = [
  {
    title: 'Birth Chart',
    description: 'Vedic astrology chart with planetary positions',
    icon: Star,
    href: '/chart',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Yearly Predictions',
    description: 'AI insights, 12 months, life areas & remedies',
    icon: Calendar,
    href: '/yearly-predictions',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    badge: 'NEW',
  },
  {
    title: 'AstroVastu',
    description: 'Personalized Vastu analysis based on your chart',
    icon: Home,
    href: '/astro-vastu',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'Numerology',
    description: 'Vedic & Cheiro numerology analysis',
    icon: Hash,
    href: '/numerology',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    title: 'Master Numerology',
    description: 'Mobile, vehicle, house & more',
    icon: Hash,
    href: '/master-numerology',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Tantric Remedies',
    description: 'Mantras, yantras & rituals',
    icon: Flame,
    href: '/tantric-remedies',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
    badge: 'POWERFUL',
  },
  {
    title: 'Vastu Remedies',
    description: 'Complete Vastu encyclopedia',
    icon: BookOpen,
    href: '/vastu-remedies',
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
  },
  {
    title: 'Panchanga',
    description: 'Daily Vedic almanac & muhurtha',
    icon: Moon,
    href: '/panchanga',
    gradient: 'from-orange-500 to-amber-600',
  },
];

export default function DashboardPage() {
  const { user } = useSession();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">AstroInsight</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.firstName || user?.handle}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-1">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="text-muted-foreground">
            Explore your cosmic insights and Vedic wisdom
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} to={feature.href}>
                <Card className="hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {feature.badge && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription className="text-xs">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-xs text-primary hover:underline">Explore &rarr;</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
