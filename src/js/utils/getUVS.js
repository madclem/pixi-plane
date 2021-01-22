const getUVS = (pts) => {
  let p0 = pts[0];
  let p1 = pts[1];
  let p2 = pts[2];
  let p3 = pts[3];

  let slope = (p3.y - p1.y) / (p3.x - p1.x);
  let slope2 = (p2.y - p0.y) / (p2.x - p0.x);
  let x = (-p0.x * slope2 + p0.y + p1.x * slope - p1.y) / (slope - slope2);
  let y = slope * x - slope * p1.x + p1.y;

  let intersectionPoint = { x: x, y: y };

  let d0 = Math.sqrt(
    Math.pow(intersectionPoint.x - p0.x, 2) +
      Math.pow(intersectionPoint.y - p0.y, 2)
  );
  let d1 = Math.sqrt(
    Math.pow(intersectionPoint.x - p1.x, 2) +
      Math.pow(intersectionPoint.y - p1.y, 2)
  );
  let d2 = Math.sqrt(
    Math.pow(intersectionPoint.x - p2.x, 2) +
      Math.pow(intersectionPoint.y - p2.y, 2)
  );
  let d3 = Math.sqrt(
    Math.pow(intersectionPoint.x - p2.x, 2) +
      Math.pow(intersectionPoint.y - p2.y, 2)
  );

  let uvq0 = {};
  uvq0.x = 0;
  uvq0.y = 0;
  uvq0.z = (1 * (d0 + d2)) / d2;

  let uvq1 = {};
  uvq1.x = (1 * (d1 + d3)) / d3;
  uvq1.y = 0;
  uvq1.z = (1 * (d1 + d3)) / d3;

  let uvq2 = {};
  uvq2.x = (1 * (d2 + d0)) / d0;
  uvq2.y = (1 * (d2 + d0)) / d0;
  uvq2.z = (1 * (d2 + d0)) / d0;

  let uvq3 = {};
  uvq3.x = 0;
  uvq3.y = (1 * (d3 + d1)) / d1;
  uvq3.z = (1 * (d3 + d1)) / d1;

  let floatArray = new Float32Array([
    uvq0.x,
    uvq0.y,
    uvq0.z, // u, v
    uvq1.x,
    uvq1.y,
    uvq1.z,
    uvq2.x,
    uvq2.y,
    uvq2.z,
    uvq3.x,
    uvq3.y,
    uvq3.z,
  ]);

  return floatArray;
};

export default getUVS;
