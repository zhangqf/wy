(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notice/notice"],{"31eb":function(n,t,e){"use strict";e.r(t);var u=e("8e46"),r=e("7929");for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);var i,c=e("f0c5"),a=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);t["default"]=a.exports},4289:function(n,t,e){"use strict";(function(n){e("c95e");u(e("66fd"));var t=u(e("31eb"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},7929:function(n,t,e){"use strict";e.r(t);var u=e("896b"),r=e.n(u);for(var o in u)"default"!==o&&function(n){e.d(t,n,(function(){return u[n]}))}(o);t["default"]=r.a},"896b":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(e("4795"));function r(n){return n&&n.__esModule?n:{default:n}}function o(n,t,e,u,r,o,i){try{var c=n[o](i),a=c.value}catch(l){return void e(l)}c.done?t(a):Promise.resolve(a).then(u,r)}function i(n){return function(){var t=this,e=arguments;return new Promise((function(u,r){var i=n.apply(t,e);function c(n){o(i,u,r,c,a,"next",n)}function a(n){o(i,u,r,c,a,"throw",n)}c(void 0)}))}}var c={data:function(){return{list:null}},onLoad:function(){var t=this;return i(u.default.mark((function e(){var r;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={currPage:1,toatlNum:50},e.next=3,t.$api.getNoticeList(r);case 3:t.list=e.sent,n.hideLoading(),console.log(t.list);case 6:case"end":return e.stop()}}),e)})))()},methods:{herfTo:function(t){n.navigateTo({url:"../noticDetail/noticDetail?id=".concat(t)})}}};t.default=c}).call(this,e("543d")["default"])},"8e46":function(n,t,e){"use strict";var u={uniCard:function(){return e.e("components/uni-card/uni-card").then(e.bind(null,"e982"))}},r=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return u}))}},[["4289","common/runtime","common/vendor"]]]);