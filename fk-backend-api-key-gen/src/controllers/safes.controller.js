import { Safe } from "../models/Safe.js";

export const getSafes = async (req, res) => {
  try {
    const Safes = await Safe.findAll({
      attributes: ["id", "name", "principal_investment" ,"valuation_cap", "valuation_cap_denom", "discount", "security_id"],
      order: [["id", "DESC"]],
    });
    res.json(Safes);
  } catch (error) {}
};

export const createSafe = async (req, res) => {
  const { name, valuation_cap, valuation_cap_denom, discount, security_id } = req.body;

  try {
    const newSafe = await Safe.create({
      name,
      principal_investment,
      valuation_cap,
      valuation_cap_denom,
      discount,
      security_id
    });

    res.json(newSafe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @param {[Array]} Safes - Array of Safes where discount should be a float
 * @param {number} authorized shares -  OG shares typically 10 million
 * @param {number} valuation409A - Projected 409A valuation
 */
export const stackDilution = async (req, res) => {
  const { safes, authorized_shares, valuation409A } = req.body;
  if (typeof authorized_shares === 'undefined' || typeof valuation409A === 'undefined') {
    return res.status(500).json({ message: error.message });
  } 
  if (safes.length === 0) {
    return res.status(200).json({ message: "No Safes in parameters!" });
  }
  let count = safes.length;

  // figure out discounts for all safes
  let discounts = safes.map(safe => safe.discount)
  
  let discountRatios = safes.map(function (safe) {
    let { principal_investment, discount } = safe;
    let complement = 1 - discount;
    let adjustedValuation = principal_investment * complement; // analagous to valuation cap but derived with discount
    return principal_investment / adjustedValuation;
  })

  let valCapRatios = safes.map(function (safe) {
    let { principal_investment, valuation_cap } = safe;
    return principal_investment / valuation_cap;
  });

  let percentages = []; //ownership percentages
  for (var i = 0; i < count; i++) {
    percentages.push(getLargerNumber(discountRatios[i],valCapRatios[i]))
  }

  let sumOwnershipSafeHolders = percentages.reduce((memo, num) => memo + num, 0);
  let totalSharesIncludingSafes = authorized_shares / (1 - sumOwnershipSafeHolders);
  let safeOwnershipBreakdown = percentages.map(safeOwnershipPercent => {
    return safeOwnershipPercent * totalSharesIncludingSafes;
  })

  res.json({
    safeOwnershipBreakdown,
    totalSharesIncludingSafes, // need math floor or math ceiling
    percentages // need to trim values to a certain degree of floating precision
  });

}

function getLargerNumber(num1, num2) {
  if (num1 > num2) {
    return num1;
  } else {
    return num2;
  }
}






