
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";


export const metadata = {
  title: "Page Not Found",
  description: "Sorry, this page does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-green-100 dark:border-green-900/30 transition-all hover:shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center shadow-sm">
                <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  404
                </span>
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Search className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-700 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 font-medium rounded-lg transition-all hover:bg-green-50 dark:hover:bg-green-900/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-5 h-5" />
        <Link href={'/'}>      Go Back</Link>
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Looking for something specific? Try searching or browsing from the homepage.
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Need help? <a href="#" className="text-green-600 hover:text-green-700 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}