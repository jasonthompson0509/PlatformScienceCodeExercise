function calculateSuitabilityScore(destination, driver) {
  let baseSuitabilityScore = 0;

  // If the length of the shipment's destination street name is even the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
  // If the length of the shipment's destination street name is odd the base SS is the number of consonants in the driver’s name multiplied by 1.
  if (destination.length % 2 === 0) {
    const vowelCount = driver.toLowerCase().match(/[aeiou]/gi);
    baseSuitabilityScore = (vowelCount ? vowelCount.length : 0) * 1.5;
  } else {
    const consonantCount = driver
      .toLowerCase()
      .match(/[bcdfghjklmnpqrstvwxyz]/gi);
    baseSuitabilityScore = (consonantCount ? consonantCount.length : 0) * 1;
  }

  //If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.
  //For example, if provided a driver file with Daniel Davidson on one line and an address file with 44 Fake Dr., San Diego, CA 92122 on a line, that pairing’s suitability score would be 9 .
  function getCommonFactors(a, b) {
    const smaller = a > b ? b : a;
    const factors = [];
    for (let i = 2; i <= smaller; i++) {
      if (a % i === 0 && b % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  }

  const commonFactors = getCommonFactors(destination.length, driver.length);
  const finalScore =
    commonFactors.length > 0
      ? baseSuitabilityScore * 1.5
      : baseSuitabilityScore;

  return finalScore;
}

module.exports = {
  calculateSuitabilityScore,
};
