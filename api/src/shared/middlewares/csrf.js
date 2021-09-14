// @flow
import hostValidation from 'host-validation';

// NOTE(@mxstbr):
// - Host header only contains the domain, so something like 'build-api-asdf123.now.sh' or 'spectrum.chat'
// - Referer header contains the entire URL, so something like 'https://build-api-asdf123.herokuapp.com/forward' or 'https://findadmission.chat/forward'
// That means we have to check the Host slightly differently from the Referer to avoid things like 'my-domain-findadmission.com' to be able to hack our users

// Hosts, without http(s):// and paths
const trustedHosts = [
  process.env.NOW_URL &&
    new RegExp(`^${process.env.NOW_URL.replace('https://', '')}$`),
  /^findadmission\.com$/,
  // All subdomains
  /^.*\.findadmission\.com$/,
].filter(Boolean);

// Referers, with http(s):// and paths
const trustedReferers = [
  process.env.HEROKU_URL && new RegExp(`^${process.env.NOW_URL}($|\/.*)`),
  /^https:\/\/findadmission\.com($|\/.*)/,
  // All subdomains
  /^https:\/\/.*\.findadmission\.com($|\/.*)/,
].filter(Boolean);

export default hostValidation({
  hosts: trustedHosts,
  referers: trustedReferers,
  mode: 'either',
});
