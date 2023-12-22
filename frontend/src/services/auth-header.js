export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return {
      Authorization: `Bearer ${user.access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  return {};
}
