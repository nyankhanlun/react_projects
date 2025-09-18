# react_projects
This is practice Project to be ready for hands-on projects.

[BE & FE]
1. npm i
2. npm start 

## Advanced Routing
### Building multi-page SPA with React Router

[lecture note]

<b>Explored nested routes and advanced data fetching and submission techniques using loaders, actions, and fetchers.</b>

* The useFetcher hook in React Router allows triggering actions or loaders without causing route transitions.
* useFetcher provides a special form component and a submit function to handle background requests.
* This hook is ideal for shared components like newsletter signup forms that appear on multiple pages.
* useFetcher exposes properties such as data and state to manage UI feedback based on action or loader results.
* The defer() function allows deferring data loading in React Router, enabling components to render before all data is available.
* Wrapping data fetching logic in an async function and returning a promise is essential for deferring.
* The Await component from React Router is used to handle deferred data and render content once the promise resolves.
* The Suspense component from React provides a fallback UI while waiting for deferred data to load.
