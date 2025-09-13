# react_projects
This is practice Project to be ready for hands-on projects.

1. npm i
2. npm i redux react-redux
3. npm i @reduxjs/toolkit
4. npm start

## Dive into Redux (An Alternative to the Context API)

[lecture note]

* Installed both redux and react-redux packages to integrate Redux with React effectively.
* Recognized that Redux is independent of React and can be used in any JavaScript project.
* Used react-redux to simplify connecting React components to Redux stores and reducers.

* The useSelector hook from React Redux allows functional components to access specific slices of the Redux store state.
* useSelector automatically subscribes the component to the Redux store, ensuring it re-renders on state changes.	•	
* Utilized the useDispatch hook from React Redux to obtain the dispatch function.

* Class-based components are still used in many projects and are a valid React component type.
* The connect function from React Redux is used to connect class-based components to the Redux store.
* connect takes two functions as arguments: mapStateToProps to map Redux state to component props, and mapDispatchToProps to map dispatch actions to props.
* In class-based components, event handler methods must be bound to the class instance to access this correctly.
 
* Managed multiple state slices easily with Redux Toolkit.
* Redux Toolkit simplifies state management and is highly recommended for ease of use.
* Understanding core Redux concepts such as actions, reducers, and the central store is essential.
* Redux can be used without React and without Redux Toolkit, providing insight into its underlying mechanics.
* Choosing between React context and Redux depends on project complexity and performance needs.