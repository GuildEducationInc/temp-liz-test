export const getSubDomain = () => {
  let urlSubdomain: string | undefined;
  const subdomains = location.hostname.split('.');
  if (subdomains.length > 2) {
    urlSubdomain = subdomains[0] !== 'www' ? subdomains[0] : undefined;
  }
  return urlSubdomain;
};
