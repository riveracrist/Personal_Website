/**
 * Contenido del sitio.
 *
 * Toda la información proviene del sitio Hugo original (config.yaml, README.md
 * y content/blogs). Para actualizar el sitio basta con editar este archivo.
 */

export const site = {
  name: "Cristian Rivera G.",
  shortName: "Cristian Rivera",
  initials: "CR",
  url: "https://cristianriverag.netlify.app",
  locale: "es_CO",
  title: "Cristian Rivera G. — Telecomunicaciones, Software y Datos",
  description:
    "Sitio personal de Cristian Rivera G.: aprendiz de Ingeniería de Telecomunicaciones y de Análisis y Desarrollo de Software, con interés en ciencia de datos, R, Python, SQL y electrónica.",
  role: "Telecomunicaciones · Software · Datos",
  headline: "Tecnología, datos y curiosidad",
  intro:
    "Este espacio está destinado a compartir mis intereses en tecnología, innovación y otros temas que despiertan mi curiosidad.",
};

export const social = [
  { label: "GitHub", handle: "riveracrist", url: "https://github.com/riveracrist", icon: "github" },
  { label: "X (Twitter)", handle: "@CrGoo7", url: "https://x.com/CrGoo7", icon: "x" },
] as const;

export const about = {
  paragraphs: [
    "Aprendiz de Ingeniería en Telecomunicaciones y aprendiz de Análisis y Desarrollo de Software, con una curiosidad por la ciencia de datos y las tecnologías de la información y las comunicaciones (TIC).",
    "Tengo un interés particular en el aprendizaje de lenguajes de programación como R y Python, debido a su aplicabilidad en el análisis y visualización de información. Deseo adquirir un conocimiento sólido en la gestión de bases de datos utilizando SQL, comprender cómo se estructuran, almacenan y consultan los datos de forma eficiente.",
    "Paralelamente, me motiva explorar el campo de la electrónica, donde utilizo plataformas como Arduino y Raspberry Pi para comprender los principios básicos del hardware, su conexión con el desarrollo de soluciones tecnológicas y la automatización.",
  ],
  focus: [
    {
      title: "Análisis y visualización",
      text: "R y Python para analizar y visualizar información.",
      icon: "chart",
    },
    {
      title: "Bases de datos",
      text: "SQL para estructurar, almacenar y consultar datos de forma eficiente.",
      icon: "database",
    },
    {
      title: "Electrónica y automatización",
      text: "Arduino y Raspberry Pi para conectar hardware y software.",
      icon: "cpu",
    },
  ],
  interests: [
    "Aprendizaje Automático",
    "Astronomía",
    "Automatización",
    "Computación en la nube",
    "Estadística",
    "Historia",
    "Inteligencia Artificial",
    "Mascotas",
    "Música",
    "Video Juegos",
  ],
};

/** Competencias técnicas mencionadas en el README original y en los proyectos/cursos. */
export const skills = [
  { group: "Lenguajes", icon: "code", items: ["Python", "R", "C++", "SQL"] },
  {
    group: "Datos y visualización",
    icon: "chart",
    items: ["Shiny", "shinydashboard", "Flexdashboard", "ggplot2", "Power BI", "Scrapy", "Databricks"],
  },
  { group: "Bases de datos", icon: "database", items: ["MySQL", "Diseño de bases de datos", "SQL"] },
  { group: "Nube", icon: "cloud", items: ["Google Cloud", "Kubernetes (GKE)", "Arquitectura en la nube"] },
  { group: "Hardware", icon: "cpu", items: ["Arduino", "Raspberry Pi", "Circuitos"] },
  { group: "Herramientas", icon: "wrench", items: ["Git", "Quarto", "Markdown", "R Markdown", "learnr"] },
] as const;

/** Roles de liderazgo y apoyo registrados como actividades extracurriculares. */
export const experience = [
  {
    role: "Representante de aprendices — modalidad virtual",
    org: "SENA, Centro Agroempresarial y Minero (Regional Bolívar)",
    detail:
      "Participación en el Encuentro Zonal de Liderazgo 2024 (Neiva, Huila) y en la Cumbre de Representantes de Aprendices 2025 (Quibdó, Chocó).",
  },
  {
    role: "Vocero de la ficha ADSO",
    org: "SENA — Tecnología en Análisis y Desarrollo de Software",
    detail: "Vocería del grupo de formación de la tecnología ADSO.",
  },
  {
    role: "Auxiliar de Docencia — Laboratorio de Geotecnia y Pavimentos",
    org: "Universidad Nacional de Colombia, Medellín",
    detail: "Apoyo a la docencia en el laboratorio.",
  },
  {
    role: "Auxiliar Administrativo",
    org: "Universidad Nacional de Colombia, Medellín",
    detail: "Apoyo en labores administrativas.",
  },
  {
    role: "Integrante del Semillero en Ciencia de Datos R y Python",
    org: "Universidad Nacional de Colombia, Medellín",
    detail: "Semillero de investigación orientado a la ciencia de datos con R y Python.",
    url: "https://semillerorpy.netlify.app/",
  },
];

export const education = [
  {
    title: "Ingeniería de Telecomunicaciones",
    school: "Universidad de Antioquia, Medellín",
    url: "https://www.udea.edu.co/",
    date: "2024 — En curso",
    status: "current",
    activities: [
      "Master class Power BI Microsoft — Intelligent Training.",
      "Master class Tu Carrera en la Nube — MinTIC, Google.",
      "Taller Aulas de Innovación — Facultad de Ingeniería, Comisión de Regulación de Comunicaciones.",
    ],
  },
  {
    title: "Tecnología en Análisis y Desarrollo de Software (ADSO)",
    school: "Centro Agroempresarial y Minero — SENA, Regional Bolívar",
    url: "https://www.sena.edu.co/es-co/Paginas/default.aspx",
    date: "2023 — 2026",
    status: "current",
    activities: [
      "Vocero de la ficha de ADSO.",
      "Representante de aprendices modalidad virtual.",
      "Encuentro Zonal de liderazgo 2024. Neiva, Huila.",
      "Cumbre de Representantes de Aprendices 2025. Quibdó, Chocó.",
    ],
  },
  {
    title: "Ingeniería de Control",
    school: "Universidad Nacional de Colombia, Medellín",
    url: "https://unal.edu.co/",
    date: "2015 — No completado",
    status: "past",
    activities: [
      "Auxiliar de Docencia Laboratorio de Geotecnia y Pavimentos.",
      "Auxiliar Administrativo.",
      "Semillero en Ciencia de Datos R y Python.",
    ],
  },
];

export type Certification = {
  provider: string;
  url: string;
  courses: { name: string; url?: string }[];
  badges: { src: string; alt: string }[];
};

export const certifications: Certification[] = [
  {
    provider: "Coursera — Google",
    url: "https://www.coursera.org/",
    courses: [
      {
        name: "Google Cloud Fundamentals: Core Infrastructure",
        url: "https://www.coursera.org/account/accomplishments/verify/K34OW9CJ58MP",
      },
      {
        name: "Architecting with Google Kubernetes Engine",
        url: "https://www.coursera.org/account/accomplishments/verify/6X8ZTZISL4HQ",
      },
      { name: "Data Analysis with R Programming", url: "https://coursera.org/share/519a1b54037a183c80b2450cf99e5a80" },
      { name: "Google AI Essentials", url: "https://coursera.org/verify/specialization/W9VKFAJ5GHS8" },
      {
        name: "Google Prompting Essentials",
        url: "https://www.coursera.org/account/accomplishments/specialization/XIU1CJ07CU3V",
      },
    ],
    badges: [
      { src: "/images/badges/coursera.webp", alt: "Insignia de Coursera" },
      { src: "/images/badges/kubernetes-gke.webp", alt: "Insignia Architecting with Google Kubernetes Engine" },
      { src: "/images/badges/google-ai-essentials.webp", alt: "Insignia Google AI Essentials" },
      { src: "/images/badges/google-prompting-essentials.webp", alt: "Insignia Google Prompting Essentials" },
    ],
  },
  {
    provider: "Cisco Networking Academy",
    url: "https://www.netacad.com/",
    courses: [
      { name: "Python Essentials 1", url: "https://www.netacad.com/courses/python-essentials-1?courseLang=en-US" },
      { name: "Python Essentials 2", url: "https://www.netacad.com/courses/python-essentials-2?courseLang=en-US" },
    ],
    badges: [
      { src: "/images/badges/python-essentials-1.webp", alt: "Insignia Python Essentials 1" },
      { src: "/images/badges/python-essentials-2.webp", alt: "Insignia Python Essentials 2" },
    ],
  },
  {
    provider: "Oracle Academy",
    url: "https://academy.oracle.com/",
    courses: [
      {
        name: "Database Design",
        url: "https://academy.oracle.com/pages/coursedescription/Oracle%20Academy%20Database%20Design%20Course%20Description.pdf",
      },
    ],
    badges: [{ src: "/images/badges/oracle.webp", alt: "Insignia Oracle Academy" }],
  },
  {
    provider: "SENA — Desarrollo de Software",
    url: "https://www.sena.edu.co/es-co/Paginas/default.aspx",
    courses: [
      { name: "Bases de Datos: generalidades y sistemas de gestión" },
      { name: "Construcción de Bases de Datos con MySQL" },
      { name: "Variables y Estructuras de Control en Python" },
      { name: "Análisis Exploratorio de Datos con Python" },
      { name: "Estructura del Lenguaje de Programación C++ (Nivel I)" },
    ],
    badges: [],
  },
  {
    provider: "MinTIC — Nube y Power BI",
    url: "https://www.mintic.gov.co/",
    courses: [{ name: "Bootcamp — Arquitectura en la nube (básico)" }, { name: "Introducción a Power BI" }],
    badges: [],
  },
];

export const projects = [
  {
    title: "Tablero de control — Call Center",
    description:
      "Dashboard interactivo en R (Shiny y shinydashboard) para monitorear el rendimiento diario y evaluar métricas clave de representantes de servicio al cliente, incluyendo desempeño individual y elegibilidad para comisiones.",
    image: "/images/projects/tablero-call-center.webp",
    url: "https://m8juuc-riveracrist.shinyapps.io/CallCenterMonitor/",
    tags: ["R", "Shiny", "Dashboard"],
    featured: true,
  },
  {
    title: "Calculadora de código de colores de resistores",
    description:
      "App alojada en Shiny Apps y creada con el paquete shinydashboard de R, que permite calcular el código de colores y el valor de resistencia de un resistor.",
    image: "/images/projects/calculadora-resistores.webp",
    url: "https://m8juuc-riveracrist.shinyapps.io/calculadora_resistores/",
    tags: ["R", "Shinydashboard", "Circuitos"],
    featured: false,
  },
  {
    title: "Sitio Web ADSO",
    description:
      "Página web creada con Quarto para la tecnología de Análisis y Desarrollo de Software del SENA.",
    image: "/images/projects/sitio-web-adso.webp",
    url: "https://riveracrist.github.io/",
    tags: ["Quarto", "Markdown"],
    featured: false,
  },
  {
    title: "Tablero de datos con Arduino",
    description: "Tablero de datos que visualiza los datos capturados con sensores programados con Arduino.",
    image: "/images/projects/tablero-arduino.webp",
    url: "https://rpubs.com/Semilla_389/1138902",
    tags: ["Arduino", "Flexdashboard", "R"],
    featured: false,
  },
  {
    title: "R + RStudio + MySQL",
    description:
      "Documento Markdown que muestra cómo conectarse a una base de datos MySQL desde RStudio para realizar consultas y gráficos.",
    image: "/images/projects/r-mysql.webp",
    url: "https://rpubs.com/Semilla_389/1069870",
    tags: ["MySQL", "ggplot2", "Markdown"],
    featured: false,
  },
  {
    title: "Cuestionario interactivo con learnr",
    description:
      "Ejemplo de cuestionario con el paquete learnr de R: herramienta para crear tutoriales interactivos o cuestionarios que se pueden publicar en shinyapps.",
    image: "/images/projects/learnr.webp",
    url: "https://m8juuc-riveracrist.shinyapps.io/Circuitos/",
    tags: ["R", "learnr", "Educación"],
    featured: false,
  },
];

export const nav = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "formacion", label: "Formación" },
  { id: "experiencia", label: "Experiencia" },
  { id: "publicaciones", label: "Publicaciones" },
  { id: "contacto", label: "Contacto" },
];
