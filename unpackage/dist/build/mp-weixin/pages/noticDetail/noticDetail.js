(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/noticDetail/noticDetail"],{"034a":function(n,t,e){"use strict";e.r(t);var u=e("41a7"),r=e("8783");for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);var a,i=e("f0c5"),c=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);t["default"]=c.exports},"41a7":function(n,t,e){"use strict";var u={uniCard:function(){return e.e("components/uni-card/uni-card").then(e.bind(null,"e982"))}},r=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return u}))},8783:function(n,t,e){"use strict";e.r(t);var u=e("fd28"),r=e.n(u);for(var o in u)"default"!==o&&function(n){e.d(t,n,(function(){return u[n]}))}(o);t["default"]=r.a},e9ec:function(n,t,e){"use strict";(function(n){e("c95e");u(e("66fd"));var t=u(e("034a"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},fd28:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(e("4795"));function r(n){return n&&n.__esModule?n:{default:n}}function o(n,t,e,u,r,o,a){try{var i=n[o](a),c=i.value}catch(l){return void e(l)}i.done?t(c):Promise.resolve(c).then(u,r)}function a(n){return function(){var t=this,e=arguments;return new Promise((function(u,r){var a=n.apply(t,e);function i(n){o(a,u,r,i,c,"next",n)}function c(n){o(a,u,r,i,c,"throw",n)}i(void 0)}))}}var i={data:function(){return{list:null}},onLoad:function(t){var e=this;return a(u.default.mark((function r(){var o,a;return u.default.wrap((function(u){while(1)switch(u.prev=u.next){case 0:return console.log(t),u.next=3,e.$api.getNoticeById({id:t.id});case 3:o=u.sent,a=o.data,n.hideLoading(),e.list=a,console.log(e.list);case 8:case"end":return u.stop()}}),r)})))()},methods:{herfTo:function(t){n.navigateTo({url:"../noticDetail/noticDetail?id=".concat(t)})}}};t.default=i}).call(this,e("543d")["default"])}},[["e9ec","common/runtime","common/vendor"]]]);