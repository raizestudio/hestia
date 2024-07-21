import type { UserInterface } from "./UserInterface";
import type { TagInterface } from "./TagInterface";
import type { CategoryInterface } from './CategoryInterface';

export interface ServiceInterface {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  slug: string;
  tags: TagInterface[];
  categories: CategoryInterface[];
  created_at: Date;
  updated_at: Date;
  created_by: UserInterface;
  updated_by: UserInterface;
  deleted_at: Date;
  restored_at: Date;
}