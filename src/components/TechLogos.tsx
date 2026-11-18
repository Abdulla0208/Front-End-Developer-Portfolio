interface TechLogoProps {
  id: string;
  className?: string;
}

export function TechLogo({ id, className = 'h-7 w-7' }: TechLogoProps) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="2.6" fill="currentColor" />
          <ellipse
            cx="16"
            cy="16"
            rx="12.5"
            ry="4.8"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12.5"
            ry="4.8"
            transform="rotate(60 16 16)"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12.5"
            ry="4.8"
            transform="rotate(120 16 16)"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );

    case 'nextjs':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M11.5 21.5V10.5L23 24.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 10.5V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M8.5 14.5H15.5M12 14.5V23.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22.8 15.2C21.8 14.4 20.1 14.2 19 14.9C17.9 15.6 18 17.2 19.3 17.9L21.7 19C23.1 19.7 23.2 21.6 21.9 22.6C20.6 23.5 18.6 23.3 17.5 22.3"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M14 14V21.5C14 23 12.8 23.8 11.4 23.5C10.5 23.3 9.9 22.8 9.5 22"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d="M22.5 15.2C21.6 14.4 19.9 14.2 18.9 14.9C17.8 15.6 17.9 17.2 19.2 17.9L21.4 19C22.8 19.7 22.9 21.6 21.6 22.6C20.4 23.5 18.5 23.3 17.4 22.3"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'tailwind':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M9.5 13.5C10.8 10.2 13.1 8.8 16.5 9.2C18.5 9.4 19.8 10.8 21.2 12.1C22.4 13.3 23.8 14.3 25.8 13.6C24.5 16.9 22.2 18.3 18.8 17.9C16.8 17.7 15.5 16.3 14.1 15C12.9 13.8 11.5 12.8 9.5 13.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 20.5C6.8 17.2 9.1 15.8 12.5 16.2C14.5 16.4 15.8 17.8 17.2 19.1C18.4 20.3 19.8 21.3 21.8 20.6C20.5 23.9 18.2 25.3 14.8 24.9C12.8 24.7 11.5 23.3 10.1 22C8.9 20.8 7.5 19.8 5.5 20.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'html5':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 4.5H26L24.1 24.2L16 27.5L7.9 24.2L6 4.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M21 10.5H11.2L11.7 15.5H20.4L19.8 21L16 22.2L12.2 21L11.9 18.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'css3':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 4.5H26L24.1 24.2L16 27.5L7.9 24.2L6 4.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M10.8 10.5H21.2L20.5 15.5H13.5M20.5 15.5L19.8 21L16 22.2L12.2 21L11.9 18.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'router':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="8.5" cy="10" r="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="23.5" cy="10" r="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="23" r="3" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M11.5 10H20.5M10.2 12.6L14.5 20.3M21.8 12.6L17.5 20.3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M27.5 7.2L16.6 26.8C16.3 27.3 15.7 27.3 15.4 26.8L4.5 7.2C4.2 6.6 4.7 5.9 5.3 6.1L16 8.8L26.7 6.1C27.3 5.9 27.8 6.6 27.5 7.2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 8.5L13.5 16H17.5L14.5 22.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="10" cy="8.5" r="2.75" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="10" cy="23.5" r="2.75" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="22" cy="14" r="2.75" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M10 11.25V20.75M10 17C10 14.5 12 14 19.25 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'rest':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M10.5 9L5.5 16L10.5 23M21.5 9L26.5 16L21.5 23"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 8L14 24"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'python':
    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M16 5.5C11.5 5.5 11.5 7.5 11.5 9.8V12.5H16.5V13.8H9.2C6.8 13.8 5.5 15.6 5.5 18.5C5.5 21.4 6.8 23 9.2 23H11.5V20.2C11.5 18 13.3 16.5 15.8 16.5H20.5C22.2 16.5 23.2 15.3 23.2 13.5V9.5C23.2 7.2 20.5 5.5 16 5.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M16 26.5C20.5 26.5 20.5 24.5 20.5 22.2V19.5H15.5V18.2H22.8C25.2 18.2 26.5 16.4 26.5 13.5C26.5 10.6 25.2 9 22.8 9H20.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="9" r="1" fill="currentColor" />
          <circle cx="18" cy="23" r="1" fill="currentColor" />
        </svg>
      );
  }
}
