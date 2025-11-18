// src/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const baseClass = "btn";
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();
  return /* @__PURE__ */ jsx("button", { className: classes, ...props, children });
}
export {
  Button
};
