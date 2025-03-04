function formatTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

export function getHoursAndMinutesFromDuration(seconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours: formatTime(hours),
    minutes: formatTime(minutes),
    seconds: formatTime(remainingSeconds),
  };
}

export function convertSecondsToHoursMinutes(seconds: number) {
  const { hours, minutes } = getHoursAndMinutesFromDuration(seconds);
  if (!(hours == "00" && minutes == "00")) {
    return `${hours}h ${minutes}m`;
  } else if (hours !== "00") {
    return `${hours}h`;
  }
  if (minutes !== "00") {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}
