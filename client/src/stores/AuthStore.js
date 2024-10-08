import { create } from 'zustand';
import withStore from '../decorators/StoreDecorator';
import { jwtDecode } from "jwt-decode";

const storageKey = "token"

const getTokenData = () => {
    const token = localStorage.getItem(storageKey)
    if (token) {
        return jwtDecode(token);
    }
    return null;
}

const useAuthStore = create((set, get) => ({
    user: getTokenData(),
    token: localStorage.getItem(storageKey),
    setToken: (token) => set(() => {
        localStorage.setItem(storageKey, token);
        return { user: getTokenData(), token: token }
    }),
    removeToken: () => set(() => {
        localStorage.removeItem(storageKey);
        return { user: getTokenData(), token: null }
    }),
    isValid: () => {
        if (!get().user) {
            return false;
        }
        const currentTime = Date.now() / 1000;
        return get().user.exp > currentTime;        
    }
}));

const withAuthStore = withStore({useAuthStore})

export { useAuthStore, withAuthStore };
