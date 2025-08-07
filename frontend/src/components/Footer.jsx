import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // 3. Changed background from gray-800 to slate-900
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">SAGI RAMA KRISHNAM RAJU ENGIEERING COLLEGE</h3>
            <p className="text-slate-400">Bhimavaram, Andhra Pradesh</p>
          </div>

          <div className="flex space-x-6">
            <a 
              href="mailto:info@svecw.edu.in" 
              className="text-slate-400 hover:text-white transition duration-300"
              aria-label="Email"
            >
              <FaEnvelope size={24} />
            </a>
            <a 
              href="https://www.instagram.com/svecw_bvr/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/school/svecw/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>&copy; {currentYear} SRKREC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;