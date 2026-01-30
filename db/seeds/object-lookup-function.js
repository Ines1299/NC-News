function objectLookup(rows, keyName, keyAsValueName) {
  const lookup = {};

  for (let i = 0; i < rows.length; i++) {
    lookup[rows[i][keyName]] = rows[i][keyAsValueName];
  }

  return lookup;
}

module.exports = objectLookup;
