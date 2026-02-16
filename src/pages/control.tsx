import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mqtt from "mqtt";
import { Tooltip } from "antd";
import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import { MqttControlOnButton } from "../../components/Button/MqttControlOnButton";
import { MqttControlOffButton } from "../../components/Button/MqttControlOffButton";
import Head from "next/head";


/* ===== Component ===== */
function Control() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [status, setStatus] = useState("Disconnected");

  useEffect(() => {
    const mqttClient = mqtt.connect("ws://192.168.1.10:9001");
    mqttClient.on("connect", () => {
      setStatus("Connected to MQTT");
    });
    mqttClient.on("error", (err) => {
      console.error(err);
      setStatus("MQTT Error");
    });
    setClient(mqttClient);
    return () => {
      mqttClient.end();
    };
  }, []);

  const publishMessage = (value: "DANGER" | "SAFE") => {
    if (!client) return;

    client.publish("rescue/pole/relay", value);
  };

  return (
     <><Head>
      <title>Mechatronics and Robotics</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/logo/MechaLogo.png" rel="icon" />
      <meta property="og:title" content="Mechatronics and Robotics" />
    </Head>
    <MainSection>
        <Sun
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4 }} />
        <CloudLeft
          animate={{ x: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 7 }} />
        <CloudRight
          animate={{ x: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 9 }} />
        <MainBox>
          <Header>
            <Title>Control Panel</Title>
            <Subtitle>หน้าจอสำหรับควบคุมไฟแสดงสถานะ</Subtitle>
          </Header>
          <NowCard>
            <MqttControlOnButton />
            <MqttControlOffButton />
          </NowCard>
        </MainBox>
      </MainSection></>
  );
}

export default Control;
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
  gap: 28px;
  color: #fff;

  
    // @media only screen and (max-width: 1200px) {
    //     font-size: 30px;
    // }

    @media only screen and (max-width: 890px) {
        flexwrap: wrap;
    }
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: #ffe08a;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #ffffffcc;
  margin-top: 6px;
`;

const NowCard = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  backdrop-filter: blur(8px);
  
    @media only screen and (max-width: 1200px) {
        display: flex;
        flex-direction: column;
    }
`;

const TempText = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

const StatusText = styled.div`
  font-size: 1.4rem;
  margin-top: -6px;
`;

const WeatherIcon = styled.img`
  width: 100px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 14px;
  backdrop-filter: blur(6px);
`;

const CardTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.4rem;
  color: #ffe08a;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 250px;
`;

const StormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 10px;
`;

const StormBox = styled.div`
  background: rgba(255, 255, 255, 0.18);
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StormDaySmall = styled.div`
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
`;

const StormLevelSmall = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

const StormPercent = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const StormDay = styled.div`
  color: #fff;
`;

const StormLevel = styled.div`
  font-weight: bold;
  height: 250px;
`;

const Loading = styled.div`
  color: white;
  text-align: center;
  margin-top: 50px;
  font-size: 1.6rem;
`;
