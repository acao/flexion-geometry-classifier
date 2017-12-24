import { detectGeometry, classifyGeometry } from "../../dist/index";

const EQUILATERAL = [1.2, 1.2, 1.2];

describe("detectGeometry", async () => {
  it("detects a triangle", async () => {
    try {
      const result = await detectGeometry(EQUILATERAL);
      await expect(result).toEqual({
        geometryLabel: "triangle",
        sides: EQUILATERAL
      });
    } catch (e) {
      console.log(e);
    }
  });
  it("resolves with message for more than 3 sides (for now)", async () => {
    try {
      await detectGeometry([...EQUILATERAL, 1.4]);
    } catch (e) {
      expect(e).toEqual("classifier does not exist for a geometry with 4 sides");
    }
  });
  it("rejects with message for less than 3 sides", async () => {
    try {
      await detectGeometry([1.2, 1.3]);
    } catch (e) {
      expect(e).toEqual("not enough sides for a valid geometry!");
    }
  });
  it("rejects with message for invalid side", async () => {
    try {
      await detectGeometry([1.2, 1.4, "stuff"]);
    } catch (e) {
      expect(e).toEqual("invalid integer/float provided");
    }
  });
});

describe("classifyGeometry", async () => {
  it("classifies a geometry", async () => {
    await expect(
      classifyGeometry({
        sides: EQUILATERAL,
        geometryLabel: "triangle"
      })
    ).resolves.toEqual({
      geometryLabel: "triangle",
      type: "equilateral",
      sides: EQUILATERAL
    });
  });
  it("rejects an invalid geometry", async () => {
    await expect(
      classifyGeometry({
        sides: [1.2, 1.6, 99],
        geometryLabel: "triangle"
      })
    ).rejects.toEqual("not a valid triangle");
  });
  it("rejects a valid geometry it can't classify", async () => {
    await expect(
      classifyGeometry({
        sides: [2, 3.93, 2],
        geometryLabel: "triangle"
      })
    ).rejects.toEqual("not a known triangle type");
  });
});
