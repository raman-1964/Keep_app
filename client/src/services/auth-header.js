export default function authHeader(){
  const token = localStorage.getItem("Raman-Keep-Token");
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBjYzdkYjJkMmQ4M2QwNDE2YmQ5ODUiLCJlbWFpbCI6InJhbWFuQHJhbWFuLmNvbSIsImlhdCI6MTY3ODU1OTE5NX0.70THwDJ9UfrReyCiejW-_IHRYYCUbhOQfAMsU0x2_Wg"
  if (token) return { "x-auth-token": token };
  return {};
};
