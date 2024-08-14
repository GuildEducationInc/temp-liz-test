/**
 * Global TypeScript definitions and module declarations for the app.
 * @packageDocumentation
 */

export {};

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}
