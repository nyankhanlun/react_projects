# react_projects-
This is practice Project to be ready for hands-on projects.

#Handling Side Effects & working with the useEffect() hook

[Lecture Note]
* Updating state directly inside a component function can cause infinite loops.
* The useEffect hook is designed to handle side effects and prevent such infinite loops.

* The useEffect hook in React is used to handle side effects in functional components.
* useEffect takes two arguments: a function containing the side effect code and a dependencies array.
* An empty dependencies array ensures the effect runs only once after the initial render, preventing infinite loops.
* Proper use of useEffect avoids app crashes caused by uncontrolled side effects.
* The useEffect hook is primarily needed to prevent infinite loops or to run code after the component has rendered at least once.
* Adding functions as dependencies in React's useEffect can cause infinite loops due to reference inequality.
* The useCallback hook prevents functions from being recreated on every render, avoiding infinite loops when used as dependencies in useEffect.
