# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


##FUTURE IMPROVEMENTS
1. Home movie slider skeleton
2. Nav bar links optimisation and redirect links
3. in movie slider the button has link tag inside them it should only be link only as both are smilar tags only
4. Recommended For You and Try Something New are currently the same movies in the home page
5. Adding genre box in home page
6. View All currently doesnt do anything
7. search bar in the navbar doesnt do anything
8. Login functionality is remining
9. use of onboarding model to store and use user preference
10. a ui where the user can see its selected preference and change/update it
11. Updating details in the about page
12. Adding Bar to show imdb rating out of 10 in moviedetail page
13. Comments currently doesnt have links in their model so it is not getting stored.
14. Opening a moviedetail page adds that movie to a visited movies in loalstorage to later display it in user profile in continue exploring
15. In movie detail page, when clicking the post comment button without login it redirects directly to login page rather than that we will show cant past without login
16. When the comment is posted it directly appears in the comment section rather than that the comment will indeed appear in comment section but it will be pale until the backend succesfully uploads the comment to the database 
17. The user can only seens to interact form one tab, if teh user login and opens another tab then that tab will not have the user token and the user needs to login again 
18. Putting a limit on how much days a user can rent, and not some infinitly long number
19. No one should go to checkout or payment page without redirecting from the rent button e.g. by url 


##BUGS
1. Navbar logo not working on movie detail pages
2. in filter bar in people group the writer bar suggeston cause scrolling, instead the dropdown should appear above
3. currently in people you can only select filter from the drop down if you want to apply filter for only 'rob' there is no method to do it 
4. in people if i write and dont apply it as a filter and click clear all the text written in text box remain as it is
5. filter chip does not show filter of - minRating, maxRating, yearFrom, yearTo, runtimeMin, runtimeMax
6. filter chips just show the text of filter applied but its sometime difficult which type of filter it is (rated, people, time)
7. in the people search in filter bar the scroll bar when at the end gets out of the drop box
in moviedetail page in facts section in genre block multiple genres display below each other but from the movie from the second place adds prefix in front of them
8. The suggestion movie in the moviedetail page lodes twice
9. Clicking the preference button in the navbar redirects to the home page whereas it sshould open the onboarding panel in the already open page only
10. When the movie detail is open and we then open another movie detail by writing its id in the url and then click back button in browser, now every time you scroll it gerenates error in the browser cosole
11. 






What we're building first

I suggest we proceed in this order:

Phase 1 — Profile shell

Persistent Profile Header
Profile navigation
Overview
In-page section switching
Back navigation

Phase 2 — Overview
6. Real rental/collection/comment counts
7. Continue Exploring
8. Recently Rented

Phase 3 — Rented Movies
9. Rental cards
10. Rental details
11. Return
12. Cancel where applicable

Phase 4 — Collections
13. Collection list
14. Create
15. Rename
16. Delete
17. Open collection
18. Add/remove movies

Phase 5 — Comments
19. User's comments
20. Edit/delete

Phase 6 — Account
21. Edit profile
22. Change password
23. Profile image











We're ready to execute

I suggest we build it in this exact order:

Phase 1 — Pricing foundation
Movie release year
       ↓
Pricing tier
       ↓
Base daily price
       ↓
Rental duration
       ↓
Package discount
       ↓
Final rental price

We'll first decide and implement the pricing configuration.



Phase 2 — Cart
Cart Model
→ Controller
→ Routes
→ Thunder Client testing
→ Movie Details "Add to Cart"
→ Added confirmation + View Cart
→ Cart page
→ Remove
→ Clear Cart
→ Cart access from profile dropdown




Phase 3 — Rental
Rental Model
→ Rental creation
→ Duration selection
→ Individual Rent
→ Rent All
→ Price calculation
→ Tax
→ Checkout
→ Dummy payment
→ Success
→ Cart cleanup




Phase 4 — Rental lifecycle
Active rental
→ Expiration
→ Early return
→ Rental history
→ Profile → Rented




Phase 5 — Final integration

We'll connect everything so the Movie Details button correctly reflects:

Available
   ↓
Add to Cart

In Cart
   ↓
Added / View Cart

Rented
   ↓
Rented

Expired / Returned
   ↓
Add to Cart