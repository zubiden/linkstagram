(this.webpackJsonplinkstagram=this.webpackJsonplinkstagram||[]).push([[0],{12:function(e,t,n){e.exports={login:"Login_login__Su-pD",content:"Login_content__1n307",presentation:"Login_presentation__1xukJ",authPane:"Login_authPane__Gti9L",title:"Login_title__1CcnA",input:"Login_input__3qya9",switch:"Login_switch__19x0Z",inlineSwitch:"Login_inlineSwitch__VkzuR"}},14:function(e,t,n){e.exports={header:"Header_header__2XAj3",logo:"Header_logo__2XG30",separator:"Header_separator__1wAjB",button:"Header_button__1nZ-l",dropdown:"Header_dropdown__2aPVx",hidden:"Header_hidden__3njkq",dropdownItem:"Header_dropdownItem__3ivfE",reserver:"Header_reserver__1tudu"}},23:function(e,t,n){e.exports={button:"Button_button__1ymYf",square:"Button_square__3gOMh",smallPadding:"Button_smallPadding__cHP4h",white:"Button_white__3MqI4",blue:"Button_blue__2cyym",black:"Button_black__iOpLV",lightBorder:"Button_lightBorder__A37mZ"}},25:function(e,t,n){e.exports={footer:"Footer_footer__1G6Wy",buttonRow:"Footer_buttonRow__2M2B4",greyButton:"Footer_greyButton__2KO1G"}},26:function(e,t,n){e.exports={square:"Avatar_square__25UWu",border:"Avatar_border__BfyfQ",visible:"Avatar_visible__EWr5c",avatar:"Avatar_avatar__231VH"}},27:function(e,t,n){e.exports={home:"Home_home__1gYZR",content:"Home_content__2tDQD",left:"Home_left__1N5fx",right:"Home_right__wSsfc"}},35:function(e,t,n){e.exports={feed:"PostsFeed_feed__1dkaT",postList:"PostsFeed_postList__2LTO-"}},36:function(e,t,n){e.exports={slider:"StoriesSlider_slider__akI6v"}},37:function(e,t,n){e.exports={input:"Input_input__3Jlvs"}},49:function(e,t,n){},5:function(e,t,n){e.exports={post:"FeedPost_post__38L69",header:"FeedPost_header__xfS1t",info:"FeedPost_info__2jKSq",name:"FeedPost_name__s5-LB",time:"FeedPost_time__wHx6V",more:"FeedPost_more__1F8dQ",content:"FeedPost_content__bqJzD",square:"FeedPost_square__2oSJq",image:"FeedPost_image__3GYFu",description:"FeedPost_description__dY6jO",footer:"FeedPost_footer__3nUDA",iconText:"FeedPost_iconText__3DHXK",liked:"FeedPost_liked__1hrUk",text:"FeedPost_text__390dQ",separator:"FeedPost_separator__2L6kG",share:"FeedPost_share__EP4GG"}},50:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(28),c=n.n(r),s=n(18),i=n(20),l=n(2),u=n(15),d=n(3),j=n(22),f=n(13),_=n.n(f),b=n(23),h=n.n(b),p=n(0),m=function(e){var t,n=e.color,a=void 0===n?"white":n,o=e.lightBorder,r=void 0!==o&&o,c=e.square,s=void 0!==c&&c,i=e.to,f=e.onClick,b=e.className,m=e.children,O=e.smallPadding,g=void 0!==O&&O,x=Object(j.a)(e,["color","lightBorder","square","to","onClick","className","children","smallPadding"]),v=Object(l.g)();return Object(p.jsx)("button",Object(u.a)(Object(u.a)({className:_()((t={},Object(d.a)(t,h.a.button,!0),Object(d.a)(t,h.a[a],!0),Object(d.a)(t,h.a.square,s),Object(d.a)(t,h.a.lightBorder,r),Object(d.a)(t,h.a.smallPadding,g),t),b),onClick:function(e){null===f||void 0===f||f(e),i&&v.push(i)}},x),{},{children:m}))},O=n(34),g=n(11),x=n.n(g),v=n(17),N=n(9),w={uk:"UA",en:"EN"},P={strings:{},code:localStorage.getItem("langCode")||"en",status:"idle"},S=Object(N.b)("localization/setLanguage",function(){var e=Object(v.a)(x.a.mark((function e(t,n){var a,o;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t in w)){e.next=8;break}if(a=n.getState(),o=I(a),!Object.keys(o).length||t!==F(a)){e.next=5;break}return e.abrupt("return",o);case 5:return e.abrupt("return",fetch("".concat("/language","/").concat(t,".json")).then((function(e){return e.json()})).then((function(e){var a={};for(var o in e)a[o]=e[o];return localStorage.setItem("langCode",t),n.dispatch(C(t)),a})));case 8:throw new Error("Not a valid language!");case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),k=Object(N.c)({name:"localization",initialState:P,reducers:{setLanguageCode:function(e,t){e.code=t.payload}},extraReducers:function(e){e.addCase(S.pending,(function(e){e.status="loading"})).addCase(S.fulfilled,(function(e,t){e.status="idle",e.strings=t.payload}))}}),y=k.reducer,C=k.actions.setLanguageCode,F=function(e){return e.localization.code},I=function(e){return e.localization.strings},B="https://linkstagram-api.ga";function L(e){return A("".concat(B,"/profiles/").concat(e,"/posts"))}function A(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a={method:t};a.headers=new Headers({"Content-Type":"application/json"}),n&&(a.body=JSON.stringify(n));var o=localStorage.getItem("auth");return o&&a.headers.set("Authorization","Bearer "+o),fetch(e,a).then((function(e){return e.json()}))}var q=Object(N.b)("profile/fetchAllProfiles",Object(v.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A("".concat(B,"/profiles")));case 1:case"end":return e.stop()}}),e)})))),H=Object(N.b)("profile/fetchAccount",Object(v.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",A("".concat(B,"/account")));case 1:case"end":return e.stop()}}),e)})))),T=Object(N.c)({name:"profile",initialState:{account:null,allProfiles:[],profilesFetchStatus:"idle",accountFetchStatus:"idle"},reducers:{logout:function(e){e.account=null,localStorage.removeItem("auth")},resetAccountFetchStatus:function(e){e.accountFetchStatus="idle"}},extraReducers:function(e){e.addCase(q.pending,(function(e){e.profilesFetchStatus="loading"})).addCase(q.fulfilled,(function(e,t){e.profilesFetchStatus="idle",e.allProfiles=t.payload})).addCase(q.rejected,(function(e){e.profilesFetchStatus="failed",e.allProfiles=[]})).addCase(H.pending,(function(e){e.accountFetchStatus="loading"})).addCase(H.fulfilled,(function(e,t){e.accountFetchStatus="idle",e.account=t.payload})).addCase(H.rejected,(function(e){e.accountFetchStatus="failed",e.account=null}))}}),z=T.reducer,E=T.actions,D=(E.logout,E.resetAccountFetchStatus,function(e){return e.profile.allProfiles}),R=function(e){return e.profile.account},G=function(e){return!!e.profile.account},J=function(){return Object(s.b)()},U=s.c,M=function(){var e=U(I),t=U(F);return function n(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NO_TRANSLATION_KEY_PROVIDED",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;if(W(a))return n(a.key,a.replaces,a.count,a.defaultValue);var s=e[a];if(!s)return c||a;var i=a;for(var l in i=Y(s)?s[V(t,r)]||s.other:s,o){var u=o[l];i=i.replaceAll("{".concat(l,"}"),u)}return i}};function V(e,t){return{uk:O.b,en:O.a}[e](t)}function W(e){return void 0===e.length}function Y(e){return void 0===e.length}var K=n(25),Q=n.n(K),X=function(){var e=M();return Object(p.jsxs)("footer",{className:Q.a.footer,children:[Object(p.jsxs)("div",{className:Q.a.buttonRow,children:[Object(p.jsx)(Z,{text:e("footer_about")}),Object(p.jsx)(Z,{text:e("footer_help")}),Object(p.jsx)(Z,{text:e("footer_privacy")}),Object(p.jsx)(Z,{text:e("footer_terms")}),Object(p.jsx)(Z,{text:e("footer_locations")}),Object(p.jsx)(Z,{text:e("footer_language")})]}),Object(p.jsx)("div",{className:Q.a.buttonRow,children:Object(p.jsx)(Z,{text:e("footer_copyright",{year:2021..toString()})})})]})},Z=function(e){var t=e.text;return Object(p.jsx)("div",{className:Q.a.greyButton,children:t})},$=n(16),ee=n(26),te=n.n(ee),ne=function(e){var t,n=e.url,a=e.size,o=void 0===a?"4em":a,r=e.border,c=void 0!==r&&r,s=Object(j.a)(e,["url","size","border"]);return Object(p.jsx)("div",Object(u.a)(Object(u.a)({className:te.a.square},s),{},{style:{width:o},children:Object(p.jsx)("div",{className:_()((t={},Object(d.a)(t,te.a.border,!0),Object(d.a)(t,te.a.visible,c),t)),children:Object(p.jsx)("img",{src:n,className:te.a.avatar,alt:"Avatar"})})}))},ae=n(14),oe=n.n(ae),re=function(e){var t,n=e.home,o=void 0!==n&&n,r=e.profile,c=void 0!==r&&r,s=J(),i=U(G),l=U(R),u=M(),j=U(F),f=Object(a.useState)(!1),b=Object($.a)(f,2),h=b[0],O=b[1];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("header",{className:oe.a.header,children:[Object(p.jsx)("div",{className:oe.a.logo,children:"Linkstagram"}),Object(p.jsx)("div",{className:oe.a.separator}),o&&Object(p.jsx)(m,{color:"black",className:oe.a.button,to:"/",children:u("header_home")}),Object(p.jsxs)(m,{color:"white",className:oe.a.button,lightBorder:!0,square:!0,onClick:function(){return O(!h)},children:[w[j],Object(p.jsx)("div",{className:_()((t={},Object(d.a)(t,oe.a.dropdown,!0),Object(d.a)(t,oe.a.hidden,!h),t)),onClick:function(){return O(!1)},children:Object.entries(w).map((function(e){var t=Object($.a)(e,2),n=t[0],a=t[1];return Object(p.jsx)("div",{className:oe.a.dropdownItem,onClick:function(){return s(S(n))},children:a},n)}))})]}),c&&i&&(null===l||void 0===l?void 0:l.profile_photo_url)&&Object(p.jsx)(ne,{url:l.profile_photo_url})]}),Object(p.jsx)("div",{className:oe.a.reserver})]})},ce=Object(N.b)("posts/fetchAllPosts",function(){var e=Object(v.a)(x.a.mark((function e(t,n){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(je(n.getState())!==t){e.next=2;break}return e.abrupt("return",ue(n.getState()));case 2:if(!t){e.next=7;break}return n.dispatch(le(t)),e.abrupt("return",L(t));case 7:return n.dispatch(le(null)),e.abrupt("return",A("".concat(B,"/posts")));case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),se=Object(N.c)({name:"posts",initialState:{loadedPosts:[],currentPostsUsername:null,status:"idle"},reducers:{setCurrentPostsUsername:function(e,t){e.currentPostsUsername=t.payload}},extraReducers:function(e){e.addCase(ce.pending,(function(e){e.status="loading",e.loadedPosts=[]})).addCase(ce.fulfilled,(function(e,t){e.status="idle",e.loadedPosts=t.payload})).addCase(ce.rejected,(function(e){e.status="failed"}))}}),ie=se.reducer,le=se.actions.setCurrentPostsUsername,ue=function(e){return e.posts.loadedPosts},de=function(e){return e.posts.status},je=function(e){return e.posts.currentPostsUsername},fe=Object(N.a)({reducer:{posts:ie,profile:z,localization:y}});function _e(e,t){"string"===typeof e&&(e=new Date(e).getTime()/1e3);var n=Math.abs(t-e);if(n<60)return{key:"date_now"};if(n<3600){var a=Math.floor(n/60);return{key:"date_minutes",count:a,replaces:{count:a.toString()}}}if(n<86400){var o=Math.floor(n/3600);return{key:"date_hours",count:o,replaces:{count:o.toString()}}}return{key:"date_date",replaces:{date:new Date(1e3*e).toLocaleDateString(F(fe.getState()),{year:"numeric",month:"long",day:"2-digit"})}}}var be=n(5),he=n.n(be),pe=function(e){var t,n,a=e.post,o=M();return Object(p.jsxs)("div",{className:he.a.post,children:[Object(p.jsxs)("div",{className:he.a.header,children:[Object(p.jsx)(ne,{url:a.author.profile_photo_url,size:"2.5em"}),Object(p.jsxs)("div",{className:he.a.info,children:[Object(p.jsx)("div",{className:he.a.name,children:"".concat(a.author.first_name," ").concat(a.author.last_name)}),Object(p.jsx)("div",{className:he.a.time,children:o(_e(a.created_at,Date.now()))})]}),Object(p.jsx)("div",{className:he.a.more,children:Object(p.jsx)("i",{className:"icon icon-more"})})]}),Object(p.jsxs)("div",{className:he.a.content,children:[Object(p.jsx)("div",{className:he.a.square,children:Object(p.jsx)("img",{src:null===(t=a.photos)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.url,className:he.a.image,alt:"Post content"})}),a.description&&Object(p.jsx)("div",{className:he.a.description,children:a.description})]}),Object(p.jsxs)("div",{className:he.a.footer,children:[Object(p.jsx)(me,{icon:"like",text:a.likes_count.toString(),liked:a.is_liked}),Object(p.jsx)(me,{icon:"comments",text:"\u0410 \u0434\u0435 \u0457\u0445 \u0431\u0440\u0430\u0442\u0438?"}),Object(p.jsx)("div",{className:he.a.separator}),Object(p.jsxs)("div",{className:he.a.share,children:[o("post_share")," ",Object(p.jsx)("i",{className:"icon icon-arrow"})]})]})]})},me=function(e){var t,n=e.icon,a=e.text,o=e.liked,r=void 0!==o&&o;return Object(p.jsxs)("span",{className:he.a.iconText,children:[Object(p.jsx)("i",{className:_()((t={icon:!0},Object(d.a)(t,"icon-".concat(n),!0),Object(d.a)(t,he.a.liked,r),t))}),Object(p.jsx)("span",{className:he.a.text,children:a})]})},Oe=n(35),ge=n.n(Oe),xe=function(e){var t=e.username,n=J();Object(a.useEffect)((function(){n(ce(t))}),[t,n]);var o=Object(s.c)(ue);return Object(p.jsx)("div",{className:ge.a.feed,children:Object(p.jsx)("div",{className:ge.a.postList,children:o.map((function(e){return Object(p.jsx)(pe,{post:e},e.id)}))})})},ve=n(8),Ne=n.n(ve),we=function(e){var t=e.profile,n=e.own,a=void 0!==n&&n,o=M();return Object(p.jsxs)("div",{className:Ne.a.profileInfo,children:[Object(p.jsxs)("div",{className:Ne.a.top,children:[Object(p.jsxs)("div",{className:Ne.a.followers,children:[Object(p.jsx)("div",{className:Ne.a.number,children:t.followers}),Object(p.jsx)("div",{className:Ne.a.smallText,children:o("profile_followers")})]}),Object(p.jsx)(ne,{url:t.profile_photo_url,border:!0,size:"5em"}),Object(p.jsxs)("div",{className:Ne.a.following,children:[Object(p.jsx)("div",{className:Ne.a.number,children:t.following}),Object(p.jsx)("div",{className:Ne.a.smallText,children:o("profile_following")})]})]}),Object(p.jsxs)("div",{className:Ne.a.bottom,children:[Object(p.jsx)("div",{className:Ne.a.info,children:"".concat(t.first_name," ").concat(t.last_name," - ").concat(t.job_title)}),Object(p.jsx)("div",{className:Ne.a.description,children:t.description}),a&&Object(p.jsxs)("div",{className:Ne.a.actionButtons,children:[Object(p.jsx)(m,{smallPadding:!0,children:o("profile_edit")}),Object(p.jsx)(m,{smallPadding:!0,color:"blue",children:o("post_new")})]})]})]})},Pe=n(36),Se=n.n(Pe),ke=function(){var e=J();Object(a.useEffect)((function(){e(q())}),[e]);var t=U(D);return Object(p.jsx)("div",{className:Se.a.slider,children:t.map((function(e){return Object(p.jsx)(ne,{url:e.profile_photo_url,size:"4em",border:!0},e.username)}))})},ye=n(27),Ce=n.n(ye),Fe=function(){var e=U(G),t=U(R);return Object(p.jsxs)("div",{className:Ce.a.home,children:[Object(p.jsx)(re,{home:!0,profile:!0}),Object(p.jsxs)("div",{className:Ce.a.content,children:[Object(p.jsxs)("div",{className:Ce.a.left,children:[Object(p.jsx)(ke,{}),Object(p.jsx)(xe,{})]}),Object(p.jsxs)("div",{className:Ce.a.right,children:[e?Object(p.jsx)(we,{profile:t,own:!0}):Object(p.jsx)(m,{color:"black",to:"/login",children:"Login"}),Object(p.jsx)(X,{})]})]})]})},Ie=n(37),Be=n.n(Ie),Le=function(e){var t=e.label,n=e.placeholder,a=(e.icon,e.iconColor,e.className),o=e.onChange,r=Object(j.a)(e,["label","placeholder","icon","iconColor","className","onChange"]);return Object(p.jsxs)("label",{className:_()(Object(d.a)({},Be.a.input,!0),a),children:[t,Object(p.jsx)("input",Object(u.a)({placeholder:n,onChange:o},r))]})},Ae=n(12),qe=n.n(Ae),He=function(){var e=M(),t=Object(l.g)(),n=U(R);Object(a.useEffect)((function(){n&&t.replace("/")}),[n,t]);var o=Object(a.useState)(!1),r=Object($.a)(o,2),c=r[0],s=r[1],i=Object(a.useState)(""),u=Object($.a)(i,2),d=u[0],j=u[1],f=Object(a.useState)(""),_=Object($.a)(f,2),b=_[0],h=_[1],O=Object(a.useState)(""),g=Object($.a)(O,2),x=g[0],v=g[1];return Object(p.jsxs)("div",{className:qe.a.login,children:[Object(p.jsx)(re,{}),Object(p.jsxs)("div",{className:qe.a.content,children:[Object(p.jsx)("div",{className:qe.a.presentation,children:"Photos go wroom"}),Object(p.jsxs)("div",{className:qe.a.authPane,children:[Object(p.jsx)("div",{className:qe.a.title,children:e(c?"login_sign_up":"login_login")}),Object(p.jsx)(Le,{label:e("login_field_email_label"),placeholder:e("login_field_email_placeholder"),type:"email",className:qe.a.input,onChange:function(e){return j(e.currentTarget.value)},value:d}),c&&Object(p.jsx)(Le,{label:e("login_field_username_label"),placeholder:e("login_field_username_placeholder"),className:qe.a.input,onChange:function(e){return h(e.currentTarget.value)},value:b}),Object(p.jsx)(Le,{label:e("login_field_password_label"),placeholder:e("login_field_password_placeholder"),type:"password",className:qe.a.input,onChange:function(e){return v(e.currentTarget.value)},value:x}),Object(p.jsx)(m,{color:"blue",onClick:function(){var e;c?(e={login:d,password:x,username:b},fetch("".concat(B,"/create-account"),{method:"POST",body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json"})}).then((function(e){var t=e.headers.get("authorization");return t?localStorage.setItem("auth",t):localStorage.removeItem("auth"),e.json()}))).then((function(){return t.push("/")})):function(e){return fetch("".concat(B,"/login"),{method:"POST",body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json"})}).then((function(e){var t=e.headers.get("authorization");return t?localStorage.setItem("auth",t):localStorage.removeItem("auth"),e.json()}))}({login:d,password:x}).then((function(){return t.push("/")}))},children:e(c?"login_sign_up_button":"login_login_button")}),Object(p.jsxs)("div",{className:qe.a.switch,children:[e(c?"login_have_account":"login_no_account"),Object(p.jsx)("span",{className:qe.a.inlineSwitch,onClick:function(){return s(!c)},children:e(c?"login_login":"login_sign_up")})]})]})]})]})},Te=function(){return Object(p.jsx)("div",{children:"Your profile"})},ze=function(){var e=Object(l.h)().username,t=U(de);return Object(p.jsxs)(p.Fragment,{children:["Status: ",t,Object(p.jsx)(xe,{username:e})]})};var Ee=function(){var e,t=J(),n=U(F);e=function(){t(S(n))},Object(a.useEffect)(e,[]);var o=localStorage.getItem("auth");return Object(a.useEffect)((function(){t(H())}),[o,t]),Object(p.jsx)(i.a,{children:Object(p.jsxs)(l.d,{children:[Object(p.jsx)(l.b,{path:"/login",children:Object(p.jsx)(He,{})}),Object(p.jsx)(l.b,{path:"/profile/:username",children:Object(p.jsx)(ze,{})}),Object(p.jsx)(l.b,{exact:!0,path:"/profile",children:Object(p.jsx)(Te,{})}),Object(p.jsx)(l.b,{exact:!0,path:"/",children:Object(p.jsx)(Fe,{})}),Object(p.jsx)(l.b,{children:Object(p.jsx)(l.a,{to:"/"})})]})})};n(49),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(s.a,{store:fe,children:Object(p.jsx)(Ee,{})})}),document.getElementById("app")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports={profileInfo:"ProfileInfo_profileInfo__1XWLg",top:"ProfileInfo_top__69p8p",followers:"ProfileInfo_followers__3AkWs",following:"ProfileInfo_following__2KBqR",bottom:"ProfileInfo_bottom__1AQ71",info:"ProfileInfo_info__2Xm6y",description:"ProfileInfo_description__1S7g8",actionButtons:"ProfileInfo_actionButtons__7S7DM"}}},[[50,1,2]]]);
//# sourceMappingURL=main.4def49bd.chunk.js.map