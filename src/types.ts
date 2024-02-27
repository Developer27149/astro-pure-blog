import type socialIcons from "./assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  title: string;
  description: string;
  ogImage: string;
  enableDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number; // 预定发布的时间
  contact: Record<string, string>;
};

export type SocialObject = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
};
