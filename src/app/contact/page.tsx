"use client";
import { Toaster } from "react-hot-toast";
import { ContactForm } from "../components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-teal-900/20 dark:to-blue-900/20 py-12 md:py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-200/10 dark:bg-teal-800/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-200/10 dark:bg-blue-800/10 blur-3xl"></div>
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              color: "#94a3b8",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Contact Me
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities?
            I&apos;d love to hear from you!
          </p>
        </div>

        {/* Contact methods cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="text-teal-600 dark:text-teal-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Email
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              codeswithrakib@gmail.com
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mx-auto mb-4">
              <Phone className="text-cyan-600 dark:text-cyan-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Phone
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              +880 176 7476 724
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Location
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Dinajpur, Bangladesh
            </p>
          </div>
        </div>

        {/* Contact form container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-500 dark:to-blue-600">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Process section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-50/50 to-blue-50/50 dark:from-teal-900/30 dark:to-blue-900/30 rounded-2xl p-8 border border-teal-100/50 dark:border-teal-900/30">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              What Happens Next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    1
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  I&apos;ll Review Your Message
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  I&apos;ll carefully read your message and understand your
                  requirements.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                    2
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  I&apos;ll Get Back to You
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  I&apos;ll respond within 24-48 hours with my thoughts and next
                  steps.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    3
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Let&apos;s Collaborate
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  We&apos;ll schedule a meeting to discuss your project in
                  detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}
