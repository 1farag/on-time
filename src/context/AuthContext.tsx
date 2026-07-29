"use client";

import React, { createContext, useContext } from "react";
import axiosInstance from "@/lib/axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserInfo, setIsLogged } from "@/store/slices/auth/authSlice";
import { AUTH_LOGIN_SUCCESS_EVENT } from "@/hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
    signInWithGoogle: (idToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const signInWithGoogle = async (idToken: string) => {
        try {
            const res = await axiosInstance.post("/auth/google", { idToken });

            const data = res.data?.data || res.data || {};
            const finalUser = data.user || data.data?.user || data.profile;
            const finalToken = data.token || data.accessToken || data.access_token || data.idToken || data.data?.token || data.data?.accessToken;
            const finalRefreshToken = data.refreshToken || data.refresh_token || data.data?.refreshToken;

            // 1. Update Redux immediately (Source of truth for HttpOnly flow)
            dispatch(setUserInfo(finalUser || null));
            dispatch(setIsLogged(true));

            // 2. Store tokens in cookies if returned in body (fallback for non-HttpOnly)
            if (finalToken) {
                setCookie("UserToken", finalToken, {
                    path: "/",
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 15 * 60,
                });
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${finalToken}`;
            }

            // Force refetch of profile now that the token is set
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });

            if (finalRefreshToken) {
                setCookie("UserRefreshToken", finalRefreshToken, {
                    path: "/",
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 30 * 24 * 60 * 60,
                });
            }

            // 3. Notify useAuth hook and listeners
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent(AUTH_LOGIN_SUCCESS_EVENT));
            }

            toast.success("Logged in successfully");

            router.push("/");
        } catch (error: any) {
            console.error("Google Sign-In Error:", error.message);
            toast.error(error?.response?.data?.message || "Google Sign-In Error");
        }
    };

    return (
        <AuthContext.Provider value={{ signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
