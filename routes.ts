/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification"
]

/**
 * An array of protected routes that require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
]

/**
 * The prefix for the authenticate routes
 * @type {string}
 */ 
export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"