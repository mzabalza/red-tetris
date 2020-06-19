import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    console.log(callback.current);
  }, [callback]);

  //////////////////////////////////////////////////
  // setInterval ()
  //
  // Calls a function or evaluates an expression at specified intervals (in milliseconds).
  // It method will continue calling the function until clearInterval() is called, or the window is closed.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
