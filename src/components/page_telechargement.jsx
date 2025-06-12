import React, { useState, useEffect } from 'react';

const DownloadPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [selectedPlatform, setSelectedPlatform] = useState('android');
  const [downloadCount, setDownloadCount] = useState(12847);
  const [showQRCode, setShowQRCode] = useState(null);

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

  // Animation du compteur de téléchargements
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const platforms = [
    {
      id: 'android',
      name: 'Android',
      icon: '🤖',
      color: 'from-green-500 to-green-600',
      version: '2.1.0',
      size: '24.5 MB',
      requirements: 'Android 8.0+',
      storeIcon: '📱',
      storeName: 'Google Play',
      downloadUrl: '#',
      features: ['Optimisé pour Android 14', 'Support des paiements NFC', 'Widget d\'accueil']
    },
    {
      id: 'ios',
      name: 'iOS',
      icon: '🍎',
      color: 'from-blue-500 to-blue-600',
      version: '2.1.0',
      size: '28.3 MB',
      requirements: 'iOS 12.0+',
      storeIcon: '🏪',
      storeName: 'App Store',
      downloadUrl: '#',
      features: ['Compatible Face ID/Touch ID', 'Widgets iOS 17', 'Shortcuts Siri']
    },
    {
      id: 'web',
      name: 'Version Web',
      icon: '🌐',
      color: 'from-purple-500 to-purple-600',
      version: '2.0.8',
      size: 'Progressive Web App',
      requirements: 'Navigateur moderne',
      storeIcon: '💻',
      storeName: 'Accès Web',
      downloadUrl: '#',
      features: ['Fonctionne hors ligne', 'Installation sur bureau', 'Synchronisation cloud']
    }
  ];

  const securityFeatures = [
    {
      icon: '🔐',
      title: 'Cryptage AES-256',
      desc: 'Toutes vos données sont chiffrées avec le standard bancaire'
    },
    {
      icon: '🛡️',
      title: 'Authentification 2FA',
      desc: 'Double vérification pour une sécurité maximale'
    },
    {
      icon: '🏦',
      title: 'Conformité PCI-DSS',
      desc: 'Respect des normes internationales de sécurité'
    },
    {
      icon: '✅',
      title: 'Vérification d\'identité',
      desc: 'KYC intégré pour protéger vos transactions'
    }
  ];

  const systemRequirements = [
    {
      platform: 'Android',
      requirements: [
        'Android 8.0 (API niveau 26) ou supérieur',
        '2 GB RAM minimum (4 GB recommandé)',
        '100 MB d\'espace libre',
        'Connexion Internet (WiFi ou données mobiles)',
        'Appareil photo pour scanner QR codes',
        'Localisation pour géolocalisation'
      ]
    },
    {
      platform: 'iOS',
      requirements: [
        'iOS 12.0 ou supérieur',
        'iPhone 6s/iPad Air 2 ou plus récent',
        '120 MB d\'espace libre',
        'Connexion Internet stable',
        'Appareil photo pour QR codes',
        'Services de localisation activés'
      ]
    }
  ];

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #7c3aed 70%, #ec4899 100%)',
    minHeight: '100vh',
    position: 'relative'
  };

  const generateQRCode = (platform) => {
    // Simulation d'un QR code avec des carrés
    const qrSize = 12;
    const pattern = [];
    for (let i = 0; i < qrSize * qrSize; i++) {
      pattern.push(Math.random() > 0.5);
    }
    return pattern;
  };

  return (
    <div style={containerStyle}>

      {/* Particules animées */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 35 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              borderRadius: '50%',
              backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
              transform: `translate(${mousePosition.x * (12 + i * 0.3)}px, ${mousePosition.y * (8 + i * 0.2)}px)`,
              transition: 'transform 0.3s ease',
              animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
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
          
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            transform: `translateY(${scrollY * 0.2}px)`
          }}>
            <div style={{
              fontSize: '1.3rem',
              color: '#34d399',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              📱 Téléchargement Gratuit
            </div>

            <h1 style={{
              fontSize: window.innerWidth > 768 ? '4.5rem' : '2.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              background: `linear-gradient(45deg, 
                hsl(${180 + mousePosition.x * 40}, 100%, 70%), 
                hsl(${280 + mousePosition.y * 40}, 100%, 75%))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}>
              Téléchargez Hostolink
            </h1>

            <p style={{
              fontSize: '1.4rem',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Rejoignez plus de {downloadCount.toLocaleString()} utilisateurs qui font confiance à Hostolink 
              pour leurs paiements santé en toute sécurité.
            </p>

            {/* Compteur de téléchargements animé */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem 2rem',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '3rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⬇️</span>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#34d399' }}>
                  {downloadCount.toLocaleString()}+
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Téléchargements
                </div>
              </div>
            </div>
          </div>

          {/* Sélecteur de plateforme */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  background: selectedPlatform === platform.id 
                    ? `linear-gradient(135deg, ${platform.color.replace('from-', '').replace(' to-', ', ')})`
                    : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transform: `scale(${selectedPlatform === platform.id ? 1.1 : 1})`,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: selectedPlatform === platform.id ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent'
                }}
              >
                <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>
                  {platform.icon}
                </span>
                {platform.name}
              </button>
            ))}
          </div>

          {/* Card de téléchargement pour la plateforme sélectionnée */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.15)',
            transform: `perspective(1000px) rotateY(${mousePosition.x * 1}deg) rotateX(${mousePosition.y * 0.5}deg)`,
            transition: 'transform 0.1s ease'
          }}>
            {(() => {
              const platform = platforms.find(p => p.id === selectedPlatform);
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
                  gap: '3rem',
                  alignItems: 'center'
                }}>
                  
                  {/* Informations de l'app */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        fontSize: '4rem',
                        background: `linear-gradient(135deg, ${platform.color.replace('from-', '').replace(' to-', ', ')})`,
                        borderRadius: '20px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {platform.icon}
                      </div>
                      <div>
                        <h2 style={{
                          fontSize: '2.5rem',
                          marginBottom: '0.5rem',
                          background: `linear-gradient(135deg, ${platform.color.replace('from-', '').replace(' to-', ', ')})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          Hostolink
                        </h2>
                        <p style={{
                          fontSize: '1.1rem',
                          color: '#a78bfa',
                          opacity: 0.9
                        }}>
                          {platform.name} • Version {platform.version}
                        </p>
                      </div>
                    </div>

                    {/* Infos techniques */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{platform.size}</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Taille</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⭐</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>4.8/5</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Note</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔧</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{platform.requirements}</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Requis</div>
                      </div>
                    </div>

                    {/* Fonctionnalités spéciales */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#f1f5f9' }}>
                        Nouveautés de cette version :
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {platform.features.map((feature, index) => (
                          <li key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            opacity: 0.9
                          }}>
                            <span style={{ color: '#34d399' }}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bouton de téléchargement principal */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        style={{
                          padding: '1.5rem 3rem',
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          border: 'none',
                          borderRadius: '25px',
                          background: `linear-gradient(135deg, ${platform.color.replace('from-', '').replace(' to-', ', ')})`,
                          color: 'white',
                          cursor: 'pointer',
                          transform: 'scale(1)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
                        }}
                        onClick={() => {
                            document.getElementById('hidden-apk-link').click();
                          }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{platform.storeIcon}</span>
                        Télécharger sur {platform.storeName}
                      </button>
 <a
    id="hidden-apk-link"
    href="/apk/hostolink.apk"
    download
    style={{ display: 'none' }}
  />
                      <button
                        onClick={() => setShowQRCode(showQRCode === platform.id ? null : platform.id)}
                        style={{
                          padding: '1.5rem 2rem',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderRadius: '25px',
                          background: 'rgba(255,255,255,0.1)',
                          color: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255,255,255,0.2)';
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(255,255,255,0.1)';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        📱 QR Code
                      </button>
                    </div>
                  </div>

                  {/* QR Code et aperçu */}
                  <div style={{ textAlign: 'center' }}>
                    {showQRCode === platform.id ? (
                      <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        display: 'inline-block',
                        transform: `scale(${1 + Math.sin(Date.now() / 1000) * 0.05})`
                      }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(12, 1fr)',
                          gap: '2px',
                          width: '200px',
                          height: '200px'
                        }}>
                          {generateQRCode().map((filled, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: filled ? '#000' : '#fff',
                                aspectRatio: '1'
                              }}
                            />
                          ))}
                        </div>
                        <p style={{ 
                          color: '#1e293b', 
                          marginTop: '1rem', 
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}>
                          Scannez pour télécharger
                        </p>
                      </div>
                    ) : (
                      <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        padding: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <div style={{
                          fontSize: '6rem',
                          marginBottom: '1rem',
                          transform: `rotate(${Math.sin(Date.now() / 1000) * 5}deg)`
                        }}>
                          📱
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                          Installation simple
                        </h3>
                        <p style={{ opacity: 0.8 }}>
                          Téléchargement sécurisé depuis le store officiel de votre plateforme
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Section Sécurité */}
      <section 
        id="security"
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
            background: 'linear-gradient(45deg, #ef4444, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.security ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.security ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Sécurité de niveau bancaire
          </h2>

          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            marginBottom: '4rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            Vos données et transactions sont protégées par les technologies de sécurité les plus avancées
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '2rem'
          }}>
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transform: isVisible.security 
                    ? 'translateY(0) scale(1)' 
                    : 'translateY(50px) scale(0.9)',
                  opacity: isVisible.security ? 1 : 0,
                  transition: `all 1s ease ${index * 0.1}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.02)';
                  e.target.style.background = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1.5rem',
                  transform: `rotate(${Math.sin((Date.now() / 1000 + index) * 2) * 5}deg)`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#f1f5f9'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  opacity: 0.8,
                  lineHeight: 1.6
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Configuration requise */}
      <section 
        id="requirements"
        data-animate
        style={{
          padding: '6rem 2rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '4rem',
            background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.requirements ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.requirements ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Configuration requise
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '3rem'
          }}>
            {systemRequirements.map((system, index) => (
              <div
                key={system.platform}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '2.5rem',
                  borderRadius: '25px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transform: isVisible.requirements 
                    ? 'translateY(0)' 
                    : 'translateY(50px)',
                  opacity: isVisible.requirements ? 1 : 0,
                  transition: `all 1s ease ${index * 0.3}s`
                }}
              >
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>
                    {system.platform === 'Android' ? '🤖' : '🍎'}
                  </span>
                  {system.platform}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {system.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.8rem',
                      marginBottom: '1rem',
                      opacity: 0.9,
                      lineHeight: 1.5
                    }}>
                      <span style={{ color: '#34d399', fontSize: '1.2rem', marginTop: '0.1rem' }}>
                        ✓
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
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
              fontSize: '2.5rem',
              marginBottom: '2rem',
              background: 'linear-gradient(45deg, #34d399, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Prêt à commencer ?
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '3rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Téléchargez Hostolink maintenant et découvrez une nouvelle façon 
              de gérer vos paiements santé en toute simplicité.
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '1.5rem 3rem',
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
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
                }}
                 onClick={() => {
      document.getElementById('hidden-apk-link').click();
    }}
              >
                📱 Télécharger maintenant
              </button>
              <a
    id="hidden-apk-link"
    href="/apk/hostolink.apk"
    download
    style={{ display: 'none' }}
  />
              <button
                style={{
                  padding: '1.5rem 3rem',
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
                  e.target.style.transform = 'scale(1.05)';
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
      `}</style>
    </div>
  );
};

export default DownloadPage;