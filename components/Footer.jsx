import React from 'react'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-20 px-6 pb-6 md:px-14 md:pt-0 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-white/10">
      <div className=" w-full mx-auto md:px-14 pt-8 max-sm:pt-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">EduSphere AI</h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              The modern platform for AI-powered exam preparation and personalized learning materials.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Dashboard</a></li>
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Create Course</a></li>
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">My Courses</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Community</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Stay Updated</h4>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest features and updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-slate-400 text-sm">
            © 2025 EduSphere-AI. Made with <span className="text-red-500">❤️</span> for learners. By Vivek Ranjan
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer