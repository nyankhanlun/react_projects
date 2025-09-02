# react_projects 
This is practice Project to be ready for hands-on projects.

## Behind the scenes of React & Optimization Techniques

1. npm i
2. npm run dev

[Lecture Note]
* The memo function in React can prevent unnecessary re-executions of components when their props do not change.
* Functions defined inside components are recreated on every render, causing props to change and triggering re-renders.
* The useCallback hook helps prevent recreation of functions by memoizing them with dependencies.
* Using useCallback in conjunction with memo optimizes component rendering by avoiding unnecessary executions.

* Overusing useMemo can degrade performance due to extra dependency checks; it should be used judiciously for costly computations.

* When a component function executes, React creates a virtual DOM snapshot rather than immediately updating the real DOM.
* React compares the new virtual DOM snapshot with the previous one to identify changes.
* Only the changed parts of the real DOM are updated, improving performance and efficiency.

* React tracks state not only by component type but also by the position of the component instance in the tree.


* Using unique keys in React lists prevents unnecessary re-rendering of all list items.
* Keys help React identify which items have changed, been added, or removed.
* Using array indices as keys can cause all list items to re-render and flash unnecessarily.
* Proper keys enable React to reuse existing DOM elements, optimizing rendering performance.


* Keys are important not only in lists but also for resetting components.
* Using useEffect to reset state on prop changes can cause extra component executions.
* Assigning a key prop to a component forces React to unmount and remount it, effectively resetting its state efficiently.

* Million.js improves performance by replacing React's virtual DOM with a more efficient update mechanism.
* For complex projects with frequent interactive data updates, Million.js can significantly speed up rendering.

