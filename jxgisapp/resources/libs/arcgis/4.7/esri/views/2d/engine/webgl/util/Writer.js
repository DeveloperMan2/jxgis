// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(c,d){Object.defineProperty(d,"__esModule",{value:!0});c=function(){function b(a){this._pos=0;a=a?this._roundToNearest4(a):40;this._array=new ArrayBuffer(a);this._buffer=new Int32Array(this._array)}b.prototype._roundToNearest4=function(a){a=Math.round(a);return a+(4-a%4)};b.prototype._ensureSize=function(){if(this._pos>=this._buffer.length){var a=new ArrayBuffer(this._roundToNearest4(1.5*this._array.byteLength)),b=new Int32Array(a);b.set(this._buffer,0);this._array=
a;this._buffer=b}};b.prototype.writeInt32=function(a){this._ensureSize();var b=this._pos;this._buffer[this._pos++]=a;return b};b.prototype.buffer=function(){var a=this._array.slice(0,4*this._pos);this.destroy();return a};b.prototype.destroy=function(){this._buffer=this._array=null};return b}();d.default=c});