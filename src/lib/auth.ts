export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "user";
    lastLogin: string;
}

const CURRENT_USER_KEY = "arivision_current_user";
const ALL_USERS_KEY = "arivision_all_users";

export function getCurrentUser(): User | null {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
}

export function loginUser(user: Omit<User, "lastLogin">): User {
    const fullUser: User = { ...user, lastLogin: new Date().toISOString() };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(fullUser));

    // Save to all users tracking list
    const allUsers = getAllUsers();
    const existingIndex = allUsers.findIndex((u) => u.email === fullUser.email);
    if (existingIndex >= 0) {
        allUsers[existingIndex] = fullUser;
    } else {
        allUsers.push(fullUser);
    }
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));

    return fullUser;
}

export function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export function getAllUsers(): User[] {
    const data = localStorage.getItem(ALL_USERS_KEY);
    return data ? JSON.parse(data) : [];
}

export function clearAuthData() {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(ALL_USERS_KEY);
}
