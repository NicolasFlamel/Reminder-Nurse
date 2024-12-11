import decode from 'jwt-decode';

type DecodedToken = {
  data: { _id: string; username: string };
  exp: number;
  iat: number;
};
class AuthService {
  decoded(token: string) {
    return decode<DecodedToken>(token);
  }
  getProfile() {
    const token = this.getToken();

    return token ? this.decoded(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string) {
    // Decode the token to get its expiration time that was set by the server
    const decoded: DecodedToken = this.decoded(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();
