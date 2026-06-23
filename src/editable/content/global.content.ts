import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: 'Premium media distribution and editorial visibility',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Premium media distribution',
    primaryLinks: [
      { label: '', href: '/mediaDistribution' },
      { label: '', href: '/article' },
      { label: '', href: '/search' },
      { label: '', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get started', href: '/signup' },
      secondary: { label: 'Log in', href: '/login' },
    },
  },
  footer: {
    tagline: 'Luxury editorial layouts for modern distribution teams',
    description: 'Discover distribution-ready stories, visual campaigns, announcements, and public-facing editorial content through one polished reading experience.',
    columns: [
      {
        title: '',
        links: [
          { label: '', href: '/mediaDistribution' },
          { label: ' ', href: '/article' },
          { label: ' ', href: '/image' },
          { label: ' ', href: '/listing' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Designed for public-facing announcements, editorial discovery, and polished media visibility.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
