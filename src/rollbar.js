import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  enabled: true,
  accessToken: 'b4ec8daa755547c5864ed1d3bd516889',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
