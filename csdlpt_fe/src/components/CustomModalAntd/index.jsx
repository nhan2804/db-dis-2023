/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from "@components/Button";
// import CloseIcon from "@components/icons/CloseIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@hooks/reduxHook";
import { Modal, Space } from "antd";
import classNames from "classnames";
import React from "react";
// import { useTranslation } from "react-i18next";

const CustomModalAntd = ({
  closable = true,
  isOpen,
  close,
  children,
  title,
  size = "md",
  onOk,
  footer = false,
  destroyOnClose = true,
  rightIconTitle,
  okText,
  cancelText,
  confirmLoading,
  moreFooter = null,
  height,
  ...rest
}) => {
  const sizeMap = {
    sm: 400,
    md: 520,
    lg: 800,
    xl: 1300,
    "2xl": 1500,
    fullScreen: "100%",
  };

  const isDark = useAppSelector((s) => s?.dark?.isDark);

  // const { t } = useTranslation();
  return (
    <Modal
      closeIcon={
        <div className="flex items-center justify-center w-full h-full">
          <XMarkIcon />
        </div>
      }
      // style={{ height }}
      // bodyStyle={{ height }}
      bodyStyle={{ height: height }}
      destroyOnClose={destroyOnClose}
      {...rest}
      // onClick={(e) => e?.stopPropagation()X}
      centered
      width={sizeMap?.[size]}
      closable={closable}
      title={
        <span className="flex items-center space-x-5">
          {rightIconTitle && (
            <span className="text-primary-solid">{rightIconTitle}</span>
          )}
          <span>{title}</span>
        </span>
      }
      maskClosable
      visible={isOpen}
      // onOk={onOk}
      onCancel={close}
      footer={
        footer ? (
          <Space>
            <Button disabled={confirmLoading} onClick={close}>
              {cancelText || "Huỷ"}
            </Button>

            <Button
              loading={confirmLoading}
              onClick={() => {
                !onOk && close?.();
                onOk?.({ close });
              }}
              variant="primary"
            >
              {okText || "Xác nhận"}
            </Button>
            {moreFooter?.({ close }) || moreFooter}
          </Space>
        ) : (
          false
        )
      }
      className={classNames(isDark && "dark")}
    >
      {children}
    </Modal>
  );
};

export default CustomModalAntd;
