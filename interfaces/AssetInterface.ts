import type { TagInterface } from "~/interfaces/TagInterface";
import type { CategoryInterface } from '~/interfaces/CategoryInterface';
import type { UserInterface } from '~/interfaces/UserInterface';

export interface AssetInterface {
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