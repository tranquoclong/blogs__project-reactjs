import { useSelector } from "react-redux";
import { useState } from "react";
export function useIsLogin() {
  const token = useSelector((state) => state.Auth.token);
  const currentUser = useSelector((state) => state.Auth.currentUser);
  return {
    isLogin: token && currentUser,
    token,
    currentUser,
  };
}
