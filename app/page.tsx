"use client";

import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Deep space background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black">
        {/* Nebula clouds */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-[120px] animate-pulse" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500 rounded-full opacity-15 blur-[100px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full opacity-10 blur-[90px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 rounded-full opacity-15 blur-[110px] animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '6s' }} />
        </div>

        {/* Star field - multiple layers for depth */}
        <div className="absolute inset-0">
          {/* Distant stars - tiny and slow */}
          {[...Array(150)].map((_, i) => (
            <div
              key={`star-tiny-${i}`}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
          
          {/* Close stars - larger and brighter */}
          {[...Array(60)].map((_, i) => (
            <div
              key={`star-close-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: ['#ffffff', '#a5f3fc', '#e0e7ff', '#fae8ff'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: '0 0 4px rgba(255,255,255,0.8)',
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                animation: `shooting-star ${3 + Math.random() * 2}s linear infinite`,
                animationDelay: `${i * 4}s`,
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.8)',
              }}
            />
          ))}
        </div>

        {/* Floating asteroids/particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`asteroid-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-gray-400 to-gray-600 opacity-40"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Cosmic dust */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute bg-blue-200 rounded-full"
              style={{
                width: '1px',
                height: '1px',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `dust-float ${20 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        {/* Planet in background */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 opacity-40 blur-sm" 
             style={{ boxShadow: '0 0 100px rgba(99, 102, 241, 0.3)' }} />
        
        {/* Moon */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 opacity-60" 
             style={{ boxShadow: '0 0 40px rgba(229, 231, 235, 0.4), inset -10px -10px 20px rgba(0,0,0,0.3)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title with enhanced glow */}
          <div className="relative inline-block mb-8">
            <h1 className="relative text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent"
                style={{ 
                  textShadow: '0 0 80px rgba(34, 211, 238, 0.5)',
                  animation: 'title-glow 3s ease-in-out infinite'
                }}>
              Lunar Drift
            </h1>
            {/* Orbiting particles around title */}
            <div className="absolute -inset-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    animation: `orbit ${4 + i}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    transformOrigin: 'center',
                    top: '50%',
                    left: '50%',
                  }}
                />
              ))}
            </div>
          </div>

          <p className="text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed" 
             style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            Explore NASA's comprehensive database of meteorite landings across Earth. 
            Discover patterns, visualize impact sites, and gain insights into cosmic visitors.
          </p>

          {/* Demo Button - NEW */}
          <div className="mb-16">
            <Link 
              href="/demo"
              className="group relative inline-block"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              
              {/* Rotating rings */}
              <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 border-2 border-orange-400/40 rounded-2xl animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 border-2 border-red-400/30 rounded-2xl animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
              </div>

              {/* Button content */}
              <div className="relative px-12 py-6 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl font-bold text-2xl text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl flex items-center gap-4"
                   style={{ boxShadow: '0 0 40px rgba(234, 88, 12, 0.6)' }}>
                {/* Meteor icon with animation */}
                <span className="text-4xl group-hover:animate-bounce">☄️</span>
                <span className="tracking-wide">Launch Meteor Threat Demo</span>
                <span className="text-4xl transform group-hover:translate-x-2 transition-transform duration-300">🚀</span>
              </div>

              {/* Sparkle effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `sparkle ${1 + Math.random()}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </Link>
          </div>
          
          {/* Feature cards with enhanced effects */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 mb-20">
            <Link 
              href="/map" 
              className="group relative bg-black/50 backdrop-blur-md border-2 border-teal-500/50 rounded-2xl p-10 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:border-teal-400"
              style={{
                boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)',
              }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Orbiting rings */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-2 border border-teal-400/30 rounded-2xl animate-spin" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-4 border border-cyan-400/20 rounded-2xl animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              </div>

              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12">🗺️</div>
                <h2 className="text-3xl font-bold text-teal-400 mb-4 group-hover:text-teal-300 transition-colors">Interactive Map</h2>
                <p className="text-gray-200 text-lg">
                  Explore meteorite landing sites on an interactive global map
                </p>
              </div>
            </Link>

            <Link 
              href="/charts" 
              className="group relative bg-black/50 backdrop-blur-md border-2 border-cyan-500/50 rounded-2xl p-10 transition-all duration-500 hover:scale-110 hover:-rotate-1 hover:border-cyan-400"
              style={{
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-2 border border-cyan-400/30 rounded-2xl animate-spin" style={{ animationDuration: '5s' }} />
                <div className="absolute inset-4 border border-blue-400/20 rounded-2xl animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
              </div>

              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500 group-hover:-rotate-12">📊</div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">Data Charts</h2>
                <p className="text-gray-200 text-lg">
                  Visualize meteorite data with interactive charts and statistics
                </p>
              </div>
            </Link>

            <Link 
              href="/insights" 
              className="group relative bg-black/50 backdrop-blur-md border-2 border-purple-500/50 rounded-2xl p-10 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:border-purple-400"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-2 border border-purple-400/30 rounded-2xl animate-spin" style={{ animationDuration: '4.5s' }} />
                <div className="absolute inset-4 border border-pink-400/20 rounded-2xl animate-spin" style={{ animationDuration: '6.5s', animationDirection: 'reverse' }} />
              </div>

              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12">🤖</div>
                <h2 className="text-3xl font-bold text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">AI Insights</h2>
                <p className="text-gray-200 text-lg">
                  Ask AI questions about meteorite patterns and trends
                </p>
              </div>
            </Link>
          </div>

          {/* About section with cosmic effects */}
          <div className="relative mt-24 bg-black/60 backdrop-blur-lg border-2 border-teal-500/40 rounded-3xl p-12 overflow-hidden"
               style={{ boxShadow: '0 0 60px rgba(20, 184, 166, 0.2)' }}>
            {/* Animated particles in background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={`about-particle-${i}`}
                  className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-40"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">
                About the Data
              </h3>
              <p className="text-gray-100 leading-relaxed text-xl max-w-3xl mx-auto">
                This application uses NASA's meteorite landing dataset, which contains information 
                about meteorites that have fallen to Earth and been recovered. The database includes 
                location, mass, composition, and year of discovery for thousands of specimens.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes dust-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(250px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(250px) rotate(-360deg);
          }
        }

        @keyframes title-glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.4));
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}