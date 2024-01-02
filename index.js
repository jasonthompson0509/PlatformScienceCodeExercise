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

  //console.log(shipmentDestinations);
  //console.log(driverNames);

  const matches = {};

  shipmentDestinations.forEach((destination) => {
    let maxScore = 0;
    let bestDriver = "";

    driverNames.forEach((driver) => {
      if (!matches[driver]) {
        const score = calculateSuitabilityScore(destination, driver);

        if (score > maxScore) {
          maxScore = score;
          bestDriver = driver;
        }

        //        console.log(
        //         `Dest: ${destination} ~ Driver: ${driver} ~ Score: ${score} ~ Max Score: ${maxScore} ~ Best Driver: ${bestDriver}`
        //      );
      }
    });

    if (bestDriver) {
      matches[bestDriver] = destination;
    }
  });

  let totalScore = 0;

  for (const driver in matches) {
    const score = calculateSuitabilityScore(matches[driver], driver);
    totalScore += score;
    console.log(`${matches[driver]} -> ${driver}`);
  }

  console.log("Total Suitability Score:", totalScore);
}

main();
