import { InjectionToken } from '@angular/core';

export type TrackingValue = string | number | boolean | null | undefined;

export interface TrackingLike {
  track(eventName: string, payload?: Record<string, TrackingValue>): void;
}

export const TRACKING_SERVICE = new InjectionToken<TrackingLike>('TRACKING_SERVICE');
