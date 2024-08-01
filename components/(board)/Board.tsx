import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import Svg, { Rect } from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/utils/types";

const { width, height } = Dimensions.get("window");
const snakeSegmentSize = 20;
const foodSize = 15;
const eatingZone = 15;

const Board = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [score, setScore] = useState(0);

  const [gameRunning, setGameRunning] = useState<boolean>(true);

  const [startingX, setStartingX] = useState<number | null>(null);
  const [startingY, setStartingY] = useState<number | null>(null);
  const [direction, setDirection] = useState<string>("right");

  const [randomX, setRandomX] = useState(
    Math.floor(Math.random() * (width - 100))
  );
  const [randomY, setRandomY] = useState(
    Math.floor(Math.random() * (height - 20))
  );

  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: width / 2, y: height / 2 },
    { x: width / 2 - snakeSegmentSize, y: height / 2 },
    { x: width / 2 - snakeSegmentSize * 2, y: height / 2 },
  ]);

  const getDirection = (x: number, y: number) => {
    const xDifference = 100 * startingX! - 100 * x;
    const yDifference = 100 * startingY! - 100 * y;

    const xDifferenceAbs = Math.abs(xDifference);
    const yDifferenceAbs = Math.abs(yDifference);
    if (xDifferenceAbs > yDifferenceAbs) {
      if (xDifference < -20 && direction != "up") {
        setDirection("down");
      } else if (xDifference > 20 && direction != "down") {
        setDirection("up");
      }
    } else {
      if (yDifference < -20 && direction != "right") {
        setDirection("left");
      } else if (xDifference > 20 && direction != "left") {
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

  const moveX = useSharedValue(snake[0].x);
  const moveY = useSharedValue(snake[0].y);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(moveX.value, { damping: 2, stiffness: 100 }) },
        { translateY: withSpring(moveY.value, { damping: 2, stiffness: 100 }) },
      ],
    };
  }, [moveX, moveY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        let shouldGrow = false;
        const newSnake = prevSnake.map((segment, index) => {
          if (index === 0) {
            let newX = segment.x;
            let newY = segment.y;

            if (newX < 0 || newX > width || newY < 0 || newY > height) {
              setGameRunning(false);
            }

            if (
              newX >= randomX - eatingZone &&
              newX <= randomX + eatingZone &&
              newY >= randomY - eatingZone &&
              newY <= randomY + eatingZone
            ) {
              setScore(score + 1);
              console.log("nom nom nom");

              setRandomX(Math.floor(Math.random() * (width - 100)));
              setRandomY(Math.floor(Math.random() * (height - 30)));
              
              shouldGrow = true;
            }

            if (direction === "up") {
              newY += snakeSegmentSize;
            } else if (direction === "down") {
              newY -= snakeSegmentSize;
            } else if (direction === "left") {
              newX -= snakeSegmentSize;
            } else if (direction === "right") {
              newX += snakeSegmentSize;
            }
            return { x: newX, y: newY };
          } else {
            return { x: prevSnake[index - 1].x, y: prevSnake[index - 1].y };
          }
        });


        if (shouldGrow) {
          newSnake.push({
            x: prevSnake[prevSnake.length - 1].x,
            y: prevSnake[prevSnake.length - 1].y,
          })
        }

        moveX.value = newSnake[0].x;
        moveY.value = newSnake[0].y;
        return newSnake;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [direction]);

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

  useEffect(() => {
    if (gameRunning === false) {
      navigation.navigate("Score", {score: score});
    }
  }, [gameRunning]);

  return (
    <View style={styles.container}>
      <Svg width={width * 0.9} height={height * 0.9}>
        {snake.map((segment, index) => (
          <Rect
            x={segment.x}
            y={segment.y}
            width={snakeSegmentSize}
            height={snakeSegmentSize}
            fill="black"
            key={index}
          />
        ))}
        <Rect
          x={randomX}
          y={randomY}
          width={foodSize}
          height={foodSize}
          fill="black"
        />
      </Svg>
      <Text>{score}</Text>
      <Animated.View style={[styles.snake, animatedStyle]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
  },
  snake: {
    position: "absolute",
  },
});

export default Board;
