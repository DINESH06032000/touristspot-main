// A.js
import { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import "./css/Globe2.css"

// Convert lat/lon to Vector3 on a sphere
const convertCoordsToVector3 = (lon, lat, radius = 1.5) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// Auto-position the camera to face India
const PointCameraAtIndia = () => {
  const { camera } = useThree();

  useEffect(() => {
    const indiaVec = convertCoordsToVector3(78.9629, 20.5937);
    const distance = 3;
    const cameraPos = indiaVec.clone().normalize().multiplyScalar(distance);
    camera.position.copy(cameraPos);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

// GeoJSON rendering: fill India only
const GeoIndiaLayer = ({ geoJson }) => {
  return (
    <group>
      {geoJson.features.map((feature, i) => {
        const coords = feature.geometry.coordinates;

        // Check if the feature represents India
        const isIndia =
          feature.properties?.ADMIN === 'India' ||
          feature.properties?.name === 'India' ||
          feature.properties?.NAME_0 === 'India';

        // Draw line for other countries (not for India)
        const drawLine = (ring, key) => {
          const points = ring.map(([lon, lat]) => convertCoordsToVector3(lon, lat, 1.5));
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line
              key={key}
              geometry={geometry}
              material={
                new THREE.LineBasicMaterial({
                  color: '#D6FD6A',
                  transparent: true,
                  opacity: 0.9,
                })
              }
            />
          );
        };

        // Draw fill for India only (no wireframe)
        const drawFill = (ring, key) => {
          // Convert the ring of [lon, lat] into 3D coordinates
          const vertices = ring.map(([lon, lat]) => convertCoordsToVector3(lon, lat, 1.53));
        
          // Create geometry manually using triangle fan method
          const center = new THREE.Vector3();
          vertices.forEach(v => center.add(v));
          center.divideScalar(vertices.length); // Approximate center
        
          const positions = [];
        
          for (let i = 0; i < vertices.length - 1; i++) {
            positions.push(
              center.x, center.y, center.z,
              vertices[i].x, vertices[i].y, vertices[i].z,
              vertices[i + 1].x, vertices[i + 1].y, vertices[i + 1].z
            );
          }
        
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.computeVertexNormals();
        
          return (
            <mesh key={key} geometry={geometry}>
              <meshStandardMaterial
                color="#D6FD6A"
                emissive="#D6FD6A"
                side={THREE.DoubleSide}
                transparent={true}
                opacity={1}
              />
            </mesh>
          );
        };
        
        // Render polygons
        if (feature.geometry.type === 'Polygon') {
          return coords.map((ring, j) => (
            <group key={`${i}-polygon-${j}`}>
              {/* Only draw fill for India, lines for other countries */}
              {isIndia ? drawFill(ring, `fill-${i}-${j}`) : drawLine(ring, `line-${i}-${j}`)}
            </group>
          ));
        }

        // Render multi-polygons (e.g., multi-ringed countries)
        if (feature.geometry.type === 'MultiPolygon') {
          return coords.map((polygon, j) =>
            polygon.map((ring, k) => (
              <group key={`${i}-multi-${j}-${k}`}>
                {/* Only draw fill for India, lines for other countries */}
                {isIndia ? drawFill(ring, `fill-${i}-${j}-${k}`) : drawLine(ring, `line-${i}-${j}-${k}`)}
              </group>
            ))
          );
        }

        return null;
      })}
    </group>
  );
};


const Globe2 = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const globeRef = useRef();

  useEffect(() => {
    fetch('/india.geojson') // Replace with your GeoJSON file path
      .then((res) => res.json())
      .then(setGeoJsonData)
      .catch(console.error);
  }, []);

 

  return (
    <Canvas className='india_globe' camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00faff" />
      <group ref={globeRef}>
        {/* Globe sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="black" wireframe />
        </mesh>

        {/* GeoJSON outlines and fill */}
        {geoJsonData && <GeoIndiaLayer geoJson={geoJsonData} />} 
      </group>

      {/* Camera controls and auto-rotation */}
      <PointCameraAtIndia />
      <OrbitControls autoRotate autoRotateSpeed={1.2} enableZoom={false} />
    </Canvas>
  );
};

export default Globe2;
