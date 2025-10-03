# react_projects
This is practice Project to be ready for hands-on projects.

1. npm i
2. npm run dev

### React Server Components (RSC) with server actions - A closer look

* The use hook in React allows client components to handle promises passed from server components, integrating seamlessly with Suspense.
* Client components cannot be async and cannot use async/await directly; asynchronous data fetching must be handled differently.
* Passing a promise from a server component to a client component and using the use hook enables efficient data fetching with Suspense fallback.
* The use hook only works with promises created by libraries that integrate with React's Suspense or promises created in server components and passed down.