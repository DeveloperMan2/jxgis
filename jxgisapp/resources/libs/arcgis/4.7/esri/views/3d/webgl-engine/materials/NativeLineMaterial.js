// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/Logger ../lib/ComponentUtils ../lib/DefaultVertexBufferLayouts ../lib/gl-matrix ../lib/GLMaterial ../lib/Material ../lib/RenderSlot ../lib/Util ./internal/MaterialUtil ../../../webgl/Util".split(" "),function(D,W,v,K,L,M,b,E,N,F,f,y,O){var G=f.VertexAttrConstants,H=M.Pos3,P=O.getStride(H)/4,Q={color:[1,1,1,1]},R=K.getLogger("esri.views.3d.webgl-engine.materials.NativeLineMaterial");D=function(m){function a(d,c){c=m.call(this,
c)||this;c.params=y.copyParameters(d,Q);c.canBeMerged=!0;return c}v(a,m);a.prototype.setColor=function(d){this.params.color=d;this.notifyDirty("matChanged")};a.prototype.getColor=function(){return this.params.color};a.prototype.getParameterValues=function(){return{color:this.params.color}};a.prototype.getOutputAmount=function(d){return d*P};a.prototype.getInstanceBufferLayout=function(){};a.prototype.getVertexBufferLayout=function(){return H};a.prototype.fillInterleaved=function(d,c,b,a,f,g,e){b=
d.vertexAttr[G.POSITION].data;if(c)for(e=b,b=S,a=0;a<e.length;a+=3){var h=e[a],k=e[a+1],r=e[a+2];b[a]=c[0]*h+c[4]*k+c[8]*r+c[12];b[a+1]=c[1]*h+c[5]*k+c[9]*r+c[13];b[a+2]=c[2]*h+c[6]*k+c[10]*r+c[14]}d=d.indices[G.POSITION];for(a=0;a<d.length;a++)c=3*d[a],f[g++]=b[c],f[g++]=b[c+1],f[g++]=b[c+2]};a.prototype.intersect=function(d,c,a,m,l,n,v,h){if(m.isSelection&&!L.isAllHidden(c.componentVisibilities,d.data.componentOffsets))if(f.isTranslationMatrix(a)){c=d.getData().getVertexAttr().position.data;l=m.camera;
n=m.point;b.vec3d.set3(n[0]-2,n[1]+2,0,w[0]);b.vec3d.set3(n[0]+2,n[1]+2,0,w[1]);b.vec3d.set3(n[0]+2,n[1]-2,0,w[2]);b.vec3d.set3(n[0]-2,n[1]-2,0,w[3]);for(h=0;4>h;h++)l.unprojectPoint(w[h],q[h]);f.point2plane(l.eye,q[0],q[1],z);f.point2plane(l.eye,q[1],q[2],A);f.point2plane(l.eye,q[2],q[3],B);f.point2plane(l.eye,q[3],q[0],C);d=Number.MAX_VALUE;for(h=0;h<c.length-5;h+=3)if(g[0]=c[h]+a[12],g[1]=c[h+1]+a[13],g[2]=c[h+2]+a[14],e[0]=c[h+3]+a[12],e[1]=c[h+4]+a[13],e[2]=c[h+5]+a[14],!(0>f.planeDistance(g,
z)&&0>f.planeDistance(e,z)||0>f.planeDistance(g,A)&&0>f.planeDistance(e,A)||0>f.planeDistance(g,B)&&0>f.planeDistance(e,B)||0>f.planeDistance(g,C)&&0>f.planeDistance(e,C))){l.projectPoint(g,t);l.projectPoint(e,u);if(0>t[2]&&0<u[2]){b.vec3d.subtract(g,e,p);var k=l.frustumPlanes,r=-(b.vec3d.dot(k[4],g)+k[4][3]),k=r/b.vec3d.dot(p,k[4]);b.vec3d.scale(p,k,p);b.vec3d.add(g,p,g);l.projectPoint(g,t)}else if(0<t[2]&&0>u[2])b.vec3d.subtract(e,g,p),k=l.frustumPlanes,r=-(b.vec3d.dot(k[4],e)+k[4][3]),k=r/b.vec3d.dot(p,
k[4]),b.vec3d.scale(p,k,p),b.vec3d.add(e,p,e),l.projectPoint(e,u);else if(0>t[2]&&0>u[2])continue;k=f.pointLineSegmentDistanceSquared2D(t,u,n);k<d&&(d=k,b.vec3d.set(g,I),b.vec3d.set(e,J))}a=m.p0;m=m.p1;4>d&&(d=f.lineLineDistanceSquared3D(I,J,a,m,T),c=Number.MAX_VALUE,d.success&&(b.vec3d.subtract(d.pa,a,x),d=b.vec3d.length(x),b.vec3d.scale(x,1/d),c=d/b.vec3d.dist(a,m)),v(c,x))}else R.error("intersection assumes a translation-only matrix")};a.prototype.getGLMaterials=function(){return{color:U,depthShadowMap:void 0,
normal:void 0,depth:void 0,highlight:V}};a.prototype.getAllTextureIds=function(){return[]};return a}(N);var U=function(b){function a(d,a,e){d=b.call(this,d,a)||this;d.program=a.get("simple");d.updateParameters();return d}v(a,b);a.prototype.updateParameters=function(){this.params=this.material.getParameterValues()};a.prototype.beginSlot=function(a){return a===F.OPAQUE_MATERIAL};a.prototype.getProgram=function(){return this.program};a.prototype.bind=function(a,b){b=this.program;var d=this.params;a.bindProgram(b);
b.setUniform4fv("color",d.color);a.setBlendingEnabled(1>d.color[3]);a.setBlendFunctionSeparate(a.gl.SRC_ALPHA,a.gl.ONE_MINUS_SRC_ALPHA,a.gl.ONE,a.gl.ONE_MINUS_SRC_ALPHA);a.setDepthTestEnabled(!0)};a.prototype.release=function(a){1>this.params.color[3]&&a.setBlendingEnabled(!1)};a.prototype.bindView=function(a,b){y.bindView(b.origin,b.view,this.program)};a.prototype.bindInstance=function(a,b){this.program.setUniformMatrix4fv("model",b.transformation)};a.prototype.getDrawMode=function(a){return a.gl.LINES};
return a}(E),V=function(b){function a(a,c,e){a=b.call(this,a,c)||this;a.program=c.get("highlight");return a}v(a,b);a.prototype.updateParameters=function(){};a.prototype.beginSlot=function(a){return a===F.OPAQUE_MATERIAL};a.prototype.getProgram=function(){return this.program};a.prototype.bind=function(a,b){a.bindProgram(this.program);a.setDepthTestEnabled(!0)};a.prototype.release=function(a){};a.prototype.bindView=function(a,b){y.bindView(b.origin,b.view,this.program)};a.prototype.bindInstance=function(a,
b){this.program.setUniformMatrix4fv("model",b.transformation)};a.prototype.getDrawMode=function(a){return a.gl.LINES};return a}(E),g=b.vec3d.create(),e=b.vec3d.create(),p=b.vec3d.create(),x=b.vec3d.create(),t=b.vec3d.create(),u=b.vec3d.create(),I=b.vec3d.create(),J=b.vec3d.create(),T={success:!1,dist2:0,pa:b.vec3d.create(),pb:b.vec3d.create()},w=[b.vec3d.create(),b.vec3d.create(),b.vec3d.create(),b.vec3d.create()],q=[b.vec3d.create(),b.vec3d.create(),b.vec3d.create(),b.vec3d.create()],z=b.vec4d.create(),
A=b.vec4d.create(),B=b.vec4d.create(),C=b.vec4d.create(),S=[];return D});