import numeric from "./numeric";

const getTransform = (from, to) => {
  let m1 = [];

  for (let i = 0; i < 4; i++) {
    m1.push([
      from[i].x,
      from[i].y,
      1,
      0,
      0,
      0,
      -from[i].x * to[i].x,
      -from[i].y * to[i].x,
    ]);
    m1.push([
      0,
      0,
      0,
      from[i].x,
      from[i].y,
      1,
      -from[i].x * to[i].y,
      -from[i].y * to[i].y,
    ]);
  }

  let m2 = [];

  for (let i = 0; i < 4; i++) {
    m2.push(to[i].x);
    m2.push(to[i].y);
  }

  let h = numeric.solve(m1, m2);
  let H = [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];

  return H;
};

export default getTransform;
