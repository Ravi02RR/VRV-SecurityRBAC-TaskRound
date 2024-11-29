import{c as n,a as s,j as e,L as g,b as j}from"./index-vHSNVEGr.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=n("PartyPopper",[["path",{d:"M5.8 11.3 2 22l10.7-3.79",key:"gwxi1d"}],["path",{d:"M4 3h.01",key:"1vcuye"}],["path",{d:"M22 8h.01",key:"1mrtc2"}],["path",{d:"M15 2h.01",key:"1cjtqr"}],["path",{d:"M22 20h.01",key:"1mrys2"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",key:"hbicv8"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",key:"1i94pl"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",key:"1cofks"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",key:"4kbmks"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=n("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),P=()=>{const[l,o]=s.useState(""),[i,d]=s.useState(""),[c,u]=s.useState(""),[h,m]=s.useState(""),[a,p]=s.useState(!1),x=s.useRef(null);s.useEffect(()=>{x.current.focus()},[]);const f=async t=>{var b,y;t.preventDefault(),u(""),m(""),p(!0);try{const r=await j.post("http://localhost:3000/api/v1/user/createpost",{title:l,body:i},{withCredentials:!0});if(m(r.data.message),r.data.message==="ask admin to give you permission to post")throw new Error("ask admin to give you permission to post");o(""),d("")}catch(r){u(((y=(b=r.response)==null?void 0:b.data)==null?void 0:y.message)||"Post creation failed")}finally{p(!1)}};return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-white to-blue-100 flex justify-center items-center p-4",children:e.jsxs("div",{className:"w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]",children:[e.jsxs("div",{className:"bg-blue-600 text-white p-6 flex items-center",children:[e.jsx(w,{className:"mr-4 w-10 h-10"}),e.jsx("h2",{className:"text-3xl font-bold tracking-tight",children:"Create New Post"})]}),h&&e.jsxs("div",{className:"bg-green-50 border-l-4 border-green-500 text-green-700 p-6 flex items-center space-x-4 animate-fade-in",children:[e.jsx(v,{className:"w-10 h-10 animate-bounce"}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold mb-2",children:"Congratulations!"}),e.jsx("p",{className:"text-green-600",children:h})]})]}),e.jsxs("form",{onSubmit:f,className:"p-8 space-y-6",children:[c&&e.jsx("div",{className:"bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse",children:e.jsx("p",{className:"font-medium",children:c})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"title",className:"block text-sm font-semibold text-gray-700",children:"Post Title"}),e.jsx("input",{ref:x,type:"text",id:"title",value:l,onChange:t=>o(t.target.value),required:!0,disabled:a,className:"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out disabled:opacity-50",placeholder:"Enter an engaging title"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"body",className:"block text-sm font-semibold text-gray-700",children:"Post Content"}),e.jsx("textarea",{id:"body",value:i,onChange:t=>d(t.target.value),required:!0,disabled:a,rows:6,className:"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out resize-none disabled:opacity-50",placeholder:"Share your thoughts..."})]}),e.jsx("button",{type:"submit",disabled:a,className:"w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",children:a?e.jsxs(e.Fragment,{children:[e.jsx(g,{className:"mr-2 animate-spin",size:20}),e.jsx("span",{children:"Publishing..."})]}):e.jsxs(e.Fragment,{children:[e.jsx(k,{className:"w-5 h-5"}),e.jsx("span",{children:"Publish Post"})]})})]})]})})};export{P as default};
