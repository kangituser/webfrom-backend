const uniqueSRIDsFROMs = list => [...new Set(list.map(s => s.srId))];

module.exports = uniqueSRIDsFROMs;