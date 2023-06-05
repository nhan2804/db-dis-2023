import classNames from "classnames";
import React, { forwardRef, ReactElement } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
type Variant = "danger" | "text" | "primary" | "link" | "secondary" | "warning";
interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: ReactElement;
  loading?: boolean;
  endIcon?: ReactElement;
  variant?: Variant;
  isActive?: boolean;
  danger?: boolean;
  tooltip?: string;
  size?: "sm" | "md";
}
const Button = (
  {
    size = "md",
    tooltip = "",
    loading = false,
    icon,
    className,
    endIcon,
    children,
    variant,
    isActive,
    danger,
    ...rest
  }: Props,
  ref
) => {
  const mappingSize = {
    md: "",
    sm: "py-1.5 px-4 space-x-1",
  };
  const btn = (
    <button
      ref={ref}
      className={classNames(
        "custom-button",
        className,
        variant,
        isActive && "active",
        // !isActive && "dark:text-white",
        !children && icon && "icon",
        danger && variant !== "danger" && "danger",
        mappingSize?.[size]
      )}
      {...rest}
    >
      {loading ? <LoadingOutlined /> : icon}
      {children && <span>{children}</span>}
      {endIcon}
    </button>
  );
  return (
    <>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <div>{btn}</div>
        </Tooltip>
      ) : (
        btn
      )}
    </>
  );
};

export default forwardRef(Button);
