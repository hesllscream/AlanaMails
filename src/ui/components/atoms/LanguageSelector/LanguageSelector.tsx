/**
 * LanguageSelector - Componente de selección de idioma
 * Dropdown estilizado con banderas - Posición fija en esquina
 */

import { createSignal, onMount, Show } from 'solid-js';

type Language = 'es' | 'en' | 'pt';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [currentLang, setCurrentLang] = createSignal<Language>('es');

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  onMount(() => {
    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(c => c.trim().startsWith('alana-lang='));
    if (langCookie) {
      const value = langCookie.split('=')[1] as Language;
      if (value === 'es' || value === 'en' || value === 'pt') {
        setCurrentLang(value);
      }
    }
  });

  const getCurrentFlag = () => {
    const flags: Record<Language, string> = { es: '🇪🇸', en: '🇺🇸', pt: '🇧🇷' };
    return flags[currentLang()];
  };

  const handleSelect = (lang: Language) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `alana-lang=${lang};expires=${expires.toUTCString()};path=/`;
    
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Aplicar traducciones sin recargar
    if ((window as any).applyLanguage) {
      (window as any).applyLanguage(lang);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div class="language-selector absolute top-4 right-4 z-50">
      {/* Botón principal */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen());
        }}
        class="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-cr-base/90 backdrop-blur-xl hover:border-cr-pink/50 hover:bg-cr-card/80 transition-all duration-300 shadow-lg shadow-black/30"
        aria-label="Cambiar idioma"
      >
        <span class="text-lg">{getCurrentFlag()}</span>
        <svg 
          class={`w-3 h-3 text-cr-muted transition-all duration-300 ${isOpen() ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown - aparece debajo del botón */}
      <Show when={isOpen()}>
        <div class="absolute right-0 top-full mt-2 py-1 bg-cr-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 min-w-[140px] overflow-hidden">
          {languages.map((lang) => (
            <button
              onClick={() => handleSelect(lang.code)}
              class={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                currentLang() === lang.code
                  ? 'bg-cr-pink/20 text-cr-pink'
                  : 'text-cr-muted hover:bg-white/5 hover:text-cr-text'
              }`}
            >
              <span class="text-base">{lang.flag}</span>
              <span class="font-medium">{lang.name}</span>
              <Show when={currentLang() === lang.code}>
                <svg class="w-4 h-4 ml-auto text-cr-pink" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </Show>
            </button>
          ))}
        </div>
      </Show>
    </div>
  );
}
