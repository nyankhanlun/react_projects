# react_projects
This is practice Project to be ready for hands-on projects.

1. node redux-demo.js (run command)

## Core Redux basic (Dive into Redux)

[lecture note]
Redux

* Redux is a state management system designed for cross-component or app-wide state.
* State in React can be categorized into local state, cross-component state, and app-wide state.
* Local state is managed within a single component, often using useState or useReducer.
* Cross-component and app-wide state can be managed with prop drilling, React Context, or Redux to simplify state sharing across components.
* Redux is a state management system designed for cross-component or app-wide state.
* React Context can manage state and avoid prop drilling but may lead to complex setups in large applications.
* React Context may cause performance issues with high-frequency state changes.
* Redux offers an alternative to React Context, addressing its potential disadvantages in large-scale applications.

### Summary
To summarize, Redux works by maintaining a single central store for all application state. Components subscribe to this store to receive updates. They do not modify the store directly but dispatch actions describing desired changes. Reducers process these actions and return new state, which updates the store and notifies components to update the UI. This architecture provides a clear and predictable state management pattern.
