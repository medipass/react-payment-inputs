import {useCallback, useState} from "react";

//                 \||/
//                 |  @___oo
//       /\  /\   / (__,,,,|~
//      ) /^\) ^\/ _)
//      )   /^\/   _)
//      )   _ /  / _)
//  /\  )/\/ ||  | )_)
// <  >      |(,,) )__)
//  ||      /    \)___)\
//  | \____(      )___) )___
//   \______(_______;;; __;;;
export default function useOnce() {
  const mut = useState({u: 0});
  return useCallback(
    (f) => {
      const [m] = mut;
      const {u} = m;
      const t = Math.min(u + 1, 1);
      !u && typeof f === "function" && requestAnimationFrame(f);
      Object.assign(m, {u: t});
      return !u;
    },
    [mut],
  );
}
