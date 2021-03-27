# 蜡笔效果画线 crayon-style line

inspired by [fabric-brush](https://tennisonchan.github.io/fabric-brush/) but without any dependences

# Quickstart

`npm install crayon-draw --save`

OR

`<script src="https://cdn.jsdelivr.net/npm/crayon-draw@1.0.0/dist/crayon-draw.min.js"></script>`

# How to use

```JS

import CrayonDraw from 'crayon-draw';

const instance = new CrayonDraw('myCanvasId');

// set line color;
instance.setColor('#000000');
// set line opacity
instance.setOpacity(1);
// set "dot density" level
instance.setInkAmount(1);
// set line width
instance.setWidth(10);

```

# Note

1.  set color to empty string can prevent it from drawing

# Online Demo

[click to jump](https://elvinzhu.github.io/crayon-draw/)

# License

MIT[@elvin](https://github.com/elvinzhu)
