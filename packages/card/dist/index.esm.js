// src/Card.tsx
import { Button } from "@sharedcomp/button";
import { jsx, jsxs } from "react/jsx-runtime";
function Card({
  title,
  description,
  children,
  footer,
  actionButton,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("div", { className: `card ${className}`.trim(), children: [
    title && /* @__PURE__ */ jsx("div", { className: "card__header", children: /* @__PURE__ */ jsx("h3", { className: "card__title", children: title }) }),
    description && /* @__PURE__ */ jsx("p", { className: "card__description", children: description }),
    children && /* @__PURE__ */ jsx("div", { className: "card__content", children }),
    (footer || actionButton) && /* @__PURE__ */ jsxs("div", { className: "card__footer", children: [
      footer,
      actionButton && /* @__PURE__ */ jsx(
        Button,
        {
          variant: actionButton.variant || "primary",
          onClick: actionButton.onClick,
          children: actionButton.label
        }
      )
    ] })
  ] });
}
export {
  Card
};
