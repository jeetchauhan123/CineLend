# CineLend — Comprehensive Project Audit

**Audit Date**: October 2026  
**Status**: Completed Full Codebase Inspection  
**Application Modification Status**: No application code modified (Read-only Audit Phase)

---

## Table of Contents
1. [Audit Scope & Files Inspected](#1-audit-scope--files-inspected)
2. [Section 1: Missing & Incomplete Functionality](#section-1-missing--incomplete-functionality)
3. [Section 2: Frontend & Backend Integration](#section-2-frontend--backend-integration)
4. [Section 3: API Errors & Incorrect Responses](#section-3-api-errors--incorrect-responses)
5. [Section 4: Authentication & Authorization](#section-4-authentication--authorization)
6. [Section 5: Database Operations & Relationships](#section-5-database-operations--relationships)
7. [Section 6: Logical Errors & Edge Cases](#section-6-logical-errors--edge-cases)
8. [Section 7: Security Vulnerabilities](#section-7-security-vulnerabilities)
9. [Section 8: Performance & Optimization](#section-8-performance--optimization)
10. [Section 9: UI Design, Colors, Typography & Consistency](#section-9-ui-design-colors-typography--consistency)
11. [Section 10: Responsive Design & Accessibility](#section-10-responsive-design--accessibility)
12. [Section 11: Broken Links, Navigation & User Workflows](#section-11-broken-links-navigation--user-workflows)
13. [Section 12: Unused Code & Unnecessary Dependencies](#section-12-unused-code--unnecessary-dependencies)
14. [Audit Summary & Action Priority Matrix](#audit-summary--action-priority-matrix)

---

## 1. Audit Scope & Files Inspected

### Backend Files
- `Backend/server.js`
- `Backend/package.json`
- `Backend/config/db.js`
- `Backend/middleware/authMiddleware.js`
- `Backend/utils/pricing.js`
- `Backend/models/User.js`
- `Backend/models/Movie.js`
- `Backend/models/Rental.js`
- `Backend/models/Cart.js`
- `Backend/models/Collection.js`
- `Backend/models/CollectionMovie.js`
- `Backend/models/Comment.js`
- `Backend/models/SampleComment.js`
- `Backend/models/Like.js`
- `Backend/routes/userRoutes.js`
- `Backend/routes/movieRoutes.js`
- `Backend/routes/rentalRoutes.js`
- `Backend/routes/cartRoutes.js`
- `Backend/routes/collectionRoutes.js`
- `Backend/routes/commentRoutes.js`
- `Backend/routes/likeRoutes.js`
- `Backend/controllers/userController.js`
- `Backend/controllers/movieController.js`
- `Backend/controllers/rentalController.js`
- `Backend/controllers/cartController.js`
- `Backend/controllers/collectionController.js`
- `Backend/controllers/commentController.js`
- `Backend/controllers/likeController.js`
- `Backend/data/genres.js`
- `Backend/data/movies.js`

### Frontend Files
- `Frontend/package.json`
- `Frontend/vite.config.js`
- `Frontend/vercel.json`
- `Frontend/eslint.config.js`
- `Frontend/src/main.jsx`
- `Frontend/src/App.jsx`
- `Frontend/src/App.css`
- `Frontend/src/index.css`
- `Frontend/src/routes/router.jsx`
- `Frontend/src/context/AuthContext.jsx`
- `Frontend/src/context/ThemeContext.jsx`
- `Frontend/src/services/discoverService.js`
- `Frontend/src/constants/discover.js`
- `Frontend/src/hooks/useDebounce.js`
- `Frontend/src/components/Icon.jsx`
- `Frontend/src/components/Navbar/Navbar.jsx`
- `Frontend/src/components/Navbar/Navbar.css`
- `Frontend/src/components/Footer/Footer.jsx`
- `Frontend/src/components/Footer/Footer.css`
- `Frontend/src/components/HeroSlider/HeroSlider.jsx`
- `Frontend/src/components/HeroSlider/HeroSlider.css`
- `Frontend/src/components/homemovie/HomeMovies.jsx`
- `Frontend/src/components/homemovie/MovieCard.jsx`
- `Frontend/src/components/homemovie/MovieCard.css`
- `Frontend/src/components/homemovie/MovieRow.jsx`
- `Frontend/src/components/homemovie/MovieRow.css`
- `Frontend/src/components/OnboardingModal/OnboardingModal.jsx`
- `Frontend/src/components/OnboardingModal/OnboardingModal.css`
- `Frontend/src/components/Skeleton/Skeleton.jsx`
- `Frontend/src/components/Skeleton/Skeleton.css`
- `Frontend/src/pages/Home.jsx`
- `Frontend/src/pages/About/About.jsx`
- `Frontend/src/pages/About/About.css`
- `Frontend/src/pages/Login/Login.jsx`
- `Frontend/src/pages/Login/Login.css`
- `Frontend/src/pages/Register/Register.jsx`
- `Frontend/src/pages/Register/Register.css`
- `Frontend/src/pages/Auth.css`
- `Frontend/src/pages/Discover/Discover.jsx`
- `Frontend/src/pages/Discover/Discover.css`
- `Frontend/src/pages/Discover/Component/DiscoverSidebar.jsx`
- `Frontend/src/pages/Discover/Component/DiscoverSidebar.css`
- `Frontend/src/pages/Discover/Component/CheckboxGroup.jsx`
- `Frontend/src/pages/Discover/Component/CheckboxGroup.css`
- `Frontend/src/pages/Discover/Component/FilterChips.jsx`
- `Frontend/src/pages/Discover/Component/FilterChips.css`
- `Frontend/src/pages/Discover/Component/FilterGroup.jsx`
- `Frontend/src/pages/Discover/Component/FilterGroup.css`
- `Frontend/src/pages/Discover/Component/PersonSearch.jsx`
- `Frontend/src/pages/Discover/Component/PersonSearch.css`
- `Frontend/src/pages/Discover/Component/RangeFilter.jsx`
- `Frontend/src/pages/Discover/Component/RangeFilter.css`
- `Frontend/src/pages/Discover/Component/RatingSlider.jsx`
- `Frontend/src/pages/Discover/Component/RatingSlider.css`
- `Frontend/src/pages/MovieDetails/MovieDetails.jsx`
- `Frontend/src/pages/MovieDetails/MovieDetails.css`
- `Frontend/src/pages/MovieDetails/components/hero/MovieHero.jsx`
- `Frontend/src/pages/MovieDetails/components/hero/MovieHero.css`
- `Frontend/src/pages/MovieDetails/components/hero/CollectionModal.jsx`
- `Frontend/src/pages/MovieDetails/components/hero/CollectionModal.css`
- `Frontend/src/pages/MovieDetails/components/overview/MovieOverview.jsx`
- `Frontend/src/pages/MovieDetails/components/overview/MovieOverview.css`
- `Frontend/src/pages/MovieDetails/components/about/MovieAbout.jsx`
- `Frontend/src/pages/MovieDetails/components/about/MovieAbout.css`
- `Frontend/src/pages/MovieDetails/components/cast/MovieCastCrew.jsx`
- `Frontend/src/pages/MovieDetails/components/cast/MovieCastCrew.css`
- `Frontend/src/pages/MovieDetails/components/awards/MovieAwardsFacts.jsx`
- `Frontend/src/pages/MovieDetails/components/awards/MovieAwardsFacts.css`
- `Frontend/src/pages/MovieDetails/components/comments/MovieComments.jsx`
- `Frontend/src/pages/MovieDetails/components/comments/MovieComments.css`
- `Frontend/src/pages/MovieDetails/components/related/RelatedMovies.jsx`
- `Frontend/src/pages/MovieDetails/components/related/MovieRelated.css`
- `Frontend/src/pages/Cart/Cart.jsx`
- `Frontend/src/pages/Cart/Cart.css`
- `Frontend/src/pages/Cart/components/RentalPanel.jsx`
- `Frontend/src/pages/Cart/components/RentalPanel.css`
- `Frontend/src/pages/Checkout/Checkout.jsx`
- `Frontend/src/pages/Checkout/Checkout.css`
- `Frontend/src/pages/Payment/Payment.jsx`
- `Frontend/src/pages/Payment/Payment.css`
- `Frontend/src/pages/PaymentSuccess/PaymentSuccess.jsx`
- `Frontend/src/pages/PaymentSuccess/PaymentSuccess.css`
- `Frontend/src/pages/Profile/Profile.jsx`
- `Frontend/src/pages/Profile/Profile.css`
- `Frontend/src/pages/Profile/components/ProfileHeader.jsx`
- `Frontend/src/pages/Profile/components/ProfileHeader.css`
- `Frontend/src/pages/Profile/components/ProfileNavigation.jsx`
- `Frontend/src/pages/Profile/components/ProfileNavigation.css`
- `Frontend/src/pages/Profile/components/overview/ProfileOverview.jsx`
- `Frontend/src/pages/Profile/components/overview/ProfileOverview.css`
- `Frontend/src/pages/Profile/components/rented/RentedMovies.jsx`
- `Frontend/src/pages/Profile/components/rented/RentedMovies.css`
- `Frontend/src/pages/Profile/components/collections/Collections.jsx`
- `Frontend/src/pages/Profile/components/collections/Collections.css`
- `Frontend/src/pages/Profile/components/comments/MyComments.jsx`
- `Frontend/src/pages/Profile/components/comments/MyComments.css`
- `Frontend/src/pages/Profile/components/account/AccountSettings.jsx`
- `Frontend/src/pages/Profile/components/account/AccountSettings.css`
- `Frontend/src/ReactCount/React.jsx`

---

## Section 1: Missing & Incomplete Functionality

### 1.1 Liked Movies Section in Profile
- **Type**: Verified Bug / Missing Feature
- **File**: `Frontend/src/pages/Profile/components/overview/ProfileOverview.jsx:406-427` & `Frontend/src/pages/Profile/Profile.jsx:58-75`
- **Severity**: High
- **Explanation**: Users can upvote movies on the movie details page, and `ProfileOverview` renders a stat card displaying the total liked movies count. However, the button has **no `onClick` handler**, and `Profile.jsx` contains no tab or component to view the user's liked movies. The backend already provides `GET /likes` (`getMyLikes`), but there is no frontend screen to display them.
- **Recommended Fix**: 
  1. Add a `"likes"` view to `Profile.jsx`'s `renderSection` switch statement.
  2. Implement a `LikedMovies.jsx` component that calls `GET /likes` and displays movie cards with unlike and view actions.
  3. Wire the button in `ProfileOverview.jsx` to `onClick={() => onSectionChange("likes")}`.

### 1.2 "Edit Account" Button in Profile Header is Unresponsive
- **Type**: Verified Bug
- **File**: `Frontend/src/pages/Profile/components/ProfileHeader.jsx:32-34`
- **Severity**: Medium
- **Explanation**: The ProfileHeader component renders an `<button type="button" className="profile-edit-btn">Edit Account</button>`, but it receives no callback prop and has no `onClick` event listener. Clicking it does nothing.
- **Recommended Fix**: Pass `onEditAccount={() => setActiveSection("account")}` from `Profile.jsx` down to `ProfileHeader.jsx` and attach it to the button's `onClick`.

### 1.3 Hero Slider Missing Loading Skeleton (Layout Shift)
- **Type**: Verified Bug / UX Flaw
- **File**: `Frontend/src/components/HeroSlider/HeroSlider.jsx:67-69`
- **Severity**: Medium
- **Explanation**: If `movies.length === 0` (while loading or awaiting backend wake-up), the component executes `return null;`. This causes a noticeable Cumulative Layout Shift (CLS), as the entire page header collapses and suddenly pops in when the API responds.
- **Recommended Fix**: Render a full-height HeroSlider skeleton banner (`<div className="hero-slider-skeleton"><Skeleton width="100%" height="85vh" /></div>`) until movie data resolves.

### 1.4 Global Navigation Bar Lacks Search Trigger
- **Type**: Suggestion / Backlog Item
- **File**: `Frontend/src/components/Navbar/Navbar.jsx:62-84`
- **Severity**: Low
- **Explanation**: The site's primary discovery navigation is located in the navbar, but there is no search icon or input field in the navbar. A user wanting to search for a specific title must know to click "Discover" first.
- **Recommended Fix**: Add a search button/input in `Navbar.jsx` with an input field or a quick overlay dialog navigating to `/discover?search=<query>`.

### 1.5 Optimistic Comment Feedback State
- **Type**: Suggestion / Incomplete UI
- **File**: `Frontend/src/pages/MovieDetails/components/comments/MovieComments.jsx:110-150`
- **Severity**: Low
- **Explanation**: When posting a comment, the form is disabled until the network request completes. If the backend is on a free-tier spin-up or high latency, the user receives no visual confirmation that their comment has entered the queue.
- **Recommended Fix**: Implement optimistic rendering: add the comment to the comments array immediately with an `isPending: true` flag (rendered with dimmed opacity or a "Posting..." tag), replacing it with the server response once resolved.

### 1.6 Uncapped Maximum Rental Duration
- **Type**: Potential Risk
- **File**: `Backend/utils/pricing.js:84-98`
- **Severity**: Medium
- **Explanation**: Custom rental calculations validate `Number.isInteger(days) && days > 0`, but impose no upper limit (e.g. `days <= 730`). A user or script can submit `days = 10000000`, causing integer overflow or non-realistic rental periods.
- **Recommended Fix**: In `pricing.js`, enforce a maximum threshold: `if (days > 730) throw new Error("Maximum rental duration is 730 days (2 years)");`.

### 1.7 Visited Movies "Continue Exploring" Memory
- **Type**: Suggestion / Backlog Item
- **File**: `Frontend/src/pages/Profile/components/overview/ProfileOverview.jsx:485-511`
- **Severity**: Low
- **Explanation**: The "Continue Exploring" card on the profile page currently renders a static promotional message with a generic link to `/discover`. The intended feature from `Frontend/README.md` was to store recently visited movie IDs in `localStorage` and display horizontal thumbnail cards of recently viewed titles.
- **Recommended Fix**: In `MovieDetails.jsx`, record `id` in `localStorage.getItem("recentMovies")` on mount, and load those recent movies in `ProfileOverview.jsx`.

---

## Section 2: Frontend & Backend Integration

### 2.1 Incompatible Release Year URL Parameter in Movie Facts
- **Type**: Verified Bug
- **File**: `Frontend/src/pages/MovieDetails/components/awards/MovieAwardsFacts.jsx:79-84`
- **Severity**: High
- **Explanation**: Clicking the release year in the "Awards & Facts" section navigates to `/discover?year=1994`. However, `Discover.jsx` does not read a `year` parameter—it reads `yearFrom` and `yearTo`. As a result, the Discover page completely ignores the filter, displaying default unfiltered results. (In contrast, `MovieHero.jsx:35-39` correctly sets both `yearFrom` and `yearTo`).
- **Recommended Fix**:
  In `MovieAwardsFacts.jsx`, change:
  ```jsx
  // Current:
  <Link to={discoverLink("year", releaseYear)} className="movie-discover-link">
  
  // Fixed:
  <Link to={`/discover?yearFrom=${releaseYear}&yearTo=${releaseYear}`} className="movie-discover-link">
  ```

### 2.2 Client-Side N+1 Request Cascades
- **Type**: Verified Bug / Major Performance Flaw
- **File**: 
  - `Frontend/src/pages/Cart/Cart.jsx:89-129` & `242-265`
  - `Frontend/src/pages/Profile/components/rented/RentedMovies.jsx:49-80`
  - `Frontend/src/pages/Profile/components/overview/ProfileOverview.jsx:202-227`
- **Severity**: High
- **Explanation**: 
  Because backend models (`Cart`, `Rental`) store only `movieId`, the backend endpoints return raw IDs:
  - When viewing the Cart, every `CartItem` issues its own `GET /movies/:id` and `GET /movies/:id/pricing`. For 10 items in cart, this generates 20 concurrent HTTP requests.
  - When clicking "Rent All", `openRentAll` makes another 20 duplicate HTTP requests.
  - In `RentedMovies.jsx`, the frontend performs a `Promise.all` fetching `GET /movies/:id` for every unique movie in the user's rental history.
  - On free-tier cloud hosting or mobile connections, this burst of 20–40 requests causes 429 rate limiting, slow loading, and connection drops.
- **Recommended Fix**:
  Update backend controllers to batch-populate movie metadata and pricing server-side before sending responses:
  - `cartController.getCart`: Query `Movie.find({ _id: { $in: movieIds } })`, attach movie details and pricing packages, and return rich item objects.
  - `rentalController.getMyRentals`: Query movies and attach `poster`, `genres`, and `rating` directly into the rental item objects.

### 2.3 Inconsistent HTTP Clients Across Frontend
- **Type**: Suggestion / Code Quality
- **File**: `Frontend/src/pages/Profile/Profile.jsx`, `AccountSettings.jsx`, `Collections.jsx`, `MyComments.jsx` vs `discoverService.js`, `MovieHero.jsx`, `Cart.jsx`
- **Severity**: Low
- **Explanation**: Certain pages use the browser's native `fetch()` API (`AccountSettings.jsx`, `Collections.jsx`, `Profile.jsx`, `MyComments.jsx`), while all other services and pages use `axios`. This creates duplicate error handling logic, inconsistent header setups, and inconsistent JSON deserialization.
- **Recommended Fix**: Standardize on `axios` across all components or create a central `apiClient` instance with preconfigured `baseURL` and `Authorization` interceptor.

---

## Section 3: API Errors & Incorrect Responses

### 3.1 Orphaned CollectionMovie Records on Account Deletion
- **Type**: Verified Bug / Data Integrity Defect
- **File**: `Backend/controllers/userController.js:352`
- **Severity**: High
- **Explanation**: In `deleteAccount`, line 352 runs:
  ```js
  CollectionMovie.deleteMany({ userId })
  ```
  However, inspecting `Backend/models/CollectionMovie.js` reveals that the schema contains only `collectionId` and `movieId`. It has **no `userId` property**.
  As a consequence, Mongoose executes `{ userId: undefined }` (or matches nothing), deleting 0 records. All `CollectionMovie` join records are permanently orphaned in the database when a user account is deleted.
- **Recommended Fix**:
  Fetch user collection IDs first, and delete collection movies by `collectionId`:
  ```js
  // userController.js:
  const userCollections = await Collection.find({ userId }).select("_id");
  const collectionIds = userCollections.map((col) => col._id);
  
  await Promise.all([
    Rental.deleteMany({ userId }),
    Cart.deleteMany({ userId }),
    Like.deleteMany({ userId }),
    Comment.deleteMany({ userId }),
    CollectionMovie.deleteMany({ collectionId: { $in: collectionIds } }),
    Collection.deleteMany({ userId }),
    User.findByIdAndDelete(userId),
  ]);
  ```

### 3.2 Inconsistent Status Codes on Duplicate Likes
- **Type**: Verified Bug
- **File**: `Backend/controllers/likeController.js:35-39` vs `Frontend/src/pages/MovieDetails/components/hero/MovieHero.jsx:200-237`
- **Severity**: Low
- **Explanation**: If a user attempts to like an already-liked movie, `likeController` returns `409 Conflict`. If the frontend state desynchronizes (e.g. from rapid double-clicking), the request fails in the catch block and rolls back the optimistic UI, but does not gracefully re-synchronize like status.
- **Recommended Fix**: In `likeMovie`, treat an existing like idempotently: return `200 OK` with `{ liked: true, likeCount }` instead of treating it as a fatal 409 exception.

---

## Section 4: Authentication & Authorization

### 4.1 Missing Route Guards for Protected Pages
- **Type**: Verified Bug / Security & UX Defect
- **File**: `Frontend/src/routes/router.jsx:17-70`
- **Severity**: High
- **Explanation**:
  Routes `/profile`, `/cart`, and `/checkout` have no route protection guards:
  - If an unauthenticated user enters `/profile`, `Profile.jsx` renders an empty header (`Movie Lover`, `No email available`) and an empty library, without redirecting.
  - If an unauthenticated user visits `/checkout`, it displays "Checkout unavailable" with a link back to `/cart`.
- **Recommended Fix**:
  Create a reusable `<ProtectedRoute>` wrapper:
  ```jsx
  // Frontend/src/components/ProtectedRoute.jsx
  import { Navigate, useLocation } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";

  export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    return children;
  };
  ```
  Wrap `/profile`, `/cart`, and `/checkout` in `router.jsx`.

### 4.2 Inability to Invalidate Compromised JWTs
- **Type**: Potential Risk / Security Architectural Limitation
- **File**: `Backend/middleware/authMiddleware.js:3-25`
- **Severity**: Medium
- **Explanation**: JWTs are signed with a 7-day expiration (`expiresIn: "7d"`). There is no token blacklist, revocation list, or versioning in the `User` schema (`tokenVersion`). If a user changes their password or requests account deletion, existing JWT tokens remain valid until expiration. Furthermore, `authMiddleware` does not check if the user ID still exists in the database.
- **Recommended Fix**:
  In `authMiddleware.js`, perform a lightweight existence check:
  ```js
  const userExists = await User.exists({ _id: decoded.userId });
  if (!userExists) {
    return res.status(401).json({ message: "User account no longer exists" });
  }
  ```

---

## Section 5: Database Operations & Relationships

### 5.1 Missing Schema Indexes on Heavy Query Fields
- **Type**: Verified Bug / Severe Scalability Bottleneck
- **File**: `Backend/models/Movie.js`, `Backend/models/Comment.js`, `Backend/models/Like.js`, `Backend/models/Rental.js`
- **Severity**: High
- **Explanation**:
  - `Movie.js`: Has NO custom indexes defined. The Discover page filters and sorts on `released`, `genres`, `languages`, `countries`, `rated`, `runtime`, and `imdb.rating`. On MongoDB Atlas, every query without an index executes a Collection Scan (`COLLSCAN`).
  - `Comment.js`: Queries filter on `movieId` and `userId`. No index exists on either field.
  - `Like.js`: Has an index on `{ userId: 1, movieId: 1 }`. However, `likeController` executes `Like.countDocuments({ movieId })`. In MongoDB, an index with prefix `userId` **cannot** be used to index queries filtering solely on `movieId`.
  - `Rental.js`: Has an index on `userId: 1`, but queries in `createRental` and `getMyRentals` filter by `"items.movieId"`, `"items.status"`, and `expiresAt`.
- **Recommended Fix**:
  Add proper indexing:
  ```js
  // Movie.js
  movieSchema.index({ genres: 1 });
  movieSchema.index({ released: -1 });
  movieSchema.index({ "imdb.rating": -1 });
  movieSchema.index({ title: 1 });

  // Comment.js
  commentSchema.index({ movieId: 1, createdAt: -1 });
  commentSchema.index({ userId: 1 });

  // Like.js
  likeSchema.index({ movieId: 1 });

  // Rental.js
  rentalSchema.index({ userId: 1, "items.status": 1, "items.expiresAt": 1 });
  ```

### 5.2 Cross-Database Foreign Key Vulnerability
- **Type**: Architectural Limitation
- **File**: `Backend/config/db.js`
- **Severity**: Medium
- **Explanation**: Because `movies` live in `sampleDB` while `rentals`, `carts`, `collections`, `likes`, and `comments` live in `cineLendDB`, MongoDB cannot enforce referential integrity. If movies are pruned or modified in `sampleDB`, orphaned references in `cineLendDB` can result in null pointer exceptions in controllers that assume `Movie.findById` will always succeed.
- **Recommended Fix**: Ensure all controllers (`commentController`, `collectionController`, `cartController`, `rentalController`) explicitly check for `null` movie results when performing application-layer joins and filter out missing movie documents gracefully.

---

## Section 6: Logical Errors & Edge Cases

### 6.1 Concurrent Rental Race Condition
- **Type**: Verified Bug / Logic Defect
- **File**: `Backend/controllers/rentalController.js:34-68`
- **Severity**: Medium
- **Explanation**: `createRental` checks for existing active rentals using `await Rental.find(...)`. If a user double-clicks "Proceed to Payment" rapidly or fires two concurrent requests, both find 0 active rentals simultaneously, and both create active rentals for the exact same movie, charging the user twice.
- **Recommended Fix**: 
  1. Add a client-side submission lock (`processing` state is present, but ensure button is physically disabled).
  2. Implement an atomic check or a unique compound sparse index or transactional lock on active rentals per user.

### 6.2 RangeFilter Inverted Values Allowed
- **Type**: Verified Bug / UX Flaw
- **File**: `Frontend/src/pages/Discover/Component/RangeFilter.jsx:25-45`
- **Severity**: Medium
- **Explanation**: In `RangeFilter.jsx` (Release Year, Runtime), a user can input `min = 2024` and `max = 1980`. The component transmits `yearFrom=2024&yearTo=1980` to the API. MongoDB evaluates `$gte: 2024-01-01` AND `$lte: 1980-12-31`, which returns 0 results with no indication to the user that the bounds are inverted.
- **Recommended Fix**: Add a blur/change check: if `min > max` when both are non-empty, visually highlight the fields in red or auto-correct them.

### 6.3 Rental Expiration Only Updated on Read
- **Type**: Potential Risk
- **File**: `Backend/controllers/rentalController.js:176-189`
- **Severity**: Low
- **Explanation**: Expired items are only transitioned from `status = "active"` to `status = "expired"` when the user specifically hits `GET /rentals`. If a user never returns to their profile, their rental items remain permanently marked as `"active"` in the database.
- **Recommended Fix**: While `createRental` already checks `expiresAt > now`, a background cron job or scheduled task (or a scheduled TTL check) should regularly flag expired rentals.

---

## Section 7: Security Vulnerabilities

### 7.1 Regular Expression Denial of Service (ReDoS) / Unescaped Regex Injection
- **Type**: Verified Bug / High Security Vulnerability
- **File**: `Backend/controllers/movieController.js:180, 280, 286, 378, 388, 399`
- **Severity**: High
- **Explanation**:
  User-supplied query parameters (`search`, `cast`, `director`, `writer`, `type`) are injected directly into `$regex` without escaping special regex characters:
  ```js
  query.$or = [
    { title: { $regex: search, $options: "i" } },
    { fullplot: { $regex: search, $options: "i" } },
  ];
  ```
  - If a user searches for special characters like `(`, `[`, or `*`, MongoDB throws an uncaught Regex syntax error (`500 Internal Server Error`).
  - If an attacker sends catastrophic backtracking patterns (e.g. `search=(a+)+$`), MongoDB query threads will hang at 100% CPU, denying service to all other users.
- **Recommended Fix**:
  Add an `escapeRegex` helper in `Backend/utils/`:
  ```js
  const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  ```
  Wrap all user query inputs with `escapeRegex(search)` before passing to `$regex`.

### 7.2 Missing Rate Limiting on Authentication & Aggregation Endpoints
- **Type**: Potential Risk / Security Defect
- **File**: `Backend/server.js`, `Backend/routes/userRoutes.js`, `Backend/routes/movieRoutes.js`
- **Severity**: Medium
- **Explanation**: The application has no rate-limiting middleware (`express-rate-limit`). 
  - `POST /users/login` can be brute-forced without limit.
  - `GET /movies/people` performs expensive `$unwind` aggregations across the entire movie database and can be bombarded by automated scrapers.
- **Recommended Fix**:
  Install `express-rate-limit` and apply a strict limiter (e.g. 5 attempts per 15 minutes) on `/users/login` and `/users`, and a general rate limiter (e.g. 100 requests per 15 minutes) across public API routes.

### 7.3 Weak Password Policy at Registration
- **Type**: Verified Bug / Security Flaw
- **File**: `Backend/controllers/userController.js:18-22` vs `238-242`
- **Severity**: Medium
- **Explanation**: While `changePassword` validates `newPassword.length >= 6`, `createUser` (registration) only checks `if (!password)`. A user can register with a single-character password (e.g. `"1"`).
- **Recommended Fix**: Add `if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });` to `createUser`.

---

## Section 8: Performance & Optimization

### 8.1 Inefficient Aggregation in `getPeople`
- **Type**: Performance Defect
- **File**: `Backend/controllers/movieController.js:172-197`
- **Severity**: Medium
- **Explanation**: In `getPeople`, the pipeline unwinds `$cast`, `$directors`, or `$writers` across the entire database before matching:
  ```js
  { $unwind: `$${type}` },
  { $match: { [type]: { $regex: search, $options: "i" } } },
  { $group: { _id: `$${type}` } }
  ```
  Unwinding an unindexed array on tens of thousands of movies creates millions of in-memory documents before filtering.
- **Recommended Fix**: Invert the stages: filter movies matching the regex first before unwinding:
  ```js
  { $match: { [type]: { $regex: escapeRegex(search), $options: "i" } } },
  { $unwind: `$${type}` },
  { $match: { [type]: { $regex: escapeRegex(search), $options: "i" } } },
  { $group: { _id: `$${type}` } },
  { $limit: 20 }
  ```

### 8.2 Client-Side Profile Overview Network Storm
- **Type**: Performance Defect
- **File**: `Frontend/src/pages/Profile/components/overview/ProfileOverview.jsx:34-41`
- **Severity**: Medium
- **Explanation**: Mounting `/profile` immediately dispatches 5 concurrent network requests (`/rentals`, `/cart`, `/likes`, `/collections`, `/comments/mine`), followed by 4 more requests for movie posters in `useEffect`. This makes the profile initial load sluggish.
- **Recommended Fix**: Create a dedicated `GET /users/me/overview` endpoint that computes the summary statistics (`rentalCount`, `cartCount`, `likeCount`, `collectionCount`, `commentCount`, `activeRentalsPreview`) on the backend in a single roundtrip.

### 8.3 Redundant In-Memory Image Preloading
- **Type**: Performance Flaw / Memory Overhead
- **File**: `Frontend/src/components/HeroSlider/HeroSlider.jsx:34-65` & `Frontend/src/pages/MovieDetails/components/hero/MovieHero.jsx:49-74`
- **Severity**: Low
- **Explanation**: In both components, a `new Image()` object is instantiated in a React `useEffect` loop for every movie to verify if the poster URL loads, setting state on `onload` or `onerror`. This bypasses browser image caching benefits and causes re-renders.
- **Recommended Fix**: Use standard `<img src={poster || placeholder} onError={(e) => { e.currentTarget.src = placeholder; }} />`.

---

## Section 9: UI Design, Colors, Typography & Consistency

### 9.1 CSS Variable Typos in Root Tokens
- **Type**: Verified Bug
- **File**: `Frontend/src/index.css:57` & `102`
- **Severity**: Low
- **Explanation**: 
  - Line 57: `--authh-bg: rgba(255, 255, 255, 0.75);` (spelled with double 'h').
  - Line 102: `--authf-bg: rgba(32, 24, 24, 0.85);` (spelled with 'f' instead of 'h').
  - This typo prevents these variables from being reliably consumed across components.
- **Recommended Fix**: Correct both to `--auth-bg`.

### 9.2 Light Mode Contrast Deficiency
- **Type**: Accessibility / Design Flaw
- **File**: `Frontend/src/index.css:15-20` & `Frontend/src/components/Navbar/Navbar.css:95`
- **Severity**: Medium
- **Explanation**: In light theme, `--bg-primary` is `rgb(177, 161, 161)` (medium grayish pink). The navbar links in `Navbar.css` have hardcoded `color: white;`. White text on `rgb(177, 161, 161)` has a contrast ratio of only ~2.1:1, failing WCAG AA (minimum 4.5:1 for normal text).
- **Recommended Fix**: Use dynamic CSS variable for navbar link text: `color: var(--text-primary);`.

### 9.3 Outdated Copy on About Page
- **Type**: Content Inconsistency
- **File**: `Frontend/src/pages/About/About.jsx:68-80`
- **Severity**: Low
- **Explanation**: The About page states that Movie Details, Discover, Cart, Authentication, and Filtering are "Planned Features", even though they are fully functioning in the platform today.
- **Recommended Fix**: Move these features from "Planned" to "Implemented" in `About.jsx`.

---

## Section 10: Responsive Design & Accessibility

### 10.1 Mobile Navbar Degradation on Small Screens (< 500px)
- **Type**: Accessibility & Responsive Flaw
- **File**: `Frontend/src/components/Navbar/Navbar.css:439-477`
- **Severity**: Medium
- **Explanation**: At screen widths below 500px, the navbar squeezes all 4 links, the theme toggle, and the profile avatar into a single line by reducing font size to `0.64rem` (~10px) and button sizes to 28px. This violates touch target sizing standards (minimum 44x44px or 48x48px) and is difficult to read.
- **Recommended Fix**: Implement a standard mobile hamburger menu drawer for viewports under 640px.

### 10.2 Missing ARIA Labels on Icon Buttons
- **Type**: Accessibility Flaw
- **File**: 
  - `Frontend/src/components/Navbar/Navbar.jsx:87` (Theme toggle button has no `aria-label`)
  - `Frontend/src/pages/Cart/Cart.jsx:194` (Clear cart button)
  - `Frontend/src/pages/Discover/Component/FilterChips.jsx:124` (Chip remove buttons)
- **Severity**: Low
- **Explanation**: Screen readers announce these buttons as "button" with no context regarding their action.
- **Recommended Fix**: Add explicit `aria-label="Toggle dark mode"`, `aria-label="Remove filter"`, etc.

---

## Section 11: Broken Links, Navigation & User Workflows

### 11.1 Broken Relative Logo Path in Footer
- **Type**: Verified Bug
- **File**: `Frontend/src/components/Footer/Footer.jsx:22`
- **Severity**: Medium
- **Explanation**: The footer logo uses `<img src="./Logo2_WB.PNG" alt="Logo CineLend" />`. On nested URLs (e.g. `/movie/573a1390f29313caabcd4135` or `/payment/success`), the browser resolves this relative to the current URL path (`/movie/Logo2_WB.PNG`), causing a broken image (HTTP 404).
- **Recommended Fix**: Replace `./Logo2_WB.PNG` with absolute `/Logo2_WB.PNG`.

### 11.2 Absence of Window Scroll Reset on Navigation
- **Type**: Verified Bug / UX Defect
- **File**: `Frontend/src/routes/router.jsx` / `Frontend/src/App.jsx`
- **Severity**: Medium
- **Explanation**: When a user scrolls to the bottom of the Discover page and clicks a movie card, the newly loaded Movie Details page remains scrolled halfway down the page. React Router does not automatically reset scroll positions on navigation.
- **Recommended Fix**:
  Add a `ScrollToTop` component to `App.jsx`:
  ```jsx
  // Frontend/src/components/ScrollToTop.jsx
  import { useEffect } from "react";
  import { useLocation } from "react-router-dom";

  export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  ```

---

## Section 12: Unused Code & Unnecessary Dependencies

### 12.1 Dead Template Component (`React.jsx`)
- **Type**: Code Hygiene / Dead Code
- **File**: `Frontend/src/ReactCount/React.jsx`
- **Severity**: Low
- **Explanation**: Leftover Vite + React initial counter boilerplate. Not imported or referenced in any file.
- **Recommended Fix**: Safely delete the `Frontend/src/ReactCount/` directory.

### 12.2 Static Data Files with CommonJS / ESM Mismatch in Backend
- **Type**: Verified Bug / Redundant Code
- **File**: `Backend/data/genres.js` and `Backend/data/movies.js`
- **Severity**: Low
- **Explanation**: These files use `export const ...` (ESM syntax) inside a CommonJS Node project. They are not required anywhere in the backend (the database provides genres and movies). If required, they would crash Node.js with a syntax error.
- **Recommended Fix**: Convert to `module.exports` or remove them if superseded by MongoDB.

---

## Audit Summary & Action Priority Matrix

| # | Issue | Severity | Category | File Path |
|---|---|---|---|---|
| **1** | Orphaned CollectionMovie records on account deletion | **High** | Bug (DB Integrity) | `Backend/controllers/userController.js:352` |
| **2** | ReDoS / Unsanitized Regex Injection in movie queries | **High** | Security Vulnerability | `Backend/controllers/movieController.js:180, 280` |
| **3** | Client-Side N+1 Request Cascades (Cart & Rentals) | **High** | Performance & Integration | `Frontend/src/pages/Cart/Cart.jsx:89-129` |
| **4** | Broken Year filter link in Movie Awards & Facts | **High** | Bug (Integration) | `Frontend/src/pages/MovieDetails/components/awards/MovieAwardsFacts.jsx:80` |
| **5** | Missing Route Protection for `/profile`, `/cart`, `/checkout` | **High** | Security & Auth | `Frontend/src/routes/router.jsx` |
| **6** | Missing database indexes on Movie, Comment, Rental | **High** | Performance & DB | `Backend/models/Movie.js`, `Comment.js` |
| **7** | Liked Movies view missing in Profile | **Medium** | Missing Functionality | `Frontend/src/pages/Profile/Profile.jsx` |
| **8** | "Edit Account" button in Profile Header is unresponsive | **Medium** | Bug (UI/Workflow) | `Frontend/src/pages/Profile/components/ProfileHeader.jsx:32` |
| **9** | Broken relative asset path in Footer on nested routes | **Medium** | Bug (Assets) | `Frontend/src/components/Footer/Footer.jsx:22` |
| **10**| No window scroll reset on route changes | **Medium** | Bug (UX) | `Frontend/src/App.jsx` |
| **11**| Hero Slider collapses on initial load (Missing Skeleton) | **Medium** | UX Flaw | `Frontend/src/components/HeroSlider/HeroSlider.jsx:67` |
| **12**| Inverted RangeFilter bounds allowed without validation | **Medium** | Bug (Logic) | `Frontend/src/pages/Discover/Component/RangeFilter.jsx` |
| **13**| No rate limiting on auth & expensive aggregation routes | **Medium** | Security | `Backend/server.js` |
| **14**| Weak registration password policy (single character allowed) | **Medium** | Security | `Backend/controllers/userController.js:18` |
| **15**| Uncapped maximum rental duration in pricing engine | **Medium** | Potential Risk | `Backend/utils/pricing.js:84` |
| **16**| Mobile navbar tap target and text squishing under 500px | **Medium** | Responsive Design | `Frontend/src/components/Navbar/Navbar.css:439` |
| **17**| Inactive JWT revocation when passwords change / user deleted | **Medium** | Security | `Backend/middleware/authMiddleware.js` |
| **18**| Redundant In-Memory Image Preloading in Hero/MovieDetails | **Low** | Performance | `Frontend/src/components/HeroSlider/HeroSlider.jsx:34` |
| **19**| CSS variable typos (`--authh-bg`, `--authf-bg`) | **Low** | UI Consistency | `Frontend/src/index.css:57, 102` |
| **20**| Dead boilerplate component `React.jsx` | **Low** | Unused Code | `Frontend/src/ReactCount/React.jsx` |
| **21**| Outdated copy on About page | **Low** | Content Consistency | `Frontend/src/pages/About/About.jsx:68` |
| **22**| ESM export syntax in CommonJS backend mock files | **Low** | Code Quality | `Backend/data/genres.js` |
