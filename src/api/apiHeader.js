export function ApiHeaders(type = "POST", token = "") {
  return {
    method: type,
    mode: "no-core",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
}
