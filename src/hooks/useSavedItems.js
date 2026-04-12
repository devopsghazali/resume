import { useCallback, useEffect, useMemo, useState } from "react";

const useSavedItems = (storageKey) => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      setSaved(Array.isArray(parsed) ? parsed : []);
    } catch {
      setSaved([]);
    }
  }, [storageKey]);

  const savedSet = useMemo(() => new Set(saved), [saved]);

  const toggleSaved = useCallback(
    (id) => {
      setSaved((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
        localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey]
  );

  return { saved, savedSet, toggleSaved };
};

export default useSavedItems;
