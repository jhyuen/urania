// all access driven through BASE. Must end with a SLASH
// be sure you change to accommodate your specific API Gateway entry point
export const base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";

//var add_url    = base_url + "calculator";   // POST
//var list_url   = base_url + "constants";    // GET
const create_snippet_url = base_url + "new_snippet";    // POST
//var delete_url = base_url + "constants";    // POST with {name} so we avoid CORS issues
 
