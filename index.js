const fs = require("fs").promises;
const { calculateSuitabilityScore } = require("./calculate-suitability-score");

const [, , addresssessFilePath, driversFilePath] = process.argv;

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
  const shipmentDestinations = await parseFile(
    addresssessFilePath ? addresssessFilePath : "addresses.txt"
  );
  const driverNames = await parseFile(
    driversFilePath ? driversFilePath : "drivers.txt"
  );

  console.log(shipmentDestinations);
  console.log(driverNames);

  const matches = {};
  let totalScore = 0;

  shipmentDestinations.forEach((destination) => {
    let maxScore = 0;
    let bestDriver = "";

    driverNames.forEach((driver) => {
      const score = calculateSuitabilityScore(destination, driver);

      if (!matches[driver] && score > maxScore) {
        maxScore = score;
        bestDriver = driver;
      }

      console.log(
        `Dest: ${destination} ~ Driver: ${driver} ~ Total Suitability Score: ${score}`
      );
    });

    if (bestDriver) {
      matches[bestDriver] = destination;
      totalScore += maxScore;
    }
  });

  console.log("Total Suitability Score:", totalScore);
  console.log("Driver -> Destination Match:");
  for (const driver in matches) {
    console.log(`${matches[driver]} -> ${driver}`);
  }
}

main();
