import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: <FaFacebook /> },
    { href: 'https://twitter.com', icon: <FaTwitter /> },
    { href: 'https://instagram.com', icon: <FaInstagram /> },
  ];

  return (
    <footer className="bg-[#151515] text-[#EEEEEE] py-8">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section 1: Logo and Contact Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo.jpg" alt="Logo" className="w-12 h-12" />
              <span className="ml-3 font-bold text-lg">WEEZ CAFE</span>
            </Link>
            <p className="text-sm">
              Contact us at:
              <br />
              <a
                href="tel:+1234567890"
                className="text-[#A91D3A] hover:text-[#C73659] transition-colors"
              >
                +123 456 7890
              </a>
            </p>
          </div>

          {/* Section 2: Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-[#C73659] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A91D3A] hover:text-[#C73659] transition-colors text-2xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-[#EEEEEE]/20 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} WEEZ CAFE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;