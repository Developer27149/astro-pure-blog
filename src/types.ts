import type socialIcons from "./assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  description: string;
  ogImage: string;
  enableDarkMode: boolean;
  postPerPage: number;
};

export type SocialObject = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
};
