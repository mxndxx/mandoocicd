import { shuffle } from "./shuffle";

describe("shuffle function", () => {
  test("should return an empty array when input is empty array", () => {
    expect(shuffle([])).toStrictEqual([]);
  });

  test("should return the same array when input is a single element", () => {
    expect(shuffle([1])).toStrictEqual([1]);
  });

  test("should return a shuffled array when input has multiple elements", () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);

    // 배열의 길이는 같지만, 원본 배열과 섞인 배열이 같지 않아야 함
    expect(shuffled.length).toBe(original.length);
    expect(shuffled).not.toStrictEqual(original); // 섞였으므로 원본과 다를 것
    expect(shuffled.sort()).toStrictEqual(original.sort()); // 섞였지만 요소는 같아야 함
  });

  test("should return an array with same elements after shuffle", () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);

    // 섞인 배열의 요소는 원본 배열과 동일해야 함
    expect(shuffled.sort()).toStrictEqual(original.sort());
  });

  test("should not return an array with the same order as the original array", () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);

    // 원본 배열과 섞인 배열이 순서가 같으면 안 됨
    expect(shuffled).not.toStrictEqual(original);
  });
});
