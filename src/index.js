
export const Task = (fork) => ({
  of: x => Task((rej, res) => res(x)),
  map: f => Task((reject, resolve) =>
    fork((a) => reject(a), (b) => resolve(f(b)))),
  fork,
});
