
// return a 50% chance sign modifier
export const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

// returns a random int between a min and max value
export const randomIntInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;