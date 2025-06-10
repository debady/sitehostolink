import React, { useState, useEffect } from 'react';

const FeaturesPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeModule, setActiveModule] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(null);

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

  // Rotation automatique des modules
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const modules = [
    {
      id: 'payment',
      icon: '💳',
      title: 'Paiements Sécurisés',
      subtitle: 'Simplifiez vos transactions santé',
      color: 'from-blue-500 to-purple-600',
      description: 'Payez vos soins médicaux en toute sécurité avec des transactions instantanées et chiffrées.',
      features: [
        {
          icon: '📱',
          title: 'Dépôt Wave',
          desc: 'Rechargez votre compte facilement via Wave'
        },
        {
          icon: '🔄',
          title: 'Transferts instantanés',
          desc: 'Envoyez de l\'argent entre comptes Hostolink'
        },
        {
          icon: '📊',
          title: 'QR Code Scanner',
          desc: 'Payez en scannant le code de l\'établissement'
        },
        {
          icon: '📋',
          title: 'Historique détaillé',
          desc: 'Suivez toutes vos transactions en temps réel'
        },
        {
          icon: '🔒',
          title: 'Sécurité maximale',
          desc: 'Cryptage bancaire et authentification 2FA'
        },
        {
          icon: '📄',
          title: 'Reçus PDF',
          desc: 'Téléchargez vos justificatifs de paiement'
        }
      ]
    },
    {
      id: 'geolocation',
      icon: '📍',
      title: 'Géolocalisation',
      subtitle: 'Trouvez les soins près de vous',
      color: 'from-green-500 to-teal-600',
      description: 'Localisez instantanément les établissements de santé et pharmacies autour de vous.',
      features: [
        {
          icon: '🗺️',
          title: 'Carte interactive',
          desc: 'Visualisez tous les centres sur une carte'
        },
        {
          icon: '🏥',
          title: 'Filtrage avancé',
          desc: 'Cliniques, hôpitaux, pharmacies, laboratoires'
        },
        {
          icon: '🧭',
          title: 'Navigation GPS',
          desc: 'Itinéraires optimisés vers votre destination'
        },
        {
          icon: '⭐',
          title: 'Avis et notes',
          desc: 'Consultez les retours d\'autres patients'
        },
        {
          icon: '📞',
          title: 'Contact direct',
          desc: 'Appelez l\'établissement d\'un simple clic'
        },
        {
          icon: '⏰',
          title: 'Horaires d\'ouverture',
          desc: 'Vérifiez la disponibilité en temps réel'
        }
      ]
    },
    {
      id: 'social',
      icon: '👥',
      title: 'Réseau Social Santé',
      subtitle: 'Partagez et échangez',
      color: 'from-pink-500 to-rose-600',
      description: 'Rejoignez une communauté bienveillante pour partager vos expériences santé.',
      features: [
        {
          icon: '📝',
          title: 'Publications',
          desc: 'Partagez vos expériences et conseils'
        },
        {
          icon: '💬',
          title: 'Chat communautaire',
          desc: 'Discussions par thématiques santé'
        },
        {
          icon: '👍',
          title: 'Interactions',
          desc: 'Réagissez, commentez et partagez'
        },
        {
          icon: '🛡️',
          title: 'Modération',
          desc: 'Contenu vérifié et sécurisé'
        },
        {
          icon: '📢',
          title: 'Annonces',
          desc: 'Établissements peuvent publier leurs services'
        },
        {
          icon: '🔔',
          title: 'Notifications',
          desc: 'Restez informé des discussions importantes'
        }
      ]
    }
  ];

  const expertTestimonials = [
    {
      name: 'Dr. Aminata Kone',
      role: 'Cardiologue, CHU Cocody',
      avatar: '👩‍⚕️',
      quote: 'Hostolink révolutionne la relation patient-établissement. Nos patients peuvent maintenant payer facilement et nous contacter rapidement.',
      rating: 5
    },
    {
      name: 'Pharmacien Kouadio',
      role: 'Pharmacie Centrale Abidjan',
      avatar: '👨‍⚕️',
      quote: 'Les paiements sont instantanés et sécurisés. Nos ventes ont augmenté de 40% depuis l\'adoption d\'Hostolink.',
      rating: 5
    },
    {
      name: 'Mme Sarah Diabate',
      role: 'Patiente depuis 2 ans',
      avatar: '👩',
      quote: 'Fini les files d\'attente pour payer ! Je trouve facilement les pharmacies ouvertes près de chez moi.',
      rating: 5
    }
  ];

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #0c1426 0%, #1e1b4b 50%, #312e81 100%)',
    minHeight: '100vh',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>

      {/* Particules animées */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              borderRadius: '50%',
              backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
              transform: `translate(${mousePosition.x * (10 + i * 0.5)}px, ${mousePosition.y * (8 + i * 0.3)}px)`,
              transition: 'transform 0.3s ease',
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
          {/* Titre principal */}
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            transform: `translateY(${scrollY * 0.2}px)`
          }}>
            <div style={{
              fontSize: '1.2rem',
              color: '#a78bfa',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              ⚡ Fonctionnalités Avancées
            </div>

            <h1 style={{
              fontSize: window.innerWidth > 768 ? '4.5rem' : '2.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              background: `linear-gradient(45deg, 
                hsl(${240 + mousePosition.x * 40}, 100%, 75%), 
                hsl(${300 + mousePosition.y * 40}, 100%, 80%))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}>
              3 Modules Puissants
            </h1>

            <p style={{
              fontSize: '1.4rem',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Découvrez comment Hostolink révolutionne votre expérience santé 
              avec des outils innovants et sécurisés
            </p>
          </div>

          {/* Navigation modules */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '4rem',
            flexWrap: 'wrap'
          }}>
            {modules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(index)}
                style={{
                  padding: '1.5rem 2.5rem',
                  border: 'none',
                  borderRadius: '20px',
                  background: activeModule === index 
                    ? `linear-gradient(135deg, ${module.color.split(' ')[1]} 0%, ${module.color.split(' ')[3]} 100%)`
                    : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transform: `scale(${activeModule === index ? 1.1 : 1}) translateY(${activeModule === index ? -5 : 0}px)`,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: activeModule === index ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeModule !== index) {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeModule !== index) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.transform = 'scale(1) translateY(0px)';
                  }
                }}
              >
                <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>
                  {module.icon}
                </span>
                {module.title}
              </button>
            ))}
          </div>

          {/* Module actif détaillé */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.1)',
            transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * 1}deg)`,
            transition: 'transform 0.1s ease'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
              gap: '4rem',
              alignItems: 'center'
            }}>
              
              {/* Description du module */}
              <div>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  transform: `scale(${1 + Math.sin(Date.now() / 1000) * 0.1})`
                }}>
                  {modules[activeModule].icon}
                </div>
                
                <h2 style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  background: `linear-gradient(135deg, ${modules[activeModule].color.replace('from-', '').replace(' to-', ', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {modules[activeModule].title}
                </h2>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: '#a78bfa',
                  marginBottom: '2rem',
                  fontWeight: 'bold'
                }}>
                  {modules[activeModule].subtitle}
                </p>
                
                <p style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.7,
                  opacity: 0.9,
                  marginBottom: '2rem'
                }}>
                  {modules[activeModule].description}
                </p>

                <button
                  style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '25px',
                    background: `linear-gradient(135deg, ${modules[activeModule].color.replace('from-', '').replace(' to-', ', ')})`,
                    color: 'white',
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                  }}
                >
                  🚀 Essayer maintenant
                </button>
              </div>

              {/* Grille des fonctionnalités */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {modules[activeModule].features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: selectedFeature === `${activeModule}-${index}` 
                        ? 'rgba(255,255,255,0.15)' 
                        : 'rgba(255,255,255,0.08)',
                      padding: '1.5rem',
                      borderRadius: '15px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transform: `scale(${selectedFeature === `${activeModule}-${index}` ? 1.05 : 1})`,
                      transition: 'all 0.3s ease',
                      opacity: 0,
                      animation: `fadeInUp 0.6s ease forwards`,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => setSelectedFeature(`${activeModule}-${index}`)}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.15)';
                      e.target.style.transform = 'scale(1.05) translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFeature !== `${activeModule}-${index}`) {
                        e.target.style.background = 'rgba(255,255,255,0.08)';
                        e.target.style.transform = 'scale(1) translateY(0px)';
                      }
                    }}
                  >
                    <div style={{ 
                      fontSize: '2rem', 
                      marginBottom: '0.8rem',
                      transform: `rotate(${Math.sin((Date.now() / 1000 + index) * 2) * 5}deg)`
                    }}>
                      {feature.icon}
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      color: '#f1f5f9'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      lineHeight: 1.4
                    }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section témoignages d'experts */}
      <section 
        id="testimonials"
        data-animate
        style={{
          padding: '6rem 2rem',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.testimonials ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.testimonials ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Ce que disent les experts
          </h2>

          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            marginBottom: '4rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            Professionnels de santé et patients témoignent de leur expérience avec Hostolink
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
            gap: '2rem'
          }}>
            {expertTestimonials.map((expert, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  textAlign: 'center',
                  transform: isVisible.testimonials 
                    ? 'translateY(0) scale(1)' 
                    : 'translateY(50px) scale(0.9)',
                  opacity: isVisible.testimonials ? 1 : 0,
                  transition: `all 1s ease ${index * 0.2}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px) scale(1.02)';
                  e.target.style.background = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                  {expert.avatar}
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  {Array.from({ length: expert.rating }, (_, i) => (
                    <span key={i} style={{ color: '#fbbf24', fontSize: '1.5rem' }}>⭐</span>
                  ))}
                </div>
                
                <blockquote style={{
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                  lineHeight: 1.6,
                  opacity: 0.9
                }}>
                  "{expert.quote}"
                </blockquote>
                
                <div>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#60a5fa'
                  }}>
                    {expert.name}
                  </h4>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#a78bfa',
                    opacity: 0.8
                  }}>
                    {expert.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA final */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '4rem 2rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{
              fontSize: '2.8rem',
              marginBottom: '2rem',
              background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Prêt à révolutionner votre santé ?
            </h2>
            
            <p style={{
              fontSize: '1.3rem',
              marginBottom: '3rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Rejoignez des milliers d'utilisateurs qui font confiance à Hostolink 
              pour leurs paiements santé au quotidien.
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '1.2rem 3rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
                }}
onClick={() => {
      document.getElementById('hidden-apk-link').click();
    }}              >
                📱 Télécharger l'app
              </button>
               <a
    id="hidden-apk-link"
    href="/apk/hostolink.apk"
    download
    style={{ display: 'none' }}
  />
              <button
                style={{
                  padding: '1.2rem 3rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  border: '2px solid #60a5fa',
                  borderRadius: '50px',
                  background: 'transparent',
                  color: '#60a5fa',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#60a5fa';
                  e.target.style.color = '#1e293b';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#60a5fa';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                🎬 Voir la démo
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesPage;