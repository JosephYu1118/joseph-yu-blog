const pageUtils = {
  /**
   * Join provided url paths.
   * @param {...string} paths Provided paths. It doesn't matter if they have trailing slash.
   * @return {string} Resolved url without trailing slash.
   */
  resolveUrl: (...paths) => paths.reduce((resolvedUrl, path) => {
    const urlPath = path.toString().trim();
    let modifiedResolvedUrl = resolvedUrl;

    if (urlPath) {
      modifiedResolvedUrl += (modifiedResolvedUrl === '' ? '' : '/') + urlPath.replace(/^\/|\/$/g, '');
    }
    modifiedResolvedUrl = modifiedResolvedUrl[0] !== '/' ? `/${modifiedResolvedUrl}` : modifiedResolvedUrl;

    return modifiedResolvedUrl;
  }, ''),
  /**
   * Resolve a page url adding a trailing slash.
   * Needed to prevent 301 redirects cause of Gatsby.js' folder structure.
   * @param {...string} path Provided paths. It doesn't matter if they have trailing slash.
   * @return {string} Resolved url with trailing slash.
   */
  resolvePageUrl: (...path) => {
    const resolvedUrl = pageUtils.resolveUrl(...path);

    return resolvedUrl;
  },
};

module.exports = pageUtils;
