(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{7946:function(e,i,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return s(4907)}])},7293:function(e,i,s){"use strict";s.d(i,{Z:function(){return c}});var t=s(2322);s(2784);var n=()=>(0,t.jsxs)("p",{id:"copyright",children:["\xa9 2011 ",(0,t.jsx)("strong",{children:"Gumroad"})]}),r=s(1078),o=e=>{let{hideFooter:i}=e;return i?null:(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{id:"push"}),(0,t.jsx)("div",{id:"footer",children:(0,t.jsxs)("div",{id:"inner-footer",children:[(0,t.jsx)(n,{}),(0,t.jsxs)("p",{id:"footer-navigation",children:[(0,t.jsx)(r.Link,{to:"/about",children:"About"})," •",(0,t.jsx)(r.Link,{to:"/faq",children:"FAQ"})," •",(0,t.jsx)(r.Link,{to:"http://twitter.com/gumroad/",children:"Twitter"})," •",(0,t.jsx)(r.Link,{to:"http://facebook.com/gumroad/",children:"Facebook"})]})]})})]})},a=s(7729),l=s.n(a),d=e=>{let{title:i}=e;return(0,t.jsxs)(l(),{children:[(0,t.jsx)("title",{children:i||"Gumroad - Selling should be as easy as sharing a link."}),(0,t.jsx)("meta",{property:"og:site_name",content:"Gumroad"}),(0,t.jsx)("meta",{property:"og:title",content:"Gumroad"}),(0,t.jsx)("meta",{property:"og:url",content:"http://gumroad.com/"}),(0,t.jsx)("meta",{property:"og:type",content:"website"}),(0,t.jsx)("meta",{property:"og:description",content:"Selling should be as easy as sharing a link."}),(0,t.jsx)("meta",{property:"fb:page_id",content:"http://www.facebook.com/gumroad"}),(0,t.jsx)("script",{src:"https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"}),(0,t.jsx)("script",{src:"/static/js/fileuploader.js",type:"text/javascript"}),(0,t.jsx)("script",{src:"/static/js/jquery.tipsy.js",type:"text/javascript"}),(0,t.jsx)("script",{src:"/static/js/jquery.backgroundPosition.js",type:"text/javascript"}),(0,t.jsx)("script",{src:"/static/plupload/gears_init.js"}),(0,t.jsx)("script",{src:"/static/plupload/plupload.full.min.js"}),(0,t.jsx)("script",{src:"/static/js/app.js"}),(0,t.jsx)("script",{children:"window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n      gtag('config', 'UA-3109196-41');"}),(0,t.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, user-scalable=no"})]})},c=e=>{let{title:i,hideFooter:s,hideHeader:n,showLoginLink:a,loggedIn:l,onLinksPage:c,userBalance:j,bodyId:p,children:h}=e;return(0,t.jsx)("html",{children:(0,t.jsxs)("div",{children:[(0,t.jsx)(d,{title:i}),(0,t.jsxs)("body",{id:p||void 0,children:[(0,t.jsx)("div",{className:"top-bar"}),(0,t.jsx)("div",{id:"loading-indicator",children:"Loading..."}),(0,t.jsxs)("div",{id:"wrapper",children:[!n&&(0,t.jsxs)("div",{id:"header",children:[(0,t.jsx)(r.Link,{to:"/",children:(0,t.jsx)("h1",{id:"logo",children:"Gumroad"})}),a?(0,t.jsxs)("p",{children:["Have an account?"," ",(0,t.jsx)(r.Link,{to:"/login",id:"login-link",className:"underline",children:"Login"})]}):l?(0,t.jsxs)("p",{id:"account-navigation",children:[c?(0,t.jsx)(r.Link,{to:"/home",children:"Home"}):(0,t.jsx)(r.Link,{to:"/links",children:"Your links"}),"• ",(0,t.jsxs)("span",{className:"balance",children:["$",j]})," •"," ",(0,t.jsx)(r.Link,{to:"/settings",children:"Settings"})," •"," ",(0,t.jsx)(r.Link,{to:"/logout",children:"Logout"})]}):(0,t.jsxs)("p",{children:["Thanks for using Gumroad!"," ",(0,t.jsx)(r.Link,{to:"mailto:hi@gumroad.com",children:"Feedback?"})]}),(0,t.jsxs)("ul",{id:"navigation",className:"hidden",children:[(0,t.jsx)("li",{children:(0,t.jsx)(r.Link,{to:"#",children:"Tour"})}),(0,t.jsx)("li",{children:(0,t.jsx)(r.Link,{to:"#",children:"Examples"})}),(0,t.jsx)("li",{children:(0,t.jsx)(r.Link,{to:"#",children:"Sign up"})}),(0,t.jsx)("li",{children:(0,t.jsx)(r.Link,{to:"/faq",children:"FAQ"})})]})]}),(0,t.jsx)("div",{className:"rule"}),h]}),(0,t.jsx)(o,{hideFooter:s})]})]})})}},4907:function(e,i,s){"use strict";s.r(i);var t=s(2322),n=s(2784),r=s(7293);i.default=()=>{let[e,i]=(0,n.useState)({email:"",password:""}),[s,o]=(0,n.useState)(!1),[a,l]=(0,n.useState)(""),d=s=>{let{name:t,value:n}=s.target;i({...e,[t]:n})};return(0,t.jsxs)(r.Z,{title:"Login",hideFooter:!0,hideHeader:!1,showLoginLink:!1,loggedIn:!1,onLinksPage:!1,userBalance:0,bodyId:"page-login",children:[(0,t.jsxs)("form",{id:"large-form",action:"/login",method:"post",onSubmit:e=>{e.preventDefault()},children:[(0,t.jsxs)("h3",{children:["Login ",s&&(0,t.jsx)("small",{className:"error",children:a})]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("input",{type:"text",name:"email",placeholder:"Email Address",value:e.email,onChange:d}),(0,t.jsx)("input",{type:"password",name:"password",placeholder:"Password",value:e.password,onChange:d}),(0,t.jsx)("button",{type:"submit",children:"Login"})]}),(0,t.jsx)("div",{className:"rainbow bar"})]}),(0,t.jsx)("p",{id:"below-form-p",children:"\xa0"})]})}},7729:function(e,i,s){e.exports=s(44)}},function(e){e.O(0,[179,78,888,774,377],function(){return e(e.s=7946)}),_N_E=e.O()}]);