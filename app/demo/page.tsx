'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Users, Building2, Wind, Shield } from 'lucide-react';
import * as THREE from 'three';

export default function DemoPage() {
  const [animationState, setAnimationState] = useState('idle');
  const [showImpact, setShowImpact] = useState(false);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(-1);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const meteorRef = useRef(null);
  const trailParticlesRef = useRef([]);

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

  const getImpactLevel = (energy) => {
    if (energy < 1e12) return { level: 'Low Impact', color: 'text-green-400', icon: '🟢', precaution: 'Minor event, minimal ground impact.' };
    if (energy < 1e15) return { level: 'Medium Impact', color: 'text-orange-400', icon: '🟠', precaution: 'Potential local damage — seek shelter.' };
    return { level: 'High Impact', color: 'text-red-400', icon: '🔴', precaution: 'Severe global threat — initiate emergency protocols.' };
  };

  const getCivilianImpact = (energy) => {
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

  const getSafetyProtocols = (energy) => {
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
      'CRITICAL: Initiate mass evacuation protocols',
      'Seek deep underground bunkers if available',
      'Stock minimum 2-week supplies in sealed containers',
      'Prepare for extended power and communication outages',
      'Protect against radiation and extreme temperature changes',
      'Follow government emergency broadcast instructions',
      'Anticipate long-term environmental changes'
    ];
  };

  const getImpactReasons = (energy) => {
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

  const createEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#1a4d6e');
    oceanGradient.addColorStop(0.5, '#0a5f8a');
    oceanGradient.addColorStop(1, '#0d3a5b');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const continents = [
      { x: 300, y: 400, w: 500, h: 300, rotation: 0.2 },
      { x: 1000, y: 350, w: 450, h: 250, rotation: -0.1 },
      { x: 1600, y: 480, w: 350, h: 200, rotation: 0.3 },
      { x: 400, y: 700, w: 300, h: 180, rotation: -0.2 },
      { x: 1200, y: 650, w: 500, h: 250, rotation: 0.15 },
      { x: 200, y: 200, w: 280, h: 150, rotation: 0 },
      { x: 1700, y: 250, w: 320, h: 180, rotation: -0.25 }
    ];

    continents.forEach(cont => {
      ctx.save();
      ctx.translate(cont.x + cont.w / 2, cont.y + cont.h / 2);
      ctx.rotate(cont.rotation);
      
      const landGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(cont.w, cont.h) / 2);
      landGradient.addColorStop(0, '#5a9c6f');
      landGradient.addColorStop(0.3, '#4a7c59');
      landGradient.addColorStop(0.6, '#3d6b4a');
      landGradient.addColorStop(1, '#2d5a3a');
      
      ctx.fillStyle = landGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, cont.w / 2, cont.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      for (let i = 0; i < 15; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 120, 80, 0.4)' : 'rgba(90, 140, 70, 0.3)';
        const offsetX = (Math.random() - 0.5) * cont.w * 0.7;
        const offsetY = (Math.random() - 0.5) * cont.h * 0.7;
        const size = Math.random() * 40 + 20;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });

    for (let i = 0; i < 500; i++) {
      const brightness = Math.random() * 60 + 30;
      ctx.fillStyle = `rgba(${brightness + 30}, ${brightness + 60}, ${brightness + 40}, ${Math.random() * 0.4 + 0.2})`;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(0, 0, canvas.width, 80);
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

    return new THREE.CanvasTexture(canvas);
  };

  const createCloudTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < 800; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 60 + 20;
      const opacity = Math.random() * 0.5 + 0.3;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  };

  const createBumpMap = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#505050';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 2000; i++) {
      const gray = Math.floor(Math.random() * 140 + 30);
      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 50 + 15;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  };

  const createMeteorTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#6b4423');
    gradient.addColorStop(0.5, '#4a3018');
    gradient.addColorStop(1, '#2a1810');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 300; i++) {
      const gray = Math.floor(Math.random() * 80 + 20);
      ctx.fillStyle = `rgb(${gray + 40}, ${gray + 20}, ${gray})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 20 + 5, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 5, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 3);
    sunLight.position.set(-40, 25, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0x4488ff, 1.2);
    backLight.position.set(30, 15, -20);
    scene.add(backLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 10, -30);
    scene.add(rimLight);

    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    const starsColors = [];
    
    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 500;
      starsVertices.push(x, y, z);
      
      const color = new THREE.Color();
      const hue = Math.random() * 0.15 + 0.55;
      const saturation = Math.random() * 0.4 + 0.3;
      const lightness = Math.random() * 0.4 + 0.6;
      color.setHSL(hue, saturation, lightness);
      starsColors.push(color.r, color.g, color.b);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const earthGeometry = new THREE.SphereGeometry(5.5, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: createEarthTexture(),
      bumpMap: createBumpMap(),
      bumpScale: 0.25,
      specular: new THREE.Color(0x333333),
      shininess: 25,
      emissive: new THREE.Color(0x112233),
      emissiveIntensity: 0.1
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(15, 0, 0);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    const cloudsGeometry = new THREE.SphereGeometry(5.6, 128, 128);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: createCloudTexture(),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      side: THREE.FrontSide
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earth.add(clouds);

    const atmosphereGeometry = new THREE.SphereGeometry(6.2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { value: 0.5 },
        p: { value: 6.5 },
        glowColor: { value: new THREE.Color(0x3399ff) },
        viewVector: { value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.7 - dot(vNormal, vNormel), 4.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity * 0.9);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earth.add(atmosphere);

    const trajectoryPoints = [];
    const startPoint = new THREE.Vector3(-35, 8, -5);
    const impactPoint = new THREE.Vector3(15, -1, 0);
    
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = startPoint.x + (impactPoint.x - startPoint.x) * t;
      const y = startPoint.y + (impactPoint.y - startPoint.y) * t;
      const z = startPoint.z + (impactPoint.z - startPoint.z) * t;
      trajectoryPoints.push(new THREE.Vector3(x, y, z));
    }

    const trajectoryCurve = new THREE.CatmullRomCurve3(trajectoryPoints);
    const trajectoryGeometry = new THREE.TubeGeometry(trajectoryCurve, 100, 0.025, 8, false);
    const trajectoryMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.5,
      emissive: new THREE.Color(0xff6600),
      emissiveIntensity: 0.6
    });
    const trajectoryLine = new THREE.Mesh(trajectoryGeometry, trajectoryMaterial);
    scene.add(trajectoryLine);

    const meteorGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const meteorMaterial = new THREE.MeshStandardMaterial({
      map: createMeteorTexture(),
      roughness: 0.9,
      metalness: 0.2,
      emissive: new THREE.Color(0xff4400),
      emissiveIntensity: 0.5
    });

    const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
    meteor.castShadow = true;
    meteor.visible = false;
    scene.add(meteor);
    meteorRef.current = meteor;

    const meteorLight = new THREE.PointLight(0xff6600, 4, 20);
    meteor.add(meteorLight);

    const trailParticles = [];
    const trailGeometry = new THREE.SphereGeometry(0.1, 12, 12);
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 40; i++) {
      const particle = new THREE.Mesh(trailGeometry, trailMaterial.clone());
      particle.visible = false;
      scene.add(particle);
      trailParticles.push(particle);
    }
    trailParticlesRef.current = trailParticles;

    let animationProgress = 0;
    let impactTriggered = false;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      earth.rotation.y += 0.001;
      clouds.rotation.y += 0.0015;
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;

      if (animationState === 'animating') {
        if (!meteor.visible) {
          meteor.visible = true;
          animationProgress = 0;
          impactTriggered = false;
        }

        animationProgress += 0.0008;

        if (animationProgress <= 1) {
          const point = trajectoryCurve.getPointAt(Math.min(animationProgress, 0.999));
          meteor.position.copy(point);

          meteor.rotation.x += 0.09;
          meteor.rotation.y += 0.06;
          meteor.rotation.z += 0.04;

          const scale = 1 + animationProgress * 3.5;
          meteor.scale.set(scale, scale, scale);
          meteorLight.intensity = 4 + animationProgress * 10;
          meteorLight.distance = 20 + animationProgress * 15;

          trailParticles.forEach((particle, i) => {
            if (animationProgress > i * 0.025) {
              particle.visible = true;
              const trailProgress = Math.max(0, animationProgress - i * 0.025);
              const trailPoint = trajectoryCurve.getPointAt(Math.min(trailProgress, 0.999));
              particle.position.copy(trailPoint);
              particle.material.opacity = 0.8 * (1 - i / trailParticles.length) * (1 + animationProgress);
              const particleScale = 1 + trailProgress * 2;
              particle.scale.set(particleScale, particleScale, particleScale);
            }
          });

          if (animationProgress >= 0.96 && !impactTriggered) {
            impactTriggered = true;
            
            const impactLight = new THREE.PointLight(0xffffff, 30, 50);
            impactLight.position.copy(earth.position);
            scene.add(impactLight);

            const impactFlashGeometry = new THREE.SphereGeometry(6, 32, 32);
            const impactFlashMaterial = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 1
            });
            const impactFlash = new THREE.Mesh(impactFlashGeometry, impactFlashMaterial);
            impactFlash.position.copy(earth.position);
            scene.add(impactFlash);

            const shockwaveGeometry = new THREE.RingGeometry(5.5, 5.7, 32);
            const shockwaveMaterial = new THREE.MeshBasicMaterial({
              color: 0xff8800,
              transparent: true,
              opacity: 1,
              side: THREE.DoubleSide
            });
            const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
            shockwave.position.copy(earth.position);
            shockwave.lookAt(camera.position);
            scene.add(shockwave);

            let flashProgress = 0;
            const animateImpact = () => {
              flashProgress += 0.04;
              impactFlash.scale.set(1 + flashProgress * 3, 1 + flashProgress * 3, 1 + flashProgress * 3);
              impactFlash.material.opacity = Math.max(0, 1 - flashProgress);
              impactLight.intensity = Math.max(0, 30 - flashProgress * 30);
              
              shockwave.scale.set(1 + flashProgress * 2, 1 + flashProgress * 2, 1);
              shockwave.material.opacity = Math.max(0, 1 - flashProgress * 1.2);

              if (flashProgress < 1) {
                requestAnimationFrame(animateImpact);
              } else {
                scene.remove(impactLight);
                scene.remove(impactFlash);
                scene.remove(shockwave);
              }
            };
            animateImpact();

            setTimeout(() => {
              setShowImpact(true);
              setAnimationState('complete');
              meteor.visible = false;
              trailParticles.forEach(p => p.visible = false);
            }, 400);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      meteorGeometry.dispose();
      meteorMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, [animationState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => {
        setAnimationState('animating');
        detectionTimeline.forEach((_, index) => {
          setTimeout(() => {
            setCurrentTimelineIndex(index);
          }, index * 2400);
        });
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleReplay = () => {
    setAnimationState('idle');
    setShowImpact(false);
    setCurrentTimelineIndex(-1);

    if (meteorRef.current) {
      meteorRef.current.visible = false;
    }
    if (trailParticlesRef.current) {
      trailParticlesRef.current.forEach(p => p.visible = false);
    }

    setTimeout(() => {
      setAnimationState('animating');
      detectionTimeline.forEach((_, index) => {
        setTimeout(() => {
          setCurrentTimelineIndex(index);
        }, index * 2400);
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-mono font-bold tracking-wider">
            <span className="text-blue-400">LUNAR DRIFT</span> – Advanced Meteor Impact Simulator
          </h1>
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
              <div 
                ref={containerRef}
                className="relative w-full overflow-hidden bg-black"
                style={{ height: '600px' }}
              >
                {animationState === 'idle' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🌍</div>
                      <p className="text-gray-400 font-mono">Initializing 3D simulation...</p>
                      <p className="text-gray-500 font-mono text-sm">Loading high-resolution Earth model</p>
                    </div>
                  </div>
                )}

                {animationState === 'complete' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pb-32">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="text-6xl mb-4">💥</div>
                      <p className="text-red-400 font-mono font-bold text-2xl">IMPACT DETECTED</p>
                      <p className="text-gray-400 font-mono text-sm mt-2">Simulation complete</p>
                    </motion.div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-t from-black/95 via-black/90 to-transparent px-6 py-6">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-lg font-mono font-bold text-purple-400 mb-4">Detection Timeline (2022-2026)</h3>
                  <div className="relative">
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
          </motion.div>

                      

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