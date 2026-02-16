import React from "react";
import styled from "styled-components";
import { useMqttControl } from "../../hook/useMqttControl";

interface Props {
  disabled?: boolean;
}

export const MqttControlOnButton: React.FC<Props> = ({ disabled }) => {
  const { turnOn } = useMqttControl();

  return (
    <Button color="#4CAF50" onClick={turnOn} disabled={disabled}>
      SAFE
    </Button>
  );
};

const Button = styled.button<{ color: string }>`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  background-color: ${(p) => p.color};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media only screen and (max-width: 1200px) {
    min-width: 100%;
  }
`;
