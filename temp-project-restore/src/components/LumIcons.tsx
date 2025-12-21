export function LumLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center shadow-lg relative overflow-hidden`}>
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
      
      {/* Logo - Estrela estilizada representando "Lum" (luz) */}
      <svg 
        className="w-[60%] h-[60%] text-white relative z-10" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="currentColor"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );
}

export function LumAvatar({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center shadow-md relative overflow-hidden`}>
      {/* Efeito de brilho sutil */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
      
      {/* Avatar - Estrela menor */}
      <svg 
        className="w-[55%] h-[55%] text-white relative z-10" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

// Ícones customizados para o menu
export function WorkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H16V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7ZM10 5H14V7H10V5ZM20 19H4V9H20V19Z" fill="currentColor"/>
      <circle cx="12" cy="14" r="2" fill="currentColor"/>
    </svg>
  );
}

export function RelationshipIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor"/>
    </svg>
  );
}

export function FamilyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
    </svg>
  );
}

export function StudyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="currentColor"/>
    </svg>
  );
}

export function PersonalIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
    </svg>
  );
}

export function DecisionIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2V6.17C10.35 6.58 9.85 7.17 9.53 7.88L6.17 6.35L4.17 9.65L7.53 11.18C7.51 11.45 7.5 11.72 7.5 12C7.5 12.28 7.51 12.55 7.53 12.82L4.17 14.35L6.17 17.65L9.53 16.12C9.85 16.83 10.35 17.42 11 17.83V22H13V17.83C13.65 17.42 14.15 16.83 14.47 16.12L17.83 17.65L19.83 14.35L16.47 12.82C16.49 12.55 16.5 12.28 16.5 12C16.5 11.72 16.49 11.45 16.47 11.18L19.83 9.65L17.83 6.35L14.47 7.88C14.15 7.17 13.65 6.58 13 6.17V2H11ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z" fill="currentColor"/>
    </svg>
  );
}

export function QuizIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3C9.23 3 6.19 5.95 6 9.66L4.08 12.19C3.84 12.5 4.08 13 4.5 13H6V16C6 17.11 6.89 18 8 18H9V21H15V16.31C17.37 15.19 19 12.8 19 10C19 6.13 15.87 3 12 3H13ZM12 5C14.76 5 17 7.24 17 10C17 12.76 14.76 15 12 15C9.24 15 7 12.76 7 10C7 7.24 9.24 5 12 5ZM11 7V13H13V7H11ZM11 15V17H13V15H11Z" fill="currentColor"/>
    </svg>
  );
}

export function HomeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
    </svg>
  );
}
