import React, { useState, useEffect, useRef } from 'react';

// Hook pour le bot IA réutilisable
export const useAIBot = () => {
  const [isBotVisible, setIsBotVisible] = useState(true);
  const [botPosition, setBotPosition] = useState({ x: 85, y: 85 });
  const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Bonjour ! Je suis votre assistant Hostolink. Comment puis-je vous aider aujourd\'hui ?', timestamp: Date.now() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Déplacement automatique du bot
  useEffect(() => {
    const moveBot = () => {
      const newX = Math.random() * 70 + 15; // Entre 15% et 85%
      const newY = Math.random() * 70 + 15;
      setBotPosition({ x: newX, y: newY });
    };

    const interval = setInterval(moveBot, 8000);
    return () => clearInterval(interval);
  }, []);

  // Popup automatique après 20 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showChat) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [showChat]);

  // Simulation de réponses IA
  const generateBotResponse = (userMessage) => {
    const responses = {
      'hello': 'Bonjour ! Comment puis-je vous aider avec Hostolink ?',
      'paiement': 'Hostolink permet de payer vos soins via Wave, transferts directs et QR codes. Tout est sécurisé !',
      'compte': 'Pour créer un compte, téléchargez l\'app et suivez l\'inscription en 3 étapes avec vérification SMS.',
      'sécurité': 'Nous utilisons un cryptage AES-256, authentification 2FA et sommes conformes PCI-DSS.',
      'frais': 'Les frais varient selon le type de transaction. Consultez la grille tarifaire dans l\'application.',
      'problème': 'Je peux vous aider à résoudre votre problème. Pouvez-vous me donner plus de détails ?',
      'contact': 'Vous pouvez nous contacter par email (contact@hostolink.com), téléphone (+225 27 20 25 00 00) ou WhatsApp.',
      'download': 'Téléchargez Hostolink sur Google Play Store ou App Store. L\'app est gratuite !',
      'default': 'Je comprends votre question. Notre équipe technique peut vous aider davantage. Souhaitez-vous que je vous mette en contact ?'
    };

    const message = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key) || message.includes(key.slice(0, -1))) {
        return response;
      }
    }
    return responses.default;
  };

  // Animation de frappe
  const typeMessage = (text, callback) => {
    setIsTyping(true);
    let index = 0;
    const typing = setInterval(() => {
      if (index < text.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.type === 'bot' && lastMessage.isTyping) {
            lastMessage.text = text.slice(0, index + 1);
          } else {
            newMessages.push({
              type: 'bot',
              text: text.slice(0, index + 1),
              isTyping: true,
              timestamp: Date.now()
            });
          }
          return newMessages;
        });
        index++;
      } else {
        clearInterval(typing);
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.isTyping) {
            lastMessage.isTyping = false;
          }
          return newMessages;
        });
        setIsTyping(false);
        if (callback) callback();
      }
    }, 50);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMsg = {
      type: 'user',
      text: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    const botResponse = generateBotResponse(inputMessage);
    setInputMessage('');

    setTimeout(() => {
      typeMessage(botResponse);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    isBotVisible,
    setIsBotVisible,
    botPosition,
    setBotPosition,
    showPopup,
    setShowPopup,
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isTyping,
    sendMessage,
    handleKeyPress
  };
};

// Composant Bot réutilisable
export const AIBot = ({ 
  position = 'fixed', 
  customStyle = {},
  onBotClick,
  showInCorner = true 
}) => {
  const {
    isBotVisible,
    setIsBotVisible,
    botPosition,
    showPopup,
    setShowPopup,
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isTyping,
    sendMessage,
    handleKeyPress
  } = useAIBot();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botStyle = {
    position: position,
    [showInCorner ? 'right' : 'left']: showInCorner ? '2rem' : `${botPosition.x}%`,
    [showInCorner ? 'bottom' : 'top']: showInCorner ? '2rem' : `${botPosition.y}%`,
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    animation: showInCorner ? 'none' : 'float 3s ease-in-out infinite',
    transform: showChat ? 'scale(0.9)' : 'scale(1)',
    ...customStyle
  };

  if (!isBotVisible) return null;

  return (
    <>
      {/* Icône du bot */}
      <div
        style={botStyle}
        onClick={() => {
          setShowChat(!showChat);
          setShowPopup(false);
          if (onBotClick) onBotClick();
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = showChat ? 'scale(0.9)' : 'scale(1)';
          e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        }}
      >
        <span style={{ fontSize: '1.8rem' }}>🤖</span>
        
        {/* Indicateur de messages non lus */}
        {!showChat && messages.length > 1 && (
          <div style={{
            // position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#ef4444',
            color: 'white',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            !
          </div>
        )}
      </div>

      {/* Popup automatique */}
      {showPopup && !showChat && (
        <div style={{
          position: 'fixed',
          right: showInCorner ? '5rem' : `${botPosition.x - 10}%`,
          bottom: showInCorner ? '8rem' : `${100 - botPosition.y + 5}%`,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '20px',
          maxWidth: '250px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 1001,
          animation: 'slideIn 0.3s ease',
          // position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '20px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #764ba2'
          }} />
          
          <button
            onClick={() => setShowPopup(false)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.4 }}>
            👋 Besoin d'aide ? Je suis là pour répondre à vos questions sur Hostolink !
          </p>
        </div>
      )}

      {/* Interface de chat */}
      {showChat && (
        <div style={{
          position: 'fixed',
          right: showInCorner ? '2rem' : `${Math.max(5, botPosition.x - 15)}%`,
          bottom: showInCorner ? '9rem' : `${Math.max(5, 100 - botPosition.y - 20)}%`,
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleIn 0.3s ease'
        }}>
          
          {/* Header du chat */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Assistant Hostolink</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                  {isTyping ? 'En train d\'écrire...' : 'En ligne'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Zone des messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            background: '#f8fafc'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '1rem'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.8rem 1rem',
                  borderRadius: message.type === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                  background: message.type === 'user' 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'white',
                  color: message.type === 'user' ? 'white' : '#1e293b',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  position: 'relative'
                }}>
                  {message.text}
                  {message.isTyping && (
                    <span style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1em',
                      background: '#667eea',
                      marginLeft: '2px',
                      animation: 'blink 1s infinite'
                    }} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e2e8f0',
            background: 'white'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                disabled={isTyping}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '25px',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                style={{
                  padding: '0.8rem 1.2rem',
                  background: inputMessage.trim() && !isTyping 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : '#e2e8f0',
                  color: inputMessage.trim() && !isTyping ? 'white' : '#94a3b8',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: inputMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

// Page FAQ principale
const FAQPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Observer pour animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const faqCategories = [
    {
      title: 'Compte et Inscription',
      icon: '👤',
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          q: 'Comment créer un compte Hostolink ?',
          a: 'Téléchargez l\'application, cliquez sur "S\'inscrire", renseignez vos informations personnelles et vérifiez votre numéro de téléphone par SMS. L\'inscription prend moins de 5 minutes.'
        },
        {
          q: 'Puis-je avoir plusieurs comptes ?',
          a: 'Non, un seul compte par personne est autorisé pour des raisons de sécurité et de conformité réglementaire.'
        },
        {
          q: 'Comment récupérer mon mot de passe ?',
          a: 'Cliquez sur "Mot de passe oublié" sur l\'écran de connexion, entrez votre email ou numéro de téléphone pour recevoir un lien de réinitialisation.'
        }
      ]
    },
    {
      title: 'Paiements et Transactions',
      icon: '💳',
      color: 'from-green-500 to-green-600',
      questions: [
        {
          q: 'Quels sont les moyens de paiement acceptés ?',
          a: 'Vous pouvez déposer de l\'argent via Wave, Orange Money, Moov Money, MTN Money, et les principales banques (BGFI, BNI, etc.).'
        },
        {
          q: 'Y a-t-il des frais de transaction ?',
          a: 'Les frais varient selon le type de transaction. Consultez la grille tarifaire dans l\'application pour connaître les détails.'
        },
        {
          q: 'Puis-je annuler une transaction ?',
          a: 'Les transactions peuvent être annulées dans les 5 minutes suivant l\'envoi si elles sont encore en attente de traitement.'
        },
        {
          q: 'Quel est le montant maximum autorisé ?',
          a: 'Le solde maximum est de 2 000 000 F CFA et vous pouvez effectuer jusqu\'à 10 000 000 F CFA de transactions par mois.'
        }
      ]
    },
    {
      title: 'Sécurité',
      icon: '🔒',
      color: 'from-red-500 to-red-600',
      questions: [
        {
          q: 'Comment Hostolink protège-t-il mes données ?',
          a: 'Nous utilisons un cryptage AES-256, l\'authentification à deux facteurs (2FA) et sommes conformes aux normes PCI-DSS et RGPD.'
        },
        {
          q: 'Que faire si je perds mon téléphone ?',
          a: 'Contactez immédiatement notre support pour bloquer votre compte. Vous pourrez le réactiver en vous connectant depuis un nouveau dispositif.'
        },
        {
          q: 'Comment activer l\'authentification 2FA ?',
          a: 'Allez dans Paramètres > Sécurité > Authentification à deux facteurs et suivez les instructions pour l\'activer.'
        }
      ]
    },
    {
      title: 'Fonctionnalités',
      icon: '⚙️',
      color: 'from-purple-500 to-purple-600',
      questions: [
        {
          q: 'Comment utiliser la géolocalisation ?',
          a: 'Activez la localisation dans les paramètres de votre téléphone. L\'app trouvera automatiquement les établissements de santé près de vous.'
        },
        {
          q: 'Comment scanner un QR code pour payer ?',
          a: 'Ouvrez l\'app, appuyez sur "Scanner" et pointez votre caméra vers le QR code de l\'établissement.'
        },
        {
          q: 'Puis-je utiliser Hostolink hors ligne ?',
          a: 'Certaines fonctionnalités comme la consultation de l\'historique sont disponibles hors ligne, mais les paiements nécessitent une connexion internet.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #7c3aed 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>

      {/* Bot IA flottant */}
      <AIBot showInCorner={false} />

      {/* Particules d'arrière-plan */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              borderRadius: '50%',
              backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.5,
              transform: `translate(${mousePosition.x * (10 + i)}px, ${mousePosition.y * (8 + i)}px)`,
              transition: 'transform 0.3s ease',
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            transform: `translateY(${scrollY * 0.2}px)`
          }}>
            <div style={{
              fontSize: '1.3rem',
              color: '#a78bfa',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              ❓ Centre d'aide
            </div>

            <h1 style={{
              fontSize: window.innerWidth > 768 ? '4.5rem' : '2.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              background: `linear-gradient(45deg, 
                hsl(${240 + mousePosition.x * 30}, 100%, 75%), 
                hsl(${280 + mousePosition.y * 30}, 100%, 80%))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}>
              Questions Fréquentes
            </h1>

            <p style={{
              fontSize: '1.4rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Trouvez rapidement les réponses à vos questions sur Hostolink. 
              Notre assistant IA est également là pour vous aider !
            </p>

            {/* Barre de recherche */}
            <div style={{
              maxWidth: '500px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1.2rem 3rem 1.2rem 1.5rem',
                  fontSize: '1.1rem',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '50px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a78bfa';
                  e.target.style.background = 'rgba(255,255,255,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                }}
              />
              <span style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.5rem',
                opacity: 0.7
              }}>
                🔍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ par catégories */}
      <section 
        id="faq-categories"
        data-animate
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filteredFAQs.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              style={{
                marginBottom: '4rem',
                transform: isVisible['faq-categories'] ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible['faq-categories'] ? 1 : 0,
                transition: `all 1s ease ${categoryIndex * 0.2}s`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${category.color.replace('from-', '').replace(' to-', ', ')})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  {category.icon}
                </div>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: `linear-gradient(135deg, ${category.color.replace('from-', '').replace(' to-', ', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {category.title}
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '15px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      overflow: 'hidden',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === `${categoryIndex}-${faqIndex}` ? null : `${categoryIndex}-${faqIndex}`)}
                      style={{
                        width: '100%',
                        padding: '1.5rem 2rem',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.parentElement.style.background = 'rgba(255,255,255,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.parentElement.style.background = 'rgba(255,255,255,0.08)';
                      }}
                    >
                      <span>{faq.q}</span>
                      <span style={{
                        fontSize: '1.5rem',
                        transform: openFAQ === `${categoryIndex}-${faqIndex}` ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        +
                      </span>
                    </button>
                    
                    {openFAQ === `${categoryIndex}-${faqIndex}` && (
                      <div style={{
                        padding: '0 2rem 2rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        <p style={{
                          fontSize: '1.1rem',
                          lineHeight: 1.6,
                          opacity: 0.9,
                          margin: '1rem 0 0'
                        }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {searchTerm && filteredFAQs.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Aucun résultat trouvé
              </h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
                Essayez avec d'autres mots-clés ou contactez notre assistant IA
              </p>
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  padding: '0.8rem 2rem',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section Contact support */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Besoin d'aide supplémentaire ?
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Notre équipe support et notre assistant IA sont disponibles 24/7 
            pour répondre à toutes vos questions
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
            gap: '2rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.background = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255,255,255,0.08)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Assistant IA</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Réponses instantanées</p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.background = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255,255,255,0.08)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Email</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Réponse sous 24h</p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.background = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255,255,255,0.08)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Téléphone</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Support direct</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        input::placeholder {
          color: rgba(255,255,255,0.6);
        }
      `}</style>
    </div>
  );
};

export default FAQPage;