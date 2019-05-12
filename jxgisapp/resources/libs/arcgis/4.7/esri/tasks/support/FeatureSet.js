// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("../../core/kebabDictionary ../../core/JSONSupport ../../core/lang ../../Graphic ../../layers/support/Field ../../geometry/SpatialReference ../../geometry/support/graphicsUtils ../../geometry/support/jsonUtils dojo/_base/lang".split(" "),function(l,w,x,y,z,v,A,B,C){l=l({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryEnvelope:"extent"});return w.createSubclass({declaredClass:"esri.tasks.support.FeatureSet",
getDefaults:function(){return C.mixin(this.inherited(arguments),{features:[]})},properties:{displayFieldName:null,exceededTransferLimit:null,features:{value:null,json:{read:function(a,b){var m=v.fromJSON(b.spatialReference);a=a.map(function(a){var b=y.fromJSON(a);a=a.geometry&&a.geometry.spatialReference;b.geometry&&!a&&(b.geometry.spatialReference=m);return b});b.transform&&this._hydrate(b.transform,b.geometryType,a);return a}}},fields:{value:null,type:[z]},geometryType:{value:null,json:{read:l.fromJSON}},
spatialReference:{type:v}},toJSON:function(a){var b={hasZ:this.hasZ,hasM:this.hasM};this.displayFieldName&&(b.displayFieldName=this.displayFieldName);this.fields&&(b.fields=this.fields.map(function(a){return a.toJSON()}));this.spatialReference?b.spatialReference=this.spatialReference.toJSON():this.features[0]&&this.features[0].geometry&&(b.spatialReference=this.features[0].geometry.spatialReference.toJSON());this.features[0]&&(this.features[0].geometry&&(b.geometryType=B.getJsonType(this.features[0].geometry)),
b.features=A._encodeGraphics(this.features,a));b.exceededTransferLimit=this.exceededTransferLimit;b.transform=this.transform;return x.fixJson(b)},quantize:function(a){var b=a.translate[0],m=a.translate[1],l=a.scale[0],r=a.scale[1],p=this.features,q=function(a,n,b){var k,c,g,h,e,d,f=[];k=0;for(c=a.length;k<c;k++)if(g=a[k],0<k){if(d=n(g[0]),g=b(g[1]),d!==h||g!==e)f.push([d-h,g-e]),h=d,e=g}else h=n(g[0]),e=b(g[1]),f.push([h,e]);return 0<f.length?f:null},t=function(a,n,b){if("point"===a)return function(a){a.x=
n(a.x);a.y=b(a.y);return a};if("polyline"===a||"polygon"===a)return function(a){var c,d,k,e,f;k=a.rings||a.paths;f=[];c=0;for(d=k.length;c<d;c++)e=k[c],(e=q(e,n,b))&&f.push(e);return 0<f.length?(a.rings?a.rings=f:a.paths=f,a):null};if("multipoint"===a)return function(a){var c;c=q(a.points,n,b);return 0<c.length?(a.points=c,a):null};if("extent"===a)return function(a){return a}}(this.geometryType,function(a){return Math.round((a-b)/l)},function(a){return Math.round((m-a)/r)}),d,u;d=0;for(u=p.length;d<
u;d++)t(p[d].geometry)||(p.splice(d,1),d--,u--);this.transform=a;return this},_hydrate:function(a,b,m){if(a){var l=a.translate[0],r=a.translate[1],p=a.scale[0],q=a.scale[1],t=function(a,b,f){if("esriGeometryPoint"===a)return function(a){a.x=b(a.x);a.y=f(a.y)};if("esriGeometryPolyline"===a||"esriGeometryPolygon"===a)return function(a){a=a.rings||a.paths;var n,d,c,g,h,e,l,m;n=0;for(d=a.length;n<d;n++)for(h=a[n],c=0,g=h.length;c<g;c++)e=h[c],0<c?(l+=e[0],m+=e[1]):(l=e[0],m=e[1]),e[0]=b(l),e[1]=f(m)};
if("esriGeometryEnvelope"===a)return function(a){a.xmin=b(a.xmin);a.ymin=f(a.ymin);a.xmax=b(a.xmax);a.ymax=f(a.ymax)};if("esriGeometryMultipoint"===a)return function(a){a=a.points;var d,k,c,g,h;d=0;for(k=a.length;d<k;d++)c=a[d],0<d?(g+=c[0],h+=c[1]):(g=c[0],h=c[1]),c[0]=b(g),c[1]=f(h)}}(b,function(a){return a*p+l},function(a){return r-a*q});a=0;for(b=m.length;a<b;a++)m[a].geometry&&t(m[a].geometry)}}})});