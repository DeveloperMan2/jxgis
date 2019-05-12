// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper dojo/i18n dojo/i18n!../nls/CoordinateConversion dojo/number dojo/_base/config ../../../core/Error ../../../core/promiseUtils ../../../geometry/Point ../../../geometry/SpatialReference ../../../geometry/support/webMercatorUtils ./Format".split(" "),function(O,g,G,H,b,C,I,x,y,D,J,K,k){function E(a,c){c=F(c);return[a[0].toFixed(c),a[1].toFixed(c)]}function F(a){return 500<=a?6:500>a&&50<=a?7:50>a&&5<=a?8:9}function u(a){return"number"===typeof a&&
isFinite(a)}function z(a){return u(a.x)&&u(a.y)}function v(a,c){return a.spatialReference.isGeographic&&c?(a=E([a.x,a.y],c),a[0]+", "+a[1]):a.x.toFixed(3)+", "+a.y.toFixed(3)}function e(a){var c=a.match(L),c=c?c[0]:"",b=0<=a.indexOf(".")?a.split(".")[1].length:0;return c+C.format(Number(a),{pattern:"###0.###",places:b,round:-1})}function f(a){return C.parse(a)}Object.defineProperty(g,"__esModule",{value:!0});var N={utm:{conversionMode:"utmDefault",addSpaces:!1},usng:{numOfDigits:5,rounding:!1,addSpaces:!1},
mgrs:{rounding:!1}},r=Array(3),q=H.getLocalization("dojo.cldr","number",I.locale).decimal,l=b.abbreviatedDirections.north,m=b.abbreviatedDirections.south,n=b.abbreviatedDirections.east,p=b.abbreviatedDirections.west,t={N:"north",S:"south",E:"east",W:"west"},h={};h[l]="N";h[m]="S";h[n]="E";h[p]="W";var w=new RegExp("-?\\d+[\\.|\\"+q+"]?\\d*"),A=new RegExp("N|S|"+l+"|"+m,"i"),B=new RegExp("E|W|"+n+"|"+p,"i"),L=/^[\\0]+(?!\.)/;g.clipLonLat=E;g.getDegreePrecision=F;g.debounceDeferred=function(a,c,b){var d,
e;return function(){d&&(clearTimeout(d),d=null);e&&e.cancel(null);var f=arguments;return e=y.create(function(e,M){d=setTimeout(function(){d=null;a.apply(c,f).then(function(a){return e(a)}).catch(function(a){return M(a)})},b)})}};g.fromGeoCoordinateString=function(a){var c=a.coordinate,b=a.spatialReference,d=a.formatName;return a.geometryServicePromise.then(function(a){return a.fromGeoCoordinateString({strings:[c],sr:b,conversionType:d}).then(function(a){var c=new D({x:a[0][0],y:a[0][1],spatialReference:b});
if(!z(c))throw a;return c}).catch(function(a){throw new x("coordinate-conversion:from-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:a});})})};g.fromXY=function(a,c){var b=0<=a.indexOf(",")?",":" ",d=a.split(b).map(function(a){return(a=a.trim())?Number(a):null});a=d[0];b=d[1];d=d[2];if(!u(a)||!u(b))return null;c=new D({x:a,y:b,spatialReference:c||J.WGS84});d&&(c.z=d,c.hasZ=!0);return c};g.generateDefaultFormats=function(){return[new k({name:"basemap",coordinateSegments:[{alias:"X",
description:"easting",searchPattern:w,substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"Y",description:"northing",searchPattern:w,substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}}],defaultPattern:"X, Y"}),new k({name:"dd",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+q+"]?\\d*(?\x3d\\D*?[N|S|"+l+"|"+m+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},
{alias:b.abbreviatedDirections.north,description:"north/south indicator",searchPattern:A,substitution:{input:function(a){return h[a]},output:function(a){return b.abbreviatedDirections[t[a]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}[\\.|\\"+q+"]?\\d*(?\x3d\\D*?[E|W|"+n+"|"+p+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:b.abbreviatedDirections.east,description:"east/west indicator",searchPattern:B,substitution:{input:function(a){return h[a]},
output:function(a){return b.abbreviatedDirections[t[a]]}}}],defaultPattern:"Y\u00b0"+b.abbreviatedDirections.north+", X\u00b0"+b.abbreviatedDirections.east}),new k({name:"ddm",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?\x3d.*?\\s+.*?[N|S|"+l+"|"+m+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}[\\.\\"+q+"]?\\d*(?\x3d.*?[N|S|"+
l+"||"+m+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:b.abbreviatedDirections.north,description:"north/south indicator",searchPattern:A,substitution:{input:function(a){return h[a]},output:function(a){return b.abbreviatedDirections[t[a]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?\x3d\\D*?\\s+.*?[E|W|"+n+"|"+p+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"B",
description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\|"+q+"]?\\d*(?\x3d.*?[E|W|"+n+"|"+p+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:b.abbreviatedDirections.east,description:"east/west indicator",searchPattern:B,substitution:{input:function(a){return h[a]},output:function(a){return b.abbreviatedDirections[t[a]]}}}],defaultPattern:"Y\u00b0 A'"+b.abbreviatedDirections.north+", X\u00b0 B'"+b.abbreviatedDirections.east}),new k({name:"dms",
coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?\x3d.*?\\s+.*?[N|S|"+l+"|"+m+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}(?\x3d.*?[N|S|"+l+"|"+m+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"B",description:"seconds latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+q+"]?\\d*(?\x3d.*?[N|S|"+
l+"|"+m+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:b.abbreviatedDirections.north,description:"north/south indicator",searchPattern:A,substitution:{input:function(a){return h[a]},output:function(a){return b.abbreviatedDirections[t[a]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?\x3d.*?\\s+.*?[E|W|"+n+"|"+p+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"C",description:"minutes longitude",
searchPattern:new RegExp("\\d{1,2}(?\x3d.*?[E|W|"+n+"|"+p+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"D",description:"seconds longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+q+"]?\\d*(?\x3d.*?[E|W|"+n+"|"+p+"])","i"),substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:b.abbreviatedDirections.east,description:"east/west indicator",searchPattern:B,substitution:{input:function(a){return h[a]},output:function(a){return b.abbreviatedDirections[t[a]]}}}],
defaultPattern:"Y\u00b0 A' B\""+b.abbreviatedDirections.north+", X\u00b0 C' D\""+b.abbreviatedDirections.east}),new k({name:"xy",coordinateSegments:[{alias:"X",description:"longitude",searchPattern:w,substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}},{alias:"Y",description:"latitude",searchPattern:w,substitution:{input:function(a){return f(a)},output:function(a){return e(a)}}}],defaultPattern:"X\u00b0, Y\u00b0"}),new k({name:"mgrs",coordinateSegments:[{alias:"Z",description:"grid zone",
searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y"}),new k({name:"usng",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",
description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y"}),new k({name:"utm",coordinateSegments:[{alias:"Z",description:"zone number",searchPattern:/\d{1,2}|[abyz]/i},{alias:"B",description:"latitude band",searchPattern:/^\w/},{alias:"X",description:"easting",searchPattern:/\d{1,7}/},{alias:"Y",description:"northing",searchPattern:/\d{1,7}/}],
defaultPattern:"ZB X Y"})]};g.isValidPoint=z;g.pointToCoordinate=v;g.project=function(a){var c=a.spatialReference,b=a.geometryServicePromise,d=a.location,e=a.scale;if(!c||d.spatialReference.wkid===c.wkid)return y.resolve({location:d,coordinate:v(d,e)});if((d.spatialReference.isWGS84||d.spatialReference.isWebMercator)&&(c.isWGS84||c.isWebMercator))return y.resolve({location:K.project(d,c),coordinate:v(d,e)});if(r[0]===d&&r[1]===c.wkid)return r[2];r[0]=d;r[1]=c.wkid;a=b.then(function(a){return a.project({geometries:[d],
outSpatialReference:c}).then(function(a){if(!z(a[0]))throw a[0];return{location:a[0],coordinate:v(a[0],e)}}).catch(function(a){throw new x("coordinate-conversion:projection-failed","Failed to project point",{projectionResult:a});})});return r[2]=a};g.toGeoCoordinateString=function(a){var c=a.formatName,b=a.location;a=a.geometryServicePromise;var d=G({coordinates:[[b.x,b.y]],sr:b.spatialReference,conversionType:c},N[c]||{});return a.then(function(a){return a.toGeoCoordinateString(d).then(function(a){var c=
a[0];if(!c)throw a;return{location:b,coordinate:c}}).catch(function(a){throw new x("coordinate-conversion:to-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:a});})})}});