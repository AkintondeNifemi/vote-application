import {
  Globe,
  Users,
  BarChart3,
  Shield,
  TrendingUp,
  Heart,
} from "lucide-react";
export default function FeatureSection() {
  return (
    <section id="features" className="py-5">
      <div className="text-center mb-20">
        <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
          → Features
        </span>
        <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
          Everything you need
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Powerful, intuitive tools built for teams that value clarity and trust
          in their decision-making process.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: TrendingUp,
            title: "Real-time Analytics",
            description:
              "Watch votes update live with beautiful, interactive charts and detailed breakdowns",
          },
          {
            icon: Shield,
            title: "Bank-level Security",
            description:
              "Enterprise-grade encryption ensures every vote stays private and authentic",
          },
          {
            icon: Users,
            title: "Easy Collaboration",
            description:
              "Share polls instantly via link, QR code, or email to get responses fast",
          },
          {
            icon: BarChart3,
            title: "Advanced Insights",
            description:
              "Export detailed reports and understand voting patterns with smart analytics",
          },
          {
            icon: Globe,
            title: "Mobile First",
            description:
              "Responsive design works perfectly on desktop, tablet, and smartphone",
          },
          {
            icon: Heart,
            title: "User Friendly",
            description:
              "Intuitive interface that anyone can use with zero learning curve",
          },
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-7 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition group"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300 group-hover:text-white transition" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
