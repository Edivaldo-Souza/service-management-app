export const siteConfig = {
  name: "Service Management Platform",
  tagline:
    "Centralize service requests, track tickets, and manage your service catalog in one place.",
  description:
    "A unified platform to request services, manage support tickets, and keep your team aligned.",
} as const;

export const features = [
  {
    title: "Service Catalog",
    description:
      "Browse available services and submit requests through a single, organized catalog.",
  },
  {
    title: "Ticket Management",
    description:
      "Track issues from creation to resolution with clear status updates and ownership.",
  },
  {
    title: "Request Tracking",
    description:
      "Follow every service request through its lifecycle so nothing falls through the cracks.",
  },
  {
    title: "Team Visibility",
    description:
      "Give teams a shared view of workloads, priorities, and progress across all services.",
  },
] as const;

export const cta = {
  heading: "Ready to get started?",
  description:
    "Sign in to access your dashboard, submit requests, and manage tickets.",
  buttonLabel: "Get started",
} as const;

export const dashboard = {
  title: "Dashboard",
  subtitle: "View your active services and track spending at a glance.",
  seeMoreLabel: "See more",
  profileAlt: "Profile picture",
} as const;

export const signup = {
  title: "Create your account",
  description: "Join the platform to request services and manage tickets.",
  submitLabel: "Create account",
  signInPrompt: "Already have an account?",
  signInLabel: "Sign in",
} as const;
