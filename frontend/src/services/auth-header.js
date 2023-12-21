export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return {
      Authorization: `Bearer ${user}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  return {};
}
