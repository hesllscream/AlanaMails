/**
 * LiveChatComparison - Chat dinámico con animación de escritura
 * Muestra comparación Sin Alana vs Con Alana con mensajes animados
 */
import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';

interface Message {
  id: number;
  type: 'them' | 'alana' | 'success';
  text: string;
  time?: string;
}

type Lang = 'es' | 'en' | 'pt';

const conversationsI18n = {
  es: [
    {
      fanMessage: "Hola bb, quiero verte...",
      fanTime: "3:02 AM",
      alanaResponse: "Mmm, justo pensaba en ti. ¿Quieres ver lo que llevo puesto? 😈",
      alanaTime: "3:02 AM (Instantáneo)",
      fanReply: "SÍ, manda ya.",
      fanReplyTime: "3:03 AM",
      sale: "$50"
    },
    {
      fanMessage: "Reina, te extraño... ¿estás por ahí?",
      fanTime: "2:15 AM",
      alanaResponse: "Hola amor, justo pensaba en ti. ¿Quieres ver algo exclusivo?",
      alanaTime: "2:15 AM (Instantáneo)",
      fanReply: "Sí por favor! 🔥",
      fanReplyTime: "2:16 AM",
      sale: "$75"
    },
    {
      fanMessage: "Hola preciosa, ¿tienes algo nuevo?",
      fanTime: "11:30 PM",
      alanaResponse: "Tengo algo muy especial que grabé pensando en ti... ¿Te cuento más?",
      alanaTime: "11:30 PM (Instantáneo)",
      fanReply: "Dale, mándalo todo!",
      fanReplyTime: "11:31 PM",
      sale: "$100"
    }
  ],
  en: [
    {
      fanMessage: "Hey bb, I wanna see you...",
      fanTime: "3:02 AM",
      alanaResponse: "Mmm, I was just thinking about you. Wanna see what I'm wearing? 😈",
      alanaTime: "3:02 AM (Instant)",
      fanReply: "YES, send it now.",
      fanReplyTime: "3:03 AM",
      sale: "$50"
    },
    {
      fanMessage: "Queen, I miss you... are you there?",
      fanTime: "2:15 AM",
      alanaResponse: "Hey babe, I was just thinking about you. Want to see something exclusive?",
      alanaTime: "2:15 AM (Instant)",
      fanReply: "Yes please! 🔥",
      fanReplyTime: "2:16 AM",
      sale: "$75"
    },
    {
      fanMessage: "Hey gorgeous, got anything new?",
      fanTime: "11:30 PM",
      alanaResponse: "I have something very special I recorded thinking of you... Want me to tell you more?",
      alanaTime: "11:30 PM (Instant)",
      fanReply: "Go ahead, send it all!",
      fanReplyTime: "11:31 PM",
      sale: "$100"
    }
  ],
  pt: [
    {
      fanMessage: "Oi bb, quero te ver...",
      fanTime: "3:02 AM",
      alanaResponse: "Mmm, estava pensando em você. Quer ver o que estou vestindo? 😈",
      alanaTime: "3:02 AM (Instantâneo)",
      fanReply: "SIM, manda agora.",
      fanReplyTime: "3:03 AM",
      sale: "$50"
    },
    {
      fanMessage: "Rainha, sinto sua falta... tá aí?",
      fanTime: "2:15 AM",
      alanaResponse: "Oi amor, estava pensando em você. Quer ver algo exclusivo?",
      alanaTime: "2:15 AM (Instantâneo)",
      fanReply: "Sim por favor! 🔥",
      fanReplyTime: "2:16 AM",
      sale: "$75"
    },
    {
      fanMessage: "Oi linda, tem algo novo?",
      fanTime: "11:30 PM",
      alanaResponse: "Tenho algo muito especial que gravei pensando em você... Quer saber mais?",
      alanaTime: "11:30 PM (Instantâneo)",
      fanReply: "Manda tudo!",
      fanReplyTime: "11:31 PM",
      sale: "$100"
    }
  ]
};

function getCurrentLang(): Lang {
  if (typeof document !== 'undefined') {
    const lang = document.documentElement.dataset.lang;
    if (lang === 'en' || lang === 'pt') return lang;
  }
  return 'es';
}

// Inline styles for the component
const styles = `
  .comparison-wrapper {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .comparison-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .phone-screen {
    background: rgba(26, 16, 37, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(196, 181, 253, 0.15);
    border-radius: 1.5rem;
    width: 100%;
    max-width: 320px;
    padding: 0.75rem;
    position: relative;
    transition: all 0.4s ease;
  }

  .phone-without {
    opacity: 0.7;
    transform: scale(0.95);
  }

  .phone-without:hover {
    opacity: 0.85;
  }

  .phone-with {
    border-color: rgba(236, 72, 153, 0.4);
    box-shadow: 0 0 40px rgba(236, 72, 153, 0.15), 0 10px 30px rgba(0, 0, 0, 0.3);
    transform: scale(1.02);
    z-index: 2;
  }

  .phone-notch {
    width: 80px;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    margin: 0 auto 0.75rem;
  }

  .phone-notch-active {
    background: linear-gradient(90deg, rgba(236, 72, 153, 0.5), rgba(168, 85, 247, 0.5));
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .chat-header-muted {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(196, 181, 253, 0.5);
  }

  .chat-header-active {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2));
    color: #ec4899;
    border: 1px solid rgba(236, 72, 153, 0.3);
  }

  .header-icon {
    font-size: 1rem;
  }

  .live-indicator {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    margin-left: auto;
    animation: pulse-live 2s ease-in-out infinite;
  }

  @keyframes pulse-live {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
    50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0); }
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 180px;
    padding: 0.5rem;
  }

  .msg {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    line-height: 1.4;
    max-width: 90%;
    position: relative;
  }

  .msg-text {
    display: block;
  }

  .time-tag {
    display: block;
    font-size: 0.6rem;
    opacity: 0.6;
    margin-top: 0.375rem;
  }

  .msg-them {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
    border-bottom-left-radius: 0.25rem;
    align-self: flex-start;
  }

  .msg-me {
    background: rgba(196, 181, 253, 0.15);
    color: rgba(196, 181, 253, 0.7);
    border-bottom-right-radius: 0.25rem;
    align-self: flex-end;
    text-align: right;
  }

  .msg-alana {
    background: linear-gradient(135deg, #ec4899, #a855f7);
    color: white;
    border-bottom-right-radius: 0.25rem;
    align-self: flex-end;
    text-align: right;
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
  }

  .msg-alana .time-tag {
    color: rgba(255, 255, 255, 0.7);
  }

  .status-result {
    text-align: center;
    padding: 0.75rem;
    margin-top: 0.5rem;
    min-height: 50px;
  }

  .status-placeholder {
    height: 34px;
  }

  .status-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-lost {
    background: rgba(156, 163, 175, 0.2);
    color: #9ca3af;
    border: 1px solid rgba(156, 163, 175, 0.3);
  }

  .status-won {
    background: rgba(74, 222, 128, 0.15);
    color: #4ade80;
    border: 1px solid rgba(74, 222, 128, 0.3);
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.1);
  }

  .animate-msg {
    animation: fadeInUp 0.4s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .typing-indicator {
    padding: 0.75rem 1.25rem;
  }

  .typing-dots {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .typing-dots .dot {
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: typingBounce 1.4s ease-in-out infinite;
  }

  .typing-dots .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typingBounce {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 700px) {
    .comparison-container {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .phone-screen {
      max-width: 300px;
    }

    .phone-without {
      transform: scale(1);
      order: 1;
    }

    .phone-with {
      transform: scale(1);
      order: 2;
    }
  }

  @media (max-width: 400px) {
    .phone-screen {
      max-width: 100%;
      border-radius: 1rem;
    }

    .chat-header {
      font-size: 0.65rem;
    }

    .msg {
      font-size: 0.75rem;
      padding: 0.625rem 0.875rem;
    }
  }
`;

export default function LiveChatComparison() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [isTyping, setIsTyping] = createSignal(false);
  const [currentConv, setCurrentConv] = createSignal(0);
  const [showSuccess, setShowSuccess] = createSignal(false);
  
  let messageId = 0;
  let timeoutIds: ReturnType<typeof setTimeout>[] = [];

  const runConversation = () => {
    const lang = getCurrentLang();
    const conversations = conversationsI18n[lang];
    const conv = conversations[currentConv()];
    
    // Reset
    setMessages([]);
    setIsTyping(false);
    setShowSuccess(false);
    
    // Step 1: Fan message appears
    const t1 = setTimeout(() => {
      setMessages([{
        id: ++messageId,
        type: 'them',
        text: conv.fanMessage,
        time: conv.fanTime
      }]);
      setIsTyping(true);
    }, 500);
    timeoutIds.push(t1);

    // Step 2: Alana typing then responds
    const t2 = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: ++messageId,
        type: 'alana',
        text: conv.alanaResponse,
        time: conv.alanaTime
      }]);
    }, 2500);
    timeoutIds.push(t2);

    // Step 3: Fan replies
    const t3 = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: ++messageId,
        type: 'them',
        text: conv.fanReply,
        time: conv.fanReplyTime
      }]);
    }, 4500);
    timeoutIds.push(t3);

    // Step 4: Show success
    const t4 = setTimeout(() => {
      setShowSuccess(true);
    }, 5500);
    timeoutIds.push(t4);

    // Step 5: Next conversation
    const t5 = setTimeout(() => {
      const lang2 = getCurrentLang();
      const convs = conversationsI18n[lang2];
      setCurrentConv(prev => (prev + 1) % convs.length);
      runConversation();
    }, 8000);
    timeoutIds.push(t5);
  };

  onMount(() => {
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    
    runConversation();
  });

  onCleanup(() => {
    timeoutIds.forEach(id => clearTimeout(id));
  });

  return (
    <div class="comparison-wrapper">
      <div class="comparison-container">
        {/* Escenario 1: Sin Alana (estático) */}
        <div class="phone-screen phone-without">
          <div class="phone-notch"></div>
          <div class="chat-header chat-header-muted">
            <span class="header-icon">😴</span>
            <span class="i18n-text" data-i18n-es="Sin Alana (Tú dormida)" data-i18n-en="Without Alana (You sleeping)" data-i18n-pt="Sem Alana (Você dormindo)">Sin Alana (Tú dormida)</span>
          </div>
          <div class="chat-messages">
            <div class="msg msg-them">
              <span class="msg-text i18n-text" data-i18n-es="Hola bb, quiero verte..." data-i18n-en="Hey bb, I wanna see you..." data-i18n-pt="Oi bb, quero te ver...">Hola bb, quiero verte...</span>
              <span class="time-tag">3:02 AM</span>
            </div>
            <div class="msg msg-me">
              <span class="msg-text i18n-text" data-i18n-es="Hola! Perdón, estaba durmiendo." data-i18n-en="Hi! Sorry, I was sleeping." data-i18n-pt="Oi! Desculpa, estava dormindo.">Hola! Perdón, estaba durmiendo.</span>
              <span class="time-tag">8:45 AM</span>
            </div>
            <div class="msg msg-them">
              <span class="msg-text i18n-text" data-i18n-es="Ya se me pasaron las ganas :/" data-i18n-en="I'm not in the mood anymore :/" data-i18n-pt="Já perdi a vontade :/">Ya se me pasaron las ganas :/</span>
              <span class="time-tag">8:50 AM</span>
            </div>
          </div>
          <div class="status-result">
            <span class="status-badge status-lost i18n-text" data-i18n-es="❌ Venta Perdida ($0)" data-i18n-en="❌ Lost Sale ($0)" data-i18n-pt="❌ Venda Perdida ($0)">❌ Venta Perdida ($0)</span>
          </div>
        </div>

        {/* Escenario 2: Con Alana (dinámico) */}
        <div class="phone-screen phone-with">
          <div class="phone-notch phone-notch-active"></div>
          <div class="chat-header chat-header-active">
            <span class="header-icon">🤖</span>
            <span class="i18n-text" data-i18n-es="Con Alana (IA Activa)" data-i18n-en="With Alana (AI Active)" data-i18n-pt="Com Alana (IA Ativa)">Con Alana (IA Activa)</span>
            <span class="live-indicator"></span>
          </div>
          <div class="chat-messages">
            <For each={messages()}>
              {(message) => (
                <div class={`msg animate-msg ${message.type === 'them' ? 'msg-them' : 'msg-alana'}`}>
                  <span class="msg-text">{message.text}</span>
                  <span class="time-tag">{message.time}</span>
                </div>
              )}
            </For>

            {/* Typing Indicator */}
            <Show when={isTyping()}>
              <div class="msg msg-alana typing-indicator">
                <div class="typing-dots">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            </Show>
          </div>
          <div class="status-result">
            <Show when={showSuccess()} fallback={<div class="status-placeholder"></div>}>
              <span class="status-badge status-won animate-msg">
                <span class="i18n-text" data-i18n-es="✅ Venta Cerrada" data-i18n-en="✅ Sale Closed" data-i18n-pt="✅ Venda Fechada">✅ Venta Cerrada</span> ({conversationsI18n[getCurrentLang()][currentConv()].sale})
              </span>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
