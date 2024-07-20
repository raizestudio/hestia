import type { AddressInterface } from "./AddressInterface";

export interface GroupInterface {
    code: string;
    name: string;
    description: string;
    color: string;
    slug: string;
}

export interface RoleInterface {
    code: string;
    name: string;
    description: string;
    group: GroupInterface;
}

export interface UserInterface {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    role: RoleInterface;
    password: string;
    is_active: boolean;
    date_joined: string;
    updated_at: string;
    last_login: string;
    addresses: AddressInterface[];
}