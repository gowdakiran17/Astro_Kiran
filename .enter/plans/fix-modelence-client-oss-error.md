# Fix: Remove modelence/client renderApp to stop POST requests to static CDN

## Context
The Enter.pro preview serves the built app as static files from Alibaba Cloud OSS.
`renderApp` from `modelence/client` makes an immediate POST request on page load to initialise a server-side session.
OSS returns `MethodNotAllowed` for POST, crashing the app before any UI renders.

All modelence auth helpers (`useSession`, `loginWithPassword`, `signupWithPassword`, `logout`) also make POST/GET requests to a backend that doesn't exist in the static preview.

## Solution
Replace every modelence/client dependency with self-contained alternatives that work in a pure static environment:

1. **`src/client/lib/auth.tsx`** (new) — lightweight `AuthContext` + `useAuth` hook
   - Stores `{ id, email, handle }` in `localStorage` under key `_session`
   - Provides `login(email, password)`, `signup(email, password)`, `logout()`
   - No HTTP requests — state is purely local for preview; backend calls can be wired in later

2. **`src/client/index.tsx`** — replace `renderApp(…)` with:
   ```tsx
   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <AuthProvider>
         <RouterProvider router={router} />
       </AuthProvider>
     </React.StrictMode>
   );
   ```

3. **`src/client/router.tsx`** — replace `useSession` import from `modelence/client` with `useAuth` from `../lib/auth`; map `user` field identically so `GuestRoute` / `PrivateRoute` logic is unchanged.

4. **`src/client/pages/DashboardPage.tsx`** — replace `useSession, logout` from `modelence/client` with `useAuth` from `../lib/auth`.

5. **`src/client/pages/LoginPage.tsx`** — replace `loginWithPassword` with `auth.login(email, password)`.

6. **`src/client/pages/SignupPage.tsx`** — replace `signupWithPassword` with `auth.signup(email, password)`.

7. **`src/client/pages/LogoutPage.tsx`** — replace `logout` with `auth.logout()`.

## Files to modify
- `src/client/lib/auth.tsx` (create)
- `src/client/index.tsx`
- `src/client/router.tsx`
- `src/client/pages/DashboardPage.tsx`
- `src/client/pages/LoginPage.tsx`
- `src/client/pages/SignupPage.tsx`
- `src/client/pages/LogoutPage.tsx`

## Verification
- Build must complete without errors
- Preview URL must load without a MethodNotAllowed / MethodError console error
- Navigating to `/` should redirect to `/login` (no user in storage)
- Filling in the login form should persist a session and redirect to the dashboard
- Clicking "Sign out" should clear the session and redirect to `/login`
