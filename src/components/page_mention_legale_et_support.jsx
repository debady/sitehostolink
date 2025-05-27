import React, { useState, useEffect } from 'react';

const LegalPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('cgu');
  const [isVisible, setIsVisible] = useState({});

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

  const sections = [
    { id: 'cgu', title: 'Conditions Générales d\'Utilisation', icon: '📋' },
    { id: 'privacy', title: 'Politique de Confidentialité', icon: '🔒' },
    { id: 'cookies', title: 'Politique des Cookies', icon: '🍪' },
    { id: 'mentions', title: 'Mentions Légales', icon: '⚖️' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'cgu':
        return (
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#60a5fa' }}>
              📋 Conditions Générales d'Utilisation
            </h2>
            <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '2rem' }}>
              Dernière mise à jour : 15 novembre 2024
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>1. Acceptation des conditions</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  En utilisant l'application Hostolink, vous acceptez pleinement et sans réserve les présentes 
                  Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>2. Description du service</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Hostolink est une application mobile de paiement dédiée aux établissements de santé et pharmacies. 
                  Notre service permet de :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Effectuer des paiements sécurisés pour vos soins de santé</li>
                  <li>Localiser des établissements de santé à proximité</li>
                  <li>Échanger avec la communauté santé</li>
                  <li>Gérer vos dépenses de santé</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>3. Inscription et compte utilisateur</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Pour utiliser Hostolink, vous devez créer un compte en fournissant des informations exactes et à jour. 
                  Vous êtes responsable de la confidentialité de vos identifiants de connexion.
                </p>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  <strong>Conditions d'éligibilité :</strong>
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Être âgé de 18 ans minimum</li>
                  <li>Résider dans un pays où le service est disponible</li>
                  <li>Disposer d'un numéro de téléphone valide</li>
                  <li>Un seul compte par personne</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>4. Utilisation des services de paiement</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  <strong>Limites de transaction :</strong>
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Solde maximum : 2 000 000 F CFA</li>
                  <li>Transactions mensuelles : 10 000 000 F CFA maximum</li>
                  <li>Vérification d'identité requise pour certains montants</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>5. Frais et tarification</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Les frais de transaction varient selon le type d'opération. Tous les frais sont clairement 
                  affichés avant validation de la transaction. SohapiGroup se réserve le droit de modifier 
                  sa grille tarifaire avec un préavis de 30 jours.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>6. Sécurité et protection</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Nous mettons en place des mesures de sécurité conformes aux standards bancaires :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Cryptage AES-256 de toutes les données</li>
                  <li>Authentification à deux facteurs (2FA)</li>
                  <li>Conformité PCI-DSS et RGPD</li>
                  <li>Surveillance 24/7 des transactions</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>7. Résiliation</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Vous pouvez résilier votre compte à tout moment via l'application. En cas de violation 
                  des présentes conditions, SohapiGroup se réserve le droit de suspendre ou fermer votre compte.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>8. Contact</h3>
                <p style={{ lineHeight: 1.6 }}>
                  Pour toute question concernant ces conditions : 
                  <strong> legal@hostolink.com</strong>
                </p>
              </section>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#10b981' }}>
              🔒 Politique de Confidentialité
            </h2>
            <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '2rem' }}>
              Dernière mise à jour : 15 novembre 2024
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>1. Collecte des données</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Nous collectons uniquement les données nécessaires au fonctionnement de notre service :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li><strong>Données d'identification :</strong> nom, prénom, date de naissance</li>
                  <li><strong>Coordonnées :</strong> adresse email, numéro de téléphone</li>
                  <li><strong>Données de transaction :</strong> historique des paiements</li>
                  <li><strong>Données de géolocalisation :</strong> uniquement si activée</li>
                  <li><strong>Données d'usage :</strong> interactions avec l'application</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>2. Utilisation des données</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Fournir et améliorer nos services</li>
                  <li>Vérifier votre identité et prévenir la fraude</li>
                  <li>Vous envoyer des notifications importantes</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>Personnaliser votre expérience utilisateur</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>3. Partage des données</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Nous ne vendons jamais vos données personnelles. Nous les partageons uniquement :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Avec les établissements de santé pour les transactions</li>
                  <li>Avec nos partenaires techniques (hébergement sécurisé)</li>
                  <li>Avec les autorités si requis par la loi</li>
                  <li>Avec votre consentement explicite</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>4. Conservation des données</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Nous conservons vos données personnelles :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Pendant la durée de votre compte actif</li>
                  <li>5 ans après fermeture pour les données de transaction (obligation légale)</li>
                  <li>1 an pour les données de géolocalisation</li>
                  <li>Suppression possible sur demande (sauf obligations légales)</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>5. Vos droits RGPD</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li><strong>Droit d'accès :</strong> consulter vos données</li>
                  <li><strong>Droit de rectification :</strong> corriger vos données</li>
                  <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                  <li><strong>Droit de portabilité :</strong> récupérer vos données</li>
                  <li><strong>Droit d'opposition :</strong> refuser certains traitements</li>
                </ul>
                <p style={{ lineHeight: 1.6, marginTop: '1rem' }}>
                  Pour exercer ces droits : <strong>privacy@hostolink.com</strong>
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>6. Sécurité des données</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Nous protégeons vos données avec :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Cryptage AES-256 en transit et au repos</li>
                  <li>Serveurs sécurisés avec accès limité</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Formation du personnel à la protection des données</li>
                </ul>
              </section>
            </div>
          </div>
        );

      case 'cookies':
        return (
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#f59e0b' }}>
              🍪 Politique des Cookies
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Qu'est-ce qu'un cookie ?</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite 
                  sur notre site web ou utilisation de notre application.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Types de cookies utilisés</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '10px' }}>
                    <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>🔧 Cookies techniques (obligatoires)</h4>
                    <p style={{ lineHeight: 1.6 }}>
                      Nécessaires au fonctionnement de l'application : authentification, sécurité, préférences de session.
                    </p>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '10px' }}>
                    <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>📊 Cookies analytiques (optionnels)</h4>
                    <p style={{ lineHeight: 1.6 }}>
                      Nous aident à comprendre l'utilisation de l'app pour l'améliorer (Google Analytics anonymisé).
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Gestion des cookies</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Vous pouvez contrôler les cookies via :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Les paramètres de votre navigateur</li>
                  <li>Notre bandeau de consentement</li>
                  <li>Vos préférences dans l'application</li>
                </ul>
              </section>
            </div>
          </div>
        );

      case 'mentions':
        return (
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#ec4899' }}>
              ⚖️ Mentions Légales
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Éditeur</h3>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '10px' }}>
                  <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
                    <strong>SohapiGroup</strong><br />
                    Société par Actions Simplifiée<br />
                    Capital social : 10 000 000 F CFA<br />
                    RCCM : CI-ABJ-2017-B-12345<br />
                    Siège social : Plateau, Rue du Commerce<br />
                    Immeuble Alpha 2000, 12ème étage<br />
                    Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Directeur de publication</h3>
                <p style={{ lineHeight: 1.6 }}>Dr. Konan Yves, CEO SohapiGroup</p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Hébergement</h3>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '10px' }}>
                  <p style={{ lineHeight: 1.8 }}>
                    <strong>Amazon Web Services (AWS)</strong><br />
                    410 Terry Avenue North<br />
                    Seattle, WA 98109, États-Unis<br />
                    Téléphone : +1 206-266-1000
                  </p>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Propriété intellectuelle</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  L'ensemble du contenu de l'application Hostolink (textes, images, vidéos, logos, icônes) 
                  est protégé par le droit d'auteur et appartient à SohapiGroup ou à ses partenaires.
                </p>
                <p style={{ lineHeight: 1.6 }}>
                  Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Réglementation</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                  Hostolink est conforme aux réglementations :
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: 1.8 }}>
                  <li>Loi ivoirienne sur les services financiers numériques</li>
                  <li>Directives BCEAO sur les paiements électroniques</li>
                  <li>Règlement Général sur la Protection des Données (RGPD)</li>
                  <li>Standards PCI-DSS pour la sécurité des cartes</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>Contact</h3>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '10px' }}>
                  <p style={{ lineHeight: 1.8 }}>
                    📧 Email : legal@hostolink.com<br />
                    📞 Téléphone : +225 27 20 25 00 00<br />
                    📍 Adresse : Plateau, Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </section>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #6366f1 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>

      {/* Particules d'arrière-plan */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: '50%',
              backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6'][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              transform: `translate(${mousePosition.x * (5 + i * 0.1)}px, ${mousePosition.y * (3 + i * 0.05)}px)`,
              transition: 'transform 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: window.innerWidth > 768 ? '3.5rem' : '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: `linear-gradient(45deg, 
              hsl(${220 + mousePosition.x * 20}, 100%, 70%), 
              hsl(${260 + mousePosition.y * 20}, 100%, 80%))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Informations Légales
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Transparence et conformité : découvrez nos conditions d'utilisation et notre politique de protection des données
          </p>
        </div>
      </section>

      {/* Navigation des sections */}
      <section style={{
        padding: '2rem',
        position: 'relative',
        zIndex: 10,
        background: 'rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
            gap: '1rem'
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: '1.5rem',
                  border: 'none',
                  borderRadius: '15px',
                  background: activeSection === section.id 
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {section.icon}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {section.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu de la section active */}
      <section 
        id="legal-content"
        data-animate
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.15)',
            transform: isVisible['legal-content'] ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible['legal-content'] ? 1 : 0,
            transition: 'all 1s ease'
          }}>
            {renderContent()}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        background: 'rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Questions légales ?
          </h3>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Notre équipe juridique est à votre disposition pour répondre à toutes vos questions
          </p>
          <button
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => window.location.href = '/contact'}
          >
            📧 Contacter notre équipe juridique
          </button>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LegalPage;