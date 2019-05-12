// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(f,e){Object.defineProperty(e,"__esModule",{value:!0});e.shapes={fill:[{type:"path",path:"M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"}],pathSymbol3DLayer:[{type:"path",path:"M 3,12 L 12,0 L 11,-2 L -4,5 L -1,5 L 1,7 L 3,10 L 3,12 Z"},{type:"circle",cx:-2,cy:10,r:5}],extrudeSymbol3DLayer:[{type:"path",path:"M -7,-5 L -2,0 L -2,7 L -7,3 L -7,-5 Z"},{type:"path",path:"M -2,0 L -2,7 L 10,-3 L 10,-10 L -2,0 Z"},{type:"path",path:"M -7,-5 L -2,0 L 10,-10 L -2,-10 L -7,-5 Z"}],
cone:[{type:"path",path:"M 0,-10 L -8,5 L -4,6.5 L 0,7 L 4,6.5 L 8,5 Z"}],tallCone:[{type:"path",path:"M 0,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 0,-9 Z"}],invertedCone:[{type:"path",path:"M 0,7 L -8,-8 L 8,-8 Z"},{type:"path",path:"M -8,-8 L -4,-9.5 L 0,-10 L 4,-9.5 L 8,-8 L 4,-6.5 L 0,-6 L -4,-6.5 Z"}],cube:[{type:"path",path:"M -10,-7 L 0,-12 L 10,-7 L 0,-2 L -10,-7 Z"},{type:"path",path:"M -10,-7 L 0,-2 L 0,12 L -10,7 L -10,-7 Z"},{type:"path",path:"M 0,-2 L 10,-7 L 10,7 L 0,12 L 0,-2 Z"}],
tallCube:[{type:"path",path:"M -3.5,-8.5 L 0,-9.5 L 3.5,-8.5 L 0,-7.5 L -3.5,-8.5 Z"},{type:"path",path:"M -3.5,-8.5 L 0,-7.5 L 0,9 L -3.5,8 L -3.5,-8.5 Z"},{type:"path",path:"M 0,-7.5 L 3.5,-8.5 L 3.5,8 L 0,9 L 0,-7.5 Z"}],cylinder:[{type:"path",path:"M -8,-9 L -8,7 L -4,8.5 L 0,9 L 4,8.5 L 8,7 L 8,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:8,ry:2}],tallCylinder:[{type:"path",path:"M -3.5,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 3.5,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:3.5,ry:1}],diamond:[{type:"path",
path:"M 0,-10 L 10,-1 L -1,1 L 0,-10 Z"},{type:"path",path:"M 0,-10 L -1,1 L -8,-1 L 0,-10 Z"},{type:"path",path:"M -1,1 L 0,10 L -8,-1 L -1,1 Z"},{type:"path",path:"M -1,0 L 0,10 L 10,-1 L -1,1 Z"}],tetrahedron:[{type:"path",path:"M 0,-10 L 10,7 L 0,0 L 0,-10 Z"},{type:"path",path:"M 0,-10 L 0,0 L -8,7 L 0,-10 Z"},{type:"path",path:"M 10,7 L 0,0 L -8,7 L 10,7 Z"}]};e.getExtrudeSymbolShapes=function(b){b*=.5;return[{type:"path",path:[{command:"M",values:[0,.7*11]},{command:"L",values:[6.6,22*.7]},
{command:"L",values:[6.6,22*.7+b]},{command:"L",values:[0,22*.7+b-.7*11]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[6.6,22*.7]},{command:"L",values:[6.6,22*.7+b]},{command:"L",values:[22,b]},{command:"L",values:[22,0]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[6.6,0]},{command:"L",values:[22,0]},{command:"L",values:[6.6,22*.7]},{command:"L",values:[0,.7*11]},{command:"Z",values:[]}]}]};e.getCubeShapes=function(b,a){var c=a?20:b,d=a?4:6,d=c=22>=c?c-.5*
d:c-d;a=a?.35*c:.5*c;return[{type:"path",path:[{command:"M",values:[.5*d,0]},{command:"L",values:[d,.5*a]},{command:"L",values:[.5*d,a]},{command:"L",values:[0,.5*a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,.5*a]},{command:"L",values:[.5*d,a]},{command:"L",values:[.5*d,b]},{command:"L",values:[0,b-.5*a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.5*d,a]},{command:"L",values:[.5*d,b]},{command:"L",values:[d,b-.5*a]},{command:"L",values:[d,.5*a]},
{command:"Z",values:[]}]}]};e.getCylinderShapes=function(b,a){var c=a?20:b;a=a?4:6;c=22>=c?c-.5*a:c-a;a=.5*c;var d=.15*c;b-=d;return[{type:"ellipse",cx:.5*c,cy:b,rx:a,ry:d},{type:"path",path:[{command:"M",values:[0,d]},{command:"L",values:[0,b]},{command:"L",values:[c,b]},{command:"L",values:[c,d]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*c,cy:d,rx:a,ry:d}]};e.getConeShapes=function(b,a){var c=a?20:b;a=a?4:6;c=22>=c?c-.5*a:c-a;a=.15*c;var d=c;b-=a;return[{type:"ellipse",cx:.5*c,cy:b,rx:.5*
c,ry:a},{type:"path",path:[{command:"M",values:[.5*d,0]},{command:"L",values:[d,b]},{command:"L",values:[0,b]},{command:"Z",values:[]}]}]};e.getInvertedConeShapes=function(b){var a=b,a=22>a?a-3:a-6,c=.15*a,d=a;return[{type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[d,0]},{command:"L",values:[.5*d,b-c]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*a,cy:0,rx:.5*a,ry:c}]};e.getDiamondShapes=function(b){var a=b,a=22>a?a-2:a-4,c=Math.floor(b/10)-1||1;return[{type:"path",path:[{command:"M",
values:[.45*a,0]},{command:"L",values:[a,.5*b-c]},{command:"L",values:[.45*a-c,.5*b+c]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*a,0]},{command:"L",values:[.45*a-c,.5*b+c]},{command:"L",values:[0,.5*b-c]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,.5*b-c]},{command:"L",values:[.45*a-c,.5*b+c]},{command:"L",values:[.45*a,b]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*a,b]},{command:"L",values:[a,.5*b-c]},{command:"L",
values:[.45*a-c,.5*b+c]},{command:"Z",values:[]}]}]};e.getTetrahedronShapes=function(b){var a=b,a=22>a?a-1:a-2;return[{type:"path",path:[{command:"M",values:[.45*b,0]},{command:"L",values:[b,a]},{command:"L",values:[.45*b,.6*a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*b,0]},{command:"L",values:[.45*b,.6*a]},{command:"L",values:[0,a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,a]},{command:"L",values:[.45*b,.6*a]},{command:"L",values:[b,a]},{command:"Z",
values:[]}]}]}});