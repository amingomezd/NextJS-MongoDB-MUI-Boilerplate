export const fetcher = (...args) => {
  return fetch(...args).then(async (res) => {
    if (res.status === 204) return null;

    const payload = await res.json();

    if (res.ok) {
      return payload;
    } else {
      return Promise.reject(payload?.error || new Error('Something went wrong'));
    }
  });
};
