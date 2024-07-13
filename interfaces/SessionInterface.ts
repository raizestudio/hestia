import type { RefreshInterface, TokenInterface } from './AuthenticationInterface';
import type { UserInterface } from './UserInterface';

export interface SessionInterface {

    id: number;
    session: string;
    token: TokenInterface;
    refresh: RefreshInterface;
    user: UserInterface;
    created_at: string;
    updated_at: string;
}