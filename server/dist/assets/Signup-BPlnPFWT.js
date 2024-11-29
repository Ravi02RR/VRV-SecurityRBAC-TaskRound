import{a as t,u as j,j as e,U as v,b as N}from"./index-vHSNVEGr.js";import{S}from"./shield-DHy16W9h.js";const E=()=>{const[l,p]=t.useState(""),[a,x]=t.useState(""),[i,g]=t.useState(""),[d,f]=t.useState(""),[r,h]=t.useState(!1),[u,o]=t.useState(""),b=j(),y=async s=>{var c,m;if(s.preventDefault(),o(""),a!==i){o("Passwords do not match");return}try{const n=r?"http://localhost:3000/api/v1/admin/signup":"http://localhost:3000/api/v1/user/signup",w=await N.post(n,{name:d,email:l,password:a});b("/login"),console.log("Signup successful:",w.data)}catch(n){o(((m=(c=n.response)==null?void 0:c.data)==null?void 0:m.message)||"Signup failed")}};return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 mt-10",children:e.jsx("div",{className:"w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden",children:e.jsxs("div",{className:"px-6 py-8",children:[e.jsxs("div",{className:"flex items-center justify-center mb-6",children:[r?e.jsx(S,{className:"text-red-500 mr-2",size:24}):e.jsx(v,{className:"text-blue-500 mr-2",size:24}),e.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:r?"Admin Signup":"User Signup"})]}),e.jsxs("form",{onSubmit:y,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-2",children:"Full Name"}),e.jsx("input",{type:"text",id:"name",value:d,onChange:s=>f(s.target.value),placeholder:"Enter your full name",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-2",children:"Email Address"}),e.jsx("input",{type:"email",id:"email",value:l,onChange:s=>p(s.target.value),placeholder:"Enter your email",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-2",children:"Password"}),e.jsx("input",{type:"password",id:"password",value:a,onChange:s=>x(s.target.value),placeholder:"Create a password",required:!0,minLength:6,className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"confirm-password",className:"block text-sm font-medium text-gray-700 mb-2",children:"Confirm Password"}),e.jsx("input",{type:"password",id:"confirm-password",value:i,onChange:s=>g(s.target.value),placeholder:"Confirm your password",required:!0,minLength:6,className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",id:"admin-toggle",checked:r,onChange:()=>h(!r),className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"}),e.jsx("label",{htmlFor:"admin-toggle",className:"ml-2 block text-sm text-gray-900",children:"Signup as Admin"})]}),u&&e.jsx("div",{className:"text-red-500 text-sm text-center bg-red-50 p-2 rounded",children:u}),e.jsx("button",{type:"submit",className:"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300",children:r?"Admin Sign Up":"User Sign Up"})]})]})})})};export{E as default};
