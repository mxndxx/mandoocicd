import { escape, unescape } from "./htmlEscape";

describe("escape function", () => {
  test("should escape special characters", () => {
    expect(escape("fred, barney, & pebbles")).toBe(
      "fred, barney, &amp; pebbles"
    );
    expect(escape("<div>hello</div>")).toBe("&lt;div&gt;hello&lt;/div&gt;");
    expect(escape('"hello"')).toBe("&quot;hello&quot;");
    expect(escape("'hello'")).toBe("&#39;hello&#39;");
  });

  test("should return the same string if no special characters are present", () => {
    expect(escape("hello")).toBe("hello");
  });

  test("should return an empty string if input is empty", () => {
    expect(escape("")).toBe("");
  });
});

describe("unescape function", () => {
  test("should unescape HTML entities", () => {
    expect(unescape("fred, barney, &amp; pebbles")).toBe(
      "fred, barney, & pebbles"
    );
    expect(unescape("&lt;div&gt;hello&lt;/div&gt;")).toBe("<div>hello</div>");
    expect(unescape("&quot;hello&quot;")).toBe('"hello"');
    expect(unescape("&#39;hello&#39;")).toBe("'hello'");
  });

  test("should return the same string if no HTML entities are present", () => {
    expect(unescape("hello")).toBe("hello");
  });

  test("should return an empty string if input is empty", () => {
    expect(unescape("")).toBe("");
  });
});
