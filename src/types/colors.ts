export const BASE_COLORS = [ `default`, `inherit` ] as const;

export const COMMON_COLORS = [ `white`, `black` ] as const;

export const THEME_COLORS = [ `primary`, `secondary` ] as const;

export const STATUS_COLORS = [
    `success`,
    `warning`,
    `error`,
    `info`,
] as const;

export const ACTION_COLORS = [ `action`, `disabled` ] as const;

export type BaseColor = typeof BASE_COLORS[number];

export type CommonColor = typeof COMMON_COLORS[number];

export type ThemeColor = typeof THEME_COLORS[number];

export type StatusColor = typeof STATUS_COLORS[number];

export type ActionColor = typeof ACTION_COLORS[number];
