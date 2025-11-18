import { useEffect } from "react";
import { GOOGLE_ANALYTICS_ID } from "@/const";

export const useGoogleAnalytics = () => {
  useEffect(() => {
    if (!GOOGLE_ANALYTICS_ID || GOOGLE_ANALYTICS_ID === "G-XXXXXXXXXX") {
      console.warn("Google Analytics ID not configured. Please update GOOGLE_ANALYTICS_ID in const.ts");
      return;
    }

    // Load Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GOOGLE_ANALYTICS_ID);

    // Make gtag globally available
    (window as any).gtag = gtag;
  }, []);
};

// Track page views
export const trackPageView = (path: string) => {
  if ((window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }
};
