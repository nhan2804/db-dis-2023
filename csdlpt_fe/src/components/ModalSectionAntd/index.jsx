import useModal from "@hooks/useModal";
import React from "react";
import CustomModalAntd from "@components/CustomModalAntd";
const ModalSectionAntd = ({
  button,
  section,
  title,
  showFooter,
  size,
  destroyOnClose,
  rightIconTitle,
  closable,
  onOk,
  okText,
  cancelText,
  children,
  confirmLoading,
  inititalOpen = false,
  height,
  ...rest
}) => {
  const { close, isOpen, open } = useModal(inititalOpen);
  return (
    <>
      {button?.({ open, close }) || (
        <button className="flex items-center opacity-70" onClick={open}>
          Edit
        </button>
      )}
      {/* <div className="flex items-baseline space-x-1"></div> */}
      <CustomModalAntd
        okText={okText}
        closable={closable}
        onOk={onOk}
        cancelText={cancelText}
        rightIconTitle={rightIconTitle}
        destroyOnClose={destroyOnClose}
        height={height}
        {...rest}
        size={size}
        title={title}
        close={close}
        isOpen={isOpen}
        footer={showFooter}
        confirmLoading={confirmLoading}
      >
        {section && !children && React.isValidElement(section)
          ? section
          : section?.({ close })}
        {!section && children && React.isValidElement(children)
          ? children
          : children?.({ close })}
      </CustomModalAntd>
    </>
  );
};

export default ModalSectionAntd;
