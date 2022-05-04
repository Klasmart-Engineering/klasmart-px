declare module "*.png" { const data: string; export default data; }
declare module "*.gif" { const data: string; export default data; }
declare module "*.jpeg" { const data: string; export default data; }
declare module "*.jpg" { const data: string; export default data; }
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}
