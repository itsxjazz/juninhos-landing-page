export const CONFIG = {
  API_BASE_URL: 'https://juninhos-landing-page.onrender.com/api',
  ENDPOINTS: {
    PROJECTS: '/projects',
    CLASSES: '/classes',
    WAITLIST: '/waitlist',
    INSTRUCTOR: '/instructor',
  },
  RETRY_DELAY: 5000,
} as const;
