
export const Task = (fork) => ({
  fork,
  of: x => Task((rej, res) => res(x)),
  map: f => Task((rej, res) =>
    fork(
      (a) => rej(a),
      (b) => res(f(b)
      )
    )
  ),
});
