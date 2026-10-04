import{o as e,t}from"./react.BqBvWGiZ.js";import{t as n}from"./jsx-runtime.DandsfUi.js";import{i as r,n as i,r as a,t as o}from"./Triangle.qFQnJErr.js";var s={black:`#000000`,white:`#ffffff`,red:`#ff0000`,green:`#00ff00`,blue:`#0000ff`,fuchsia:`#ff00ff`,cyan:`#00ffff`,yellow:`#ffff00`,orange:`#ff8000`};function c(e){e.length===4&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function l(e){return e=parseInt(e),[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function u(e){return e===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(e)?e[0]===`#`?c(e):s[e.toLowerCase()]?c(s[e.toLowerCase()]):(console.warn(`Color format not recognised`),[0,0,0]):l(e)}var d=class extends Array{constructor(e){return super(...Array.isArray(e)?e:u(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(e){this[0]=e}set g(e){this[1]=e}set b(e){this[2]=e}set(e){return Array.isArray(e)?this.copy(e):this.copy(u(...arguments))}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this}},f=e(t(),1),p=n(),m=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,h=`
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;function g({color:e=[1,1,1],speed:t=1,amplitude:n=.1,mouseReact:s=!0,paused:c=!1,onReady:l,className:u=`w-full h-full`}){let g=(0,f.useRef)(null),_=(0,f.useRef)({x:.5,y:.5}),v=(0,f.useRef)(c),y=(0,f.useRef)(()=>{}),b=(0,f.useRef)(l);return b.current=l,(0,f.useEffect)(()=>{v.current=c,c||y.current()},[c]),(0,f.useEffect)(()=>{if(!g.current)return;let c=g.current,l=new a({dpr:Math.min(window.devicePixelRatio||1,1.5)}),u=l.gl;u.clearColor(1,1,1,1);let f;function p(){l.setSize(c.offsetWidth*1,c.offsetHeight*1),f&&(f.uniforms.uResolution.value=new d(u.canvas.width,u.canvas.height,u.canvas.width/u.canvas.height))}window.addEventListener(`resize`,p,!1),p();let x=new o(u);f=new r(u,{vertex:m,fragment:h,uniforms:{uTime:{value:0},uColor:{value:new d(...e)},uResolution:{value:new d(u.canvas.width,u.canvas.height,u.canvas.width/u.canvas.height)},uMouse:{value:new Float32Array([_.current.x,_.current.y])},uAmplitude:{value:n},uSpeed:{value:t}}});let S=new i(u,{geometry:x,program:f}),C=0,w=!1,T=!1;function E(e){if(v.current&&T){w=!1;return}C=requestAnimationFrame(E),f.uniforms.uTime.value=e*.001,l.render({scene:S}),T||(T=!0,b.current?.())}function D(){w||(w=!0,C=requestAnimationFrame(E))}y.current=D,D(),c.appendChild(u.canvas);function O(e){let t=c.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;_.current={x:n,y:r},f.uniforms.uMouse.value[0]=n,f.uniforms.uMouse.value[1]=r}return s&&c.addEventListener(`mousemove`,O),()=>{cancelAnimationFrame(C),y.current=()=>{},window.removeEventListener(`resize`,p),s&&c.removeEventListener(`mousemove`,O),c.removeChild(u.canvas),u.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,s]),(0,p.jsx)(`div`,{ref:g,className:u})}export{g as default};