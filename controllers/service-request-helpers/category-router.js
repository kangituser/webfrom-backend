const SR_CAT = require('../../models/sr_categories');
const MAL_CAT = require('../../models/malfunction_categories');

module.exports = async (main, cat) => {
  try {
    switch (main) {
      case 3: return await mapper(cat, SR_CAT);
      case 4: return await mapper(cat, MAL_CAT);
      default: return ' ';
    }
  } catch (err) {
    throw err;
  }
};

const mapper = async (catId, model) =>
  await model.findOne({
    where: { catId },
    attributes: ["catName"],
    raw: true,
  });
