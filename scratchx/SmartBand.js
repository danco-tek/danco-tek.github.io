//==============================
// SmartBand.js
// Johnny Chuang, January 2018
// SmartBand Scratch Extension
//==============================
(function(d){function r(){if(f=E.shift()){f.open({stopBits:0,bitRate:115200,ctsFlowControl:0});console.log("connection with "+f.id);f.set_receive_handler(K);var a=new Uint8Array([36,120,10,10,10,10]);f.send(a.buffer);t=setInterval(function(){f.send(a.buffer)},500);p=setTimeout(function(){u();f&&f.close();r()},2E3)}}function y(){p&&(clearTimeout(p),p=null)}function u(){t&&(clearInterval(t),t=null)}function K(a){a=new Uint8Array(a);36==a[0]&&68==a[1]&&(y(),u(),f.set_receive_handler(L),c.getMac(f),console.log("found "+
f.id))}function L(a){a=new Uint8Array(a);c.parse(a)}function M(a){0==c.mac.length&&f&&c.getMac(f)}function N(a){h[0].updateS(a)}function O(a){h[1].updateS(Math.abs(a))}function v(a,b,e,c){b=new Uint8Array([36,100,48,b+48,e+48,10,10,10,10]);z(a,b.buffer,c)}function m(a,b,e){b=new Uint8Array([36,101,48,b+48,10,10,10,10]);z(a,b.buffer,e)}function z(a,b,e){0==e?a.send(b):setTimeout(function(){a.send(b)},e)}function F(a,b){num=A(b-a,360);180<num&&(num-=360);return num}function A(a,b){return Math.max(0,
Math.min(b,a-Math.floor(a/b)*b))}function l(a,b){var e=(b&255)<<8|a&255;32767<e&&(e-=65536);return e}function G(a){a-=256;-128>a&&(a=-128);return a}function H(a){a+=128;return 0==a?0:10>a?1:85<a?10:a=Math.round(a/9)}var c=null,h=[null,null],w=[null,null,null],f=null,t=null,p=null,E=[];d._deviceConnected=function(a){E.push(a);console.log("deviceConnected:"+a.id);f||r()};d._deviceRemoved=function(a){console.log("deviceRemoved:"+a.id);f==a&&(u(),y(),f&&f.close(),r())};d._shutdown=function(){console.log("shutdown:"+
f.id);f&&f.close();u();y();f&&f.close();r()};d._getStatus=function(){return f?p?{status:1,msg:"Probing for SmartBand"}:{status:2,msg:"SmartBand connected"}:{status:1,msg:"SmartBand disconnected"}};d.isBandConnect=function(a){return P[a]?c.dataConnected:!c.dataConnected};d.isBandConn=function(){return c.dataConnected};d.getBattery=function(){return c.battery};d.getRssi=function(){return c.rssi10};d.getBandName=function(){return c.mac};d.isPressed=function(){return c.isPressed()};d.isPressed2=function(){return c.isPressed()};
d.setMouseX=function(a){return c.setMouseX(a)};d.getMouseX=function(){return c.getMouse(0)};d.getMouseY=function(){return c.getMouse(1)};d.getHandZ=function(){return c.getHandZ()};d.getMouseXMS=function(a,b){return B[b]?w[0].smooth(c.getMouse(0)*a):c.getMouse(0)*a};d.getMouseYMS=function(a,b){return B[b]?w[1].smooth(c.getMouse(1)*a):c.getMouse(1)*a};d.getHandZAS=function(a,b){a=parseInt(a);return B[b]?w[2].smoothAngle(c.getHandZ()+a):c.getHandZ()+a};d.getForceAndPause=function(a,b,e){return h[0].isPowerGreater(a,
b,e)};d.getRotateAndPause=function(a,b,e){return h[1].isPowerGreater(a,b,e)};d.getG0=function(){return h[0].getForce()};d.pauseG0=function(a){h[0].pauseUpdateS(a)};d.getG1=function(){return h[1].getForce()};d.pauseG1=function(a){h[1].pauseUpdateS(a)};d.getShakeDirFB=function(a){c.checkFB=!0;var b=c.wayZ;return 5==x[a]?1==b:-1==b};d.getShakeDirLR=function(a){c.checkLR=!0;var b=c.wayCheckLR.getWay();return 4==x[a]?1==b:-1==b};d.getShakeDirTD=function(a){c.checkTD=!0;var b=c.wayCheckTD.getWay();return 1==
x[a]?1==b:-1==b};d.getRotateLR=function(a){c.checkRZ=!0;var b=c.wayCheckRZ.getWay();return 4==x[a]?1==b:-1==b};d.doVibrate=function(a,b,e){a=parseInt(a);b=C[b];c.vibrate(f,a,b);setTimeout(function(){e()},100*b+200)};d.doLedOn=function(a,b,e){a=I[a];b=parseInt(b);c.ledOn(f,a,b);setTimeout(function(){e()},500)};d.doLedOnPro=function(a,b,e,d){c.ledOnPro(f,parseInt(a),parseInt(b),parseInt(e));setTimeout(function(){d()},500)};d.doLedFlash=function(a,b,e,d,g){a=I[a];b=parseInt(b);c.ledFlash(f,a,C[e],C[d],
b);setTimeout(function(){g()},500)};var P={"\u6210\u529f":!0,"\u4e2d\u65b7":!1},B={"\u6253\u958b":!0,"\u95dc\u6389":!1},x={"\u4e0a":1,"\u4e0b":2,"\u5de6":3,"\u53f3":4,"\u524d":5,"\u5f8c":6},I={"\u7d05":0,"\u7da0":1,"\u85cd":2},C={"0.1":1,"0.2":2,"0.3":3,"0.4":4,"0.5":5,"0.6":6,"0.7":7,"0.8":8,"0.9":9},Q={blocks:[["r","\u7a7a\u4e2d\u6ed1\u9f20\u7684 X\u5ea7\u6a19 * %n , %m.onOff \u5e73\u6ed1\u6548\u679c","getMouseXMS",400,"\u6253\u958b"],["r","\u7a7a\u4e2d\u6ed1\u9f20\u7684 Y\u5ea7\u6a19 * %n , %m.onOff \u5e73\u6ed1\u6548\u679c",
"getMouseYMS",300,"\u6253\u958b"],["r","\u624b\u8155\u65cb\u8f49\u89d2\u5ea6 + %d.angle \u5ea6 , %m.onOff \u5e73\u6ed1\u6548\u679c","getHandZAS",0,"\u6253\u958b"],["-"],["r","\u7a7a\u4e2d\u6ed1\u9f20\u7684 X\u5ea7\u6a19 (-1~1)","getMouseX"],["r","\u7a7a\u4e2d\u6ed1\u9f20\u7684 Y\u5ea7\u6a19 (-1~1)","getMouseY"],["r","\u624b\u8155\u65cb\u8f49\u89d2\u5ea6 (-180~180)","getHandZ"],["-"],[" ","\u5c07\u7a7a\u4e2d\u6ed1\u9f20\u7684 X\u5ea7\u6a19\u8a2d\u5b9a\u70ba %n","setMouseX",0],["-"],["h","\u7576\u6309\u4e0b\u624b\u74b0\u6309\u9215",
"isPressed"],["b","\u6309\u4e0b\u4e86\u624b\u74b0\u6309\u9215","isPressed2"],["-"],["w","\u8b93\u624b\u74b0\u9707\u52d5 , \u5f37\u5ea6: %d.powerV , \u79d2\u6578: %d.second \u79d2","doVibrate",5,.5],["w","\u8b93\u624b\u74b0\u4eae %m.color3 \u71c8 , \u4eae\u5ea6: %d.light9","doLedOn","\u85cd",5],["w","\u8b93\u624b\u74b0\u9583 %m.color3 \u71c8 , \u4eae\u5ea6: %d.light9 , \u4eae %d.second \u79d2 , \u7184 %d.second \u79d2","doLedFlash","\u7da0",5,.3,.3],["w","\u540c\u6642\u4eae\u71c8 , \u7d05\u71c8\u4eae\u5ea6: %d.light10 , \u7da0\u71c8\u4eae\u5ea6: %d.light10 , \u85cd\u71c8\u4eae\u5ea6: %d.light10",
"doLedOnPro",0,0,5],["-"],["h","\u7576\u624b\u8155\u65cb\u8f49\u7684\u901f\u5ea6\u5927\u65bc %n , \u52a0\u901f\u5927\u65bc %n , \u66ab\u505c\u5075\u6e2c %n \u79d2","getRotateAndPause",30,15,.5],["r","\u624b\u8155\u65cb\u8f49\u7684\u901f\u5ea6","getG1"],[" ","\u66ab\u505c\u5075\u6e2c \u624b\u8155\u65cb\u8f49 %d \u79d2","pauseG1",.5],["b","\u624b\u8155\u5411 %m.wayLR \u65cb\u8f49","getRotateLR","\u53f3"],["-"],["h","\u7576\u63ee\u624b\u7684\u901f\u5ea6\u5927\u65bc %n , \u52a0\u901f\u5927\u65bc %n , \u66ab\u505c\u5075\u6e2c %n \u79d2",
"getForceAndPause",1,.3,.3],["r","\u63ee\u624b\u7684\u901f\u5ea6","getG0"],[" ","\u66ab\u505c\u5075\u6e2c \u63ee\u624b %n \u79d2","pauseG0",.5],["b","\u624b\u662f\u5411 %m.wayTD \u63ee (\u4e0a\u4e0b)","getShakeDirTD","\u4e0a"],["b","\u624b\u662f\u5411 %m.wayLR \u63ee (\u5de6\u53f3)","getShakeDirLR","\u5de6"],["b","\u624b\u662f\u5411 %m.wayFB \u63ee (\u524d\u5f8c)","getShakeDirFB","\u524d"],["-"],["h","\u7576\u624b\u74b0\u9023\u7dda %m.connect","isBandConnect","\u4e2d\u65b7"],["b","\u624b\u74b0\u9023\u63a5\u4e0a\u96fb\u8166\u4e86",
"isBandConn"],["-"],["r","\u624b\u74b0\u96fb\u91cf (0~100)","getBattery"],["r","\u8a0a\u865f\u5f37\u5ea6 (0~10)","getRssi"],["r","\u624b\u74b0\u865f\u78bc","getBandName"]],menus:{connect:["\u6210\u529f","\u4e2d\u65b7"],onOff:["\u6253\u958b","\u95dc\u6389"],wayTD:["\u4e0a","\u4e0b"],wayLR:["\u5de6","\u53f3"],wayFB:["\u524d","\u5f8c"],color3:["\u7d05","\u7da0","\u85cd"],powerV:"456789".split(""),second:"0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9".split(" "),light9:"123456789".split(""),light10:"0123456789".split(""),
angle:["0","90","180","270"]},url:"http://danco-tek.com/scratch/"};(function(){$.getScript("http://danco-tek.github.io/scratchx/lib/gl-matrix-min.js").done(function(a,b){console.log("Loading completed");c||(h=[new k,new k],w=[new n,new n,new n],c=new g,c.onDataL=N,c.onDataZ=O,c.onDataU=M);ScratchExtensions.register("danco-tek SmartBand",Q,d,{type:"serial"})}).fail(function(a,b,e){console.log("Error loading lib");console.log(e)})})();var R=2/Math.PI,D=[0,1,0],S=Math.PI,J=2*Math.PI,g=
function(){this.q=[0,0,0,0];this.a=[0,0,0];this.air=[0,0];this.onDataU=this.onDataZ=this.onDataL=null;this.pressed=!1;this.battery=0;this.rssi=-128;this.rssi10=0;this.mac="";this.dataConnected=!1;this.quaternion=quat.create();this.doQuat=!1;this.ray=vec3.create();this.doRay=!1;this.rayCache=vec3.create();this.handZ=this.angleY=0;this.doHandZ=!1;this.deltaY=0;D=vec3.fromValues(0,1,0);this.deltaZ=this.zCache=this.pressdTime=0;this.checkRZ=this.checkFB=this.checkLR=this.checkTD=this.doMouse=this.doDeltaZ=
!1;this.wayCheckTD=new q;this.wayCheckTD.mpl=1;this.wayCheckLR=new q;this.wayCheckRZ=new q;this.wayZ=0};g.prototype.parse=function(a){this.dataConnected=!0;var b=a[2];if(1==b)25>a.length||(this.q[0]=l(a[4],a[5]),this.q[1]=l(a[7],a[8]),this.q[2]=l(a[10],a[11]),this.q[3]=l(a[13],a[14]),this.a[0]=.001*l(a[16],a[17]),this.a[1]=.001*l(a[19],a[20]),this.a[2]=.001*l(a[22],a[23]),this.doMouse=this.doDeltaZ=this.doHandZ=this.doRay=this.doQuat=!1,this.checkRZ&&(this.getDeltaZ(),this.wayCheckRZ.update(this.deltaZ)),
this.checkTD&&(a=180*this.ray[2],this.updateQuat(),this.updateRay(),this.wayCheckTD.update(F(a,180*this.ray[2]))),this.checkLR&&(this.getMouse(0),this.wayCheckLR.update(180*this.deltaY)),this.checkFB&&(a=this.a[1],this.wayZ=.1<a?1:-.1>a?-1:0),this.onDataL&&(a=vec3.length(this.a),this.onDataL(a)),this.onDataZ&&(this.getDeltaZ(),this.onDataZ(this.deltaZ)));else{if(2==b)this.pressed=!0,this.pressdTime=Date.now();else if(3==b)7<=a.length&&(this.battery=a[4],this.rssi=G(a[5]),this.rssi10=H(this.rssi));
else if(4==b)this.dataConnected=!1,this.rssi=-128,this.rssi10=0;else if(5==b&&37<=a.length){this.battery=a[5];this.rssi=G(a[6]);this.rssi10=H(this.rssi);for(var e="",c=9;15>c;c++)e+=a[c].toString(16);this.mac=e.toUpperCase()}if(this.onDataU)this.onDataU(b)}};g.prototype.isPressed=function(){var a=this.pressed;this.pressed=!1;return 300<Date.now()-this.pressdTime?!1:a};g.prototype.vibrate=function(a,b,e){b=new Uint8Array([36,97,48,b+48,e+48,10,10,10,10]);a.send(b.buffer)};g.prototype.ledOn=function(a,
b,e){this.ledOffAll(a,b);v(a,b,e,300)};g.prototype.ledOffAll=function(a,b){var e=0;0!=b&&(m(a,0,0),e+=150);1!=b&&(m(a,1,e),e+=150);2!=b&&m(a,2,e)};g.prototype.ledFlash=function(a,b,e,c,d){this.ledOffAll(a,b);b=new Uint8Array([36,102,48,b+48,e+48,c+48,d+48,10,10,10,10]);z(a,b.buffer,300)};g.prototype.ledOnPro=function(a,b,c,d){0==b?m(a,0,0):v(a,0,b,0);0==c?m(a,1,150):v(a,1,c,150);0==d?m(a,2,300):v(a,2,d,300)};g.prototype.getMac=function(a){var b=new Uint8Array([36,119,10,10,10,10]);a.send(b.buffer)};
g.prototype.getHandZ=function(){this.updateHandZ();return this.handZ};g.prototype.updateHandZ=function(){if(!this.doHandZ){var a=this.q[0],b=this.q[1],c=this.q[2],d=this.q[3];mag=Math.sqrt(a*a+b*b+c*c+d*d);mag=1E-6<=mag?1/mag:1E6;qW2=a*mag;qX2=b*mag;qY2=c*mag;qZ2=d*mag;ez=-57.29578*Math.atan2(2*(qX2*qZ2-qW2*qY2),1-2*(qX2*qX2+qY2*qY2));ez+=5;180<ez&&(ez-=360);this.handZ=ez;this.doHandZ=!0}};g.prototype.getDeltaZ=function(){if(this.doDeltaZ)return this.deltaZ;this.updateHandZ();this.deltaZ=F(this.zCache,
this.handZ);this.zCache=this.handZ;this.doDeltaZ=!0;return this.deltaZ};g.prototype.getMouse=function(a){if(this.doMouse)return this.air[a];this.updateQuat();this.updateRay();this.air[1]=Math.tan(Math.atan2(this.ray[2],1));vec3.set(this.rayCache,this.ray[0],Math.tan(Math.atan2(this.ray[1],1)),0);var b=vec3.angle(D,this.rayCache);0>this.ray[0]&&(b*=-1);num=A(b-this.angleY,J);num>S&&(num-=J);this.deltaY=num*R;this.angleY=b;this.air[0]=Math.max(-1,Math.min(1,this.air[0]+this.deltaY));this.doMouse=!0;
return this.air[a]};g.prototype.setMouseX=function(a){this.air[0]=Math.max(-1,Math.min(1,a))};g.prototype.updateQuat=function(){this.doQuat||(quat.set(this.quaternion,this.q[1],this.q[2],this.q[3],this.q[0]),quat.normalize(this.quaternion,this.quaternion),this.doQuat=!0)};g.prototype.updateRay=function(){this.doRay||(vec3.transformQuat(this.ray,D,this.quaternion),this.doRay=!0)};var k=function(){this.triggerForce=1;this.lockTime=.3;this.magnitude=this.accPower=this.instantForce=0;this.triggerFlag=
!1;this.lastForce=0;this.onTrigger=null;this.pauseUpdate=this.run=!1;this.pauseTimer=null;this.powerCount=0};k.prototype.pauseUpdateData=function(a){this.pauseTimer&&(clearTimeout(this.pauseTimer),this.pauseTimer=null);this.pauseUpdate=!0;var b=this;this.pauseTimer=setTimeout(function(){b.pauseUpdateDataEnd()},a)};k.prototype.pauseUpdateDataEnd=function(){this.pauseUpdate=!1};k.prototype.updateS=function(a){this.run&&!this.pauseUpdate&&(this.lastForce=this.magnitude,this.magnitude=a,this.magnitude>
this.accPower?(this.accPower=this.magnitude,this.powerCount=0):(this.powerCount++,3<this.powerCount&&(this.powerCount=this.accPower=0)))};k.prototype.isPowerGreater=function(a,b,c){this.run=!0;if(this.accPower>=a){if(0<this.deltaForce&&Math.abs(this.magnitude-this.lastForce)<this.deltaForce)return!1;this.pauseUpdateData(parseInt(1E3*c));this.accPower=0;return!0}return!1};k.prototype.pauseUpdateS=function(a){this.pauseUpdateData(1E3*a);this.accPower=0};k.prototype.getForce=function(){this.run=!0;return this.accPower};
var q=function(){this.way=this.v0=0;this.min=.1;this.max=.4;this.mpl=.5;this.res=0};q.prototype.update=function(a){var b=a-this.v0;this.v0=a;a=0;b>this.min?a=1:b<-this.min&&(a=-1);this.way+=a*this.mpl;1<this.way?this.way=1:-1>this.way&&(this.way=-1);this.res=this.way>this.max?1:this.way<-this.max?-1:0};q.prototype.getWay=function(){return this.res};var n=function(){this.res=this.cache=0};n.prototype.lerp=function(a,b){if(0==b)return a;this.res=a+(this.cache-a)*(0>b?0:1<b?1:b);this.cache=a;return this.res};
n.prototype.smooth=function(a){this.res=a+.5*(this.cache-a);this.cache=a;return this.res};n.prototype.smoothAngle=function(a){var b=A(this.cache-a,360);180<b&&(b-=360);this.res=a+.5*b;this.cache=a;return this.res}})({});