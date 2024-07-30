import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";

const Board = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  const [startingX, setStartingX] = useState<number | null>(null);
  const [startingY, setStartingY] = useState<number | null>(null);
  const [direction, setDirection] = useState<string>("still");

  const getDirection = (x: number, y: number) => {
    const xDifference = 100 * startingX! - 100 * x;
    const yDifference = 100 * startingY! - 100 * y;

    const xDifferenceAbs = Math.abs(xDifference);
    const yDifferenceAbs = Math.abs(yDifference);
    if (xDifferenceAbs > yDifferenceAbs) {
      if (xDifference < -20) {
        setDirection("down");
      } else if (xDifference > 20) {
        setDirection("up");
      }
    } else {
      if (yDifference < -20) {
        setDirection("left");
      } else if (xDifference > 20) {
        setDirection("right");
      }
    }
  };

  const handleStartPosition = (x: number, y: number) => {
    if (!startingX) {
      setStartingY(y);
      setStartingX(x);
    }
  };

  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });

    return () => subscription.remove();
  }, []);

  const { x, y, z } = data;
  useEffect(() => {
    handleStartPosition(x, y);
  }, [x, y]);

  useEffect(() => {
    if (startingX && startingY) {
      getDirection(x, y);
    }
  }, [x, y]);

  return (
    <View>
      <Text>{direction}</Text>
      <Text>X: {x.toFixed(2)}</Text>
      {startingX ? <Text>startingX: {startingX!.toFixed(2)}</Text> : null}
      {startingY ? <Text>startingY: {startingY!.toFixed(2)}</Text> : null}
      <Text>Y: {y.toFixed(2)}</Text>
    </View>
  );
};

export default Board;
