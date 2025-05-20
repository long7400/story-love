import {QueryClient, QueryFunction} from "@tanstack/react-query";

async function throwIfResNotOk(res: Response): Promise<void> {
    if (!res.ok) {
        const error = await res.json().catch(() => ({message: "Unknown error."}));
        throw new Error(error.message || `Request failed with status ${res.status}`);
    }
}

// Default query function
const defaultQueryFn: QueryFunction<unknown> = async ({queryKey}) => {
    const url = queryKey[0] as string;
    const token = sessionStorage.getItem("love_story_auth_token");
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers,
    });

    await throwIfResNotOk(res);

    return res.json();
};

// Query Client với default query function
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn, // Đặt default queryFn
            retry: 1,               // Giới hạn số lần retry
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,   // Dữ liệu "tươi mới" trong 1 phút
        },
    },
});