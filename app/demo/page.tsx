'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState<'idle' | 'animating' | 'complete'>('idle');
  const [showImpact, setShowImpact] = useState(false);

  const meteorData = {
    velocity: 20000,
    size: 50,
    angle: 45,
    mass: 1e8,
  };

  const impactEnergy = 0.5 * meteorData.mass * Math.pow(meteorData.velocity, 2);

  const getImpactLevel = (energy: number) => {
    if (energy < 1e12) return { level: 'Low Impact', color: 'text-green-400', icon: '🟢', precaution: 'Minor event, minimal ground impact.' };
    if (energy < 1e15) return { level: 'Medium Impact', color: 'text-orange-400', icon: '🟠', precaution: 'Potential local damage — seek shelter.' };
    return { level: 'High Impact', color: 'text-red-400', icon: '🔴', precaution: 'Severe global threat — initiate emergency protocols.' };
  };

  const impactInfo = getImpactLevel(impactEnergy);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState('animating');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationState === 'animating') {
      const impactTimer = setTimeout(() => {
        setShowImpact(true);
        setAnimationState('complete');
      }, 3000);

      return () => clearTimeout(impactTimer);
    }
  }, [animationState]);

  const handleReplay = () => {
    setAnimationState('idle');
    setShowImpact(false);
    setTimeout(() => setAnimationState('animating'), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-mono font-bold tracking-wider">
            <span className="text-blue-400">LUNAR DRIFT</span> – Meteor Demo
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors font-mono text-sm"
          >
            ← Back
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-mono font-bold mb-6 text-blue-400">Meteor Parameters</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400 font-mono">Velocity</span>
                    <span className="text-xl font-mono font-bold">{meteorData.velocity.toLocaleString()} m/s</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400 font-mono">Size</span>
                    <span className="text-xl font-mono font-bold">{meteorData.size} meters</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400 font-mono">Angle</span>
                    <span className="text-xl font-mono font-bold">{meteorData.angle}°</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400 font-mono">Mass</span>
                    <span className="text-xl font-mono font-bold">{meteorData.mass.toExponential(1)} kg</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400 font-mono">Impact Energy</span>
                    <span className="text-xl font-mono font-bold text-yellow-400">{impactEnergy.toExponential(2)} J</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {showImpact && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl"
                  >
                    <h2 className="text-2xl font-mono font-bold mb-4">Impact Assessment</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{impactInfo.icon}</span>
                        <span className={`text-2xl font-mono font-bold ${impactInfo.color}`}>
                          {impactInfo.level}
                        </span>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-400">
                        <p className="text-gray-300 font-mono text-sm leading-relaxed">
                          {impactInfo.precaution}
                        </p>
                      </div>
                      
                      <button
                        onClick={handleReplay}
                        className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-mono font-bold text-lg shadow-lg hover:shadow-blue-500/50"
                      >
                        🔄 Replay Simulation
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl" style={{ height: '600px' }}>
                <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-indigo-950/30 to-black">
                  <div className="absolute inset-0">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                          width: Math.random() * 2 + 1 + 'px',
                          height: Math.random() * 2 + 1 + 'px',
                          top: Math.random() * 100 + '%',
                          left: Math.random() * 100 + '%',
                          opacity: Math.random() * 0.7 + 0.3,
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full overflow-hidden shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-green-400 to-blue-600 opacity-80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
                  </div>

                  <AnimatePresence>
                    {animationState === 'animating' && (
                      <>
                        <motion.div
                          initial={{ x: -100, y: -100, opacity: 0 }}
                          animate={{ x: 250, y: 420, opacity: 1 }}
                          transition={{ duration: 3, ease: 'easeIn' }}
                          className="absolute w-12 h-12 rounded-full z-10"
                          style={{
                            background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, #ea580c 100%)',
                            boxShadow: '0 0 40px 20px rgba(251, 191, 36, 0.6), 0 0 80px 40px rgba(234, 88, 12, 0.3)',
                          }}
                        >
                          <motion.div
                            className="absolute -left-16 -top-2 w-16 h-16 rounded-full opacity-50"
                            style={{
                              background: 'radial-gradient(ellipse 100px 20px at 50% 50%, rgba(251, 191, 36, 0.6), transparent)',
                              filter: 'blur(8px)',
                            }}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
                          transition={{ duration: 0.8, delay: 2.9 }}
                          className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white z-20"
                          style={{ filter: 'blur(20px)' }}
                        />

                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 0.7, 0], scale: [0, 2, 3] }}
                          transition={{ duration: 1.2, delay: 2.9 }}
                          className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-orange-400 z-20"
                        />
                      </>
                    )}
                  </AnimatePresence>

                  {animationState === 'idle' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-6xl">☄️</div>
                        <p className="text-gray-400 font-mono">Initializing simulation...</p>
                      </div>
                    </div>
                  )}

                  {animationState === 'complete' && !showImpact && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="text-6xl mb-4">💥</div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}