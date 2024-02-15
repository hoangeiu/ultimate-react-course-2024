import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function Search({ query, setQuery }) {
  const ref = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === ref.current) return;
    ref.current.focus();
    setQuery("");
  });

  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Enter") {
  //       if (document.activeElement === ref.current) return;
  //       ref.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   document.addEventListener("keydown", callback);

  //   return () => document.removeEventListener("keydown", callback);
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={ref}
    />
  );
}
