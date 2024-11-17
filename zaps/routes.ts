/**
 * Routes that are public
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
]


/**
 * Routes that are used for auth
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login", 
    "/auth/signup",
]

/**
 * Important route for authentication
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";