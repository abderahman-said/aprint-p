import { useEffect } from "react";

export const useOutSide = (ref , options) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
           
          if (ref.current && !ref.current.contains(event.target) && !options.otherRef.current.contains(event.target)) {
            options.call(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
};


