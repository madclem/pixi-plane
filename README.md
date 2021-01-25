# pixi-plane

![Preview](/preview.png)

[DEMO](https://madclem.github.io/pixi-plane-demo)

A plane comes with 4 `points`, that will define the projection of the texture.
When created, these 4 `points` will match the texture origin, up to you to change their positions!

## Install

`npm i pixi-plane`

## Use

Import it:
`import Plane from 'pixi-plane';`

```
  // passing a texture in the constructor is optional
  const plane = new Plane(PIXI.Texture.from("my-texture.png"));
  this.view.addChild(plane);


  // change directly the array via the setter
  plane.points = [{x: 0, y: 0}, {x: 200, y: 0}, {x: 200, y: 180}, {x: 0, y: 20}];


  // change each points
  plane.points[1].x = 150;
  plane.points[1].y = 20;
  plane.update();


  // update texture
  // if the points have already been modified, they WON'T adapt to the new texture frame
  // otherwise, they will adapt automatically
  plane.texture = PIXI.Texture.from("my-new-texture.png");

  // reset points to texture dimensions
  plane.resetPointsToTexture();

  // change alpha
  plane.setAlpha(0.5);
```
