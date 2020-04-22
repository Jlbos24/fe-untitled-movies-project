const extractTitleId = (titlePath) => {
  if (titlePath.length === 0) {
    return "";
  }

  const getPath = titlePath;

  const titleId = getPath.match(/([t]{2})\w+/);

  return titleId[0];
};

module.exports = { extractTitleId };
