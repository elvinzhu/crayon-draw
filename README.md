# 蜡笔效果画线 crayon-style line

inspired by [fabric-brush](https://tennisonchan.github.io/fabric-brush/) but without any dependences

算法来自 [fabric-brush](https://tennisonchan.github.io/fabric-brush/) 但是没有任何依赖项

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

1.  set color to empty string can prevent it from drawing; 当color设置为空的时候，不画图
2.  set color to "eraser" to make it work as an eraser; 当color传递"eraser"时是橡皮擦功能

# Online Demo

[click to jump](https://elvinzhu.github.io/crayon-draw/)

# License

MIT[@elvin](https://github.com/elvinzhu)
