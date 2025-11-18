"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Card: () => Card
});
module.exports = __toCommonJS(index_exports);

// src/Card.tsx
var import_button = require("@sharedcomp/button");
var import_jsx_runtime = require("react/jsx-runtime");
function Card({
  title,
  description,
  children,
  footer,
  actionButton,
  className = ""
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `card ${className}`.trim(), children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card__header", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "card__title", children: title }) }),
    description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "card__description", children: description }),
    children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card__content", children }),
    (footer || actionButton) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card__footer", children: [
      footer,
      actionButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_button.Button,
        {
          variant: actionButton.variant || "primary",
          onClick: actionButton.onClick,
          children: actionButton.label
        }
      )
    ] })
  ] });
}
