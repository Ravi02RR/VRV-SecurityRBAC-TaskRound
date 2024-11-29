import{c as i,d as j,u as y,a as l,A as v,j as e,U as b,b as x}from"./index-vHSNVEGr.js";import{T as f}from"./trash-2-Bbf5WKSm.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=i("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=i("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=i("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=i("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]),C=()=>e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10",children:e.jsx("div",{className:"max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-pulse",children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"flex justify-between mb-8",children:[e.jsx("div",{className:"h-8 w-24 bg-gray-300 rounded"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("div",{className:"h-6 w-6 bg-gray-300 rounded-full"}),e.jsx("div",{className:"h-6 w-6 bg-gray-300 rounded-full"})]})]}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsx("div",{className:"h-12 bg-gray-300 rounded w-3/4"}),e.jsx("div",{className:"h-4 bg-gray-200 rounded w-1/2"})]}),e.jsx("div",{className:"flex space-x-6 mb-6",children:[1,2,3].map((t,s)=>e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:"h-5 w-5 bg-gray-300 rounded-full"}),e.jsx("div",{className:"h-4 w-24 bg-gray-200 rounded"})]},s))}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4].map((t,s)=>e.jsx("div",{className:"h-4 bg-gray-200 rounded"},s))})]})})}),z=()=>{const{postId:t}=j(),s=y(),{userDetail:n,isAuthenticated:m}=l.useContext(v),[a,h]=l.useState(null),[p,d]=l.useState(!0),[c,u]=l.useState(null),o=async()=>{try{d(!0);const r=await x.get(`http://localhost:3000/posts/${t}`);h(r.data.post),d(!1)}catch(r){console.error("Failed to fetch post details",r),u("Failed to load post details"),d(!1)}},g=async()=>{try{await x.delete(`http://localhost:3000/api/v1/admin/deletepost?postId=${t}`,{withCredentials:!0}),s("/")}catch(r){console.error("Failed to delete post",r)}};return l.useEffect(()=>{o()},[t]),p?e.jsx(C,{}):c?e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center  ",children:e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-2xl text-center",children:[e.jsx("div",{className:"text-red-500 mb-4",children:c}),e.jsx("button",{onClick:o,className:"bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition",children:"Try Again"})]})}):e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10",children:e.jsx("div",{className:"max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden",children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"flex justify-between items-start mb-8",children:[e.jsxs("button",{onClick:()=>s(-1),className:"text-gray-600 hover:text-blue-600 transition flex items-center",children:[e.jsx(N,{className:"mr-2"})," Back to Posts"]}),m&&(n==null?void 0:n.role)==="admin"&&e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",title:"Edit Post",disabled:!0,children:e.jsx(P,{size:20})}),e.jsx("button",{onClick:g,className:"text-red-500 hover:text-red-700 transition",title:"Delete Post",children:e.jsx(f,{size:20})})]})]}),e.jsx("h1",{className:"text-4xl font-bold text-gray-900 mb-6",children:a.title}),e.jsxs("div",{className:"flex items-center space-x-6 text-gray-600 mb-6",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(b,{size:16}),e.jsx("span",{children:a.user.name||"Anonymous"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(w,{size:16}),e.jsx("span",{children:new Date(a.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(k,{size:16}),e.jsx("span",{children:new Date(a.createdAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})})]})]}),e.jsx("div",{className:"prose prose-lg text-gray-800 mb-8",children:a.body})]})})})};export{z as default};
