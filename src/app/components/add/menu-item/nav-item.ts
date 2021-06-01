export interface NavItem {
  id: number;
  name: string;
  masterTypes?: NavItem[];
}
