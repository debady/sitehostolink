import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeTimeline, setActiveTimeline] = useState(0);

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
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animation timeline automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const timelineItems = [
    {
      year: '2017',
      title: 'Création de SohapiGroup',
      desc: 'Naissance de notre vision pour révolutionner la santé numérique en Afrique'
    },
    {
      year: '2020',
      title: 'Analyse du marché',
      desc: '7 années d\'étude des défis dans les établissements de santé et pharmacies'
    },
    {
      year: '2023',
      title: 'Développement Hostolink',
      desc: 'Conception et développement de la plateforme de paiement santé'
    },
    {
      year: '2024',
      title: 'Lancement officiel',
      desc: 'Mise en service et déploiement auprès des premiers utilisateurs'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Konan Yves',
      role: 'CEO & Fondateur',
      description: 'Expert en santé numérique avec 10+ ans d\'expérience',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Marie Ouattara',
      role: 'CTO',
      description: 'Architecte logiciel spécialisée en solutions mobiles',
      avatar: '👩‍💻'
    },
    {
      name: 'Jean-Baptiste Koffi',
      role: 'Head of Product',
      description: 'Designer UX/UI passionné par l\'innovation santé',
      avatar: '👨‍🎨'
    },
    {
      name: 'Fatou Traoré',
      role: 'Business Development',
      description: 'Experte en partenariats et développement commercial',
      avatar: '👩‍💼'
    }
  ];

  const values = [
    {
      icon: '🔒',
      title: 'Sécurité',
      desc: 'Protection maximale des données et transactions'
    },
    {
      icon: '🤝',
      title: 'Inclusion',
      desc: 'Démocratiser l\'accès aux paiements santé'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      desc: 'Technologies de pointe au service de la santé'
    },
    {
      icon: '❤️',
      title: 'Impact',
      desc: 'Améliorer concrètement la vie des patients'
    }
  ];

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>

      {/* Particules d'arrière-plan */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              borderRadius: '50%',
              backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              transform: `translate(${mousePosition.x * (15 + i)}px, ${mousePosition.y * (10 + i)}px)`,
              transition: 'transform 0.3s ease'
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
            transform: `translateY(${scrollY * 0.2}px)`
          }}>
            <div style={{
              fontSize: '1.2rem',
              color: '#38bdf8',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              🏢 Qui sommes-nous ?
            </div>

            <h1 style={{
              fontSize: window.innerWidth > 768 ? '4rem' : '2.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              background: `linear-gradient(45deg, 
                hsl(${220 + mousePosition.x * 30}, 100%, 70%), 
                hsl(${260 + mousePosition.y * 30}, 100%, 80%))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,255,255,0.2)'
            }}>
              SohapiGroup
            </h1>

            <p style={{
              fontSize: '1.4rem',
              lineHeight: 1.6,
              maxWidth: '800px',
              margin: '0 auto 3rem',
              opacity: 0.9,
              transform: `translateY(${mousePosition.y * 10}px)`
            }}>
              Nous révolutionnons l'écosystème de santé en Afrique depuis plus de 7 ans, 
              en créant des solutions numériques qui simplifient la vie des patients et des professionnels de santé.
            </p>

            {/* Logo animé */}
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto',
              background: `linear-gradient(135deg, 
                hsl(${200 + mousePosition.x * 50}, 80%, 60%), 
                hsl(${280 + mousePosition.y * 50}, 80%, 70%))`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              transform: `rotate(${mousePosition.x * 10}deg) scale(${1 + Math.abs(mousePosition.y) * 0.1})`,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.1s ease'
            }}>
              🏥
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        id="mission"
        data-animate
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.mission ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.mission ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Notre Mission
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{
              transform: isVisible.mission ? 'translateX(0)' : 'translateX(-50px)',
              opacity: isVisible.mission ? 1 : 0,
              transition: 'all 1s ease'
            }}>
              <h3 style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: '#38bdf8'
              }}>
                Simplifier l'accès aux soins
              </h3>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: 1.7,
                marginBottom: '2rem',
                opacity: 0.9
              }}>
                Après 7 années d'observation dans l'environnement des établissements de santé 
                et pharmaceutiques, nous avons identifié les défis majeurs qui freinent l'accès aux soins.
              </p>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: 1.7,
                opacity: 0.9
              }}>
                Hostolink est notre réponse technologique pour créer un écosystème de santé 
                numérique accessible, sécurisé et communautaire.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              transform: isVisible.mission ? 'translateX(0)' : 'translateX(50px)',
              opacity: isVisible.mission ? 1 : 0,
              transition: 'all 1s ease 0.3s'
            }}>
              {values.map((value, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '2rem',
                    borderRadius: '15px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transform: `scale(${1 + Math.sin((Date.now() / 1000 + index) * 0.5) * 0.05})`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {value.icon}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    {value.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        id="timeline"
        data-animate
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '4rem',
            background: 'linear-gradient(45deg, #ec4899, #be185d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.timeline ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.timeline ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Notre Histoire
          </h2>

        </div>

          <div style={{ position: 'relative' }}>
            {/* Ligne centrale */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899)',
              transform: 'translateX(-50%)',
              borderRadius: '2px'
            }} />

            {timelineItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4rem',
                  position: 'relative',
                  opacity: isVisible.timeline ? 1 : 0,
                  transform: isVisible.timeline ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 1s ease ${index * 0.2}s`
                }}
              >
                {/* Point sur la timeline */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  width: '20px',
                  height: '20px',
                  background: activeTimeline === index 
                    ? 'linear-gradient(45deg, #fbbf24, #f59e0b)' 
                    : '#64748b',
                  borderRadius: '50%',
                  transform: `translateX(-50%) scale(${activeTimeline === index ? 1.5 : 1})`,
                  transition: 'all 0.3s ease',
                  boxShadow: activeTimeline === index 
                    ? '0 0 20px rgba(251, 191, 36, 0.6)' 
                    : 'none',
                  zIndex: 10
                }} />

                {/* Contenu */}
                <div style={{
                  width: window.innerWidth > 768 ? '45%' : '80%',
                  marginLeft: index % 2 === 0 ? 0 : window.innerWidth > 768 ? '55%' : '20%',
                  background: activeTimeline === index 
                    ? 'rgba(251, 191, 36, 0.1)' 
                    : 'rgba(255,255,255,0.05)',
                  padding: '2rem',
                  borderRadius: '15px',
                  border: `2px solid ${activeTimeline === index ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                  backdropFilter: 'blur(10px)',
                  transform: `scale(${activeTimeline === index ? 1.05 : 1})`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveTimeline(index)}
              >
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: activeTimeline === index ? '#fbbf24' : '#38bdf8',
                  marginBottom: '0.5rem'
                }}>
                  {item.year}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  opacity: 0.9,
                  lineHeight: 1.5
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team"
        data-animate
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(45deg, #10b981, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.team ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.team ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Notre Équipe
          </h2>

          <p style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 4rem',
            transform: isVisible.team ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease 0.3s'
          }}>
            Une équipe passionnée et experte, unie par la vision de révolutionner la santé numérique en Afrique.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '2rem'
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transform: isVisible.team 
                    ? 'translateY(0) rotateY(0deg)' 
                    : 'translateY(50px) rotateY(10deg)',
                  opacity: isVisible.team ? 1 : 0,
                  transition: `all 1s ease ${index * 0.15}s`,
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
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  transform: `rotate(${Math.sin((Date.now() / 1000 + index) * 0.5) * 10}deg)`
                }}>
                  {member.avatar}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: '#38bdf8'
                }}>
                  {member.name}
                </h3>
                <div style={{
                  fontSize: '1rem',
                  color: '#fbbf24',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  {member.role}
                </div>
                <p style={{
                  opacity: 0.8,
                  lineHeight: 1.6
                }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '2rem',
            background: 'linear-gradient(45deg, #ec4899, #be185d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Rejoignez la révolution santé
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Découvrez comment Hostolink transforme l'expérience de paiement en santé 
            et rejoignez notre communauté grandissante.
          </p>
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
              transform: `scale(${1 + Math.abs(mousePosition.x) * 0.05})`,
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = `scale(${1 + Math.abs(mousePosition.x) * 0.05})`;
              e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
            }}
          >
            🚀 Découvrir Hostolink
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;