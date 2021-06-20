import { IComment, IPhotosAttribute, IPost, IProfile } from "../types";

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
    description:       string;
    photos_attributes: IPhotosAttribute[];
}

// AUTH

export function createAccount(data: IRegistrationParameters): Promise<ILoginError | ISuccess> {
    return fetch(`${API_BASE}/create-account`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(res => {
        const headers = res.headers;
        const auth = headers.get("authorization");
        if(auth) {
            localStorage.setItem("auth", auth);
        } else {
            localStorage.removeItem("auth"); // login error, clear previous auth
        }
        return res.json();
    });
}

export function login(data: ILoginParameters): Promise<ILoginError | ISuccess> {
    return fetch(`${API_BASE}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(res => {
        const headers = res.headers;
        const auth = headers.get("authorization");
        if(auth) {
            localStorage.setItem("auth", auth);
        } else {
            localStorage.removeItem("auth"); // login error, clear previous auth
        }
        return res.json();
    });
}

// COMMENTS

export function leaveComment(post_id: number, message: string): Promise<IComment> {
    return request(`${API_BASE}/posts/${post_id}/comments`, "POST", {message});
}

export function fetchComments(post_id: number): Promise<IComment[]> {
    return request(`${API_BASE}/posts/${post_id}/comments`);
}

// ACCOUNT

export function fetchAccount(): Promise<IProfile> {
    return request(`${API_BASE}/account`);
}

export function editAccount(account: IProfile): Promise<IProfile> {
    return request(`${API_BASE}/account`, "PATCH", {account});
}

// LIKES

export function removeLike(post_id: number): Promise<{}> {
    return request(`${API_BASE}/posts/${post_id}/like`, "DELETE");
}

export function setLike(post_id: number): Promise<{}> {
    return request(`${API_BASE}/posts/${post_id}/like`, "POST");
}

// POSTS

export function createPost(post: IPostCreationParameters): Promise<IPost> {
    return request(`${API_BASE}/posts`, "POST", {post});
}

export function deletePost(id: number): Promise<ISuccess | IError> {
    return request(`${API_BASE}/posts/${id}`, "DELETE");
}

export function fetchPost(id: number): Promise<IPost> {
    return request(`${API_BASE}/posts/${id}`);
}

export function fetchPosts(): Promise<IPost[]> {
    return request(`${API_BASE}/posts`);
}

export function fetchUserPosts(username: string): Promise<IPost[]> {
    return request(`${API_BASE}/profiles/${username}/posts`);
}

// PROFILES

export function fetchProfiles(): Promise<IProfile[]> {
    return request(`${API_BASE}/profiles`);
}

export function fetchProfile(username: string): Promise<IProfile> {
    return request(`${API_BASE}/profiles/${username}`);
}

// UTIL

function request(url: string, method: "GET" | "POST" | "PATCH" | "DELETE" = "GET", data: any = null): Promise<any> {
    let options: RequestInit = {
        method
    };

    options.headers = new Headers({
        "Content-Type": "application/json"
    })
    
    if(data) {
        options.body = JSON.stringify(data);
    }

    const auth = localStorage.getItem("auth");
    if(auth) {
        options.headers.set("Authorization", "Bearer "+ auth);
    }
    return fetch(url, options).then(res => res.json());
}