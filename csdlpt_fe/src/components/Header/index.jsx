import React from "react";
import { BellIcon, HomeIcon, MusicNoteIcon } from "@heroicons/react/24/outline";
import useGetProfile from "@modules/auth/hooks/useGetProfile";
import { useAppSelector } from "@hooks/reduxHook";
import useLogout from "@modules/auth/hooks/useLogout";
import { Button, Input, version } from "antd";
import PopupSection from "@components/PopupSection";
import UserMenu from "./UserMenu";
const Header = () => {
  // const { data: u } = useGetProfile();
  const user = useAppSelector((s) => s?.auth?.user);
  const { mutate: logout } = useLogout();
  // const logout=()=>{

  // }
  return (
    <div className="flex items-center justify-between px-5 py-2 shadow">
      <div className="text-2xl font-bold">
        <Button type="">Quản lý</Button>
      </div>
      <div className="flex">
        <div className="px-8 py-2 transition-colors rounded hover:bg-gray-200">
          <HomeIcon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-4">
          <div className="relative grid w-full aspect-1 place-content-center">
            <PopupSection
              unmount={false}
              sectionContainerClassName={
                "top-full bottom-auto left-auto right-0"
              }
              popoverContainerClassName={"grid place-content-center"}
              button={
                <button className="relative bg-gray-600 rounded-full ring-1 ring-white w-9 h-9 ">
                  <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                </button>
              }
              section={({ close }) => <UserMenu close={close} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
