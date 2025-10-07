# React + Vite

### React Patterns & Best Pratices

1. npm i
2. npm run dev

[lecture note]

* Render props enable passing a function as the children prop to customize rendering logic.
* Render props improve flexibility and reusability by separating data handling from UI rendering.
* Avoid using array indices as keys in React lists because they are not directly linked to the data.
*  <b>Debouncing</b> is a technique to delay state updates until the user stops typing for a specified threshold.
* It prevents inefficient updates on every keystroke, improving performance especially with complex logic or network requests.
* Implementing debouncing involves using setTimeout, clearTimeout, and React's useRef to manage timer IDs.
* Properly clearing and resetting timers ensures only the latest input triggers a state update after the delay.