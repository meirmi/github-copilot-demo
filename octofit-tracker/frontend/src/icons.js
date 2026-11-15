import React from 'react';

function Icon({ children }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const HomeIcon = () => (
  <Icon>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
    <path d="M10 19v-5h4v5" />
  </Icon>
);

export const ActivityIcon = () => (
  <Icon>
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </Icon>
);

export const TrophyIcon = () => (
  <Icon>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 6H4v1a3 3 0 0 0 4 2.8" />
    <path d="M16 6h4v1a3 3 0 0 1-4 2.8" />
    <path d="M12 13v4" />
    <path d="M8 20h8" />
  </Icon>
);

export const TeamsIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16.5 14.2c2.8 0 4.5 1.6 4.5 4.3" />
  </Icon>
);

export const UsersIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
  </Icon>
);

export const DumbbellIcon = () => (
  <Icon>
    <path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12" />
  </Icon>
);

export const SunIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </Icon>
);

export const MoonIcon = () => (
  <Icon>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </Icon>
);

export const RefreshIcon = () => (
  <Icon>
    <path d="M20 11a8 8 0 0 0-14.5-3.5L4 9" />
    <path d="M4 4v5h5" />
    <path d="M4 13a8 8 0 0 0 14.5 3.5L20 15" />
    <path d="M20 20v-5h-5" />
  </Icon>
);
