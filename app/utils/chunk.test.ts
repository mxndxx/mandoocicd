import { chunk } from "./chunk";

// test("test chunk functtion", () => {
//   expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
// });

// test("uses default size of 1 if no size is provided", () => {
//   expect(chunk([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]]);
// });

describe("chunk function", () => {
  test("splits an array into chunks of given size", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  test("returns an empty array when input array is empty", () => {
    expect(chunk([], 2)).toEqual([]);
    expect(chunk([], 5)).toEqual([]);
  });

  test("returns an empty array when size is less than 1", () => {
    expect(chunk([1, 2, 3, 4], 0)).toEqual([]);
    expect(chunk([1, 2, 3, 4], -1)).toEqual([]);
  });

  test("handles size greater than array length", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test("handles null or undefined input", () => {
    expect(chunk(null, 2)).toEqual([]);
    expect(chunk(undefined, 2)).toEqual([]);
  });

  test("uses default size of 1 if no size is provided", () => {
    expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  test("handles non-integer sizes (rounds down)", () => {
    expect(chunk([1, 2, 3, 4], 2.5)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
