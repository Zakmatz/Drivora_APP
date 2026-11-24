import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Mengambil data via fetcher(signal). Data lama dipertahankan saat memuat ulang
 * (mis. saat filter berubah) agar daftar tidak berkedip.
 */
export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetcher(ctrl.signal)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (!active || axios.isCancel(error)) return;
        setState({ data: null, loading: false, error });
      });
    return () => { active = false; ctrl.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, reload };
}
