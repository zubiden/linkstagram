import { IComment, IImage, IPhotosAttribute, IPost, IProfile } from "../types";

export const API_BASE = "https://linkstagram-api.ga";

// API-SPECIFIC TYPES

export interface ILoginError {
    "field-error": string[],
    error: string
}

export interface ISuccess {
    success: string
}

export interface IError {
    error: string
}

export interface IRegistrationParameters {
    username: string;
    login: string;
    password: string;
}

export interface ILoginParameters {
    login: string;
    password: string;
}

export interface IPostCreationParameters {
    description?: string;
    photos_attributes: IPhotosAttribute[];
}

export interface IProfileUpdateParameters {
    username?: string;
    description?: string;
    first_name?: string;
    job_title?: string;
    last_name?: string;
    profile_photo?: IImage;
}

// AUTH

export const createAccount = (data: IRegistrationParameters): Promise<ILoginError | ISuccess> => {
    return fetch(`${API_BASE}/create-account`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(res => {
        const headers = res.headers;
        const auth = headers.get("authorization");
        if (auth) {
            localStorage.setItem("auth", auth);
        } else {
            localStorage.removeItem("auth"); // login error, clear previous auth
        }
        return res.json();
    });
}

export const login = (data: ILoginParameters): Promise<ILoginError | ISuccess> => {
    return fetch(`${API_BASE}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(res => {
        const headers = res.headers;
        const auth = headers.get("authorization");
        if (auth) {
            localStorage.setItem("auth", auth);
        } else {
            localStorage.removeItem("auth"); // login error, clear previous auth
        }
        return res.json();
    });
}

// COMMENTS

export const leaveComment = (post_id: number, message: string): Promise<IComment> => {
    return request(`${API_BASE}/posts/${post_id}/comments`, "POST", { message });
}

export const fetchComments = (post_id: number): Promise<IComment[]> => {
    return request(`${API_BASE}/posts/${post_id}/comments`);
}

// ACCOUNT

export const fetchAccount = (): Promise<IProfile | IError> => {
    return request(`${API_BASE}/account`);
}

export const editAccount = (account: IProfileUpdateParameters): Promise<IProfile | IError> => {
    return request(`${API_BASE}/account`, "PATCH", { account });
}

// LIKES

export const removeLike = (post_id: number): Promise<{} | IError> => {
    return request(`${API_BASE}/posts/${post_id}/like`, "DELETE");
}

export const setLike = (post_id: number): Promise<{} | IError> => {
    return request(`${API_BASE}/posts/${post_id}/like`, "POST");
}

// POSTS

export const createPost = (post: IPostCreationParameters): Promise<IPost> => {
    return request(`${API_BASE}/posts`, "POST", { post });
}

export const deletePost = (id: number): Promise<ISuccess | IError> => {
    return request(`${API_BASE}/posts/${id}`, "DELETE");
}

export const fetchPost = (id: number): Promise<IPost> => {
    return request(`${API_BASE}/posts/${id}`);
}

export const fetchPosts = (page: number = 1): Promise<IPost[]> => {
    return request(`${API_BASE}/posts?page=${page}`);
}

export const fetchUserPosts = (username: string, page: number = 1): Promise<IPost[]> => {
    return request(`${API_BASE}/profiles/${username}/posts?page=${page}`);
}

// PROFILES

export const fetchProfiles = (page: number = 1): Promise<IProfile[]> => {
    return request(`${API_BASE}/profiles?page=${page}`);
}

export const fetchProfile = (username: string): Promise<IProfile> => {
    return request(`${API_BASE}/profiles/${username}`);
}

// UTIL

const request = (url: string, method: "GET" | "POST" | "PATCH" | "DELETE" = "GET", data: any = null): Promise<any> => {
    let options: RequestInit = {
        method
    };

    options.headers = new Headers({
        "Content-Type": "application/json"
    })

    if (data) {
        options.body = JSON.stringify(data);
    }

    const auth = localStorage.getItem("auth");
    if (auth) {
        options.headers.set("Authorization", "Bearer " + auth);
    }
    return fetch(url, options).then(res => {
        if(!res.ok) throw Error();
        return res.text()
    }).then(text => {
        if (text.length === 0) return {}
        return JSON.parse(text);
    });
}