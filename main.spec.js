const { calculateSuitabilityScore } = require("./calculate-suitability-score");

describe("calculateSuitabilityScore function", () => {
  test("should calculate the suitability score correctly", () => {
    const destination = "44 Fake Dr., San Diego, CA 92122";
    const driver = "Daniel Davidson";
    const expectedScore = 9;

    const actualScore = calculateSuitabilityScore(destination, driver);
    expect(actualScore).toBe(expectedScore);
  });
});
