import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
// import avatar from "@assets/images/avatar.jpg";
import Button from "@components/Button";
import IconButton from "@components/IconButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@hooks/reduxHook";
import useGetProfile from "@modules/auth/hooks/useGetProfile";
import useLogout from "@modules/auth/hooks/useLogout";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const UserMenu = ({ close }) => {
  const { data } = useGetProfile();
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { mutate: logout, isLoading } = useLogout();
  // useEffect(() => {
  //   return () => {
  //     close();
  //   };
  // }, [close, location]);
  const BackSection = ({ title }) => {
    return (
      <div className="flex items-center space-x-2">
        <IconButton
          icon={<ArrowLeftIcon className="w-5 h-5" />}
          onClick={() => setActiveMenu("main")}
        />
        <div className="text-lg font-bold">{title}</div>
      </div>
    );
  };
  const handleLogout = async () => {
    logout();
  };
  return (
    <>
      <div
        className="w-[360px] transition-all overflow-hidden relative text-gray-500 z-[9999] dark:text-gray-50 "
        style={{ height: menuHeight }}
      >
        <CSSTransition
          onEnter={calcHeight}
          in={activeMenu === "main"}
          timeout={250}
          classNames="menu-primary"
          unmountOnExit
        >
          <div className="menu-content">
            <Link
              to={"/profile"}
              className="flex items-center justify-between space-x-2 text-black hover:text-black dark:hover:bg-gray-600"
            >
              <div className="flex items-center space-x-2">
                <div className="bg-gray-400 dark:text-gray-50 w-[60px] h-[60px] rounded-full flex-shrink-0">
                  <img
                    // src={data?.avatar || avatar}
                    className="object-cover w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <div>
                  <div className="font-semibold dark:text-gray-50">
                    {data?.fullName}
                  </div>
                </div>
              </div>
            </Link>

            {/* <button
              onClick={() => {
                setActiveMenu("lang");
              }}
              className="flex items-center p-2 text-base font-semibold h-14 dark:hover:bg-gray-400"
            >
              {t("common.language")}
            </button> */}

            <button
              onClick={handleLogout}
              className="flex items-center p-2 text-base h-14 text-black font-semibold dark:hover:bg-gray-600 dark:!text-white"
            >
              <div className="flex items-center space-x-3">
                {isLoading ? <LoadingOutlined /> : <LoginOutlined />}
                <span>{"Đăng xuất"}</span>
              </div>
            </button>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default UserMenu;
