import { useAppSelector } from "@hooks/reduxHook";
import React from "react";

const useUserType = () => {
  const type = useAppSelector((state) => state.auth.user?.type);
  return type;
};

export default useUserType;
