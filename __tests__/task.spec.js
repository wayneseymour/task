import {Task} from "../src";
import {exec} from 'child_process';

describe(`task monad, the lazy, composable promise monad`, () => {
  describe(`used with a callback`, () => {
    const ls = () => Task((rej, res) =>
      exec(
        'ls -la . | head -5',
        (error, stdout) => error ? rej(error) : res(stdout),
      ),
    );

    it(`should resolve when fork() is applied`, () => {
      ls().fork(
        err => console.error(err),
        data => expect(data).toBeTruthy(),
      );
    });
    it(`should be a functor`, () => {
      ls()
        .map(x => x.toUpperCase())
        .fork(
          err => console.error(err),
          data => expect(data.includes('.EDITORCONFIG')).toBeTruthy(),
        );
    });
    it(`should be a monad`, () => {
      ls()
        .chain(() => Task((rej, res) => res(1)))
        .fork(
          err => console.error(err),
          data => expect(data).toBe(1),
        );
    });
  });
});

