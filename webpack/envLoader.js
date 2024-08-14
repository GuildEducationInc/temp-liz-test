/*
 * gather all env vars prefixed with REACT_APP_
 * If the BUILD_ENVIRONMENT is say PROD then we will override the env var with the prod version if it exists
 * BUILD_ENVIRONMENT = 'PROD' and REACT_APP_CATS = 'a' : REACT_APP_CATS_PROD = 'b' REACT_APP_CATS will then be set to b
 */
module.exports = {
  loadReactVars: data => {
    const env = {};
    const BUILD_ENVIRONMENT = data.BUILD_ENVIRONMENT || null;

    Object.keys(data).forEach(key => {
      if (key.includes('REACT_APP_')) {
        if (BUILD_ENVIRONMENT) {
          const envKey = `${key}_${BUILD_ENVIRONMENT}`;
          if (envKey in data) {
            delete data[key];
            env[key] = data[envKey];
          } else {
            env[key] = data[key];
          }
        } else {
          env[key] = data[key];
        }
      }
    });
    return env;
  },
};
