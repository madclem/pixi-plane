import { Geometry, Shader } from "@pixi/core";

import { Mesh } from "@pixi/mesh";
import getTransform from "./utils/getTransform";
import getUVS from "./utils/getUVS";
import planeFrag from "./plane.frag";
import planeVert from "./plane.vert";

/**
 * 2D Mesh with 3D projection (Homogeneous projection)
 * @class PixiPlane
 * @extends PIXI.Mesh
 * @memberof PIXI
 * @param {PIXI.Texture, undefined} [texture] - PIXI.Texture to use (optional)
 * @param {array} [tPoints] - array of 4 points (optional). [{x: 0, y:0}, {x: 0, y:0}, {x: 0, y:0}, {x: 0, y:0}]
 */
class PixiPlane extends Mesh {
  constructor(texture, tPoints = []) {
    const corners = [];
    const points = [];
    for (let i = 0; i < 4; i++) {
      corners.push({ x: 0, y: 0 });
      points.push(tPoints[i] || { x: 0, y: 0 });
    }

    let geometry = new Geometry()
      .addAttribute("aVertexPosition", [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], 3)
      .addAttribute("aTextureCoord", getUVS(points), 3)
      .addIndex([0, 1, 2, 0, 2, 3]);

    let vertex = planeVert;
    let frag = planeFrag;
    let shader = Shader.from(vertex, frag, {
      awesomeMatrix: getTransform(corners, points),
      uTexture: texture,
    });

    super(geometry, shader);

    this._points = points;
    this._corners = corners;
    this._hasPoints = tPoints.length > 3;

    if (texture) this.texture = texture;
  }

  /**
   * Set the points to the texture dimensions (no deformations)
   */
  resetPointsToTexture() {
    this._corners.forEach((pt, i) => {
      this._points[i].x = pt.x;
      this._points[i].y = pt.y;
    });
    this._updateProjection();
  }

  /**
   * When points have been modified, call this method
   */
  update() {
    this._hasPoints = true; // assuming points have been updated manually
    this._updateProjection();
  }

  _updateProjection() {
    let H = getTransform(this._corners, this._points);
    let array = getUVS(this._points);
    this.geometry.getBuffer("aTextureCoord").data = array;
    this.geometry.getBuffer("aTextureCoord").update();

    this.shader.uniforms.awesomeMatrix = H;
  }

  /**
   * GETTERS / SETTERS
   */
  get points() {
    return this._points;
  }

  set points(pts) {
    this._hasPoints = true;
    this._points = pts;
    this._updateProjection();
  }

  set texture(mTexture) {
    this._corners[0].x = 0;
    this._corners[0].y = 0;
    this._corners[1].x = mTexture.frame.width;
    this._corners[1].y = 0;
    this._corners[2].x = mTexture.frame.width;
    this._corners[2].y = mTexture.frame.height;
    this._corners[3].x = 0;
    this._corners[3].y = mTexture.frame.height;

    if (!this._hasPoints) {
      this.resetPointsToTexture();
    }

    let pts = new Float32Array([
      this._corners[0].x,
      this._corners[0].y,
      1,
      this._corners[1].x,
      this._corners[1].y,
      1,
      this._corners[2].x,
      this._corners[2].y,
      1,
      this._corners[3].x,
      this._corners[3].y,
      1,
    ]);

    this.geometry.getBuffer("aVertexPosition").data = pts;
    this.geometry.getBuffer("aVertexPosition").update();

    this.shader.uniforms.uTexture = mTexture;
    this._updateProjection();
  }
}

export default PixiPlane;
