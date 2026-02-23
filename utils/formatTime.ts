export const formatTime = (totalSeconds: number) => {
const mins = Math.floor(totalSeconds / 60)
.toString()
.padStart(2, "0");

const secs = (totalSeconds % 60)
.toString()
.padStart(2, "0");

return `${mins}:${secs}`;
};
