export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 py-16 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid sm:grid-cols-5 gap-8 mb-12">
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                B
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                Ballot Right
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              The modern way to make decisions together.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
              Product
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
              Company
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
              Legal
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Cookies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center">
            &copy; {new Date().getFullYear()} Ballot Right. All rights reserved.
            Made with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
