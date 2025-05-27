// import React, { useState, useEffect } from 'react';

// const ReviewsPage = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState({});
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [reviewForm, setReviewForm] = useState({
//     name: '',
//     email: '',
//     rating: 0,
//     title: '',
//     comment: '',
//     recommend: true,
//     category: 'general'
//   });
//   const [showSparkles, setShowSparkles] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('recent');

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ 
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: (e.clientY / window.innerHeight) * 2 - 1
//       });
//     };

//     const handleScroll = () => setScrollY(window.scrollY);

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Observer pour animations au scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setIsVisible(prev => ({
//             ...prev,
//             [entry.target.id]: entry.isIntersecting
//           }));
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = document.querySelectorAll('[data-animate]');
//     elements.forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   // Données des avis clients
//   const reviews = [
//     {
//       id: 1,
//       name: 'Dr. Aminata Koné',
//       role: 'Médecin, CHU Cocody',
//       avatar: '👩‍⚕️',
//       rating: 5,
//       title: 'Une révolution pour notre établissement',
//       comment: 'Hostolink a transformé notre façon de recevoir les paiements. Les patients apprécient la simplicité et nous, la sécurité des transactions.',
//       date: '2024-11-15',
//       category: 'etablissement',
//       helpful: 24,
//       verified: true
//     },
//     {
//       id: 2,
//       name: 'Jean-Baptiste Traoré',
//       role: 'Patient',
//       avatar: '👨',
//       rating: 5,
//       title: 'Parfait pour gérer mes frais de santé',
//       comment: 'Je peux enfin mettre de l\'argent de côté pour la santé de ma famille. L\'app est intuitive et le support client excellent.',
//       date: '2024-11-10',
//       category: 'patient',
//       helpful: 18,
//       verified: true
//     },
//     {
//       id: 3,
//       name: 'Pharmacie Centrale',
//       role: 'Pharmacie, Plateau',
//       avatar: '🏪',
//       rating: 4,
//       title: 'Très utile, quelques améliorations possibles',
//       comment: 'L\'intégration a été simple et nos clients adorent payer avec Hostolink. J\'aimerais voir plus d\'options de reporting.',
//       date: '2024-11-08',
//       category: 'etablissement',
//       helpful: 12,
//       verified: true
//     },
//     {
//       id: 4,
//       name: 'Marie Ouattara',
//       role: 'Patiente',
//       avatar: '👩',
//       rating: 5,
//       title: 'La géolocalisation est géniale !',
//       comment: 'Trouver des pharmacies ouvertes la nuit n\'a jamais été aussi facile. Et le réseau social m\'aide à échanger avec d\'autres mamans.',
//       date: '2024-11-05',
//       category: 'patient',
//       helpful: 31,
//       verified: true
//     },
//     {
//       id: 5,
//       name: 'Clinique des Deux Plateaux',
//       role: 'Clinique privée',
//       avatar: '🏥',
//       rating: 5,
//       title: 'Indispensable pour notre clinique',
//       comment: 'Nos patients peuvent désormais payer leurs consultations avant même d\'arriver. Cela fluidifie énormément nos rendez-vous.',
//       date: '2024-11-02',
//       category: 'etablissement',
//       helpful: 20,
//       verified: true
//     },
//     {
//       id: 6,
//       name: 'Ibrahim Diallo',
//       role: 'Patient',
//       avatar: '👨',
//       rating: 4,
//       title: 'Bon service, interface à améliorer',
//       comment: 'L\'app fonctionne bien pour les paiements mais l\'interface pourrait être plus moderne. Le service client répond rapidement.',
//       date: '2024-10-28',
//       category: 'patient',
//       helpful: 8,
//       verified: false
//     }
//   ];

//   const stats = {
//     totalReviews: 1247,
//     averageRating: 4.8,
//     satisfaction: 96,
//     ratings: {
//       5: 78,
//       4: 15,
//       3: 4,
//       2: 2,
//       1: 1
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setReviewForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleRatingClick = (rating) => {
//     setSelectedRating(rating);
//     setReviewForm(prev => ({ ...prev, rating }));
//   };

//   const createSparkles = () => {
//     setShowSparkles(true);
//     setTimeout(() => setShowSparkles(false), 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (reviewForm.rating === 0 || selectedRating === 0) {
//       alert('Veuillez sélectionner une note');
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulation d'envoi
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitSuccess(true);
//       createSparkles();
      
//       // Reset form
//       setReviewForm({
//         name: '',
//         email: '',
//         rating: 0,
//         title: '',
//         comment: '',
//         recommend: true,
//         category: 'general'
//       });
//       setSelectedRating(0);
//       setHoverRating(0);
      
//       setTimeout(() => setSubmitSuccess(false), 5000);
//     }, 2000);
//   };

//   const filteredReviews = reviews.filter(review => 
//     filterCategory === 'all' || review.category === filterCategory
//   ).sort((a, b) => {
//     if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
//     if (sortBy === 'rating') return b.rating - a.rating;
//     if (sortBy === 'helpful') return b.helpful - a.helpful;
//     return 0;
//   });

//   const renderStars = (rating, interactive = false, size = '1.5rem') => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span
//         key={index}
//         style={{
//           fontSize: size,
//           color: index < rating ? '#fbbf24' : '#e5e7eb',
//           cursor: interactive ? 'pointer' : 'default',
//           transition: 'all 0.2s ease',
//           marginRight: '0.2rem'
//         }}
//         onClick={() => interactive && handleRatingClick(index + 1)}
//         onMouseEnter={() => interactive && setHoverRating(index + 1)}
//         onMouseLeave={() => interactive && setHoverRating(0)}
//       >
//         ⭐
//       </span>
//     ));
//   };

//   return (
//     <div style={{
//       fontFamily: 'Arial, sans-serif',
//       color: '#ffffff',
//       background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #7c3aed 100%)',
//       minHeight: '100vh',
//       position: 'relative'
//     }}>

//       {/* Paillettes de célébration */}
//       {showSparkles && (
//         <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
//           {Array.from({ length: 50 }, (_, i) => (
//             <div
//               key={i}
//               style={{
//                 position: 'absolute',
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 width: '10px',
//                 height: '10px',
//                 background: ['#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#10b981'][Math.floor(Math.random() * 5)],
//                 borderRadius: '50%',
//                 animation: `sparkle ${2 + Math.random() * 2}s ease-out forwards`,
//                 animationDelay: `${Math.random() * 0.5}s`
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Particules d'arrière-plan */}
//       <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
//         {Array.from({ length: 30 }, (_, i) => (
//           <div
//             key={i}
//             style={{
//               position: 'absolute',
//               width: `${Math.random() * 4 + 2}px`,
//               height: `${Math.random() * 4 + 2}px`,
//               borderRadius: '50%',
//               backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399'][i % 4],
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: 0.4,
//               transform: `translate(${mousePosition.x * (8 + i * 0.2)}px, ${mousePosition.y * (6 + i * 0.1)}px)`,
//               transition: 'transform 0.3s ease',
//               animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Hero Section */}
//       <section style={{
//         minHeight: '80vh',
//         display: 'flex',
//         alignItems: 'center',
//         position: 'relative',
//         zIndex: 10,
//         padding: '2rem'
//       }}>
//         <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
//           <div style={{
//             textAlign: 'center',
//             marginBottom: '4rem',
//             transform: `translateY(${scrollY * 0.2}px)`
//           }}>
//             <div style={{
//               fontSize: '1.3rem',
//               color: '#fbbf24',
//               marginBottom: '1rem',
//               fontWeight: 'bold'
//             }}>
//               ⭐ Avis de nos utilisateurs
//             </div>

//             <h1 style={{
//               fontSize: window.innerWidth > 768 ? '4.5rem' : '2.8rem',
//               fontWeight: 'bold',
//               marginBottom: '2rem',
//               background: `linear-gradient(45deg, 
//                 hsl(${240 + mousePosition.x * 30}, 100%, 75%), 
//                 hsl(${280 + mousePosition.y * 30}, 100%, 80%))`,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               textShadow: '0 0 30px rgba(255,255,255,0.3)'
//             }}>
//               Ils nous font confiance
//             </h1>

//             <p style={{
//               fontSize: '1.4rem',
//               maxWidth: '700px',
//               margin: '0 auto',
//               opacity: 0.9,
//               lineHeight: 1.6
//             }}>
//               Découvrez ce que pensent nos utilisateurs de Hostolink et partagez votre propre expérience
//             </p>
//           </div>

//           {/* Statistiques des avis */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
//             gap: '2rem',
//             marginBottom: '4rem'
//           }}>
//             <div style={{
//               background: 'rgba(255,255,255,0.08)',
//               padding: '2rem',
//               borderRadius: '20px',
//               textAlign: 'center',
//               border: '1px solid rgba(255,255,255,0.15)',
//               backdropFilter: 'blur(10px)'
//             }}>
//               <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⭐</div>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>
//                 {stats.averageRating}/5
//               </div>
//               <div style={{ opacity: 0.8 }}>Note moyenne</div>
//             </div>

//             <div style={{
//               background: 'rgba(255,255,255,0.08)',
//               padding: '2rem',
//               borderRadius: '20px',
//               textAlign: 'center',
//               border: '1px solid rgba(255,255,255,0.15)',
//               backdropFilter: 'blur(10px)'
//             }}>
//               <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💬</div>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
//                 {stats.totalReviews.toLocaleString()}
//               </div>
//               <div style={{ opacity: 0.8 }}>Avis clients</div>
//             </div>

//             <div style={{
//               background: 'rgba(255,255,255,0.08)',
//               padding: '2rem',
//               borderRadius: '20px',
//               textAlign: 'center',
//               border: '1px solid rgba(255,255,255,0.15)',
//               backdropFilter: 'blur(10px)'
//             }}>
//               <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👍</div>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
//                 {stats.satisfaction}%
//               </div>
//               <div style={{ opacity: 0.8 }}>Satisfaction</div>
//             </div>

//             <div style={{
//               background: 'rgba(255,255,255,0.08)',
//               padding: '2rem',
//               borderRadius: '20px',
//               textAlign: 'center',
//               border: '1px solid rgba(255,255,255,0.15)',
//               backdropFilter: 'blur(10px)'
//             }}>
//               <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯</div>
//               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ec4899' }}>
//                 {stats.ratings[5]}%
//               </div>
//               <div style={{ opacity: 0.8 }}>5 étoiles</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section filtres et tri */}
//       <section style={{
//         padding: '2rem',
//         position: 'relative',
//         zIndex: 10,
//         background: 'rgba(0,0,0,0.1)',
//         backdropFilter: 'blur(10px)'
//       }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: '1rem',
//             marginBottom: '2rem'
//           }}>
//             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//               <span style={{ fontWeight: 'bold' }}>Filtrer par :</span>
//               {[
//                 { key: 'all', label: 'Tous' },
//                 { key: 'patient', label: 'Patients' },
//                 { key: 'etablissement', label: 'Établissements' }
//               ].map(filter => (
//                 <button
//                   key={filter.key}
//                   onClick={() => setFilterCategory(filter.key)}
//                   style={{
//                     padding: '0.5rem 1rem',
//                     border: 'none',
//                     borderRadius: '20px',
//                     background: filterCategory === filter.key 
//                       ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
//                       : 'rgba(255,255,255,0.1)',
//                     color: 'white',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>

//             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//               <span style={{ fontWeight: 'bold' }}>Trier par :</span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 style={{
//                   padding: '0.5rem 1rem',
//                   border: '2px solid rgba(255,255,255,0.2)',
//                   borderRadius: '10px',
//                   background: 'rgba(255,255,255,0.1)',
//                   color: 'white',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <option value="recent">Plus récents</option>
//                 <option value="rating">Mieux notés</option>
//                 <option value="helpful">Plus utiles</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section des avis */}
//       <section 
//         id="reviews-list"
//         data-animate
//         style={{
//           padding: '4rem 2rem',
//           position: 'relative',
//           zIndex: 10
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
//             gap: '2rem'
//           }}>
//             {filteredReviews.map((review, index) => (
//               <div
//                 key={review.id}
//                 style={{
//                   background: 'rgba(255,255,255,0.08)',
//                   padding: '2rem',
//                   borderRadius: '20px',
//                   border: '1px solid rgba(255,255,255,0.15)',
//                   backdropFilter: 'blur(10px)',
//                   transform: isVisible['reviews-list'] 
//                     ? 'translateY(0)' 
//                     : 'translateY(30px)',
//                   opacity: isVisible['reviews-list'] ? 1 : 0,
//                   transition: `all 1s ease ${index * 0.1}s`,
//                   cursor: 'pointer'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-5px)';
//                   e.target.style.background = 'rgba(255,255,255,0.12)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.background = 'rgba(255,255,255,0.08)';
//                 }}
//               >
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '1rem',
//                   marginBottom: '1rem'
//                 }}>
//                   <div style={{ fontSize: '2.5rem' }}>{review.avatar}</div>
//                   <div style={{ flex: 1 }}>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '0.5rem',
//                       marginBottom: '0.3rem'
//                     }}>
//                       <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
//                         {review.name}
//                       </h3>
//                       {review.verified && (
//                         <span style={{
//                           background: '#10b981',
//                           color: 'white',
//                           padding: '0.2rem 0.5rem',
//                           borderRadius: '10px',
//                           fontSize: '0.7rem',
//                           fontWeight: 'bold'
//                         }}>
//                           ✓ Vérifié
//                         </span>
//                       )}
//                     </div>
//                     <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{review.role}</p>
//                   </div>
//                   <div style={{ textAlign: 'right' }}>
//                     {renderStars(review.rating, false, '1.2rem')}
//                     <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.3rem' }}>
//                       {new Date(review.date).toLocaleDateString('fr-FR')}
//                     </div>
//                   </div>
//                 </div>

//                 <h4 style={{
//                   fontSize: '1.3rem',
//                   fontWeight: 'bold',
//                   marginBottom: '1rem',
//                   color: '#60a5fa'
//                 }}>
//                   {review.title}
//                 </h4>

//                 <p style={{
//                   lineHeight: 1.6,
//                   marginBottom: '1.5rem',
//                   opacity: 0.9
//                 }}>
//                   {review.comment}
//                 </p>

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   borderTop: '1px solid rgba(255,255,255,0.1)',
//                   paddingTop: '1rem'
//                 }}>
//                   <button style={{
//                     background: 'none',
//                     border: 'none',
//                     color: '#10b981',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '0.5rem',
//                     fontSize: '0.9rem'
//                   }}>
//                     👍 Utile ({review.helpful})
//                   </button>
//                   <span style={{
//                     padding: '0.3rem 0.8rem',
//                     background: review.category === 'patient' ? '#3b82f6' : '#ec4899',
//                     borderRadius: '15px',
//                     fontSize: '0.8rem',
//                     fontWeight: 'bold'
//                   }}>
//                     {review.category === 'patient' ? 'Patient' : 'Établissement'}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Formulaire d'avis */}
//       <section 
//         id="review-form"
//         data-animate
//         style={{
//           padding: '6rem 2rem',
//           position: 'relative',
//           zIndex: 10,
//           background: 'rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(10px)'
//         }}
//       >
//         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//           <h2 style={{
//             fontSize: '3rem',
//             textAlign: 'center',
//             marginBottom: '2rem',
//             background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             transform: isVisible['review-form'] ? 'translateY(0)' : 'translateY(50px)',
//             opacity: isVisible['review-form'] ? 1 : 0,
//             transition: 'all 1s ease'
//           }}>
//             Donnez votre avis
//           </h2>

//           <p style={{
//             textAlign: 'center',
//             fontSize: '1.2rem',
//             marginBottom: '3rem',
//             opacity: 0.8
//           }}>
//             Votre expérience nous intéresse ! Partagez votre avis pour aider d'autres utilisateurs.
//           </p>

//           {submitSuccess && (
//             <div style={{
//               background: 'linear-gradient(135deg, #10b981, #059669)',
//               padding: '1.5rem',
//               borderRadius: '15px',
//               textAlign: 'center',
//               marginBottom: '2rem',
//               animation: 'fadeIn 0.5s ease'
//             }}>
//               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
//               <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
//                 Merci pour votre avis !
//               </h3>
//               <p style={{ opacity: 0.9 }}>
//                 Votre retour a été publié avec succès et sera visible après modération.
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{
//             background: 'rgba(255,255,255,0.08)',
//             padding: '3rem',
//             borderRadius: '25px',
//             border: '1px solid rgba(255,255,255,0.15)',
//             backdropFilter: 'blur(20px)',
//             transform: isVisible['review-form'] ? 'translateY(0)' : 'translateY(50px)',
//             opacity: isVisible['review-form'] ? 1 : 0,
//             transition: 'all 1s ease 0.3s'
//           }}>
            
//             {/* Nom et Email */}
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
//               gap: '1.5rem',
//               marginBottom: '2rem'
//             }}>
//               <div>
//                 <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
//                   Nom complet *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={reviewForm.name}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '1rem',
//                     border: '2px solid rgba(255,255,255,0.2)',
//                     borderRadius: '10px',
//                     background: 'rgba(255,255,255,0.05)',
//                     color: 'white',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.3s ease'
//                   }}
//                   placeholder="Votre nom et prénom"
//                   onFocus={(e) => e.target.style.borderColor = '#fbbf24'}
//                   onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
//                 />
//               </div>

//               <div>
//                 <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={reviewForm.email}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '1rem',
//                     border: '2px solid rgba(255,255,255,0.2)',
//                     borderRadius: '10px',
//                     background: 'rgba(255,255,255,0.05)',
//                     color: 'white',
//                     fontSize: '1rem',
//                     outline: 'none',
//                     transition: 'border-color 0.3s ease'
//                   }}
//                   placeholder="votre@email.com"
//                   onFocus={(e) => e.target.style.borderColor = '#fbbf24'}
//                   onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
//                 />
//               </div>
//             </div>

//             {/* Note et catégorie
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
//               gap: '1.5rem',
//               marginBottom: '2rem'
//             }}>
//               <div>
//                 <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
//                   Votre note *
//                 </label>
//                 <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
//                   {renderStars(hoverRating || selectedRating, true, '2rem')}
//                 </div>
//                 <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
//                   {selectedRating === 0 && 'Cliquez pour noter'}
//                   {selectedRating === 1 && 'Très déçu'}
//                   {selectedRating === 2 && 'Déçu'}
//                   {selectedRating === 3 && 'Correct'}
//                   {selectedRating === 4 && 'Satisfait'}
//                   {selectedRating === 5 && ' */}