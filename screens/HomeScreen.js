import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Vibration,
  Alert,
  ActivityIndicator,
} from "react-native";

const HomeScreen = () => {
  const [normalTime, setNormalTime] = useState(0);
  const [fastTime, setFastTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFastCycle, setIsFastCycle] = useState(false);
  const [completedLoops, setCompletedLoops] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else if (isRunning && remainingTime === 0) {
      handleCycleEnd();
    }
    return () => clearTimeout(timer);
  }, [isRunning, remainingTime]);

  const handleCycleEnd = () => {
    if (isFastCycle) {
      Vibration.vibrate([100, 1000, 100]);
      setIsFastCycle(false);
      setRemainingTime(normalTime);
      setCompletedLoops(completedLoops + 1);
    } else {
      Vibration.vibrate([100, 1000, 100]);
      setIsFastCycle(true);
      setRemainingTime(fastTime);
    }
  };

  const startTimer = () => {
    setRemainingTime(normalTime);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    Alert.alert("Good Job!", `You have completed ${completedLoops} loops.`);
    setCompletedLoops(0);
    setRemainingTime(0);
    setIsFastCycle(false);
  };

  const isReadyToStart = normalTime > 0 && fastTime > 0;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogging App</Text>

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Jogging Time (s)"
        onChangeText={(text) => setNormalTime(parseInt(text))}
        editable={!isRunning}
      />

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Fast Running Time (s)"
        onChangeText={(text) => setFastTime(parseInt(text))}
        editable={!isRunning}
      />

      <Text style={styles.remainingTime}>
        Remaining Time: {remainingTime} seconds
      </Text>

      <Text style={styles.currentCycle}>
        Current Cycle: {isFastCycle ? "Fast Running" : "Jogging"}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          isRunning ? styles.finishButton : styles.startButton,
        ]}
        //onPress={isRunning ? stopTimer : startTimer}
        onPress={() => {
          if (isRunning) {
            stopTimer();
          } else {
            startTimer();
            //changeKeepAwake(true);
          }
        }}
        disabled={!isReadyToStart}
      >
        <Text style={styles.buttonText}>{isRunning ? "Finish" : "Start"}</Text>
      </TouchableOpacity>

      <Text style={styles.loops}>Loops Completed: {completedLoops}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  remainingTime: {
    fontSize: 20,
    marginBottom: 10,
    color: "#555",
  },
  currentCycle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#555",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#007bff",
  },
  finishButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loops: {
    fontSize: 20,
    color: "#333",
  },
});

export default HomeScreen;
