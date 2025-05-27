import React, { useState, useEffect } from 'react';

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [formStatus, setFormStatus] = useState('');
  const [activeOffice, setActiveOffice] = useState(0);

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

  // Rotation automatique des bureaux
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffice(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulation envoi
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });
      setTimeout(() => setFormStatus(''), 3000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contact@hostolink.com',
      desc: 'Réponse sous 24h',
      color: 'from-blue-500 to-blue-600',
      action: 'mailto:contact@hostolink.com'
    },
    {
      icon: '📱',
      title: 'Téléphone',
      value: '+225 27 20 25 00 00',
      desc: 'Lun-Ven 8h-18h',
      color: 'from-green-500 to-green-600',
      action: 'tel:+22527202500'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+225 07 08 09 10 11',
      desc: 'Support instantané',
      color: 'from-emerald-500 to-emerald-600',
      action: 'https://wa.me/22507080910'
    },
    {
      icon: '🎧',
      title: 'Chat en direct',
      value: 'Support 24/7',
      desc: 'Assistance immédiate',
      color: 'from-purple-500 to-purple-600',
      action: '#'
    }
  ];

  const offices = [
    {
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      address: 'Plateau, Rue du Commerce\nImmeuble Alpha 2000, 12ème étage',
      phone: '+225 27 20 25 00 00',
      email: 'abidjan@hostolink.com',
      hours: 'Lun-Ven: 8h-18h\nSam: 9h-13h',
      flag: '🇨🇮',
      isHeadquarters: true
    },
    {
      city: 'Dakar',
      country: 'Sénégal',
      address: 'Almadies, VDN\nCentre d\'affaires Keur Gorgui',
      phone: '+221 33 123 45 67',
      email: 'dakar@hostolink.com',
      hours: 'Lun-Ven: 8h-17h',
      flag: '🇸🇳',
      isHeadquarters: false
    },
    {
      city: 'Lomé',
      country: 'Togo',
      address: 'Boulevard du 13 Janvier\nQuartier des Affaires',
      phone: '+228 22 61 80 90',
      email: 'lome@hostolink.com',
      hours: 'Lun-Ven: 8h-17h',
      flag: '🇹🇬',
      isHeadquarters: false
    }
  ];

  const faqItems = [
    {
      question: 'Comment créer un compte Hostolink ?',
      answer: 'Téléchargez l\'app, suivez l\'inscription en 3 étapes simples avec vérification par SMS.'
    },
    {
      question: 'Quels sont les frais de transaction ?',
      answer: 'Les frais varient selon le type de transaction. Consultez notre grille tarifaire dans l\'app.'
    },
    {
      question: 'Comment sécuriser mon compte ?',
      answer: 'Activez l\'authentification 2FA et utilisez un mot de passe fort. Nous utilisons le cryptage bancaire.'
    },
    {
      question: 'Puis-je annuler une transaction ?',
      answer: 'Les transactions peuvent être annulées dans les 5 minutes suivant l\'envoi si elles sont en attente.'
    }
  ];

  const socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#', color: '#1877F2' },
    { icon: '🐦', name: 'Twitter', url: '#', color: '#1DA1F2' },
    { icon: '📷', name: 'Instagram', url: '#', color: '#E4405F' },
    { icon: '💼', name: 'LinkedIn', url: '#', color: '#0A66C2' },
    { icon: '📺', name: 'YouTube', url: '#', color: '#FF0000' }
  ];

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #7c3aed 70%, #ec4899 100%)',
    minHeight: '100vh',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    fontSize: '1rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  return (
    <div style={containerStyle}>

      {/* Particules animées */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              borderRadius: '50%',
              backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
              transform: `translate(${mousePosition.x * (8 + i * 0.2)}px, ${mousePosition.y * (6 + i * 0.1)}px)`,
              transition: 'transform 0.3s ease',
              animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
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
              💬 Nous sommes là pour vous
            </div>

            <h1 style={{
              fontSize: window.innerWidth > 768 ? '4.5rem' : '2.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              background: `linear-gradient(45deg, 
                hsl(${200 + mousePosition.x * 40}, 100%, 70%), 
                hsl(${280 + mousePosition.y * 40}, 100%, 75%))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}>
              Contactez-nous
            </h1>

            <p style={{
              fontSize: '1.4rem',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Notre équipe d'experts est disponible pour répondre à toutes vos questions 
              et vous accompagner dans votre expérience Hostolink.
            </p>
          </div>

          {/* Méthodes de contact rapides */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    padding: '2rem 1.5rem',
                    borderRadius: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-5px)';
                    e.target.style.background = `linear-gradient(135deg, ${method.color.replace('from-', '').replace(' to-', ', ')}, rgba(255,255,255,0.1))`;
                    e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0px)';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginBottom: '1rem',
                    transform: `rotate(${Math.sin((Date.now() / 1000 + index) * 2) * 5}deg)`
                  }}>
                    {method.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {method.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '0.3rem',
                    color: '#60a5fa'
                  }}>
                    {method.value}
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.7
                  }}>
                    {method.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section Formulaire + Bureaux */}
      <section 
        id="contact-form"
        data-animate
        style={{
          padding: '6rem 2rem',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
            gap: '4rem',
            alignItems: 'start'
          }}>
            
            {/* Formulaire de contact */}
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              padding: '3rem',
              border: '1px solid rgba(255,255,255,0.15)',
              transform: isVisible['contact-form'] ? 'translateX(0)' : 'translateX(-50px)',
              opacity: isVisible['contact-form'] ? 1 : 0,
              transition: 'all 1s ease'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Nom et Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                      placeholder="Votre nom et prénom"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#60a5fa';
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                      placeholder="votre@email.com"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#60a5fa';
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    />
                  </div>
                </div>

                {/* Téléphone et Catégorie */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="+225 XX XX XX XX XX"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#60a5fa';
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Catégorie
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{...inputStyle, cursor: 'pointer'}}
                    >
                      <option value="general">Question générale</option>
                      <option value="technical">Support technique</option>
                      <option value="billing">Facturation</option>
                      <option value="partnership">Partenariat</option>
                      <option value="press">Presse</option>
                    </select>
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Sujet *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Résumé de votre demande"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#60a5fa';
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    style={{...inputStyle, resize: 'vertical', minHeight: '120px'}}
                    placeholder="Décrivez votre demande en détail..."
                    onFocus={(e) => {
                      e.target.style.borderColor = '#60a5fa';
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  />
                </div>

                {/* Priorité */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Priorité
                  </label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {['normal', 'urgent', 'critique'].map(priority => (
                      <label key={priority} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={handleInputChange}
                          style={{ accentColor: '#60a5fa' }}
                        />
                        <span style={{ textTransform: 'capitalize' }}>{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  style={{
                    padding: '1.2rem 2rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '15px',
                    background: formStatus === 'success' 
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: formStatus === 'sending' ? 0.7 : 1,
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (formStatus !== 'sending') {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {formStatus === 'sending' ? '📤 Envoi en cours...' : 
                   formStatus === 'success' ? '✅ Message envoyé !' : 
                   '🚀 Envoyer le message'}
                </button>

                {formStatus === 'success' && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10b981',
                    borderRadius: '10px',
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#10b981'
                  }}>
                    ✅ Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.
                  </div>
                )}
              </form>
            </div>

            {/* Informations bureaux */}
            <div style={{
              transform: isVisible['contact-form'] ? 'translateX(0)' : 'translateX(50px)',
              opacity: isVisible['contact-form'] ? 1 : 0,
              transition: 'all 1s ease 0.3s'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #ec4899, #be185d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Nos bureaux
              </h2>

              {/* Navigation bureaux */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                {offices.map((office, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveOffice(index)}
                    style={{
                      padding: '0.8rem 1.5rem',
                      border: 'none',
                      borderRadius: '20px',
                      background: activeOffice === index 
                        ? 'linear-gradient(135deg, #ec4899, #be185d)'
                        : 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>{office.flag}</span>
                    {office.city}
                    {office.isHeadquarters && <span style={{ fontSize: '0.8rem' }}>🏢</span>}
                  </button>
                ))}
              </div>

              {/* Détails du bureau actif */}
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '2.5rem',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <span style={{ fontSize: '3rem' }}>{offices[activeOffice].flag}</span>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                      {offices[activeOffice].city}
                    </h3>
                    <p style={{ color: '#a78bfa', fontSize: '1.1rem' }}>
                      {offices[activeOffice].country}
                      {offices[activeOffice].isHeadquarters && ' (Siège social)'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📍</span>
                    <div>
                      <strong>Adresse :</strong>
                      <p style={{ opacity: 0.8, whiteSpace: 'pre-line', marginTop: '0.3rem' }}>
                        {offices[activeOffice].address}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📞</span>
                    <div>
                      <strong>Téléphone :</strong>
                      <a href={`tel:${offices[activeOffice].phone}`} style={{ 
                        color: '#60a5fa', 
                        textDecoration: 'none', 
                        marginLeft: '0.5rem' 
                      }}>
                        {offices[activeOffice].phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📧</span>
                    <div>
                      <strong>Email :</strong>
                      <a href={`mailto:${offices[activeOffice].email}`} style={{ 
                        color: '#60a5fa', 
                        textDecoration: 'none', 
                        marginLeft: '0.5rem' 
                      }}>
                        {offices[activeOffice].email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🕒</span>
                    <div>
                      <strong>Horaires :</strong>

                      <p style={{ opacity: 0.8, whiteSpace: 'pre-line', marginTop: '0.3rem' }}>
                        {offices[activeOffice].hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte simulée */}
              <div style={{
                marginTop: '2rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  transform: `scale(${1 + Math.sin(Date.now() / 1000) * 0.1})`
                }}>
                  🗺️
                </div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  Localisation
                </h4>
                <p style={{ opacity: 0.8 }}>
                  Carte interactive disponible dans l&apos;application mobile
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section 
        id="faq"
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
            marginBottom: '3rem',
            background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.faq ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.faq ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Questions fréquentes
          </h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transform: isVisible.faq 
                    ? 'translateY(0)' 
                    : 'translateY(30px)',
                  opacity: isVisible.faq ? 1 : 0,
                  transition: `all 1s ease ${index * 0.1}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.12)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>❓</span>
                  {item.question}
                </h3>
                <p style={{
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: '1.1rem'
                }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '3rem'
          }}>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              opacity: 0.8
            }}>
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <button
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: '2px solid #60a5fa',
                borderRadius: '25px',
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
              💬 Poser une question
            </button>
          </div>
        </div>
      </section>

      {/* Section Réseaux sociaux */}
      <section 
        id="social"
        data-animate
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #34d399, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: isVisible.social ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.social ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            Suivez-nous
          </h2>

          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            opacity: 0.8
          }}>
            Restez connecté avec Hostolink sur nos réseaux sociaux pour les dernières actualités
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1.8rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(255,255,255,0.2)',
                  transform: isVisible.social 
                    ? 'translateY(0) scale(1)' 
                    : 'translateY(30px) scale(0.8)',
                  opacity: isVisible.social ? 1 : 0,
                  transitionDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = social.color;
                  e.target.style.transform = 'translateY(-5px) scale(1.1)';
                  e.target.style.borderColor = social.color;
                  e.target.style.boxShadow = `0 10px 30px ${social.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer de contact */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '3rem 2rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Prêt à nous rejoindre ?
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Téléchargez Hostolink et découvrez une nouvelle façon de gérer vos paiements santé
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <button
                style={{
                  padding: '1.2rem 2.5rem',
                  fontSize: '1.1rem',
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
                📱 Télécharger l&apos;app
              </button>
               <a
    id="hidden-apk-link"
    href="/apk/hostolink.apk"
    download
    style={{ display: 'none' }}
  />
              
              <button
                style={{
                  padding: '1.2rem 2.5rem',
                  fontSize: '1.1rem',
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
                📧 Nous contacter
              </button>
            </div>

            <div style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '2rem'
            }}>
              <p>
                Support 24h - Présent dans 3 pays - Réponse garantie
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        input::placeholder,
        textarea::placeholder {
          color: rgba(255,255,255,0.5);
        }
        
        select option {
          background: #1e293b;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;