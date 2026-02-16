import { useCallback } from "react";
import { connectMQTT, publishMQTT } from "../lib/mqttClient";

export function useMqttControl() {
  connectMQTT();
  const turnOn = useCallback(() => {
    publishMQTT("rescue/pole/relay", "0");
  }, []);
  const turnOff = useCallback(() => {
    publishMQTT("rescue/pole/relay", "1");
  }, []);

  return { turnOn, turnOff };
}
