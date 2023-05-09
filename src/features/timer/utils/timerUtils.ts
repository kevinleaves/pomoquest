/**
 *
 * @param timeInSeconds amount of seconds
 * @returns a time string formatted in mm:ss
 */

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const remainingSeconds = timeInSeconds - minutes * 60;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 *
 * @param minutes number of minutes
 * @returns minutes converted to seconds
 */
export const minutesToSeconds = (minutes: number): number => {
  return minutes * 60;
};
