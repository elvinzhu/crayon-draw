# 蜡笔效果画线 crayon-style line

inspired by [fabric-brush](https://tennisonchan.github.io/fabric-brush/) but without any dependences

# INSTALLATION

`npm install crayon-draw --save`

# HOW TO USE

```JS
import CrayonDraw from 'crayon-draw';

const instance = new CrayonDraw('myCanvasId');

// set line color
instance.setColor('#000000');
// set line opacity
instance.setOpacity(1);
// set "dot density" level
instance.setInkAmount(1);
// set line width
instance.setWidth(10);

```

# LICENSE

MIT[@elvin](https://github.com/elvinzhu)
