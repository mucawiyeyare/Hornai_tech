import { useCallback, useEffect, useState } from 'react';
import { api, parseError } from '@/lib/api';

/**
 * Fetches `path` from the API.
 * If `fallback` is given and the API is unreachable, the fallback is used
 * so public pages still render (CMS content → local content → nothing).
 */
export function useApi(path, { fallback, skip = false, transform } = {}) {
  const [state, setState] = useState({
    data: undefined,
    loading: !skip && Boolean(path),
    error: null,
    fromFallback: false,
  });

  const load = useCallback(async () => {
    if (!path || skip) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { data } = await api.get(path);
      setState({ data: transform ? transform(data) : data, loading: false, error: null, fromFallback: false });
    } catch (err) {
      const parsed = parseError(err);
      if (fallback !== undefined && parsed.status !== 404) {
        setState({ data: fallback, loading: false, error: null, fromFallback: true });
      } else {
        setState({ data: undefined, loading: false, error: parsed, fromFallback: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, skip]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load, setData: (data) => setState((s) => ({ ...s, data })) };
}
