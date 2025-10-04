"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/map', label: 'Map', icon: '🗺️' },
    { href: '/charts', label: 'Charts', icon: '📊' },
    { href: '/insights', label: 'Insights', icon: '🤖' },
  ]

  return (
    <nav className="relative bg-black/40 backdrop-blur-xl border-b border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`nav-particle-${i}`}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle nebula glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo with glow effect */}
          <Link 
            href="/" 
            className="group relative text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-cyan-300 hover:via-teal-300 hover:to-cyan-300 transition-all duration-300"
            style={{ textShadow: '0 0 30px rgba(20, 184, 166, 0.5)' }}
          >
            <span className="relative inline-block">
              Lunar Drift
              {/* Orbiting particle */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping" />
              </div>
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    group relative px-6 py-2 rounded-lg font-medium
                    transition-all duration-300 overflow-hidden
                    ${isActive 
                      ? 'text-teal-400 bg-teal-500/10' 
                      : 'text-gray-300 hover:text-teal-400'
                    }
                  `}
                >
                  {/* Glowing border effect on hover */}
                  <div className={`
                    absolute inset-0 rounded-lg border transition-all duration-300
                    ${isActive 
                      ? 'border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)]' 
                      : 'border-transparent group-hover:border-teal-500/30 group-hover:shadow-[0_0_10px_rgba(20,184,166,0.2)]'
                    }
                  `} />
                  
                  {/* Animated gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <span className="relative flex items-center space-x-2">
                    <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </span>

                  {/* Active indicator - glowing dot */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full">
                      <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping" />
                    </div>
                  )}

                  {/* Shooting star effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full animate-[shooting-nav_2s_ease-in-out_infinite]" 
                         style={{ animationDelay: '0.5s' }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes shooting-nav {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(200px, 40px);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  )
}