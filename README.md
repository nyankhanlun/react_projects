# react_projects 
This is practice Project to be ready for hands-on projects.

Shopping Cart with React's Context API & useReducer - Advanced State Management

[]
npm i

npm run dev

-----------------------

[Lecture Note]
* Context is useful for sharing data across multiple components in an application.
* The useReducer hook in React is useful for managing complex state logic, especially when state updates depend on previous state snapshots.
* A reducer function reduces complex values to simpler ones, such as reducing an array of items to a total price.
* useReducer provides the latest state snapshot automatically, simplifying state management compared to useState.
* State updates should avoid mutating previous state directly; always create copies when updating.
* useReducer can be used independently of context and is suitable for managing complex state logic in React components.