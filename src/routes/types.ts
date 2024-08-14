export interface RouteObject {
  component: React.LazyExoticComponent<React.FC> | React.FC;
  path: string;
  title: string;
}
