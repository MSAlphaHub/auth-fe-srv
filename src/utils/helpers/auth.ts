export function getBearerToken(token: string) {
  return token ? `Bearer ${token}` : '';
}

export function isTokenExpired(key: string) {
  const token: string | null = localStorage.getItem(key);
  if (!token) return true;
  const decodedToken = JSON.parse(atob(token?.split('.')[1]));

  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}
