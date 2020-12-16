const SERVICE_CATEGORIES = require('../../models/sr_categories');
const MALFUNCTION_CATEGORIES = require('../../models/malfunction_categories');

module.exports = async (main, cat) => {
  try {
    switch (main) {
      case 3: return await mapper(cat, SERVICE_CATEGORIES);
      case 4: return await mapper(cat, MALFUNCTION_CATEGORIES);
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
