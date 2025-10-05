'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Users, Building2, Wind, Shield } from 'lucide-react';

export default function DemoPage() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState<'idle' | 'animating' | 'complete'>('idle');
  const [showImpact, setShowImpact] = useState(false);
  const [showTrajectory, setShowTrajectory] = useState(false);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(-1);

  const meteorData = {
    velocity: 20000,
    size: 50,
    angle: 45,
    mass: 1e8,
    name: 'Apophis-2026',
    discovered: '2022-03-15',
    impactConfirmed: '2023-08-20',
    predictedImpact: '2026-04-13',
    probability: 95,
  };

  const impactEnergy = 0.5 * meteorData.mass * Math.pow(meteorData.velocity, 2);

  const getImpactLevel = (energy: number) => {
    if (energy < 1e12) return { level: 'Low Impact', color: 'text-green-400', icon: '🟢', precaution: 'Minor event, minimal ground impact.' };
    if (energy < 1e15) return { level: 'Medium Impact', color: 'text-orange-400', icon: '🟠', precaution: 'Potential local damage — seek shelter.' };
    return { level: 'High Impact', color: 'text-red-400', icon: '🔴', precaution: 'Severe global threat — initiate emergency protocols.' };
  };

  const getCivilianImpact = (energy: number) => {
    if (energy < 1e12) {
      return {
        radius: '1-5 km',
        casualties: 'Minimal (0-100)',
        infrastructure: 'Minor structural damage to buildings',
        environments: 'Localized crater, dust cloud'
      };
    }
    if (energy < 1e15) {
      return {
        radius: '50-200 km',
        casualties: 'Moderate to High (1,000-100,000)',
        infrastructure: 'Severe damage to urban areas, collapsed buildings',
        environments: 'Regional fires, widespread debris'
      };
    }
    return {
      radius: '500+ km (Global)',
      casualties: 'Catastrophic (Millions)',
      infrastructure: 'Complete destruction in impact zone',
      environments: 'Global climate disruption, mass extinction potential'
    };
  };

  const getSafetyProtocols = (energy: number) => {
    if (energy < 1e12) {
      return [
        'Monitor local news and emergency broadcasts',
        'Stay indoors away from windows during impact',
        'Prepare basic emergency supplies (water, food, first aid)',
        'Keep charged mobile devices for communication'
      ];
    }
    if (energy < 1e15) {
      return [
        'Evacuate impact zone immediately if possible',
        'Seek underground shelter or reinforced structures',
        'Stock 72-hour emergency supplies (food, water, medicine)',
        'Protect airways from dust and debris with masks',
        'Stay away from coastal areas (potential tsunamis)',
        'Follow official evacuation routes and instructions'
      ];
    }
    return [
      '🚨 CRITICAL: Initiate mass evacuation protocols',
      'Seek deep underground bunkers if available',
      'Stock minimum 2-week supplies in sealed containers',
      'Prepare for extended power and communication outages',
      'Protect against radiation and extreme temperature changes',
      'Follow government emergency broadcast instructions',
      'Anticipate long-term environmental changes'
    ];
  };

  const getImpactReasons = (energy: number) => {
    const commonReasons = [
      {
        title: 'Gravitational Perturbations',
        description: 'Jupiter\'s massive gravitational field altered the meteor\'s trajectory during its orbital path, redirecting it toward Earth\'s orbit.',
        icon: '🪐'
      },
      {
        title: 'Orbital Resonance',
        description: 'The meteor entered a 3:2 orbital resonance with Earth, meaning its orbital period became synchronized in a way that increased collision probability.',
        icon: '🔄'
      },
      {
        title: 'Yarkovsky Effect',
        description: 'Uneven heating from solar radiation caused asymmetric thermal emissions, creating a small thrust that gradually shifted the meteor\'s orbit over years.',
        icon: '☀️'
      }
    ];

    if (energy >= 1e15) {
      return [
        ...commonReasons,
        {
          title: 'Late Detection',
          description: 'The meteor approached from the direction of the Sun, making optical detection difficult until it was already on a collision course.',
          icon: '🔭'
        },
        {
          title: 'High Velocity Approach',
          description: 'Extremely high approach velocity (20 km/s) left insufficient time for deflection missions despite early warning systems.',
          icon: '⚡'
        }
      ];
    }

    return commonReasons;
  };

  const detectionTimeline = [
    {
      date: meteorData.discovered,
      year: '2022',
      title: 'Initial Detection',
      description: 'Meteor first detected by Pan-STARRS telescope in Hawaii during routine near-Earth object survey.',
      status: 'discovered',
      probability: '0.01%',
      icon: '🔭'
    },
    {
      date: '2022-06-10',
      year: '2022',
      title: 'Preliminary Orbit',
      description: 'Initial trajectory analysis completed. Object classified as Potentially Hazardous Asteroid (PHA).',
      status: 'tracking',
      probability: '0.1%',
      icon: '📊'
    },
    {
      date: '2023-01-18',
      year: '2023',
      title: 'Refined Observations',
      description: 'Multiple observatories worldwide tracked the object. Collision probability increased significantly.',
      status: 'alert',
      probability: '12%',
      icon: '⚠️'
    },
    {
      date: meteorData.impactConfirmed,
      year: '2023',
      title: 'Impact Confirmed',
      description: 'NASA and ESA confirm high-probability Earth impact. International emergency protocols activated.',
      status: 'critical',
      probability: '78%',
      icon: '🚨'
    },
    {
      date: '2024-03-05',
      year: '2024',
      title: 'Deflection Attempt',
      description: 'DART-style kinetic impactor mission launched. Partial success but insufficient to prevent collision.',
      status: 'action',
      probability: '68%',
      icon: '🚀'
    },
    {
      date: '2025-09-22',
      year: '2025',
      title: 'Trajectory Locked',
      description: 'Impact trajectory fully determined. Predicted impact location calculated with high precision.',
      status: 'imminent',
      probability: '92%',
      icon: '🎯'
    },
    {
      date: meteorData.predictedImpact,
      year: '2026',
      title: 'Predicted Impact',
      description: 'Calculated impact date. Global emergency response systems on full alert.',
      status: 'impact',
      probability: `${meteorData.probability}%`,
      icon: '💥'
    }
  ];

  const impactInfo = getImpactLevel(impactEnergy);
  const civilianImpact = getCivilianImpact(impactEnergy);
  const safetyProtocols = getSafetyProtocols(impactEnergy);
  const impactReasons = getImpactReasons(impactEnergy);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrajectory(true);
      setTimeout(() => {
        setAnimationState('animating');
        detectionTimeline.forEach((_, index) => {
          setTimeout(() => {
            setCurrentTimelineIndex(index);
          }, index * 2000);
        });
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationState === 'animating') {
      const impactTimer = setTimeout(() => {
        setShowImpact(true);
        setAnimationState('complete');
      }, 14000);

      return () => clearTimeout(impactTimer);
    }
  }, [animationState]);

  const handleReplay = () => {
    setAnimationState('idle');
    setShowImpact(false);
    setShowTrajectory(false);
    setCurrentTimelineIndex(-1);
    setTimeout(() => {
      setShowTrajectory(true);
      setTimeout(() => {
        setAnimationState('animating');
        detectionTimeline.forEach((_, index) => {
          setTimeout(() => {
            setCurrentTimelineIndex(index);
          }, index * 2000);
        });
      }, 1000);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-mono font-bold tracking-wider">
            <span className="text-blue-400">LUNAR DRIFT</span> – Meteor Impact Simulator
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
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl" style={{ height: '700px' }}>
              <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-indigo-950/30 to-black">
                <div className="absolute inset-0">
                  {[...Array(100)].map((_, i) => (
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

                <AnimatePresence>
                  {showTrajectory && animationState !== 'complete' && (
                    <motion.svg
                      className="absolute inset-0 w-full h-full z-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.path
                        d="M 100 80 Q 300 200, 500 350 Q 700 500, 900 600"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                      />
                      <motion.circle
                        cx="900"
                        cy="600"
                        r="8"
                        fill="#ef4444"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ duration: 1, delay: 2.5 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-20 right-8 w-48 h-48 rounded-full overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-green-400 to-blue-600 opacity-80" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
                </div>

                <AnimatePresence>
                  {animationState === 'animating' && (
                    <>
                      <motion.div
                        initial={{ x: 100, y: 80, opacity: 0 }}
                        animate={{ x: 900, y: 600, opacity: 1 }}
                        transition={{ duration: 12, ease: 'linear' }}
                        className="absolute w-16 h-16 rounded-full z-10"
                        style={{
                          background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, #ea580c 100%)',
                          boxShadow: '0 0 40px 20px rgba(251, 191, 36, 0.6), 0 0 80px 40px rgba(234, 88, 12, 0.3)',
                        }}
                      >
                        <motion.div
                          className="absolute -left-24 -top-2 w-24 h-20"
                          style={{
                            background: 'linear-gradient(to right, rgba(251, 191, 36, 0.6), transparent)',
                            filter: 'blur(8px)',
                          }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
                        transition={{ duration: 1.2, delay: 11.8 }}
                        className="absolute right-8 bottom-20 w-64 h-64 rounded-full bg-white z-20"
                        style={{ filter: 'blur(20px)' }}
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 0.7, 0], scale: [0, 2, 3] }}
                        transition={{ duration: 1.5, delay: 11.8 }}
                        className="absolute right-8 bottom-20 w-96 h-96 rounded-full border-4 border-orange-400 z-20"
                      />
                    </>
                  )}
                </AnimatePresence>

                {animationState === 'idle' && (
                  <div className="absolute inset-0 flex items-center justify-center pb-32">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">☄️</div>
                      <p className="text-gray-400 font-mono">Calculating trajectory...</p>
                    </div>
                  </div>
                )}

                {animationState === 'complete' && (
                  <div className="absolute inset-0 flex items-center justify-center pb-32">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="text-6xl mb-4">💥</div>
                      <p className="text-red-400 font-mono font-bold">IMPACT DETECTED</p>
                    </motion.div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/90 to-transparent pt-12 pb-6 px-6 z-30">
                  <div className="max-w-6xl mx-auto">
                    <h3 className="text-lg font-mono font-bold text-purple-400 mb-4">Detection Timeline (2022-2026)</h3>
                    <div className="relative pb-4">
                      <div className="flex justify-between items-end gap-2">
                        {detectionTimeline.map((event, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: currentTimelineIndex >= index ? 1 : 0.3,
                              y: 0,
                              scale: currentTimelineIndex === index ? 1.1 : 1
                            }}
                            transition={{ duration: 0.5 }}
                            className={`flex-1 text-center ${currentTimelineIndex >= index ? '' : 'grayscale'}`}
                          >
                            <div className={`text-3xl mb-2 ${currentTimelineIndex === index ? 'animate-bounce' : ''}`}>
                              {event.icon}
                            </div>
                            <div className={`text-xs font-mono mb-1 ${
                              currentTimelineIndex >= index ? 'text-white font-bold' : 'text-gray-600'
                            }`}>
                              {event.year}
                            </div>
                            <div className={`text-xs font-mono leading-tight ${
                              currentTimelineIndex >= index ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {event.title}
                            </div>
                            <div className={`text-xs font-mono font-bold mt-1 ${
                              parseFloat(event.probability) < 1 ? 'text-green-400' :
                              parseFloat(event.probability) < 50 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {currentTimelineIndex >= index ? event.probability : '---'}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500"
                          initial={{ width: '0%' }}
                          animate={{ width: `${((currentTimelineIndex + 1) / detectionTimeline.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
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
                    <span className="text-gray-400 font-mono">Designation</span>
                    <span className="text-xl font-mono font-bold">{meteorData.name}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400 font-mono">Discovered</span>
                    <span className="text-xl font-mono font-bold">{meteorData.discovered}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400 font-mono">Impact Probability</span>
                    <span className="text-xl font-mono font-bold text-red-400">{meteorData.probability}%</span>
                  </div>
                  
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
              <AnimatePresence>
                {showImpact && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl"
                  >
                    <h2 className="text-2xl font-mono font-bold mb-6 text-blue-400">Simulation Complete</h2>
                    <div className="space-y-4 text-gray-300 font-mono text-sm leading-relaxed">
                      <p>The meteor has completed its trajectory from detection to impact over a 4-year period (2022-2026).</p>
                      <p>Review the detailed impact analysis and safety protocols below.</p>
                      <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-xs text-gray-400">Animation Duration: 12 seconds</p>
                        <p className="text-xs text-gray-400">Timeline Events: 7 milestones</p>
                        <p className="text-xs text-gray-400">Final Impact Probability: {meteorData.probability}%</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <AnimatePresence>
            {showImpact && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-orange-900/50 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-3xl font-mono font-bold text-orange-400 mb-6 flex items-center gap-3">
                    <span>🔬</span> Why Did The Meteor Impact Earth?
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {impactReasons.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl flex-shrink-0">{reason.icon}</div>
                          <div>
                            <h4 className="text-lg font-mono font-bold text-orange-300 mb-2">{reason.title}</h4>
                            <p className="text-gray-300 font-mono text-sm leading-relaxed">{reason.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/50 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                      <h3 className="text-2xl font-mono font-bold text-red-400">Civilian Impact Zone</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-400 font-mono mb-1">Estimated Casualties</div>
                          <div className="text-lg font-bold text-white">{civilianImpact.casualties}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-400 font-mono mb-1">Infrastructure Damage</div>
                          <div className="text-lg font-bold text-white">{civilianImpact.infrastructure}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Wind className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-400 font-mono mb-1">Environmental Effects</div>
                          <div className="text-lg font-bold text-white">{civilianImpact.environments}</div>
                        </div>
                      </div>

                      <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mt-4">
                        <div className="text-sm text-gray-400 font-mono mb-1">Affected Radius</div>
                        <div className="text-2xl font-bold text-red-400">{civilianImpact.radius}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-900/50 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="w-8 h-8 text-blue-400" />
                      <h3 className="text-2xl font-mono font-bold text-blue-400">Safety Protocols</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {safetyProtocols.map((protocol, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                          className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-500"
                        >
                          <div className="text-blue-400 font-bold font-mono mt-0.5 flex-shrink-0">{index + 1}.</div>
                          <div className="text-gray-300 font-mono text-sm leading-relaxed">{protocol}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-sm border border-orange-800/50 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">⚠️</div>
                    <div>
                      <h3 className="text-xl font-mono font-bold text-orange-400 mb-2">Emergency Response Timeline</h3>
                      <div className="text-gray-300 font-mono text-sm leading-relaxed space-y-2">
                        <p><strong className="text-orange-400">T-24 hours:</strong> Activate emergency broadcast system, begin evacuation of predicted impact zones</p>
                        <p><strong className="text-orange-400">T-12 hours:</strong> Deploy emergency services to staging areas, secure critical infrastructure</p>
                        <p><strong className="text-orange-400">T-1 hour:</strong> Final shelter-in-place orders, seal underground facilities</p>
                        <p><strong className="text-orange-400">T+0 (Impact):</strong> Communication blackout expected, automated systems engage</p>
                        <p><strong className="text-orange-400">T+1 hour:</strong> Begin search and rescue operations, assess damage scope</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}