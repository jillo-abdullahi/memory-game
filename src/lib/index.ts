import { GridArrayItem, GridSize } from "@/types";

const icons = [
  "anchor",
  "ball",
  "bug",
  "car",
  "flask",
  "hand",
  "lira",
  "moon",
  "snowflake",
  "sun",
  "cart",
  "hippo",
  "bike",
  "robot",
  "dragon",
  "emoji",
  "heart",
  "book",
];

/**
 * Generates an array of objects with the following properties depending on grid size:
 * value: number
 * icon: string
 * isRevealed: boolean
 * isDisabled: boolean
 * @param gridSize
 * @returns
 */
export const generateArray = (gridSize: GridSize) => {
  if (gridSize === GridSize["4x4"]) {
    const newArray = [...Array(8)].map((_, index) => ({
      value: index + 1,
      icon: icons[index],
      isRevealed: false,
      isActive: false,
    }));

    return newArray;
  } else {
    const newArray = [...Array(18)].map((_, index) => ({
      value: index + 1,
      icon: icons[index],
      isRevealed: false,
      isActive: false,
    }));

    return newArray;
  }
};

/**
 * Combines and shuffles an array
 * @param array1
 * @returns
 */
export const combineAndShuffleArray = (array1: GridArrayItem[]) => {
  // duplicate the array
  const array2 = [...array1];

  // combine the two arrays
  const combinedArray = [...array1, ...array2];

  // shuffle the combined array
  for (let i = combinedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
  }

  return combinedArray;
};
