import { Avatar } from '@/assets'
import type { Activity } from '@/components/ui/contribution-graph'

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
    en: 'Fullstack Developer specializing in backend systems, APIs, and data architecture.',
    es: 'Desarrollador Fullstack especializado en sistemas backend, APIs y arquitectura de datos.'
  },
  overview: [
    {
      content: {
        en: 'Senior Frontend-Focused Fullstack Developer',
        es: 'Desarrollador Fullstack Senior con Enfoque Frontend'
      },
      icon: 'code'
    },
    {
      content: {
        en: 'Fullstack Engineer at Kreitech',
        es: 'Ingeniero Fullstack en Kreitech'
      },
      icon: 'link'
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
      'Hi! I’m Adrián Álvarez — a Senior Fullstack Developer with deep expertise in backend systems, API architecture, and data engineering.',
      'I specialize in designing and building scalable server-side solutions using Node.js, Express, and NestJS. I architect robust data pipelines with MongoDB and Redis, optimize database performance, containerize applications with Docker, and implement production-grade CI/CD workflows with GitHub Actions. My experience spans building RESTful APIs, microservice architectures, and data-driven applications that handle complex business logic and high-volume data processing.',
      'Over the last few years, I’ve worked with agencies and startups across Europe and the US, leading backend infrastructure development for eCommerce platforms, automating data pipelines, and integrating AI-powered tools into production systems. I’ve designed database schemas for scalability, implemented caching strategies, and optimized API performance. I also leverage AI tools in my engineering workflow to accelerate development and maintain high code quality standards.',
      'I combine backend engineering rigor with fullstack capability, ensuring seamless integration between server and client layers. Whether architecting APIs, optimizing databases, or deploying containerized services, I focus on building systems that are reliable, performant, and maintainable.',
      'Beyond the code, I bring a strategic mindset — every architecture decision I make considers scalability, data integrity, security, and business objectives.',
      'Let’s build backend systems that scale.'
    ],
    es: [
      '¡Hola! Soy Adrián Álvarez — Desarrollador Fullstack Senior con profunda experiencia en sistemas backend, arquitectura de APIs e ingeniería de datos.',
      'Me especializo en diseñar e implementar soluciones escalables del lado del servidor utilizando Node.js, Express y NestJS. Arquitecto pipelines de datos robustos con MongoDB y Redis, optimizo rendimiento de bases de datos, containerizo aplicaciones con Docker e implemento workflows de CI/CD de nivel producción con GitHub Actions. Mi experiencia abarca construcción de APIs REST, arquitecturas de microservicios y aplicaciones impulsadas por datos que manejan lógica empresarial compleja y procesamiento de datos de alto volumen.',
      'En los últimos años, he trabajado con agencias y startups en Europa y Estados Unidos, liderando desarrollo de infraestructura backend para plataformas eCommerce, automatizando pipelines de datos e integrando herramientas impulsadas por IA en sistemas de producción. He diseñado esquemas de bases de datos para escalabilidad, implementado estrategias de caché y optimizado rendimiento de APIs. También aprovecho herramientas de IA en mi flujo de trabajo de ingeniería para acelerar desarrollo y mantener altos estándares de calidad de código.',
      'Combino el rigor de la ingeniería backend con capacidad fullstack, asegurando integración perfecta entre capas de servidor y cliente. Ya sea arquitectando APIs, optimizando bases de datos o desplegando servicios containerizados, me enfoco en construir sistemas confiables, performantes y mantenibles.',
      'Más allá del código, aporto una mentalidad estratégica — cada decisión de arquitectura que tomo considera escalabilidad, integridad de datos, seguridad y objetivos empresariales.',
      'Construyamos sistemas backend que escalen.'
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
    companyLogo: '/companies/642d7dcd6e06eeed7fc7951e_favico_GIF_32x32.gif',
    positions: [
      {
        id: 'kreitech-frontend-developer',
        title: {
          en: 'Fullstack Developer (Backend Focus)',
          es: 'Desarrollador Fullstack (Enfoque Backend)'
        },
        employmentPeriod: {
          start: '2025',
          end: null
        },
        employmentType: 'Part-time',
        icon: 'briefcase',
        description: {
          en: [
            'Architected and implemented backend APIs using Node.js, Hono, and Deno, supporting diverse web applications across multiple markets.',
            'Designed RESTful API endpoints and server-side logic to handle complex business requirements for US market-focused projects.',
            'Optimized database queries and implemented caching strategies for improved API performance and scalability.',
            'Collaborated with cross-functional teams to align backend architecture with product requirements and system performance goals.',
            'Integrated frontend frameworks (Next.js, React, Astro) with robust backend systems, ensuring seamless end-to-end functionality.',
            'Leveraged AI tools to accelerate backend development and code quality automation.'
          ],
          es: [
            'Arquitectué e implementé APIs backend usando Node.js, Hono y Deno, soportando diversas aplicaciones web en múltiples mercados.',
            'Diseñé endpoints REST y lógica del lado del servidor para manejar requisitos empresariales complejos en proyectos enfocados en el mercado estadounidense.',
            'Optimicé consultas de bases de datos e implementé estrategias de caché para mejorar rendimiento y escalabilidad de APIs.',
            'Colaboré con equipos multifuncionales para alinear arquitectura backend con requisitos de productos y objetivos de rendimiento del sistema.',
            'Integré frameworks frontend (Next.js, React, Astro) con sistemas backend robustos, asegurando funcionalidad end-to-end perfecta.',
            'Utilicé herramientas de IA para acelerar desarrollo backend y automatización de calidad de código.'
          ]
        },
        skills: [
          'Node.js',
          'Hono',
          'Deno',
          'TypeScript',
          'API Design',
          'Database Optimization',
          'Next.js',
          'React',
          'Astro',
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
    companyLogo: '/companies/doctor_tecnolgico_logo.jpg',
    positions: [
      {
        id: 'doc-tech-tech-lead',
        title: {
          en: 'Technical Lead (Backend Architecture)',
          es: 'Líder Técnico (Arquitectura Backend)'
        },
        employmentPeriod: {
          start: '2025',
          end: '2026'
        },
        employmentType: 'Part-time',
        icon: 'briefcase',
        description: {
          en: [
            'Led technical architecture and backend infrastructure design for personalized e-commerce and SaaS platforms from concept to production.',
            'Architected scalable API layers using Node.js and Express, handling complex data workflows and business logic.',
            'Designed database schemas and implemented MongoDB-based data models optimized for e-commerce and SaaS use cases.',
            'Containerized applications using Docker and orchestrated deployment pipelines for consistent, reliable releases.',
            'Managed technical teams and mentored junior developers on backend best practices, microservice patterns, and system design.',
            'Integrated headless CMS solutions (Sanity) with custom backend APIs, creating flexible content delivery systems.',
            'Optimized API performance and implemented caching strategies using Redis for high-traffic platforms.'
          ],
          es: [
            'Lideré la arquitectura técnica y el diseño de infraestructura backend para plataformas personalizadas de e-commerce y SaaS desde concepción hasta producción.',
            'Arquitectué capas de API escalables usando Node.js y Express, manejando flujos de datos complejos y lógica empresarial.',
            'Diseñé esquemas de bases de datos e implementé modelos de datos basados en MongoDB optimizados para casos de uso de e-commerce y SaaS.',
            'Containerizé aplicaciones usando Docker y orquesté pipelines de despliegue para lanzamientos consistentes y confiables.',
            'Gestioné equipos técnicos y mentoré a desarrolladores junior sobre mejores prácticas backend, patrones de microservicios y diseño de sistemas.',
            'Integré soluciones de CMS headless (Sanity) con APIs backend personalizadas, creando sistemas flexibles de entrega de contenido.',
            'Optimicé rendimiento de APIs e implementé estrategias de caché usando Redis para plataformas de alto tráfico.'
          ]
        },
        skills: [
          'Node.js',
          'Express',
          'TypeScript',
          'MongoDB',
          'Redis',
          'Docker',
          'API Architecture',
          'Sanity',
          'Shopify',
          'System Design'
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: '3dids',
    companyName: '3dids',
    isCurrentEmployer: false,
    companyLogo: '/companies/logo3DIDS.webp',
    positions: [
      {
        id: '3dids-2023',
        title: {
          en: 'E-Commerce Backend Developer',
          es: 'Desarrollador Backend de E-Commerce'
        },
        employmentPeriod: {
          start: '2023',
          end: '2025'
        },
        employmentType: 'Full-time',
        icon: 'briefcase',
        description: {
          en: [
            'Engineered custom backend solutions and server-side logic for Shopify e-commerce platforms using Liquid and JavaScript.',
            'Built modular, reusable API endpoints and webhooks integrating Shopify with external systems and business workflows.',
            'Optimized data retrieval and rendering performance for high-traffic e-commerce stores, ensuring sub-second response times.',
            'Developed complex e-commerce features including custom checkout flows, inventory management, and payment processing integrations.',
            'Implemented JavaScript-based automation scripts to streamline data synchronization and operational workflows.',
            'Integrated third-party services and maintained technical documentation for scalable, maintainable solutions.',
            'Used AI tools to optimize code performance and accelerate feature development cycles.'
          ],
          es: [
            'Ingeniería de soluciones backend personalizadas y lógica del lado del servidor para plataformas e-commerce Shopify usando Liquid y JavaScript.',
            'Construcción de endpoints API modulares y reutilizables y webhooks integrando Shopify con sistemas externos y flujos de trabajo empresariales.',
            'Optimización de recuperación de datos y rendimiento de renderizado para tiendas e-commerce de alto tráfico, asegurando tiempos de respuesta sub-segundo.',
            'Desarrollo de características e-commerce complejas incluyendo flujos de checkout personalizados, gestión de inventario e integraciones de procesamiento de pagos.',
            'Implementación de scripts de automatización basados en JavaScript para optimizar sincronización de datos y flujos de trabajo operacionales.',
            'Integración de servicios de terceros y mantenimiento de documentación técnica para soluciones escalables y mantenibles.',
            'Uso de herramientas de IA para optimizar rendimiento de código y acelerar ciclos de desarrollo de características.'
          ]
        },
        skills: [
          'Shopify',
          'Liquid',
          'JavaScript',
          'API Integration',
          'Webhooks',
          'E-Commerce',
          'Data Optimization',
          'Payment Integration',
          'Node.js'
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: 'desoft',
    companyName: 'Desoft',
    isCurrentEmployer: false,
    companyLogo: '/companies/favicon-14.svg',
    positions: [
      {
        id: 'desoft-2022',
        title: {
          en: 'Junior Fullstack Developer',
          es: 'Desarrollador Fullstack Junior'
        },
        employmentPeriod: {
          start: '2022',
          end: '2023'
        },
        employmentType: 'Full-time',
        icon: 'code',
        description: {
          en: [
            'Developed interactive and optimized interfaces using React and TypeScript, with focus on performance and maintainability.',
            'Implemented server-side logic and API integrations to support frontend functionality.',
            'Applied design patterns and software architecture principles to improve code scalability and reusability.',
            'Optimized application performance through bundle analysis, code splitting, and build tool configuration (Webpack, Turbopack).',
            'Maintained and refactored existing web applications, improving code quality and reducing technical debt.',
            'Collaborated with backend engineers to design efficient APIs and data flows for complex features.',
            'Gained foundational knowledge in full-stack development practices and system design.'
          ],
          es: [
            'Desarrollo de interfaces interactivas y optimizadas usando React y TypeScript, con enfoque en rendimiento y mantenibilidad.',
            'Implementación de lógica del lado del servidor e integraciones de API para soportar funcionalidad frontend.',
            'Aplicación de patrones de diseño y principios de arquitectura de software para mejorar escalabilidad y reutilización de código.',
            'Optimización del rendimiento de aplicaciones mediante análisis de bundles, code splitting y configuración de herramientas de construcción (Webpack, Turbopack).',
            'Mantenimiento y refactorización de aplicaciones web existentes, mejorando calidad de código y reduciendo deuda técnica.',
            'Colaboración con ingenieros backend para diseñar APIs eficientes y flujos de datos para características complejas.',
            'Adquisición de conocimiento fundamental en prácticas fullstack y diseño de sistemas.'
          ]
        },
        skills: [
          'React',
          'TypeScript',
          'API Integration',
          'Webpack',
          'Turbopack',
          'Software Architecture',
          'Performance Optimization',
          'Fullstack Development'
        ],
        isExpanded: true
      },
      {
        id: 'desoft-2021',
        title: {
          en: 'Trainee Fullstack Developer',
          es: 'Desarrollador Fullstack en Prácticas'
        },
        employmentPeriod: {
          start: '2021',
          end: '2022'
        },
        employmentType: 'Full-time',
        icon: 'code',
        description: {
          en: [
            'Built responsive user interfaces using React components, hooks, and TypeScript for type safety.',
            'Learned and implemented TypeScript types, interfaces, and generic types for better code maintainability.',
            'Assisted in maintaining production React applications, debugging issues, and implementing bug fixes.',
            'Worked with build tools (Webpack, Turbopack) to understand bundling, module resolution, and performance optimization.',
            'Collaborated with senior developers to learn software architecture patterns and best practices in full-stack development.',
            'Participated in code reviews and gained exposure to API integration and backend workflows.',
            'Developed foundational understanding of the full software development lifecycle.'
          ],
          es: [
            'Construcción de interfaces de usuario responsivas usando componentes React, hooks y TypeScript para seguridad de tipos.',
            'Aprendizaje e implementación de tipos TypeScript, interfaces y tipos genéricos para mejor mantenibilidad de código.',
            'Asistencia en el mantenimiento de aplicaciones React de producción, depuración de problemas e implementación de correcciones.',
            'Trabajo con herramientas de construcción (Webpack, Turbopack) para comprender bundling, resolución de módulos y optimización de rendimiento.',
            'Colaboración con desarrolladores senior para aprender patrones de arquitectura de software y mejores prácticas en desarrollo fullstack.',
            'Participación en revisiones de código y exposición a integración de APIs y flujos de trabajo backend.',
            'Desarrollo de comprensión fundamental del ciclo de vida completo del desarrollo de software.'
          ]
        },
        skills: [
          'React',
          'TypeScript',
          'Webpack',
          'Turbopack',
          'Software Architecture',
          'API Integration',
          'Performance Optimization',
          'Code Review'
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
          en: 'Fullstack Web Developer & Technical Lead',
          es: 'Desarrollador Web Fullstack y Líder Técnico'
        },
        employmentPeriod: {
          start: '2019',
          end: null
        },
        employmentType: 'Freelance',
        icon: 'globe',
        description: {
          en: [
            'Architected and developed custom end-to-end solutions for e-commerce platforms and SaaS applications, from backend infrastructure to client interfaces.',
            'Designed and built scalable Node.js backends, REST APIs, and microservices handling complex business logic and high-volume data processing.',
            'Implemented database design and optimization strategies using MongoDB and Redis, ensuring performance at scale.',
            'Containerized applications with Docker and established CI/CD pipelines for automated, reliable deployments.',
            'Integrated frontend frameworks (React, Next.js) with robust backend systems, ensuring seamless fullstack functionality.',
            'Led technical architecture decisions for client projects, balancing scalability, performance, and business requirements.',
            'Mentored junior developers on backend engineering practices, system design, and code quality standards.',
            'Leveraged AI tools to enhance development efficiency and maintain high standards across projects.'
          ],
          es: [
            'Arquitectura y desarrollo de soluciones end-to-end personalizadas para plataformas e-commerce y aplicaciones SaaS, desde infraestructura backend hasta interfaces de cliente.',
            'Diseño e implementación de backends Node.js escalables, APIs REST y microservicios manejando lógica empresarial compleja y procesamiento de datos de alto volumen.',
            'Implementación de diseño de bases de datos y estrategias de optimización usando MongoDB y Redis, asegurando rendimiento a escala.',
            'Containerización de aplicaciones con Docker y establecimiento de pipelines de CI/CD para despliegues automatizados y confiables.',
            'Integración de frameworks frontend (React, Next.js) con sistemas backend robustos, asegurando funcionalidad fullstack perfecta.',
            'Liderazgo en decisiones de arquitectura técnica para proyectos de clientes, equilibrando escalabilidad, rendimiento y requisitos empresariales.',
            'Mentoría a desarrolladores junior en prácticas de ingeniería backend, diseño de sistemas y estándares de calidad de código.',
            'Uso de herramientas de IA para mejorar eficiencia de desarrollo y mantener altos estándares en proyectos.'
          ]
        },
        skills: [
          'Node.js',
          'Express',
          'React',
          'Next.js',
          'MongoDB',
          'Redis',
          'Docker',
          'CI/CD',
          'API Design',
          'System Architecture',
          'E-Commerce',
          'Performance',
          'Tailwind CSS',
          'TypeScript'
        ],
        isExpanded: true
      }
    ]
  }
]

export const PORTFOLIO_HIGHLIGHTS = {
  en: [
    'Backend-Focused Fullstack Developer with 5+ years experience in API design, microservices, and data architecture',
    'Expert in Node.js, Express, and NestJS; designed and deployed production-grade REST APIs handling high-volume data processing',
    'Database Architecture & Optimization: Experienced with MongoDB schema design, Redis caching strategies, and query optimization for enterprise applications',
    'DevOps & Infrastructure: Containerized applications with Docker, established CI/CD pipelines with GitHub Actions for automated, reliable deployments',
    'Demonstrated AI Integration: Leveraged AI tools in development workflows to accelerate backend development and maintain high code quality standards',
    'Technical Leadership: Led architecture decisions for multiple e-commerce and SaaS platforms; mentored junior developers on backend best practices and system design',
    'Performance-Driven: Optimized API response times, implemented caching strategies, and engineered solutions achieving sub-second latency at scale',
    'Fullstack Capability: Seamlessly integrate robust backend systems with modern frontend frameworks (React, Next.js, Astro) for cohesive end-to-end solutions'
  ],
  es: [
    'Desarrollador Fullstack orientado al Backend con 5+ años de experiencia en diseño de APIs, microservicios y arquitectura de datos',
    'Experto en Node.js, Express y NestJS; diseñó e implementó APIs REST de nivel producción manejando procesamiento de datos de alto volumen',
    'Arquitectura y Optimización de Bases de Datos: Experimentado en diseño de esquemas MongoDB, estrategias de caché Redis y optimización de consultas para aplicaciones empresariales',
    'DevOps e Infraestructura: Containerización de aplicaciones con Docker, establecimiento de pipelines de CI/CD con GitHub Actions para despliegues automatizados y confiables',
    'Integración de IA Demostrada: Aprovechó herramientas de IA en flujos de trabajo de desarrollo para acelerar desarrollo backend y mantener altos estándares de calidad de código',
    'Liderazgo Técnico: Lideró decisiones de arquitectura para múltiples plataformas de e-commerce y SaaS; mentoró a desarrolladores junior en mejores prácticas backend y diseño de sistemas',
    'Impulsado por Rendimiento: Optimizó tiempos de respuesta de API, implementó estrategias de caché e ingeniería de soluciones logrando latencia sub-segundo a escala',
    'Capacidad Fullstack: Integración perfecta de sistemas backend robustos con frameworks frontend modernos (React, Next.js, Astro) para soluciones end-to-end cohesivas'
  ]
}

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

export const GITHUB_CONTRIBUTIONS: Activity[] = [
  {
    date: '2026-01-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-02',
    count: 18,
    level: 4
  },
  {
    date: '2026-01-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-05',
    count: 16,
    level: 4
  },
  {
    date: '2026-01-06',
    count: 1,
    level: 1
  },
  {
    date: '2026-01-07',
    count: 9,
    level: 3
  },
  {
    date: '2026-01-08',
    count: 15,
    level: 4
  },
  {
    date: '2026-01-09',
    count: 8,
    level: 3
  },
  {
    date: '2026-01-10',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-11',
    count: 6,
    level: 2
  },
  {
    date: '2026-01-12',
    count: 19,
    level: 4
  },
  {
    date: '2026-01-13',
    count: 9,
    level: 3
  },
  {
    date: '2026-01-14',
    count: 5,
    level: 2
  },
  {
    date: '2026-01-15',
    count: 9,
    level: 3
  },
  {
    date: '2026-01-16',
    count: 14,
    level: 4
  },
  {
    date: '2026-01-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-18',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-19',
    count: 5,
    level: 2
  },
  {
    date: '2026-01-20',
    count: 14,
    level: 4
  },
  {
    date: '2026-01-21',
    count: 6,
    level: 2
  },
  {
    date: '2026-01-22',
    count: 7,
    level: 3
  },
  {
    date: '2026-01-23',
    count: 2,
    level: 1
  },
  {
    date: '2026-01-24',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-26',
    count: 5,
    level: 2
  },
  {
    date: '2026-01-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-01-28',
    count: 11,
    level: 4
  },
  {
    date: '2026-01-29',
    count: 8,
    level: 3
  },
  {
    date: '2026-01-30',
    count: 2,
    level: 1
  },
  {
    date: '2026-01-31',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-01',
    count: 18,
    level: 4
  },
  {
    date: '2026-02-02',
    count: 30,
    level: 4
  },
  {
    date: '2026-02-03',
    count: 8,
    level: 3
  },
  {
    date: '2026-02-04',
    count: 9,
    level: 3
  },
  {
    date: '2026-02-05',
    count: 12,
    level: 4
  },
  {
    date: '2026-02-06',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-07',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-09',
    count: 2,
    level: 1
  },
  {
    date: '2026-02-10',
    count: 8,
    level: 3
  },
  {
    date: '2026-02-11',
    count: 12,
    level: 4
  },
  {
    date: '2026-02-12',
    count: 6,
    level: 2
  },
  {
    date: '2026-02-13',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-15',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-17',
    count: 8,
    level: 3
  },
  {
    date: '2026-02-18',
    count: 5,
    level: 2
  },
  {
    date: '2026-02-19',
    count: 3,
    level: 1
  },
  {
    date: '2026-02-20',
    count: 1,
    level: 1
  },
  {
    date: '2026-02-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-02-23',
    count: 3,
    level: 1
  },
  {
    date: '2026-02-24',
    count: 25,
    level: 4
  },
  {
    date: '2026-02-25',
    count: 6,
    level: 2
  },
  {
    date: '2026-02-26',
    count: 4,
    level: 2
  },
  {
    date: '2026-02-27',
    count: 10,
    level: 4
  },
  {
    date: '2026-02-28',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-02',
    count: 4,
    level: 2
  },
  {
    date: '2026-03-03',
    count: 10,
    level: 4
  },
  {
    date: '2026-03-04',
    count: 17,
    level: 4
  },
  {
    date: '2026-03-05',
    count: 6,
    level: 2
  },
  {
    date: '2026-03-06',
    count: 9,
    level: 3
  },
  {
    date: '2026-03-07',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-09',
    count: 9,
    level: 3
  },
  {
    date: '2026-03-10',
    count: 22,
    level: 4
  },
  {
    date: '2026-03-11',
    count: 6,
    level: 2
  },
  {
    date: '2026-03-12',
    count: 7,
    level: 3
  },
  {
    date: '2026-03-13',
    count: 26,
    level: 4
  },
  {
    date: '2026-03-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-15',
    count: 1,
    level: 1
  },
  {
    date: '2026-03-16',
    count: 12,
    level: 4
  },
  {
    date: '2026-03-17',
    count: 2,
    level: 1
  },
  {
    date: '2026-03-18',
    count: 14,
    level: 4
  },
  {
    date: '2026-03-19',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-20',
    count: 5,
    level: 2
  },
  {
    date: '2026-03-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-23',
    count: 12,
    level: 4
  },
  {
    date: '2026-03-24',
    count: 8,
    level: 3
  },
  {
    date: '2026-03-25',
    count: 12,
    level: 4
  },
  {
    date: '2026-03-26',
    count: 14,
    level: 4
  },
  {
    date: '2026-03-27',
    count: 7,
    level: 3
  },
  {
    date: '2026-03-28',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-29',
    count: 0,
    level: 0
  },
  {
    date: '2026-03-30',
    count: 14,
    level: 4
  },
  {
    date: '2026-03-31',
    count: 19,
    level: 4
  },
  {
    date: '2026-04-01',
    count: 17,
    level: 4
  },
  {
    date: '2026-04-02',
    count: 18,
    level: 4
  },
  {
    date: '2026-04-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-05',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-06',
    count: 7,
    level: 3
  },
  {
    date: '2026-04-07',
    count: 5,
    level: 2
  },
  {
    date: '2026-04-08',
    count: 5,
    level: 2
  },
  {
    date: '2026-04-09',
    count: 5,
    level: 2
  },
  {
    date: '2026-04-10',
    count: 8,
    level: 3
  },
  {
    date: '2026-04-11',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-12',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-13',
    count: 3,
    level: 1
  },
  {
    date: '2026-04-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-15',
    count: 2,
    level: 1
  },
  {
    date: '2026-04-16',
    count: 5,
    level: 2
  },
  {
    date: '2026-04-17',
    count: 1,
    level: 1
  },
  {
    date: '2026-04-18',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-19',
    count: 18,
    level: 4
  },
  {
    date: '2026-04-20',
    count: 23,
    level: 4
  },
  {
    date: '2026-04-21',
    count: 50,
    level: 4
  },
  {
    date: '2026-04-22',
    count: 21,
    level: 4
  },
  {
    date: '2026-04-23',
    count: 15,
    level: 4
  },
  {
    date: '2026-04-24',
    count: 10,
    level: 4
  },
  {
    date: '2026-04-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-26',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-04-28',
    count: 19,
    level: 4
  },
  {
    date: '2026-04-29',
    count: 9,
    level: 3
  },
  {
    date: '2026-04-30',
    count: 38,
    level: 4
  },
  {
    date: '2026-05-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-02',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-04',
    count: 58,
    level: 4
  },
  {
    date: '2026-05-05',
    count: 46,
    level: 4
  },
  {
    date: '2026-05-06',
    count: 38,
    level: 4
  },
  {
    date: '2026-05-07',
    count: 31,
    level: 4
  },
  {
    date: '2026-05-08',
    count: 10,
    level: 4
  },
  {
    date: '2026-05-09',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-10',
    count: 1,
    level: 1
  },
  {
    date: '2026-05-11',
    count: 78,
    level: 4
  },
  {
    date: '2026-05-12',
    count: 33,
    level: 4
  },
  {
    date: '2026-05-13',
    count: 35,
    level: 4
  },
  {
    date: '2026-05-14',
    count: 14,
    level: 4
  },
  {
    date: '2026-05-15',
    count: 4,
    level: 2
  },
  {
    date: '2026-05-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-18',
    count: 16,
    level: 4
  },
  {
    date: '2026-05-19',
    count: 13,
    level: 4
  },
  {
    date: '2026-05-20',
    count: 3,
    level: 1
  },
  {
    date: '2026-05-21',
    count: 1,
    level: 1
  },
  {
    date: '2026-05-22',
    count: 23,
    level: 4
  },
  {
    date: '2026-05-23',
    count: 6,
    level: 2
  },
  {
    date: '2026-05-24',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-25',
    count: 1,
    level: 1
  },
  {
    date: '2026-05-26',
    count: 32,
    level: 4
  },
  {
    date: '2026-05-27',
    count: 30,
    level: 4
  },
  {
    date: '2026-05-28',
    count: 11,
    level: 4
  },
  {
    date: '2026-05-29',
    count: 30,
    level: 4
  },
  {
    date: '2026-05-30',
    count: 0,
    level: 0
  },
  {
    date: '2026-05-31',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-02',
    count: 16,
    level: 4
  },
  {
    date: '2026-06-03',
    count: 2,
    level: 1
  },
  {
    date: '2026-06-04',
    count: 27,
    level: 4
  },
  {
    date: '2026-06-05',
    count: 11,
    level: 4
  },
  {
    date: '2026-06-06',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-07',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-08',
    count: 9,
    level: 3
  },
  {
    date: '2026-06-09',
    count: 20,
    level: 4
  },
  {
    date: '2026-06-10',
    count: 29,
    level: 4
  },
  {
    date: '2026-06-11',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-12',
    count: 21,
    level: 4
  },
  {
    date: '2026-06-13',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-14',
    count: 15,
    level: 4
  },
  {
    date: '2026-06-15',
    count: 24,
    level: 4
  },
  {
    date: '2026-06-16',
    count: 18,
    level: 4
  },
  {
    date: '2026-06-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-18',
    count: 21,
    level: 4
  },
  {
    date: '2026-06-19',
    count: 16,
    level: 4
  },
  {
    date: '2026-06-20',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-23',
    count: 37,
    level: 4
  },
  {
    date: '2026-06-24',
    count: 21,
    level: 4
  },
  {
    date: '2026-06-25',
    count: 46,
    level: 4
  },
  {
    date: '2026-06-26',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-06-28',
    count: 19,
    level: 4
  },
  {
    date: '2026-06-29',
    count: 20,
    level: 4
  },
  {
    date: '2026-06-30',
    count: 27,
    level: 4
  },
  {
    date: '2026-07-01',
    count: 32,
    level: 4
  },
  {
    date: '2026-07-02',
    count: 18,
    level: 4
  },
  {
    date: '2026-07-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-05',
    count: 14,
    level: 4
  },
  {
    date: '2026-07-06',
    count: 77,
    level: 4
  },
  {
    date: '2026-07-07',
    count: 33,
    level: 4
  },
  {
    date: '2026-07-08',
    count: 35,
    level: 4
  },
  {
    date: '2026-07-09',
    count: 23,
    level: 4
  },
  {
    date: '2026-07-10',
    count: 35,
    level: 4
  },
  {
    date: '2026-07-11',
    count: 18,
    level: 4
  },
  {
    date: '2026-07-12',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-13',
    count: 2,
    level: 1
  },
  {
    date: '2026-07-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-15',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-17',
    count: 15,
    level: 4
  },
  {
    date: '2026-07-18',
    count: 3,
    level: 1
  },
  {
    date: '2026-07-19',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-20',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-21',
    count: 16,
    level: 4
  },
  {
    date: '2026-07-22',
    count: 22,
    level: 4
  },
  {
    date: '2026-07-23',
    count: 19,
    level: 4
  },
  {
    date: '2026-07-24',
    count: 38,
    level: 4
  },
  {
    date: '2026-07-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-07-26',
    count: 4,
    level: 2
  },
  {
    date: '2026-07-27',
    count: 41,
    level: 4
  },
  {
    date: '2026-07-28',
    count: 45,
    level: 4
  },
  {
    date: '2026-07-29',
    count: 64,
    level: 4
  },
  {
    date: '2026-07-30',
    count: 27,
    level: 4
  },
  {
    date: '2026-07-31',
    count: 27,
    level: 4
  },
  {
    date: '2026-08-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-08-02',
    count: 8,
    level: 3
  },
  {
    date: '2026-08-03',
    count: 11,
    level: 4
  },
  {
    date: '2026-08-04',
    count: 30,
    level: 4
  },
  {
    date: '2026-08-05',
    count: 25,
    level: 4
  },
  {
    date: '2026-08-06',
    count: 14,
    level: 4
  },
  {
    date: '2026-08-07',
    count: 19,
    level: 4
  },
  {
    date: '2026-08-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-08-09',
    count: 1,
    level: 1
  },
  {
    date: '2026-08-10',
    count: 28,
    level: 4
  },
  {
    date: '2026-08-11',
    count: 42,
    level: 4
  },
  {
    date: '2026-08-12',
    count: 114,
    level: 4
  },
  {
    date: '2026-08-13',
    count: 44,
    level: 4
  },
  {
    date: '2026-08-14',
    count: 62,
    level: 4
  },
  {
    date: '2026-08-15',
    count: 8,
    level: 3
  },
  {
    date: '2026-08-16',
    count: 16,
    level: 4
  },
  {
    date: '2026-08-17',
    count: 53,
    level: 4
  },
  {
    date: '2026-08-18',
    count: 184,
    level: 4
  },
  {
    date: '2026-08-19',
    count: 40,
    level: 4
  },
  {
    date: '2026-08-20',
    count: 55,
    level: 4
  },
  {
    date: '2026-08-21',
    count: 28,
    level: 4
  },
  {
    date: '2026-08-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-08-23',
    count: 0,
    level: 0
  },
  {
    date: '2026-08-24',
    count: 67,
    level: 4
  },
  {
    date: '2026-08-25',
    count: 91,
    level: 4
  },
  {
    date: '2026-08-26',
    count: 84,
    level: 4
  },
  {
    date: '2026-08-27',
    count: 65,
    level: 4
  },
  {
    date: '2026-08-28',
    count: 25,
    level: 4
  },
  {
    date: '2026-08-29',
    count: 0,
    level: 0
  },
  {
    date: '2026-08-30',
    count: 2,
    level: 1
  },
  {
    date: '2026-08-31',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-02',
    count: 23,
    level: 4
  },
  {
    date: '2026-09-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-05',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-06',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-07',
    count: 47,
    level: 4
  },
  {
    date: '2026-09-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-09',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-10',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-11',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-12',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-13',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-15',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-18',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-19',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-20',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-23',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-24',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-26',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-28',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-29',
    count: 0,
    level: 0
  },
  {
    date: '2026-09-30',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-02',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-05',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-06',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-07',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-09',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-10',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-11',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-12',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-13',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-15',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-18',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-19',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-20',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-23',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-24',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-26',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-28',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-29',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-30',
    count: 0,
    level: 0
  },
  {
    date: '2026-10-31',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-02',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-05',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-06',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-07',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-09',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-10',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-11',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-12',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-13',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-15',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-18',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-19',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-20',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-23',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-24',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-26',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-28',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-29',
    count: 0,
    level: 0
  },
  {
    date: '2026-11-30',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-01',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-02',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-03',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-04',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-05',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-06',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-07',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-08',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-09',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-10',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-11',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-12',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-13',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-14',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-15',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-16',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-17',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-18',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-19',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-20',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-21',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-22',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-23',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-24',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-25',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-26',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-27',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-28',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-29',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-30',
    count: 0,
    level: 0
  },
  {
    date: '2026-12-31',
    count: 0,
    level: 0
  }
]
