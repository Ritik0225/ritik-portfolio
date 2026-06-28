export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "email"
  | "dribbble"
  | "youtube";

export interface Social {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
}
