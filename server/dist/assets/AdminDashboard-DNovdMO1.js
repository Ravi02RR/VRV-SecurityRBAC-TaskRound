import {
  c as N,
  a as l,
  A as S,
  u as A,
  j as e,
  b as h,
} from "./index-vHSNVEGr.js";
import { S as L } from "./search-CT8D7kA1.js";
import { T as b } from "./trash-2-Bbf5WKSm.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const U = N("LockOpen", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1",
    },
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const z = N("Lock", [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
  ]),
  F = () => {
    const [u, w] = l.useState([]),
      [i, p] = l.useState([]),
      [v, x] = l.useState(!0),
      [g, m] = l.useState(null),
      [c, k] = l.useState(""),
      [n, C] = l.useState("all"),
      { userDetail: r } = l.useContext(S),
      f = A();
    l.useEffect(() => {
      (!r || r.role !== "admin") && f("/login");
    }, [r, f]);
    const d = async () => {
        var t, s;
        try {
          x(!0);
          const a = await h.get(
            "https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/getallusers",
            { withCredentials: !0 }
          );
          w(a.data.users), p(a.data.users), x(!1);
        } catch (a) {
          m(
            ((s = (t = a.response) == null ? void 0 : t.data) == null
              ? void 0
              : s.message) || "Failed to fetch users"
          ),
            x(!1);
        }
      },
      j = async (t, s) => {
        var a, o;
        try {
          await h.put(
            `https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/updateUserState?userid=${t}`,
            { canPost: !s },
            { withCredentials: !0 }
          ),
            d();
        } catch (P) {
          m(
            ((o = (a = P.response) == null ? void 0 : a.data) == null
              ? void 0
              : o.message) || "Failed to update user state"
          );
        }
      },
      y = async (t) => {
        var s, a;
        try {
          await h.delete(
            `https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/deleteuser?userId=${t}`,
            { withCredentials: !0 }
          ),
            d();
        } catch (o) {
          m(
            ((a = (s = o.response) == null ? void 0 : s.data) == null
              ? void 0
              : a.message) || "Failed to delete user"
          );
        }
      };
    return (
      l.useEffect(() => {
        let t = u;
        n !== "all" &&
          (t = t.filter((s) => (n === "allowed" ? s.canPost : !s.canPost))),
          c &&
            (t = t.filter(
              (s) =>
                s.name.toLowerCase().includes(c.toLowerCase()) ||
                s.email.toLowerCase().includes(c.toLowerCase())
            )),
          p(t);
      }, [u, c, n]),
      l.useEffect(() => {
        r && r.role === "admin" && d();
      }, [r]),
      v
        ? e.jsx("div", {
            className:
              "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200",
            children: e.jsxs("div", {
              className: "text-xl text-gray-600 flex items-center",
              children: [
                e.jsxs("svg", {
                  className: "animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  children: [
                    e.jsx("circle", {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4",
                    }),
                    e.jsx("path", {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                    }),
                  ],
                }),
                "Loading users...",
              ],
            }),
          })
        : g
        ? e.jsx("div", {
            className:
              "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200",
            children: e.jsxs("div", {
              className: "bg-white p-8 rounded-xl shadow-2xl text-center",
              children: [
                e.jsx("div", {
                  className: "text-xl text-red-600 mb-4",
                  children: g,
                }),
                e.jsx("button", {
                  onClick: d,
                  className:
                    "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition",
                  children: "Try Again",
                }),
              ],
            }),
          })
        : e.jsx("div", {
            className:
              "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8 mt-20",
            children: e.jsxs("div", {
              className: "container mx-auto",
              children: [
                e.jsxs("div", {
                  className:
                    "flex flex-col md:flex-row justify-between items-center mb-8",
                  children: [
                    e.jsx("h1", {
                      className:
                        "text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0",
                      children: "Admin Dashboard",
                    }),
                    e.jsxs("div", {
                      className: "flex space-x-2 w-full md:w-auto",
                      children: [
                        e.jsxs("div", {
                          className: "relative flex-grow",
                          children: [
                            e.jsx("input", {
                              type: "text",
                              placeholder: "Search users...",
                              value: c,
                              onChange: (t) => k(t.target.value),
                              className:
                                "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                            }),
                            e.jsx(L, {
                              className: "absolute left-3 top-3 text-gray-400",
                              size: 20,
                            }),
                          ],
                        }),
                        e.jsxs("select", {
                          value: n,
                          onChange: (t) => C(t.target.value),
                          className:
                            "px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                          children: [
                            e.jsx("option", {
                              value: "all",
                              children: "All Users",
                            }),
                            e.jsx("option", {
                              value: "allowed",
                              children: "Allowed",
                            }),
                            e.jsx("option", {
                              value: "blocked",
                              children: "Blocked",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "bg-white shadow-md rounded-lg overflow-hidden",
                  children: [
                    e.jsx("div", {
                      className: "block md:hidden",
                      children:
                        i.length === 0
                          ? e.jsx("div", {
                              className: "text-center py-8 text-gray-500",
                              children: "No users found",
                            })
                          : i.map((t) =>
                              e.jsxs(
                                "div",
                                {
                                  className:
                                    "border-b p-4 flex justify-between items-center hover:bg-gray-50",
                                  children: [
                                    e.jsxs("div", {
                                      children: [
                                        e.jsx("div", {
                                          className: "font-semibold",
                                          children: t.name,
                                        }),
                                        e.jsx("div", {
                                          className: "text-sm text-gray-500",
                                          children: t.email,
                                        }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "flex items-center space-x-2",
                                      children: [
                                        e.jsx("button", {
                                          onClick: () => j(t._id, t.canPost),
                                          className: `px-2 py-1 rounded-full text-xs flex items-center ${
                                            t.canPost
                                              ? "bg-green-500 text-white"
                                              : "bg-red-500 text-white"
                                          }`,
                                          children: t.canPost
                                            ? "Allowed"
                                            : "Blocked",
                                        }),
                                        e.jsx("button", {
                                          onClick: () => y(t._id),
                                          className:
                                            "text-red-500 hover:text-red-700",
                                          title: "Delete User",
                                          children: e.jsx(b, { size: 20 }),
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                t._id
                              )
                            ),
                    }),
                    e.jsxs("table", {
                      className: "w-full hidden md:table",
                      children: [
                        e.jsx("thead", {
                          className: "bg-gray-200",
                          children: e.jsxs("tr", {
                            children: [
                              e.jsx("th", {
                                className: "px-4 py-3 text-left",
                                children: "Name",
                              }),
                              e.jsx("th", {
                                className: "px-4 py-3 text-left",
                                children: "Email",
                              }),
                              e.jsx("th", {
                                className: "px-4 py-3 text-center",
                                children: "Post Permission",
                              }),
                              e.jsx("th", {
                                className: "px-4 py-3 text-center",
                                children: "Actions",
                              }),
                            ],
                          }),
                        }),
                        e.jsx("tbody", {
                          children: i.map((t) =>
                            e.jsxs(
                              "tr",
                              {
                                className: "border-b hover:bg-gray-50",
                                children: [
                                  e.jsx("td", {
                                    className: "px-4 py-3",
                                    children: t.name,
                                  }),
                                  e.jsx("td", {
                                    className: "px-4 py-3",
                                    children: t.email,
                                  }),
                                  e.jsx("td", {
                                    className: "px-4 py-3 text-center",
                                    children: e.jsxs("button", {
                                      onClick: () => j(t._id, t.canPost),
                                      className: `px-3 py-1 rounded-full text-sm flex items-center justify-center mx-auto ${
                                        t.canPost
                                          ? "bg-green-500 text-white"
                                          : "bg-red-500 text-white"
                                      }`,
                                      children: [
                                        t.canPost
                                          ? e.jsx(U, {
                                              size: 16,
                                              className: "mr-1",
                                            })
                                          : e.jsx(z, {
                                              size: 16,
                                              className: "mr-1",
                                            }),
                                        t.canPost ? "Allowed" : "Blocked",
                                      ],
                                    }),
                                  }),
                                  e.jsx("td", {
                                    className: "px-4 py-3 text-center",
                                    children: e.jsx("div", {
                                      className:
                                        "flex justify-center space-x-2",
                                      children: e.jsx("button", {
                                        onClick: () => y(t._id),
                                        className:
                                          "text-red-500 hover:text-red-700",
                                        title: "Delete User",
                                        children: e.jsx(b, { size: 20 }),
                                      }),
                                    }),
                                  }),
                                ],
                              },
                              t._id
                            )
                          ),
                        }),
                      ],
                    }),
                    i.length === 0 &&
                      e.jsx("div", {
                        className: "text-center py-8 text-gray-500",
                        children: "No users found",
                      }),
                  ],
                }),
              ],
            }),
          })
    );
  };
export { F as default };
