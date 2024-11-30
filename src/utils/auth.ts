import { jwtDecode } from 'jwt-decode';
export default {
    tokenName: 'accessToken',
    removeToken() {
        localStorage.removeItem(this.tokenName);
    },
    getToken() {
        return localStorage.getItem(this.tokenName) as string;
    },
    getDecodedToken() {
        const token = this.getToken();

        try {
            return jwtDecode(token);
        } catch (e) {
            return null;
        }
    },
    isTokenExpired() {
        const token = this.getDecodedToken();
        if (!token) return true;

        const currentTime = Date.now() / 1000;
        return token.exp! < currentTime;
    },
};
