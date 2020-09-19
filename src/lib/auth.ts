export const authWithOauth = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  const [authorization, refreshToken] = [
    params.get("authorization"),
    params.get("refreshToken"),
  ];
  if (authorization !== null && refreshToken !== null) {
    localStorage.setItem("authorization", authorization);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("authorization");
  localStorage.removeItem("refreshToken");
};
