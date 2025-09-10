# react_projects-
This is practice Project to be ready for hands-on projects.
1. npm i (FE, BE)
2. npm run dev (FE)
3. npm start (BE)

## Pratical Project : Food Order Web App


[lecture note]
* A CartContext and a CartContextProvider component are created to provide and manage cart state.
* The useReducer hook is preferred over useState for managing complex cart state, with a reducer function handling ADD_ITEM and REMOVE_ITEM actions.

* Created a reusable modal component using React's portal feature.
* Used the native <dialog> element for overlay display and programmatic control.
* Managed the dialog's open state programmatically with useEffect and useRef.
* Enabled dynamic styling by merging external className props with internal classes.
