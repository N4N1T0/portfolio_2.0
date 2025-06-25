import { Avatar } from '@/assets/images'

export const navItems = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Contact',
    href: '/contact'
  }
]

export const userData = {
  displayName: 'Adrian "Nano" Alvarez Alonso',
  avatar: Avatar,
  sentences: [
    'Transformo ideas en productos web funcionales.',
    'Me enfoco en rendimiento, UX y escalabilidad.',
    'Full stack con fuerte base en frontend.',
    'Desarrollo soluciones ágiles, limpias y mantenibles.',
    'Apasionado por la tecnología y el impacto.'
  ],
  overview: [
    {
      content: 'Mid-Level Front-end Developer',
      icon: 'code'
    },
    {
      content: 'Asturias, España',
      icon: 'location'
    },
    {
      content: '+34647317214',
      href: 'tel:+34647317214',
      icon: 'phone'
    },
    {
      content: 'adrian.alvarezalonso1991@gmail.com',
      href: 'mailto:adrian.alvarezalonso1991@gmail.com',
      icon: 'mail'
    }
  ],
  social: [
    {
      icon: 'linkedIn',
      title: 'LinkedIn',
      description: 'adrian-alvarez-alonso',
      href: 'https://www.linkedin.com/in/adrian-alvarez-alonso-front-end-developer'
    },
    {
      icon: 'github',
      title: 'GitHub',
      description: 'N4N1T0',
      href: 'https://github.com/N4N1T0'
    },
    {
      icon: 'devTo',
      title: 'dev.to',
      description: 'n4n1t0',
      href: 'https://dev.to/n4n1t0'
    },
    {
      icon: 'x',
      title: 'X',
      description: '@AdrianlvarezAl1',
      href: 'https://x.com/AdrianlvarezAl1'
    }
  ],
  about: [
    'Hi! I’m Adrián Álvarez — a full-stack developer with a frontend heart and a strong focus on performance, CRO, and user-centered design.',
    ' I specialize in building fast, accessible, and conversion-driven websites and SaaS platforms using technologies like React, Next.js, Astro, and Sanity.',
    ' Over the last few years, I’ve worked with agencies and startups across Europe and the US, leading and developing eCommerce projects, automating content pipelines, and integrating intelligent search and AI-powered tools.',
    ' Whether it’s building a custom storefront, designing a dynamic content structure, or improving search and SEO, I love turning complex challenges into elegant digital experiences.',
    'Beyond the code, I bring a strategic mindset — every decision I make aims to support business goals, user needs, and long-term maintainability.',
    'Let’s build something impactful.'
  ]
}

export const techStack = [
  {
    key: 'typescript',
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
    categories: ['Language'],
    color: '#3178C6'
  },
  {
    key: 'javascript',
    title: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    categories: ['Language'],
    color: '#F7DF1E'
  },
  {
    key: 'python',
    title: 'Python',
    href: 'https://www.python.org/',
    categories: ['Language'],
    color: '#3776AB'
  },
  {
    key: 'nodedotjs',
    title: 'Node.js',
    href: 'https://nodejs.org/',
    categories: ['Runtime Environment'],
    color: '#5FA04E'
  },
  {
    key: 'express',
    title: 'Express',
    href: 'https://expressjs.com/',
    categories: ['Framework'],
    color: '#000000'
  },
  {
    key: 'react',
    title: 'React',
    href: 'https://react.dev/',
    categories: ['Library', 'UI Library'],
    color: '#61DAFB'
  },
  {
    key: 'preact',
    title: 'React',
    href: 'https://preactjs.com/',
    categories: ['Library', 'UI Library'],
    color: '#673AB8'
  },
  {
    key: 'nextdotjs',
    title: 'Next.js',
    href: 'https://nextjs.org/',
    categories: ['Framework'],
    color: '#000000'
  },
  {
    key: 'tailwindcss',
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    categories: ['Framework'],
    color: '#06B6D4'
  },
  {
    key: 'sass',
    title: 'Sass',
    href: 'https://sass-lang.com/',
    categories: ['Framework'],
    color: '#CC6699'
  },
  {
    key: 'shadcnui',
    title: 'shadcn/ui',
    href: 'https://ui.shadcn.com/',
    categories: ['Library', 'Component Library'],
    color: '#000000'
  },
  {
    key: 'redux',
    title: 'Redux',
    href: 'https://redux.js.org/',
    categories: ['State Management'],
    color: '#764ABC'
  },
  {
    key: 'reactrouter',
    title: 'React Router',
    href: 'https://reactrouter.com/',
    categories: ['Library', 'Navigation'],
    color: '#CA4245'
  },
  {
    key: 'git',
    title: 'Git',
    href: 'https://git-scm.com/',
    categories: ['Version Control'],
    color: '#F05032'
  },
  {
    key: 'docker',
    title: 'Docker',
    href: 'https://www.docker.com/',
    categories: ['Containerization'],
    color: '#2496ED'
  },
  {
    key: 'mongodb',
    title: 'MongoDB',
    href: 'https://www.mongodb.com/',
    categories: ['Database'],
    color: '#47A248'
  },
  {
    key: 'redis',
    title: 'Redis',
    href: 'https://redis.io/',
    categories: ['Database'],
    color: '#FF4438'
  },
  {
    key: 'figma',
    title: 'Figma',
    href: 'https://www.figma.com/',
    categories: ['Tools', 'Design'],
    color: '#F24E1E'
  }
]

export const experiences = [
  {
    id: '3dids',
    companyName: '3dids',
    isCurrentEmployer: false,
    companyLogo:
      'https://3dids.com/cdn/shop/files/logo3DIDS.png?v=1721725590&width=120', // If you have a logo, add it here
    positions: [
      {
        id: '3dids-2024',
        title: 'Digital Business Consultant',
        employmentPeriod: {
          start: '2024',
          end: '2025'
        },
        employmentType: 'Full-time',
        icon: 'briefcase',
        description: [
          'Creation of custom web solutions focused on performance, SEO and accessibility.',
          'Development of online stores and interactive platforms for clients with specific needs.'
        ],
        skills: [
          'React',
          'Next.js',
          'Astro',
          'TypeScript',
          'Tailwind CSS',
          'Accessibility',
          'SEO'
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: 'desoft',
    companyName: 'Desoft',
    isCurrentEmployer: false,
    companyLogo:
      'https://www.desoft.cu/themes/custom/buildframetheme/img/favicon-14.svg',
    positions: [
      {
        id: 'desoft-2021',
        title: 'Junior Front-End Developer',
        employmentPeriod: {
          start: '2021',
          end: '2023'
        },
        employmentType: 'Full-time',
        icon: 'code',
        description: [
          '- Development of interactive and optimized interfaces with React, Next.js and TypeScript.',
          '- Implementation of design patterns and software architecture to improve code scalability.',
          '- Maintenance and optimization of web applications, reducing loading times by 30% using Turbopack and Webpack.'
        ],
        skills: [
          'React',
          'Next.js',
          'TypeScript',
          'Turbopack',
          'Webpack',
          'Software Architecture',
          'Performance'
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: 'freelance',
    companyName: 'Freelance Projects',
    companyLogo: 'https://www.adrian-alvarez.dev/favicon.ico',
    isCurrentEmployer: true,
    positions: [
      {
        id: 'freelance-2019',
        title: 'Freelance Web Developer',
        employmentPeriod: {
          start: '2019'
        },
        employmentType: 'Freelance',
        icon: 'globe',
        description: [
          '- Development and implementation of custom solutions for e-commerce clients and web platforms.',
          '- Integration of technologies like React, Next.js, Tailwind CSS and Node.js to improve user experience and web performance.',
          '- Collaboration with Liquid Developer Group team to improve project quality and optimization.'
        ],
        skills: [
          'React',
          'Next.js',
          'Tailwind CSS',
          'Node.js',
          'eCommerce',
          'Performance',
          'UX',
          'Liquid'
        ],
        isExpanded: true
      }
    ]
  }
]

export const certifications = [
  {
    title: 'Javascript Algorithms and Data structure',
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '06-12-2022',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/javascript-algorithms-and-data-structures'
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '29-12-2022',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/responsive-web-design'
  },
  {
    title: 'Front-End Development Libraries',
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '22-02-2023',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/front-end-development-libraries'
  },
  {
    title: 'Back-End Development and APIs',
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '28-04-2023',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/data-visualization'
  },
  {
    title: 'Data Visualization',
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '06-04-2023',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/data-visualization'
  },
  {
    title: 'Graph Developer - Associate',
    issuer: 'Apollo GraphQL',
    issuerLogoURL:
      'https://www.apollographql.com/tutorials/favicon-32x32.png?v=e03dad83eb16cf475a13342272058ebe',
    issueDate: '06-04-2023',
    credentialURL:
      'https://www.apollographql.com/tutorials/certifications/2877a312-31ad-44a0-bd0c-febb6dc9a4ca'
  }
]
