import { Avatar } from '@/assets'

export const NAVIGATION_ITEMS = [
  {
    title: {
      en: 'Portfolio',
      es: 'Portafolio'
    },
    href: '/'
  },
  {
    title: {
      en: 'Projects',
      es: 'Proyectos'
    },
    href: '/projects'
  },
  {
    title: {
      en: 'Snippets',
      es: 'Snippets'
    },
    href: '/snippets'
  },
  {
    title: {
      en: 'Blog',
      es: 'Blog'
    },
    href: '/blog'
  }
]

export const USER_DATA = {
  displayName: 'Adrian Alvarez',
  avatar: Avatar,
  sentences: {
    en: 'Full stack developer with strong frontend foundation.',
    es: 'Desarrollador full stack con sólida base frontend.'
  },
  overview: [
    {
      content: {
        en: 'Senior Full-Stack Developer',
        es: 'Desarrollador Full-Stack Senior'
      },
      icon: 'code'
    },
    {
      content: {
        en: 'Asturias, España',
        es: 'Asturias, España'
      },
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
  about: {
    en: [
      "Hi! I'm Adrián Álvarez — a Senior Full-Stack Developer with a frontend heart and a strong focus on performance, CRO, and user-centered design.",
      "I specialize in building fast, accessible, and conversion-driven websites and SaaS platforms using technologies like React, Next.js, Astro, and Sanity. I also bring solid experience in testing and quality assurance, working with tools like Jest, React Testing Library, and Cypress to ensure reliability and scalability.",
      "Over the last few years, I've worked with agencies and startups across Europe and the US, leading and developing eCommerce projects, automating content pipelines, and integrating intelligent search and AI-powered tools. I’ve also implemented CI/CD pipelines (e.g., GitHub Actions) to streamline development workflows, automate testing, and enable consistent, reliable deployments.",
      "Whether it's building a custom storefront, designing a dynamic content structure, or improving search and SEO, I love turning complex challenges into elegant digital experiences.",
      'Beyond the code, I bring a strategic mindset — every decision I make aims to support business goals, user needs, and long-term maintainability.',
      "Let's build something impactful."
    ],
    es: [
      '¡Hola! Soy Adrián Álvarez — Senior Full-Stack Developer con alma de frontend y un fuerte enfoque en performance, CRO y diseño centrado en el usuario.',
      'Me especializo en construir sitios web y plataformas SaaS rápidas, accesibles y orientadas a la conversión, utilizando tecnologías como React, Next.js, Astro y Sanity. Además, cuento con sólida experiencia en testing y aseguramiento de calidad, trabajando con herramientas como Jest, React Testing Library y Cypress para garantizar aplicaciones robustas y escalables.',
      'En los últimos años, he trabajado con agencias y startups en Europa y Estados Unidos, liderando y desarrollando proyectos eCommerce, automatizando pipelines de contenido e integrando motores de búsqueda inteligentes y herramientas impulsadas por IA. También he implementado pipelines de CI/CD (por ejemplo, con GitHub Actions) para optimizar flujos de desarrollo, automatizar tests y asegurar despliegues consistentes y fiables.',
      'Ya sea construyendo una tienda personalizada, diseñando una estructura de contenido dinámico o mejorando la búsqueda y SEO, me encanta convertir desafíos complejos en experiencias digitales elegantes.',
      'Más allá del código, aporto una mentalidad estratégica — cada decisión que tomo busca apoyar los objetivos del negocio, las necesidades del usuario y la mantenibilidad a largo plazo.',
      'Construyamos algo impactante.'
    ]
  }
}

export const TECH_STACK = [
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
    key: 'hono',
    title: 'Hono',
    href: 'https://hono.dev/',
    categories: ['Framework'],
    color: '#E36002'
  },
  {
    key: 'nestjs',
    title: 'NestJS',
    href: 'https://nestjs.com/',
    categories: ['Framework'],
    color: '#E0234E'
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
    title: 'Preact',
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
    key: 'jest',
    title: 'Jest',
    href: 'https://jestjs.io/',
    categories: ['Testing'],
    color: '#C21325'
  },
  {
    key: 'githubactions',
    title: 'GitHub Actions',
    href: 'https://github.com/features/actions',
    categories: ['CI/CD'],
    color: '#2088FF'
  },
  {
    key: 'turborepo',
    title: 'Turborepo',
    href: 'https://turbo.build/repo',
    categories: ['Build Tool', 'Monorepo'],
    color: '#EF4444'
  },
  {
    key: 'webpack',
    title: 'Webpack',
    href: 'https://webpack.js.org/',
    categories: ['Build Tool'],
    color: '#8DD6F9'
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

export const EXPERIENCES = [
  {
    id: 'kreitech',
    companyName: 'Kreitech',
    isCurrentEmployer: true,
    companyLogo:
      '/companies/642d7dcd6e06eeed7fc7951e_favico_GIF_32x32.gif',
    positions: [
      {
        id: 'kreitech-frontend-developer',
        title: {
          en: 'Frontend Developer',
          es: 'Desarrollador Frontend'
        },
        employmentPeriod: {
          start: '2025',
          end: null
        },
        employmentType: 'Part-time',
        icon: 'briefcase',
        description: {
          en: [
            'Collaborated as a full-stack developer within diverse teams, delivering projects focused on the US market.',
            'Contributed to both frontend and backend development across a range of industry-focused web applications.',
            'Worked in close coordination with product managers, designers, and engineers to achieve shared goals.',
            'Participated in the centralization and optimization of workflows, ensuring maintainable and scalable solutions.'
          ],
          es: [
            'Colaboré como desarrollador full-stack en equipos diversos, entregando proyectos enfocados en el mercado de EE.UU.',
            'Contribuí tanto al desarrollo frontend como backend en una variedad de aplicaciones web para diferentes industrias.',
            'Trabajé en estrecha coordinación con product managers, diseñadores e ingenieros para lograr objetivos comunes.',
            'Participé en la centralización y optimización de flujos de trabajo, asegurando soluciones mantenibles y escalables.'
          ]
        },
        skills: [
          'Next.js',
          'React',
          'Astro',
          'Tailwind CSS',
          'Node.js',
          'Typescript',
          'Supabase',
          'Deno',
          'Hono',
          'Vercel'
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: 'doc-tech',
    companyName: 'DocTech World',
    isCurrentEmployer: false,
    companyLogo:
      '/companies/doctor_tecnolgico_logo.jpg',
    positions: [
      {
        id: 'doc-tech-tech-lead',
        title: {
          en: 'Technical Lead',
          es: 'Líder Técnico'
        },
        employmentPeriod: {
          start: '2024',
          end: '2026'
        },
        employmentType: 'Part-time',
        icon: 'briefcase',
        description: {
          en: [
            'Led technical architecture and development of personalized e-commerce and SaaS projects from concept to launch.',
            'Designed and implemented scalable frontend solutions tailored to diverse client requirements and business goals.',
            'Managed cross-functional teams and mentored junior developers while maintaining high code quality standards.',
            'Delivered high-performance, SEO-optimized, and accessible web applications using modern frameworks.'
          ],
          es: [
            'Lideré la arquitectura técnica y el desarrollo de proyectos personalizados de e-commerce y SaaS desde la concepción hasta el lanzamiento.',
            'Diseñé e implementé soluciones frontend escalables adaptadas a diversos requisitos de clientes y objetivos de negocio.',
            'Gestioné equipos multifuncionales y mentoré a desarrolladores junior manteniendo altos estándares de calidad de código.',
            'Entregué aplicaciones web de alto rendimiento, optimizadas para SEO y accesibilidad utilizando frameworks modernos.'
          ]
        },
        skills: [
          'Next.js',
          'React',
          'Astro',
          'Sanity',
          'Shopify',
          'Tailwind CSS',
          'Node.js',
          'Express',
          'Typescript'
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: '3dids',
    companyName: '3dids',
    isCurrentEmployer: false,
    companyLogo:
      '/companies/logo3DIDS.webp',
    positions: [
      {
        id: '3dids-2024',
        title: {
          en: 'Digital Business Consultant',
          es: 'Consultor de Negocios Digitales'
        },
        employmentPeriod: {
          start: '2024',
          end: '2025'
        },
        employmentType: 'Full-time',
        icon: 'briefcase',
        description: {
          en: [
            'Development of custom web solutions using Liquid, with emphasis on performance, SEO, and accessibility.',
            'Creation of online stores and modular components tailored to complex client needs and Shopify ecosystems.',
            'Engineered Liquid-based web solutions optimized for speed, SEO, and accessibility standards.',
            'Developed flexible e-commerce features and interactive UX tailored to specific client requirements.'
          ],
          es: [
            'Desarrollo de soluciones web personalizadas usando Liquid, con énfasis en rendimiento, SEO y accesibilidad.',
            'Creación de tiendas online y componentes modulares adaptados a necesidades complejas de clientes y ecosistemas Shopify.',
            'Ingeniería de soluciones web basadas en Liquid optimizadas para velocidad, SEO y estándares de accesibilidad.',
            'Desarrollo de características de e-commerce flexibles y UX interactiva adaptada a requisitos específicos de clientes.'
          ]
        },
        skills: [
          'Shopify',
          'Liquid',
          'Javascript',
          'JQuery',
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
      '/companies/favicon-14.svg',
    positions: [
      {
        id: 'desoft-2022',
        title: {
          en: 'Junior Front-End Developer',
          es: 'Desarrollador Front-End Junior'
        },
        employmentPeriod: {
          start: '2022',
          end: '2023'
        },
        employmentType: 'Full-time',
        icon: 'code',
        description: {
          en: [
            'Development of interactive and optimized interfaces with React and TypeScript.',
            'Implementation of design patterns and software architecture to improve code scalability.',
            'Maintenance and optimization of web applications',
            'Implemented reusable React components and integrated third-party libraries',
            'Collaborated with UI/UX team to build responsive layouts'
          ],
          es: [
            'Desarrollo de interfaces interactivas y optimizadas con React y TypeScript.',
            'Implementación de patrones de diseño y arquitectura de software para mejorar la escalabilidad del código.',
            'Mantenimiento y optimización de aplicaciones web',
            'Implementación de componentes React reutilizables e integración de librerías de terceros',
            'Colaboración con el equipo de UI/UX para construir layouts responsivos'
          ]
        },
        skills: [
          'React',
          'TypeScript',
          'Turbopack',
          'Webpack',
          'Software Architecture',
          'Performance'
        ],
        isExpanded: true
      },
      {
        id: 'desoft-2021',
        title: {
          en: 'Trainee Front-End Developer',
          es: 'Desarrollador Front-End en Prácticas'
        },
        employmentPeriod: {
          start: '2021',
          end: '2022'
        },
        employmentType: 'Full-time',
        icon: 'code',
        description: {
          en: [
            'Built responsive user interfaces using React components and hooks',
            'Learned and implemented basic TypeScript types and interfaces',
            'Assisted in maintaining existing React applications and fixing bugs',
            'Collaborated with senior developers to understand React best practices and patterns'
          ],
          es: [
            'Construcción de interfaces de usuario responsivas usando componentes y hooks de React',
            'Aprendizaje e implementación de tipos e interfaces básicas de TypeScript',
            'Asistencia en el mantenimiento de aplicaciones React existentes y corrección de errores',
            'Colaboración con desarrolladores senior para entender las mejores prácticas y patrones de React'
          ]
        },
        skills: [
          'React',
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
    companyLogo: 'https://www.adrian-alvarez.com/favicon.ico',
    isCurrentEmployer: true,
    positions: [
      {
        id: 'freelance-2019',
        title: {
          en: 'Freelance Web Developer',
          es: 'Desarrollador Web Freelance'
        },
        employmentPeriod: {
          start: '2019',
          end: null
        },
        employmentType: 'Freelance',
        icon: 'globe',
        description: {
          en: [
            'Development and implementation of custom solutions for e-commerce clients and web platforms.',
            'Integration of technologies like React, Next.js, Tailwind CSS and Node.js to improve user experience and web performance.',
            'Collaboration with Liquid Developer Group team to improve project quality and optimization.',
            'Led technical architecture decisions and implementation of scalable frontend solutions for multiple client projects.',
            'Mentored junior developers and provided technical guidance while maintaining high code quality standards.'
          ],
          es: [
            'Desarrollo e implementación de soluciones personalizadas para clientes de e-commerce y plataformas web.',
            'Integración de tecnologías como React, Next.js, Tailwind CSS y Node.js para mejorar la experiencia de usuario y el rendimiento web.',
            'Colaboración con el equipo de Liquid Developer Group para mejorar la calidad y optimización de proyectos.',
            'Liderazgo en decisiones de arquitectura técnica e implementación de soluciones frontend escalables para múltiples proyectos de clientes.',
            'Mentoría a desarrolladores junior y provisión de guía técnica manteniendo altos estándares de calidad de código.'
          ]
        },
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

export const CERTIFICATIONS = [
  {
    title: {
      en: 'Javascript Algorithms and Data structure',
      es: 'Algoritmos y Estructuras de Datos en Javascript'
    },
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '06-12-2022',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/javascript-algorithms-and-data-structures'
  },
  {
    title: {
      en: 'Responsive Web Design',
      es: 'Diseño Web Responsivo'
    },
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '29-12-2022',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/responsive-web-design'
  },
  {
    title: {
      en: 'Front-End Development Libraries',
      es: 'Librerías de Desarrollo Front-End'
    },
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '22-02-2023',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/front-end-development-libraries'
  },
  {
    title: {
      en: 'Back-End Development and APIs',
      es: 'Desarrollo Back-End y APIs'
    },
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '28-04-2023',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/data-visualization'
  },
  {
    title: {
      en: 'Data Visualization',
      es: 'Visualización de Datos'
    },
    issuer: 'freecodecamp.org',
    issuerLogoURL:
      'https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7',
    issueDate: '06-04-2023',
    credentialURL:
      'https://www.freecodecamp.org/certification/fcc0c7054f7-09c1-43bf-8f90-c9121bc86e5a/data-visualization'
  },
  {
    title: {
      en: 'Graph Developer - Associate',
      es: 'Desarrollador Graph - Asociado'
    },
    issuer: 'Apollo GraphQL',
    issuerLogoURL:
      'https://www.apollographql.com/tutorials/favicon-32x32.png?v=e03dad83eb16cf475a13342272058ebe',
    issueDate: '06-04-2023',
    credentialURL:
      'https://www.apollographql.com/tutorials/certifications/2877a312-31ad-44a0-bd0c-febb6dc9a4ca'
  }
]
