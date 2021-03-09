export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(`auth-header ${JSON.stringify(user)}`);

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}

// TODO: check for tocken timeout