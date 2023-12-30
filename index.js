const fs = require("fs").promises;
const { calculateSuitabilityScore } = require("./calculate-suitability-score");

async function parseFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    return lines;
  } catch (err) {
    throw new Error("Error reading file: ${filePath}");
  }
}

async function main() {
  const shipmentDestinations = await parseFile("addresses.txt");
  const driverNames = await parseFile("drivers.txt");

  console.log(shipmentDestinations);
  console.log(driverNames);

  shipmentDestinations.forEach((destination) => {
    driverNames.forEach((driver) => {
      const score = calculateSuitabilityScore(destination, driver);

      console.log(
        `Dest: ${destination} ~ Driver: ${driver} ~ Total Suitability Score: ${score}`
      );
    });
  });
}

main();
