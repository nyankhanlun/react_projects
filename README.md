#react-projects

[BE, FE]
1. npm i
2. npm run dev / npm start 

### React query / TanStack query : Handling HTTP requests with ease

[note]

npm install tanstack/react-query

Tanstack Query is a library that helps you with sending HTTP requests and keeping your frontend user interface in sync with your backend data. That is the core idea.

*  React Query sends background requests to update cached data, balancing instant results with fresh data.
* The staleTime setting controls how long cached data is considered fresh before a new request is sent.
* The gcTime (Garbage Collection Time) setting controls how long cached data is retained before being discarded.
* React Query's enabled property allows conditional disabling of queries until certain criteria are met.
* React Query's useMutation hook is designed for sending data-changing requests, such as POST requests, unlike useQuery which is for fetching data.
* The mutate function from useMutation triggers the request manually, allowing control over when the request is sent.
* React Query's invalidateQueries method marks queries as stale and triggers refetching to keep data <b> up to date </b>.
* Setting the refetchType to none in invalidateQueries prevents automatic immediate refetching.
* The onMutate property is used to update cached data and cancel ongoing queries for a specific key.
