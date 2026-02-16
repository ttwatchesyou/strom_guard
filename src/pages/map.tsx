import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

/* ================== CONFIG ================== */
const UI_SIZE = 600;
const MAP_SIZE_CM = 200;
const SCALE = UI_SIZE / MAP_SIZE_CM;

/* ================== TYPES ================== */
type Position = {
  x: number; // cm
  y: number; // cm
};

/* ================== DATA ================== */
const nodes = [
  { id: "A", x: -85, y: 85 },
  { id: "B", x: 85, y: 85 },
  { id: "C", x: -85, y: -85 },
  { id: "D", x: 85, y: -85 },
];

export default function MapPage() {
  const [pos] = useState<Position>({ x: 0, y: 0 });
  const toScreenX = (x: number) => UI_SIZE / 2 + x * SCALE;
  const toScreenY = (y: number) => UI_SIZE / 2 - y * SCALE;

  return (
    <MainSection>
      <Sun
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <CloudLeft
        animate={{ x: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
      <CloudRight
        animate={{ x: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 9 }}
      />

      <MainBox>
        <Title>ESP32 Position Map</Title>
        <MapArea>
          {[...Array(12)].map((_, i) => (
            <GridLine key={`v${i}`} style={{ left: `${(i / 12) * 100}%` }} />
          ))}
          {[...Array(12)].map((_, i) => (
            <GridLineH key={`h${i}`} style={{ top: `${(i / 12) * 100}%` }} />
          ))}
          <AxisX />
          <AxisY />
          {nodes.map((n) => (
            <Node
              key={n.id}
              style={{
                left: toScreenX(n.x),
                top: toScreenY(n.y),
              }}
            >
              {n.id}
            </Node>
          ))}

          {/* ESP32 */}
          <ESP
            style={{
              left: toScreenX(pos.x),
              top: toScreenY(pos.y),
            }}
          />
        </MapArea>

        <Info>
          <div>X: {pos.x} cm</div>
          <div>Y: {pos.y} cm</div>
        </Info>
      </MainBox>
    </MainSection>
  );
}

/* ================== STYLED ================== */

const MainSection = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  padding-top: 104px;
  background: linear-gradient(to bottom, #4aa8ff, #1e3271);
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Sun = styled(motion.div)`
  position: absolute;
  top: 40px;
  right: 50px;
  width: 140px;
  height: 140px;
  background: #ffeb3b;
  border-radius: 50%;
  box-shadow: 0 0 40px rgba(255, 243, 99, 0.9);
`;

const CloudLeft = styled(motion.div)`
  position: absolute;
  top: 160px;
  left: 30px;
  width: 160px;
  height: 70px;
  background: white;
  opacity: 0.8;
  border-radius: 40px;
`;

const CloudRight = styled(motion.div)`
  position: absolute;
  top: 260px;
  right: 20px;
  width: 200px;
  height: 85px;
  background: white;
  opacity: 0.75;
  border-radius: 50px;
`;

const MainBox = styled.div`
  width: 100%;
  max-width: 1100px;
  background: rgba(255, 255, 255, 0.15);
  padding: 28px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  color: #ffe08a;
  margin: 0;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #ffffffcc;
  margin-top: -8px;
`;

const MapArea = styled.div`
  position: relative;
  width: ${UI_SIZE}px;
  height: ${UI_SIZE}px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;

const GridLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.15);
`;

const GridLineH = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
`;

const AxisX = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
`;

const AxisY = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.4);
`;

const Node = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background: #ff5252;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`;

const ESP = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: #00e5ff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 12px #00e5ff;
`;

const Info = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;
