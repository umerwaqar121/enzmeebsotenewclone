import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleWaveProps {
  className?: string;
  reducedMotion?: boolean;
}

const particleVertex = `
  attribute float scale;
  uniform float uTime;
  void main() {
    vec3 p = position;
    float s = scale;
    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 8.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragment = `
  uniform vec3 uColor;
  void main() {
    gl_FragColor = vec4(uColor, 0.7);
  }
`;

/** Full-bleed particle wave background, confined to its parent (not the viewport). Adapted from a Three.js reference component: transparent canvas, no theme switching (site is always dark), lighter particle count for a multi-section scroll background. */
const ParticleWave: React.FC<ParticleWaveProps> = ({ className = '', reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.01, 1000);
    camera.position.set(0, 6, 5);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, reducedMotion ? 1 : 2));

    const gap = 0.3;
    const amountX = reducedMotion ? 42 : 90;
    const amountY = reducedMotion ? 42 : 90;
    const particleNum = amountX * amountY;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - (amountX * gap) / 2;
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - (amountX * gap) / 2;
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Vector3(1.0, 0.75, 0.45) },
      },
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const setSize = () => {
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    setSize();

    let animationId: number | undefined;
    const animate = () => {
      if (!reducedMotion) {
        particleMaterial.uniforms.uTime.value += 0.03;
      }
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    if (!reducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    const ro = new ResizeObserver(setSize);
    ro.observe(parent);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      ro.disconnect();
      scene.remove(particles);
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />;
};

export { ParticleWave };
