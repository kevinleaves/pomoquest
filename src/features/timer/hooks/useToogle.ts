import { useState, useMemo } from "react";

interface handlers {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

/**
 * custom hook for controlling boolean state
 * @returns [
 * boolean representing state of toggle, object w/ handler functions off, on, and toggle to change the state
 * ]
 */

export default function useToggle(): [boolean, handlers] {
  const [status, setStatus] = useState(false);
  const handlers = useMemo(
    () => ({
      on: () => setStatus(true),
      off: () => setStatus(false),
      toggle: () => setStatus(!status),
    }),
    [status]
  );

  return [status, handlers];
}
