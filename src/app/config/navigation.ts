export type PortalNavbarConfigProps = {
  key: string;
  label: string;
  url?: string;
  target?: "_blank" | "_self";
  isExternal?: boolean;
  children?: PortalNavbarConfigProps[];
  isPublic: boolean;
};

export function portalNavbarConfig(t: (key: string) => string) {
  const config: PortalNavbarConfigProps[] = [

    
  ];

  return config;
}
