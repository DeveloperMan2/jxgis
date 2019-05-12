// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/libs/gl-matrix/mat3 ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec3 ../../../core/libs/gl-matrix/vec4 ../GeometryUtils ./rendererUtils ./vtShaderSnippets ../../webgl/ShaderVariations ../../webgl/VertexArrayObject".split(" "),function(J,K,B,A,G,C,H,I,D,E,z){var F=1/65536;return function(){function n(){this._fillAttributeLocations={a_pos:0};this._fillAttributeLocationsDD={a_pos:0,a_color:1};this._outlineAttributeLocations={a_pos:0,a_offset:1,
a_xnormal:2};this._outlineAttributeLocationsDD={a_pos:0,a_offset:1,a_xnormal:2,a_color:3};this._initialized=!1;this._viewProjMat=A.create();this._offsetVector=G.create();this._patternMatrix=B.create();this._color=C.create();this._outlineColor=C.create()}n.prototype.dispose=function(){};n.prototype.render=function(d,a,b,c,e,f,h,n,x,k,y){if(0!==a.triangleElementCount){this._initialized||this._initialize(d);var u=void 0!==h.getPaintValue("fill-pattern",b),l=y*h.getPaintValue("fill-opacity",b),g=h.getPaintValue("fill-color",
b),t=3===e,m;t&&(m=I.int32To4Bytes(a.layerID));var q=f.tileTransform.transform,p=f.coordRange/512,r=h.getPaintValue("fill-translate",b);if(0!==r[0]||0!==r[1]){A.copy(this._viewProjMat,f.tileTransform.transform);var q=r[0],r=r[1],v=0,w=0,p=(1<<f.key.level)/Math.pow(2,b)*p;1===h.getPaintValue("fill-translate-anchor",b)?(v=-H.C_DEG_TO_RAD*c,c=Math.sin(v),w=Math.cos(v),v=p*(q*w-r*c),w=p*(q*c+r*w)):(v=p*q,w=p*r);this._offsetVector[0]=v;this._offsetVector[1]=w;this._offsetVector[2]=0;A.translate(this._viewProjMat,
this._viewProjMat,this._offsetVector);q=this._viewProjMat}this._drawFill(d,a,b,e,f,h,n,q,k,y,t,m);if(h.getPaintValue("fill-antialias",b)&&!u&&0<a.outlineElementCount&&(1===e||3===e)){e=h.hasDataDrivenOutline;b=h.getPaintValue("fill-outline-color",b);if(0===b[3]){if(1!==this._color[3]&&!e)return;b=g}k=.75/k;if(g=this._getOutlineVAO(d,f,e))d.bindVAO(g),g=this._outlineShaderVariations.getProgram([e,t],void 0,void 0,e?this._outlineAttributeLocationsDD:this._outlineAttributeLocations),d.bindProgram(g),
g.setUniformMatrix4fv("u_transformMatrix",q),g.setUniformMatrix4fv("u_extrudeMatrix",x),g.setUniform2fv("u_normalized_origin",f.tileTransform.displayCoord),g.setUniform1f("u_depth",h.z+F),g.setUniform1f("u_outline_width",k),e||(f=l*b[3],this._outlineColor[0]=f*b[0],this._outlineColor[1]=f*b[1],this._outlineColor[2]=f*b[2],this._outlineColor[3]=f,g.setUniform4fv("u_color",this._outlineColor)),t&&g.setUniform4f("u_id",m[0],m[1],m[2],m[3]),d.drawElements(4,a.outlineElementCount,5125,12*a.outlineElementStart),
d.bindVAO()}}};n.prototype._initialize=function(d){if(this._initialized)return!0;var a=new E("fill",["fillVS","fillFS"],[],D,d);a.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN");a.addDefine("DD","DD",[!0,!1],"DD");a.addDefine("ID","ID",[!0,!0],"ID");this._fillShaderVariations=a;this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]};this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},
{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};d=new E("outline",["outlineVS","outlineFS"],[],D,d);d.addDefine("DD","DD",[!0,!1],"DD");d.addDefine("ID","ID",[!0,!0],"ID");this._outlineShaderVariations=d;this._outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]};
this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]};return this._initialized=!0};n.prototype._drawFill=function(d,a,b,c,e,f,h,n,x,k,y,u){var l=f.getPaintValue("fill-pattern",b),g=void 0!==l,t=k*f.getPaintValue("fill-opacity",
b);k=f.getPaintValue("fill-color",b);var m=f.hasDataDrivenFill,q=m?.5:k[3]*t,p=!1;g||1!==q||(p=!0);if(!g||0!==c)if(!p||1!==c)if(g||p||0!==c)if(c=this._getFillVAO(d,e,m))d.bindVAO(c),c=this._fillShaderVariations.getProgram([g,m,y],void 0,void 0,m?this._fillAttributeLocationsDD:this._fillAttributeLocations),d.bindProgram(c),g&&(l=h.getMosaicItemPosition(l,!0))&&(b=e.coordRange/512/Math.pow(2,Math.round(b)-e.key.level)/x,B.identity(this._patternMatrix),x=1/(l.size[1]*b),this._patternMatrix[0]=1/(l.size[0]*
b),this._patternMatrix[4]=x,h.bind(d,9729,l.page,1),c.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),c.setUniform2f("u_pattern_tl",l.tl[0],l.tl[1]),c.setUniform2f("u_pattern_br",l.br[0],l.br[1]),c.setUniform1i("u_texture",1)),c.setUniformMatrix4fv("u_transformMatrix",n),c.setUniform2fv("u_normalized_origin",e.tileTransform.displayCoord),c.setUniform1f("u_depth",f.z+F),m||(e=t*k[3],this._color[0]=e*k[0],this._color[1]=e*k[1],this._color[2]=e*k[2],this._color[3]=e,c.setUniform4fv("u_color",
this._color)),y&&c.setUniform4f("u_id",u[0],u[1],u[2],u[3]),d.drawElements(4,a.triangleElementCount,5125,12*a.triangleElementStart),d.bindVAO()};n.prototype._getFillVAO=function(d,a,b){if(b){if(a.fillDDVertexArrayObject)return a.fillDDVertexArrayObject;b=a.fillDDVertexBuffer;var c=a.fillIndexBuffer;if(!b||!c)return null;a.fillDDVertexArrayObject=new z(d,this._fillAttributeLocationsDD,this._fillVertexAttributesDD,{geometry:b},c);return a.fillDDVertexArrayObject}if(a.fillVertexArrayObject)return a.fillVertexArrayObject;
b=a.fillVertexBuffer;c=a.fillIndexBuffer;if(!b||!c)return null;a.fillVertexArrayObject=new z(d,this._fillAttributeLocations,this._fillVertexAttributes,{geometry:b},c);return a.fillVertexArrayObject};n.prototype._getOutlineVAO=function(d,a,b){if(b){if(a.outlineDDVertexArrayObject)return a.outlineDDVertexArrayObject;b=a.outlineDDVertexBuffer;var c=a.outlineIndexBuffer;if(!b||!c)return null;a.outlineDDVertexArrayObject=new z(d,this._outlineAttributeLocationsDD,this._outlineVertexAttributesDD,{geometry:b},
c);return a.outlineDDVertexArrayObject}if(a.outlineVertexArrayObject)return a.outlineVertexArrayObject;b=a.outlineVertexBuffer;c=a.outlineIndexBuffer;if(!b||!c)return null;a.outlineVertexArrayObject=new z(d,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:b},c);return a.outlineVertexArrayObject};return n}()});