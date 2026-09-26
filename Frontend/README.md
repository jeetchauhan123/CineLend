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
3. In movie slider the button has link tag inside them it should only be one of the 2, as both link an button tag are smilar tags only, and attaching functionality to the buttons
4. ✅DONE Recommended For You and Try Something New are currently the same movies in the home page, we need to make them different
5. Adding genre box in home page(optional)
6. View All in home page movie row currently doesnt do anything
7. Search icon in the navbar has no functionality attached to it
8. ✅DONE Login functionality is remining
9. ✅DONE Use of onboarding model to store and use user preference
10. The preference panel should show the selected preference and change/update it if the user had already selected it once
11. Updating details in the about page
12. Adding Bar to show imdb rating out of 10 in moviedetail page and not changing the current ui, just adding the extra ui
13. Comments currently doesnt have links in their model so it is not getting stored.
14. Opening a moviedetail page should adds that movie to a visited movies in loalstorage to later display it in user profile in continue exploring
15. In movie detail page, when clicking the post comment button without login it redirects directly to login page rather than that we will show cant post without login
16. When the comment is posted it directly appears in the comment section as it is rather than that the comment should appear in comment section as pale until the backend succesfully uploads the comment to the database and then the comment should return to normal
17. The user can only seems to interact form one tab, if the looged in user opens another tab or clicks open in another tab then that tab will not have the user token and the user needs to login again 
18. Putting a limit on how much days a user can rent, and not some infinitly long number
19. No one should go to checkout or payment page without redirecting from the rent button e.g. by url, or clicking back button
20. If the user is alrady logged in then he cant go to login page again 
21. When i scroll down and click on any link then the page that opens has been scrolled down to the same length i had scrolled on the previous page 
22. The Checkout and Payment page still follows the main website theme and styling we need to remove it and make it totally different from the rest of the website
23. 


##BUGS
1. ✅DONE Navbar logo not working on some pages like movie detail pages, when i redirect it stays but on reload image doesnt come
2. ❌CANCEL In filter bar in people group the writer bar suggeston cause scrolling of the entire sidebar component, instead the dropdown should appear above writer text box 
3. ✅DONE Currently in people you can only select filter from the drop down if you want to apply filter for only 'rob' there is no method to do it 
4. ✅DONE In people if i write and dont apply it as a filter and click clear all the text written in text box remain as it is
5. ✅DONE Filter chip does not show filter of - minRating, maxRating, yearFrom, yearTo, runtimeMin, runtimeMax
6. ✅DONE Filter chips just show the text of filter applied but its sometime difficult which type of filter it is (rated, people, time)
7. ✅DONE In the people search in filter bar the scroll bar when at the end gets out of the drop box
8. ✅DONE In moviedetail page in facts section in genre block multiple genres display below each other but from the movie from the second place adds prefix in front of them
9. ⏸️POSTPONE The suggestion movie in the moviedetail page lodes twice
10. ✅DONE Clicking the preference button in the navbar redirects to the home page whereas it sshould open the onboarding panel in the already open page only
11. ⏸️HOLD When the movie detail is open and we then open another movie detail by writing its id in the url and then click back button in browser, now every time you scroll it gerenates error in the browser cosole
12. ✅DONE The image url sometimes give 404 not found due to which the image breaks to load an alternate text displays
13. ✅DONE Like Count API returns 401 Unauthorized when the user visits the moviedetail page when he is not logged in 
14. 






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