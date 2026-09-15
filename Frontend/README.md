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


##BUGS
1. Navbar logo not working on movie detail pages
2. in filter bar in people group the writer bar suggeston cause scrolling, instead the dropdown should appear above
3. currently in people you can only select filter from the drop down if you want to apply filter for only 'rob' there is no method to do it 
4. in people if i write and dont apply it as a filter and click clear all the text written in text box remain as it is
5. filter chip does not show filter of - minRating, maxRating, yearFrom, yearTo, runtimeMin, runtimeMax
6. filter chips just show the text of filter applied but its sometime difficult which type of filter it is (rated, people, time)
7. in the people search in filter bar the scroll bar when at the end gets out of the drop box
in moviedetail page in facts section in genre block multiple genres display below each other but from the movie from the second place adds prefix in front of them 


#f6121d