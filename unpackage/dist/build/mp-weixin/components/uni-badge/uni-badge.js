(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"603d":function(t,e,n){"use strict";var u,a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return u}))},"8b18":function(t,e,n){},"9dc0":function(t,e,n){"use strict";var u=n("8b18"),a=n.n(u);a.a},af7a:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};e.default=u},f8b1:function(t,e,n){"use strict";n.r(e);var u=n("af7a"),a=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=a.a},fd76:function(t,e,n){"use strict";n.r(e);var u=n("603d"),a=n("f8b1");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("9dc0");var f,c=n("f0c5"),r=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,"f952f9e2",null,!1,u["a"],f);e["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fd76"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);
