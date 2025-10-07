# 🌕 **Lunar Drift**  

> **Real-time Meteor Tracking & Visualization System**  
> Built with **Next.js**, **TypeScript**, and **Three.js** — simulating the dynamic behavior of meteoroids entering Earth’s atmosphere through interactive 3D visualization and data-driven prediction.

---

## 🚀 **Overview**

**Lunar Drift** is an interactive web application designed to simulate and visualize **meteor trajectories**, **impact probabilities**, and **celestial coordinates** in real time.  
The system leverages **astronomical datasets** and physics-based algorithms to provide accurate predictions of meteoroid paths.

Built for **NASA Space Apps Challenge**, this project focuses on:
- 🌌 Mapping meteor coordinates using **Earth’s geospatial system**
- 🛰️ Predicting impact trajectories using **velocity and orbital parameters**
- 🧠 Integrating **data-driven algorithms** to analyze real-world meteor datasets
- 🧩 Delivering immersive 3D visualization through **Three.js** and **Framer Motion**

---

## 🧭 **Core Features**

| Feature | Description |
|----------|--------------|
| 🪐 **3D Meteor Visualization** | Interactive real-time rendering of meteoroids using `Three.js` |
| 🌍 **Geospatial Mapping** | Coordinates mapped via `Mapbox` / `Leaflet` integration |
| 📊 **Predictive Modeling** | Path prediction algorithm based on orbital mechanics & velocity vectors |
| ⚙️ **Dynamic Data Layer** | Uses mock and live meteor datasets to simulate impacts |
| 🧩 **Smooth Animations** | `Framer Motion`-powered transitions for an immersive experience |
| 🧠 **Type-Safe Architecture** | Built with TypeScript for scalable maintainability |

---

## 🧪 **Tech Stack**

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, React 19, TypeScript, TailwindCSS |
| **3D Engine** | Three.js, Framer Motion |
| **Mapping** | Leaflet / MapboxGL |
| **Data Handling** | REST APIs, Mock JSON datasets |
| **Deployment** | Vercel |

---

## 🧮 **Meteor Path Algorithm**

The prediction module estimates the **trajectory** of a meteor based on:

```text
Input  → Initial Velocity, Entry Angle, Mass, Drag Coefficient
Output → Dynamic Path (Latitude, Longitude, Altitude)
