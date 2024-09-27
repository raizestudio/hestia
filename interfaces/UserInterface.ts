import type { AddressInterface } from "./AddressInterface";
import type { PhoneNumberInterface } from "./PhoneNumberInterface";

export interface GroupInterface {
    code: string;
    name: string;
    description: string;
    color: string;
    slug: string;
}

export interface RoleInterface {
    id: number;
    code: string;
    label: string;
    description: string;
    color: string;
    // group: GroupInterface;
}

export interface UserPreferenceInterface {
    id: number;
    theme: string;
}

export interface UserSecurityInterface {
    id: number;
    email_validation_code_expires_at: string;
    email_validation_code: string;
    password_reset_code_expires_at: string;
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
    user_preference: UserPreferenceInterface;
    user_security: UserSecurityInterface;
    addresses: AddressInterface[];
    phone_numbers: PhoneNumberInterface[];
    deleted_at: Date | null;
}