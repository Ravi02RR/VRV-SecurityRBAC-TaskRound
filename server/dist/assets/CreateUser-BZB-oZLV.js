import{c as v,a,b as p,j as e,m as c,f as k}from"./index-DhXHizDp.js";import{C}from"./circle-check-big-CNdG2BUi.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=v("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),E=()=>{const[r,u]=a.useState({name:"",email:"",password:"",canPost:!1,isBlocked:!1}),[F,b]=a.useState([]),[P,y]=a.useState([]),[d,l]=a.useState(!1),[m,x]=a.useState(null),[h,f]=a.useState(null);a.useEffect(()=>{g()},[]);const g=async()=>{var n,t;try{l(!0);const s=await p.get("https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/getallusers",{withCredentials:!0});b(s.data.users),y(s.data.users),l(!1)}catch(s){x(((t=(n=s.response)==null?void 0:n.data)==null?void 0:t.message)||"Failed to fetch users"),l(!1)}},j=async n=>{var t,s;n.preventDefault();try{l(!0);const i=await p.post("https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/createuser",r,{withCredentials:!0});f("User created successfully!"),u({name:"",email:"",password:"",canPost:!1,isBlocked:!1}),g(),setTimeout(()=>f(null),3e3),l(!1)}catch(i){x(((s=(t=i.response)==null?void 0:t.data)==null?void 0:s.message)||"Failed to create user"),l(!1)}},o=n=>{const{name:t,value:s,type:i,checked:N}=n.target;u(w=>({...w,[t]:i==="checkbox"?N:s}))};return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center p-4 mt-10",children:e.jsxs(c.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},className:"w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all",children:[e.jsxs("div",{className:"bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-center",children:[e.jsx(k,{className:"mr-3 text-white",size:32}),e.jsx("h2",{className:"text-2xl font-bold text-white",children:"Create New User"})]}),e.jsxs("div",{className:"p-8",children:[m&&e.jsx(c.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},className:"bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(U,{className:"mr-2 text-red-500"}),e.jsx("p",{className:"text-red-700",children:m})]})}),h&&e.jsx(c.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},className:"bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(C,{className:"mr-2 text-green-500"}),e.jsx("p",{className:"text-green-700",children:h})]})}),e.jsxs("form",{onSubmit:j,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-2",children:"Name"}),e.jsx("input",{type:"text",name:"name",value:r.name,onChange:o,required:!0,className:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-2",children:"Email"}),e.jsx("input",{type:"email",name:"email",value:r.email,onChange:o,required:!0,className:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-2",children:"Password"}),e.jsx("input",{type:"password",name:"password",value:r.password,onChange:o,required:!0,className:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",name:"canPost",checked:r.canPost,onChange:o,className:"h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"}),e.jsx("label",{htmlFor:"canPost",className:"ml-2 text-sm text-gray-900",children:"Can Post"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",name:"isBlocked",checked:r.isBlocked,onChange:o,className:"h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"}),e.jsx("label",{htmlFor:"isBlocked",className:"ml-2 text-sm text-gray-900",children:"Is Blocked"})]})]}),e.jsx(c.button,{whileHover:{scale:1.05},whileTap:{scale:.95},type:"submit",disabled:d,className:`w-full py-3 px-6 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform ${d?"bg-gray-400 cursor-not-allowed":"bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"}`,children:d?"Creating...":"Create User"})]})]})]})})};export{E as default};
