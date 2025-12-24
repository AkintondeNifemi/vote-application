import {
  ArrowRight,
  Globe,
  Users,
  BarChart3,
  Shield,
  TrendingUp,
  Heart,
} from "lucide-react";
import HeroSection from "@/components/landing/hero";
import Footer from "@/components/landing/footer";
import FeatureSection from "@/components/landing/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50/30 to-white dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900  overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <HeroSection />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 w-full overflow-x-hidden pt-5">
        <div className="grid grid-cols-3 gap-8 py-16 border-t border-b border-zinc-200 dark:border-zinc-700">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              100k+
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
              Active Users
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              5M+
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
              Votes Cast
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              99.9%
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
              Uptime SLA
            </p>
          </div>
        </div>

        <FeatureSection />

        <section id="process" className="py-5">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              → Process
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
              Three simple steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Create",
                desc: "Write your question and add options in seconds",
                icon: "✏️",
              },
              {
                num: "02",
                title: "Share",
                desc: "Invite participants via link, QR, or email",
                icon: "🔗",
              },
              {
                num: "03",
                title: "Analyze",
                desc: "Get instant results and export comprehensive reports",
                icon: "📊",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-8 text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <p className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-4 opacity-20">
                    {step.num}
                  </p>
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-4 transform -translate-y-1/2 text-zinc-300 dark:text-zinc-700">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="py-5">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              → Support
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
              Frequently asked questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Is voting truly anonymous?",
                a: "Yes. We separate voter identity from vote data using industry-standard encryption. Only aggregate results are visible.",
              },
              {
                q: "Can I edit results after voting closes?",
                a: "No. Once a poll closes, results are locked and immutable. You can view historical data anytime.",
              },
              {
                q: "What happens to my data?",
                a: "Your data is encrypted end-to-end and stored securely. We never sell or share your information with third parties.",
              },
              {
                q: "Does Votely work offline?",
                a: "Polls must be created and voted on with an internet connection, but results sync automatically once reconnected.",
              },
              {
                q: "How many people can vote?",
                a: "Starter plan supports 100 voters, Pro supports 10k, and Enterprise supports unlimited participants.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition cursor-pointer"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="text-lg">{item.q}</span>
                  <span className="text-2xl cursor-pointer text-blue-600 dark:text-blue-400 group-open:rotate-45 transition shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-700 dark:border-blue-600 bg-linear-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-700 px-6 sm:px-12 py-20 text-center text-white mb-20 mx-auto max-w-6xl">
          <h2 className="text-5xl sm:text-6xl font-black mb-4">
            Ready to decide better?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams making faster, smarter decisions with
            Votely.
          </p>
          <button className="rounded-lg bg-white dark:bg-zinc-100 text-blue-600 dark:text-blue-600 px-10 py-4 text-lg font-bold hover:bg-blue-50 dark:hover:bg-white transition shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            Start Free Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-100 dark:text-blue-200 text-sm mt-6">
            No credit card required. Start with 100 voters free.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
