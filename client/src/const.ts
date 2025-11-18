export { ONE_YEAR_MS, OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, NAVIGATION_ITEMS, SKILLS, EXPERIENCES, PROJECTS, SAMPLE_DOCUMENTS, PORTFOLIO_CATEGORIES, GOOGLE_DRIVE_FOLDER_ID, GOOGLE_ANALYTICS_ID, CONTACT_EMAIL, CV_FILE_PATH, SOCIAL_LINKS, SOFTWARE_SKILLS, AVATAR_URL, FORMSPREE_ID, ADMIN_PASSWORD } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
