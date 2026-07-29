"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useGetUserProfile } from "./useGetProfile";
import { setIsLogged, setUserInfo } from "@/store/slices/auth/authSlice";

function userPayloadKey(next: unknown): string {
  if (next == null) return "null";
  try {
    return JSON.stringify(next);
  } catch {
    return "object";
  }
}

export const useBootstrapUser = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useGetUserProfile();
  const loggedRef = useRef<boolean | undefined>(undefined);
  const userKeyRef = useRef<string>("");

  useEffect(() => {
    if (isLoading) return;

    if (loggedRef.current !== isAuthenticated) {
      loggedRef.current = isAuthenticated;
      dispatch(setIsLogged(isAuthenticated));
    }

    const nextUser = isAuthenticated && user ? user : null;
    const key = userPayloadKey(nextUser);
    if (userKeyRef.current !== key) {
      userKeyRef.current = key;
      dispatch(setUserInfo(nextUser));
    }
  }, [dispatch, isAuthenticated, isLoading, user]);
};

