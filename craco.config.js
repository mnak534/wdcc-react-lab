//CRACO(Create React App Configuration Override) is used to override the 
//configuration files of React, without ejecting(forcing out in a sudden way) react scripts config files.

const { POSTCSS_MODES } = require("@craco/craco");

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file,
    },
  },
};
