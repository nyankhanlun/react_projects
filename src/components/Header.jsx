import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {
  const fetcing = useIsFetching()
  return (
    <>
      <div id="main-header-loading">
        {fetcing > 0 && <progress />}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
