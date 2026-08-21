import { createContext, useContext, type ReactNode } from "react";
import { fallbackContent, type SiteContent } from "./site-content";

/**
 * Sections read their data from here instead of importing the static file, so
 * whatever the admin publishes shows up without touching a component.
 */
const ContentContext = createContext<SiteContent>(fallbackContent);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  return useContext(ContentContext);
}
