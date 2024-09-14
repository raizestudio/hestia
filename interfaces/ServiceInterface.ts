import type { UserInterface } from "./UserInterface";
import type { TagInterface } from "./TagInterface";
import type { CategoryInterface } from './CategoryInterface';

export interface ServiceInterface {
  id: number | null;
  name: string;
  description: string;
  is_active: boolean;
  slug: string | null;
  tags: TagInterface[] | null;
  categories: CategoryInterface[] | null;
  created_at: Date | null;
  updated_at: Date | null;
  author: UserInterface | null;
  updated_by: UserInterface | null;
  deleted_at: Date | null;
  restored_at: Date | null;
}