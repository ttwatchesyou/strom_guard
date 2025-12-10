import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

type WeatherData = {
  wind: { time: string; speed: number }[];
  waves: { day: string; height: number }[];
  storms: { day: string; risk: number }[];
};

async function fetchWeatherData() {
  return {
    wind: [
      { time: "06:00", speed: 12 },
      { time: "09:00", speed: 18 },
      { time: "12:00", speed: 25 },
      { time: "15:00", speed: 32 },
      { time: "18:00", speed: 28 },
      { time: "21:00", speed: 20 },
    ],
    waves: [
      { day: "Mon", height: 1.2 },
      { day: "Tue", height: 1.8 },
      { day: "Wed", height: 2.4 },
      { day: "Thu", height: 3.1 },
      { day: "Fri", height: 2.7 },
    ],
    storms: [
      { day: "Mon", risk: 10 },
      { day: "Tue", risk: 30 },
      { day: "Wed", risk: 60 },
      { day: "Thu", risk: 80 },
      { day: "Fri", risk: 40 },
    ],
  };
}

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeatherData().then((data) => {
      setWeather(data);
    });
  }, []);

  if (!weather) return <Loading>กำลังโหลดข้อมูล...</Loading>;

  return (
    <MainSection>
      {/* ☀️ ดวงอาทิตย์ลอย */}
      <Sun
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* ☁️ เมฆลอย */}
      <CloudLeft
        animate={{ x: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
      <CloudRight
        animate={{ x: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 9 }}
      />

      <MainBox>
        <Header>
          <Title>พยากรณ์อากาศ</Title>
          <Subtitle>ข้อมูลจากกรมอุตุนิยมวิทยา</Subtitle>
        </Header>

        {/* การ์ดแสดงสภาพอากาศปัจจุบัน */}
        <NowCard>
          <div>
            <TempText>29°</TempText>
            <StatusText>ท้องฟ้าโปร่ง</StatusText>
          </div>
          <WeatherIcon src="https://cdn-icons-png.flaticon.com/512/6974/6974833.png" />
        </NowCard>

        {/* 🌀 ความเร็วลม */}
        <Card>
          <CardTitle>กราฟความเร็วลมตามช่วงเวลา (กม./ชม.)</CardTitle>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weather.wind}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="#00e6ff"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Card>

        {/* 🌊 คลื่นทะเล */}
        <Card>
          <CardTitle>ความสูงคลื่นรายวัน (เมตร)</CardTitle>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weather.waves}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="height"
                  stroke="#ffc107"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Card>

        {/* ⛈️ ความเสี่ยงพายุ */}
        <Card>
          <CardTitle>โอกาสเกิดพายุ</CardTitle>

          <StormGrid>
            {weather.storms.map((item) => {
              let level = "ต่ำ";
              let color = "#4caf50";

              if (item.risk >= 70) {
                level = "สูง";
                color = "#ff1744";
              } else if (item.risk >= 40) {
                level = "กลาง";
                color = "#ff9100";
              }

              return (
                <StormBox key={item.day}>
                  <StormDaySmall>{item.day}</StormDaySmall>
                  <StormLevelSmall style={{ color }}>{level}</StormLevelSmall>
                  <StormPercent>{item.risk}%</StormPercent>
                </StormBox>
              );
            })}
          </StormGrid>
        </Card>
      </MainBox>
    </MainSection>
  );
}

/* ================== Styled Components ================== */

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
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  backdrop-filter: blur(8px);
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
