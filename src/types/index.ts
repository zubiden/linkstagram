// Generated by https://quicktype.io

export interface IProfile {
    username:          string;
    description:       string;
    first_name:        string;
    followers:         number;
    following:         number;
    job_title:         string;
    last_name:         string;
    profile_photo_url: string;
}

export interface IPhoto {
    id:  number;
    url: string;
}

export interface IPost {
    id:          number;
    author:      IProfile;
    created_at:  string;
    description: string;
    is_liked:    boolean;
    likes_count: number;
    photos:      IPhoto[];
}

export interface IPhotosAttribute {
    image: IImage;
}

export interface IImage {
    id:       string;
    storage:  string;
    metadata: IMetadata;
}

export interface IMetadata {
    size:      number;
    mime_type: string;
    filename:  string;
}

export interface IComment {
    id:         number;
    commenter:  IProfile;
    created_at: string;
    message:    string;
}

export interface LanguageValue {
    few: string
    many: string
    one: string
    other: string
    two: string
    zero: string
}

export interface LocalizationParameters {
    key?: string | LocalizationParameters
    replaces?: {[key: string]: string},
    count?: number,
    defaultValue?: string
}