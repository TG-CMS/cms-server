function hello(r) {
  const c = require('crypto');
  const url = r.variables.request_uri;
  r.return(200, `${url}`);
}
export default { hello };
