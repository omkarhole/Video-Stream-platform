import { useEffect, useRef, useState } from "react";
import { useCall } from "@stream-io/video-react-sdk";

export const useRecordingTimer = () => {
const call = useCall();
const [seconds, setSeconds] = useState(0);
const intervalRef = useRef<NodeJS.Timeout | null>(null);

const startTimer = () => {
if (intervalRef.current) return;

intervalRef.current = setInterval(() => {
  setSeconds((prev) => prev + 1);
}, 1000);

};

const stopTimer = () => {
if (intervalRef.current) {
clearInterval(intervalRef.current);
intervalRef.current = null;
}
};

useEffect(() => {
if (!call) return;

// when recording starts
const handleStarted = () => {
  setSeconds(0);
  startTimer();
};

// when recording stops
const handleStopped = () => {
  stopTimer();
};

call.on("call.recording_started", handleStarted);
call.on("call.recording_stopped", handleStopped);

// If user joins mid-recording
if (call.state.recording) {
  startTimer();
}

return () => {
  stopTimer();
  call.off("call.recording_started", handleStarted);
  call.off("call.recording_stopped", handleStopped);
};

}, [call]);

return seconds;
};
