import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface ISSData {
  iss_position: { latitude: string; longitude: string };
}

export default function ISSGlobe() {
  const globeRef = useRef<any>(null);
  const [position, setPosition] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });

  const createISSMesh = () => {
    const geometry = new THREE.ConeGeometry(0.6, 1.5, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  };

  const fetchISS = async () => {
    const res = await fetch("/api/iss");
    const data: ISSData = await res.json();
    setPosition({
      lat: parseFloat(data.iss_position.latitude),
      lon: parseFloat(data.iss_position.longitude),
    });
  };

  useEffect(() => {
    fetchISS();
    const interval = setInterval(fetchISS, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      globeRef.current &&
      typeof globeRef.current.pointOfView === "function"
    ) {
      globeRef.current.pointOfView(
        { lat: position.lat, lng: position.lon, altitude: 3 },
        1000
      );
    }
  }, [position]);

  const issObject = createISSMesh();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        objectsData={[
          { lat: position.lat, lng: position.lon, obj: issObject, size: 1 },
        ]}
        objectThreeObject={(d: any) => d.obj}
        labelsData={[
          {
            lat: position.lat,
            lng: position.lon,
            text: "ISS",
            color: "yellow",
            size: 3,
            dotRadius: 0,
          },
        ]}
        labelSize={3}
        labelDotRadius={0}
        labelColor={() => "yellow"}
      />
    </div>
  );
}
