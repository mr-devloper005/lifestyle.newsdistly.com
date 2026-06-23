import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium media distribution and editorial visibility',
      description: 'A luxury editorial front end for media distributors, campaign teams, and public-facing announcements.',
      openGraphTitle: 'Premium media distribution and editorial visibility',
      openGraphDescription: 'Explore stories, campaign updates, and discovery-led content in a polished premium edition.',
      keywords: ['media distribution', 'editorial website', 'newsroom layout', 'campaign visibility'],
    },
    hero: {
      badge: 'Premium edition',
      title: ['Modern media visibility for', 'brands, campaigns, and public updates.'],
      description: 'A polished discovery layer for distributed content, campaign storytelling, and newsroom-style presentation built for media distributors.',
      primaryCta: { label: 'Get started', href: '/signup' },
      secondaryCta: { label: 'Talk to an expert', href: '/contact' },
      searchPlaceholder: 'Search stories, campaigns, categories, and updates',
      focusLabel: 'Focus',
    },
    intro: {
      badge: 'Editorial overview',
      title: 'A premium discovery surface for public-facing media content.',
      paragraphs: [
        'The homepage is designed to make distributed stories feel polished, visible, and easy to browse across multiple content lanes.',
        'Readers can move between featured releases, searchable archives, and supporting pages without losing context or flow.',
      ],
      sideBadge: 'Why it works',
      sidePoints: [
        'Clear hierarchy for hero stories and supporting updates.',
        'Multiple card styles that keep the archive visually varied.',
        'Search, archive, and detail pages stay connected through one visual language.',
      ],
      primaryLink: { label: 'Browse archive', href: '/search' },
      secondaryLink: { label: 'Contact us', href: '/contact' },
    },
  },
  about: {
    badge: 'About the edition',
    title: 'A refined way to present media-ready stories.',
    description: `${slot4BrandConfig.siteName} brings together editorial reading, announcement discovery, and structured content browsing in one premium publication surface.`,
    paragraphs: [
      'The experience is designed for teams that need stories to feel polished, visible, and easy to explore across multiple content types.',
      'Readers can move naturally between releases, articles, visual posts, listings, and reference material without losing context.',
    ],
    values: [
      {
        title: 'Elegant presentation',
        description: 'Visual rhythm, spacious layouts, and premium cards help every update feel publication ready.',
      },
      {
        title: 'Flexible discovery',
        description: 'Search, category filters, related content, and cross-linked task pages keep audiences moving through the archive.',
      },
      {
        title: 'Reliable structure',
        description: 'Existing routes, feeds, and publishing workflows stay intact while the front end becomes far more distinctive.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Bring your next release, campaign, or distribution brief into one place.',
    description: 'Share what you are planning and the site can route the request through the right workflow without changing the publishing system behind it.',
    formTitle: 'Start a conversation',
  },
  search: {
    metadata: {
      title: 'Search the archive',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Archive search',
      title: 'Find stories, releases, and resources quickly.',
      description: 'Search across active sections to surface distribution-ready stories, editorial features, and structured content from one elegant interface.',
      placeholder: 'Search by title, keyword, category, or topic',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create content',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Log in to open the publishing workspace.',
      description: 'Use your account to prepare submissions for any active content lane without changing the existing publishing flow.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Prepare polished content for every active section.',
      description: 'Choose the content type, add the essentials, and save a clean draft with titles, visuals, links, summaries, and body content.',
    },
    formTitle: 'Submission details',
    submitLabel: 'Save',
    successTitle: 'Saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Return to your publishing space.',
      description: 'Log in to continue browsing, managing submissions, and creating content from your account.',
      formTitle: 'Log in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create one first, then try again.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open your account and begin publishing.',
      description: 'Create an account to access the publishing workspace, save your details, and prepare new content.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Log in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
