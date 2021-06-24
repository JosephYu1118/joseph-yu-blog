const stripHtmlTags = (source) => {
  if (!source) return '';
  const result = source
    .toString()
    .replace(/(<([^>]+)>)/ig, '');

  return result;
};

export default stripHtmlTags;
