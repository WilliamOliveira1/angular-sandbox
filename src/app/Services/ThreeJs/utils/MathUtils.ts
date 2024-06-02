/**
* Set sign modifier
* @returns return a 50% chance sign modifier
*/
export const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

/**
* Set random number
* @param min min value to start random set
* @param max max value to start random set
* @returns returns a random int between a min and max value
*/
export const randomIntInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;


/**
* Set random x and y position values
* @param min min value to set position
* @param max max value to set position
* @param count how many values to return
* @param exclude values to not count set in the array
* @returns return a tuple of numbers whith random values
*/
export const getRandomUniquePositionsValues = (
    min: number,
    max: number,
    count: number,
    exclude: number[]
): [number, number][] => {
    const range: number[] = Array.from({ length: max - min + 1 }, (_, i) => i + min).filter(
        (num) => !exclude.includes(num)
    );

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [range[i], range[j]] = [range[j], range[i]];
    }

    // Create tuples from the shuffled array
    const tuples: [number, number][] = [];
    for (let i = 0; i < count * 2; i += 2) {
        tuples.push([range[i], range[i + 1]]);
    }

    return tuples;
}