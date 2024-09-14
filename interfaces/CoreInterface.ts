export interface MenuInterface {
  id: number
  name: string
  description: string
  icon: string
  url: string
  order: number
  groups: []
  roles: []
  menu_items: MenuItemInterface[]
}

export interface MenuItemInterface {
  id: number
  name: string
  description: string
  icon: string
  url: string
  order: number
  menu: number
  menu_items: [] | MenuItemInterface[]
  groups: []
  roles: []
}