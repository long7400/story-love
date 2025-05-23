import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface LoginFormData {
    username: string;
    password: string;
}

interface LoginPageProps {
    onLogin: (status: boolean) => void;
}


export default function LoginPage({ onLogin }: LoginPageProps) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await api.login(data);

            sessionStorage.setItem("love_story_admin_auth", "true");

            // Notify parent component about successful login
            onLogin(true);
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid username or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 p-4">
            {/* Login Form */}
            <motion.div
                className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-pink-100/50 p-8"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
                    <p className="text-gray-600 mt-1">Sign in to manage your Love Story timeline</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.username ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white/80`}
                                    {...register("username", {required: "Username is required"})}
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white/80`}
                                    {...register("password", {required: "Password is required"})}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <motion.button
                                type="submit"
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-pink-400 hover:from-primary/90 hover:to-pink-400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                disabled={isLoading}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                {isLoading ? (
                                    <LoadingSpinner color="white" />
                                ) : "Sign in"}
                            </motion.button>
                        </div>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        This is a secure area. Unauthorized access is prohibited.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
