page de depart 

// import React, { useState, useEffect } from 'react';

// const ReactiveWebsite = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ 
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: (e.clientY / window.innerHeight) * 2 - 1
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const containerStyle = {
//     minHeight: '100vh',
//     background: `linear-gradient(135deg, 
//       hsl(${240 + mousePosition.x * 50}, 70%, 20%), 
//       hsl(${280 + mousePosition.y * 50}, 70%, 30%))`,
//     color: 'white',
//     fontFamily: 'Arial, sans-serif',
//     overflow: 'hidden',
//     position: 'relative'
//   };

//   const titleStyle = {
//     fontSize: '4rem',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingTop: '20vh',
//     background: `linear-gradient(45deg, 
//       hsl(${280 + mousePosition.x * 100}, 100%, 70%), 
//       hsl(${320 + mousePosition.y * 100}, 100%, 70%))`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     transform: `scale(${1 + Math.abs(mousePosition.x) * 0.2})`,
//     transition: 'transform 0.1s ease',
//     textShadow: '0 0 20px rgba(255,255,255,0.5)'
//   };

//   const subtitleStyle = {
//     fontSize: '1.5rem',
//     textAlign: 'center',
//     marginTop: '2rem',
//     opacity: 0.8 + Math.abs(mousePosition.y) * 0.2,
//     transform: `translateY(${mousePosition.y * 20}px)`,
//     transition: 'all 0.3s ease'
//   };

//   const buttonStyle = {
//     display: 'inline-block',
//     padding: '15px 30px',
//     margin: '2rem 1rem',
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//     borderRadius: '50px',
//     border: 'none',
//     cursor: 'pointer',
//     background: `linear-gradient(135deg, 
//       hsl(${280 + mousePosition.x * 50}, 80%, 60%), 
//       hsl(${320 + mousePosition.y * 50}, 80%, 70%))`,
//     color: 'white',
//     transform: `scale(${1 + Math.abs(mousePosition.x) * 0.1})`,
//     transition: 'all 0.3s ease',
//     boxShadow: `0 10px 30px rgba(139, 92, 246, ${0.3 + Math.abs(mousePosition.x) * 0.3})`
//   };

//   const gridContainerStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(6, 1fr)',
//     gap: '1rem',
//     padding: '4rem 2rem',
//     maxWidth: '800px',
//     margin: '0 auto'
//   };

//   const gridItemStyle = (index) => ({
//     aspectRatio: '1',
//     borderRadius: '10px',
//     background: `linear-gradient(${mousePosition.x * 180 + index * 30}deg, 
//       hsl(${(mousePosition.x + mousePosition.y) * 180 + index * 20}, 70%, 60%), 
//       hsl(${(mousePosition.x - mousePosition.y) * 180 + index * 40}, 70%, 70%))`,
//     transform: `scale(${0.8 + Math.sin((mousePosition.x + mousePosition.y + index) * 5) * 0.3}) 
//                rotate(${mousePosition.x * 90 + index * 10}deg)`,
//     transition: 'transform 0.1s ease',
//     cursor: 'pointer'
//   });

//   const particleStyle = (index) => ({
//     position: 'absolute',
//     width: '4px',
//     height: '4px',
//     borderRadius: '50%',
//     background: ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981'][index % 4],
//     left: `${(index * 7) % 100}%`,
//     top: `${(index * 11) % 100}%`,
//     transform: `translate(${mousePosition.x * (30 + index * 3)}px, ${mousePosition.y * (30 + index * 3)}px)`,
//     transition: 'transform 0.5s ease',
//     opacity: 0.6
//   });

//   return (
//     <div style={containerStyle}>
      
//       {/* Particules d'arrière-plan */}
//       {[...Array(30)].map((_, i) => (
//         <div key={i} style={particleStyle(i)} />
//       ))}

//       {/* Contenu principal */}
//       <div style={{ position: 'relative', zIndex: 10 }}>
        
//         {/* Hero */}
//         <div style={{ textAlign: 'center' }}>
//           <h1 style={titleStyle}>SITE RÉACTIF</h1>
//           <p style={subtitleStyle}>
//             Une expérience qui réagit à tes mouvements
//           </p>
          
//           <div style={{ marginTop: '3rem' }}>
//             <button 
//               style={buttonStyle}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'scale(1.2)';
//                 e.target.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.6)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = `scale(${1 + Math.abs(mousePosition.x) * 0.1})`;
//                 e.target.style.boxShadow = `0 10px 30px rgba(139, 92, 246, ${0.3 + Math.abs(mousePosition.x) * 0.3})`;
//               }}
//             >
//               Découvrir
//             </button>
//           </div>
//         </div>

//         {/* Section interactive */}
//         <div style={{ padding: '4rem 2rem' }}>
//           <h2 style={{
//             fontSize: '2.5rem',
//             textAlign: 'center',
//             marginBottom: '3rem',
//             background: `linear-gradient(90deg, 
//               hsl(${200 + mousePosition.x * 60}, 100%, 70%), 
//               hsl(${280 + mousePosition.y * 60}, 100%, 70%))`,
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent'
//           }}>
//             Zone Interactive
//           </h2>
          
//           <p style={{
//             textAlign: 'center',
//             fontSize: '1.3rem',
//             marginBottom: '3rem',
//             opacity: 0.8
//           }}>
//             Bouge ta souris et regarde la magie !
//           </p>

//           {/* Grille interactive */}
//           <div style={gridContainerStyle}>
//             {[...Array(18)].map((_, i) => (
//               <div
//                 key={i}
//                 style={gridItemStyle(i)}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = `scale(1.3) rotate(${mousePosition.x * 90 + i * 10 + 180}deg)`;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = `scale(0.8) rotate(${mousePosition.x * 90 + i * 10}deg)`;
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div style={{
//           textAlign: 'center',
//           padding: '2rem',
//           opacity: 0.7,
//           fontSize: '1.1rem'
//         }}>
//           ✨ Site réactif créé avec React pur ✨
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReactiveWebsite;



// import React, { useState, useEffect } from 'react';
// import { AIBot } from './faqs';


// const HostolinkHomepage = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState({});

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

//     document.querySelectorAll('[data-animate]').forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const phoneStyle = {
//     transform: `
//       perspective(1000px) 
//       rotateY(${mousePosition.x * 10}deg) 
//       rotateX(${mousePosition.y * 5}deg) 
//       translateY(${scrollY * 0.3}px)
//       scale(${1 + Math.abs(mousePosition.x) * 0.1})
//     `,
//     transition: 'transform 0.1s ease'
//   };

//   const floatingAnimation = (index, delay = 0) => ({
//     transform: `translateY(${Math.sin((Date.now() / 1000 + delay) * 0.5) * 20}px)`,
//     animationDelay: `${delay}s`
//   });

//   return (
//     <div style={{ 
//       fontFamily: 'Arial, sans-serif', 
//       color: '#ffffff',
//       background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)',
//       minHeight: '100vh',
//       overflow: 'hidden',
//       position: 'relative'
//     }}>
//         <AIBot showInCorner={true} />
//       {/* Particules flottantes */}
//       <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             style={{
//               position: 'absolute',
//               width: `${Math.random() * 6 + 2}px`,
//               height: `${Math.random() * 6 + 2}px`,
//               borderRadius: '50%',
//               backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399'][i % 4],
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: 0.6,
//               transform: `translate(${mousePosition.x * (20 + i * 2)}px, ${mousePosition.y * (15 + i)}px)`,
//               transition: 'transform 0.3s ease',
//               animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Hero Section */}
//       <section style={{ 
//         minHeight: '100vh', 
//         display: 'flex', 
//         alignItems: 'center', 
//         position: 'relative',
//         zIndex: 10,
//         padding: '0 2rem'
//       }}>
//         <div style={{ 
//           maxWidth: '1200px', 
//           margin: '0 auto', 
//           display: 'grid', 
//           gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
//           gap: '4rem',
//           alignItems: 'center'
//         }}>
          
//           {/* Contenu texte */}
//           <div style={{
//             transform: `translateY(${scrollY * 0.2}px)`,
//             opacity: 1 - scrollY * 0.001
//           }}>
//             <div style={{
//               fontSize: '1.2rem',
//               color: '#BD6819FF',
//               marginBottom: '1rem',
//               fontWeight: 'bold',
//               transform: `translateX(${mousePosition.x * 10}px)`
//             }}>
//               🏥 Révolution Santé Numérique
//             </div>

//             <h1 style={{
//               fontSize: window.innerWidth > 768 ? '4rem' : '2.5rem',
//               fontWeight: 'bold',
//               lineHeight: 1.1,
//               marginBottom: '2rem',
//               background: `linear-gradient(45deg, 
//                 hsl(${200 + mousePosition.x * 30}, 100%, 80%), 
//                 hsl(${280 + mousePosition.y * 30}, 100%, 90%))`,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               textShadow: '0 0 30px rgba(255,255,255,0.3)',
//               transform: `scale(${1 + Math.abs(mousePosition.y) * 0.05})`
//             }}>
//               HOSTOLINK
//               <br />
//               <span style={{ fontSize: '0.7em', opacity: 0.9 }}>
//                 Paiements Santé Simplifiés
//               </span>
//             </h1>

//             <p style={{
//               fontSize: '1.3rem',
//               lineHeight: 1.6,
//               marginBottom: '3rem',
//               opacity: 0.9,
//               maxWidth: '500px',
//               transform: `translateY(${mousePosition.y * 5}px)`
//             }}>
//               L'application mobile qui révolutionne vos paiements de santé. 
//               Payez vos soins, trouvez des établissements et échangez avec la communauté santé.
//             </p>

//             {/* CTA Buttons */}
//             <div style={{ 
//               display: 'flex', 
//               gap: '1.5rem',
//               flexWrap: 'wrap',
//               marginBottom: '3rem'
//             }}>
//               <button
//                 style={{
//                   padding: '1rem 2rem',
//                   fontSize: '1.1rem',
//                   fontWeight: 'bold',
//                   border: 'none',
//                   borderRadius: '50px',
//                   background: 'linear-gradient(135deg, #10b981, #059669)',
//                   color: 'white',
//                   cursor: 'pointer',
//                   transform: `scale(${1 + Math.abs(mousePosition.x) * 0.05})`,
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'scale(1.1)';
//                   e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.6)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = `scale(${1 + Math.abs(mousePosition.x) * 0.05})`;
//                   e.target.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
//                 }}
//                 onClick={() => window.location.href = '/download'}
//               >
//                 📱 Télécharger l'app
//               </button>

//               <button
//                 style={{
//                   padding: '1rem 2rem',
//                   fontSize: '1.1rem',
//                   fontWeight: 'bold',
//                   border: '2px solid white',
//                   borderRadius: '50px',
//                   background: 'transparent',
//                   color: 'white',
//                   cursor: 'pointer',
//                   transform: `scale(${1 + Math.abs(mousePosition.y) * 0.05})`,
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.background = 'white';
//                   e.target.style.color = '#1e3a8a';
//                   e.target.style.transform = 'scale(1.1)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = 'transparent';
//                   e.target.style.color = 'white';
//                   e.target.style.transform = `scale(${1 + Math.abs(mousePosition.y) * 0.05})`;
//                 }}
//               >
//                 🎬 Voir la démo
//               </button>
//             </div>

//             {/* Stats rapides */}
//             <div style={{ 
//               display: 'flex', 
//               gap: '2rem',
//               flexWrap: 'wrap'
//             }}>
//               {[
//                 { num: '10K+', label: 'Utilisateurs' },
//                 { num: '500+', label: 'Établissements' },
//                 { num: '99.9%', label: 'Sécurisé' }
//               ].map((stat, index) => (
//                 <div key={index} style={{
//                   textAlign: 'center',
//                   transform: `translateY(${Math.sin((Date.now() / 1000 + index) * 0.5) * 5}px)`
//                 }}>
//                   <div style={{ 
//                     fontSize: '1.8rem', 
//                     fontWeight: 'bold',
//                     background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent'
//                   }}>
//                     {stat.num}
//                   </div>
//                   <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Mockup Phone */}
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'center',
//             alignItems: 'center',
//             position: 'relative'
//           }}>
//             <div style={phoneStyle}>
//               <div style={{
//                 width: '300px',
//                 height: '600px',
//                 background: 'linear-gradient(135deg, #1f2937, #374151)',
//                 borderRadius: '30px',
//                 padding: '20px',
//                 border: '8px solid #4b5563',
//                 boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
//                 position: 'relative',
//                 overflow: 'hidden'
//               }}>
//                 {/* Écran du téléphone */}
//                 <div style={{
//                   width: '100%',
//                   height: '100%',
//                   background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
//                   borderRadius: '20px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: 'white',
//                   fontSize: '1.5rem',
//                   fontWeight: 'bold',
//                   position: 'relative'
//                 }}>
//                   {/* Contenu de l'écran simulé */}
//                   <div style={{
//                     textAlign: 'center',
//                     transform: `translateY(${Math.sin(Date.now() / 1000) * 10}px)`
//                   }}>
//                     <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💳</div>
//                     <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>HOSTOLINK</div>
//                     <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Paiement Santé</div>
//                   </div>

//                   {/* Éléments animés sur l'écran */}
//                   {[...Array(5)].map((_, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         position: 'absolute',
//                         width: '6px',
//                         height: '6px',
//                         background: 'rgba(255,255,255,0.6)',
//                         borderRadius: '50%',
//                         left: `${20 + i * 15}%`,
//                         top: `${20 + i * 10}%`,
//                         transform: `translateY(${Math.sin((Date.now() / 1000 + i) * 2) * 15}px)`,
//                         opacity: 0.7
//                       }}
//                     />
//                   ))}
//                 </div>

//                 {/* Bouton home */}
//                 <div style={{
//                   position: 'absolute',
//                   bottom: '10px',
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   width: '60px',
//                   height: '4px',
//                   background: '#9ca3af',
//                   borderRadius: '2px'
//                 }} />
//               </div>
//             </div>

//             {/* Icônes flottantes autour du téléphone */}
//             {[
//               { icon: '💊', pos: { top: '10%', left: '10%' } },
//               { icon: '🏥', pos: { top: '20%', right: '10%' } },
//               { icon: '💳', pos: { bottom: '30%', left: '5%' } },
//               { icon: '📱', pos: { bottom: '20%', right: '15%' } },
//               { icon: '🔒', pos: { top: '50%', left: '5%' } }
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 style={{
//                   position: 'absolute',
//                   fontSize: '2rem',
//                   ...item.pos,
//                   transform: `translateY(${Math.sin((Date.now() / 1000 + index) * 0.8) * 20}px)`,
//                   opacity: 0.8,
//                   filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
//                 }}
//               >
//                 {item.icon}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div style={{
//           position: 'absolute',
//           bottom: '2rem',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           opacity: 0.7
//         }}>
//           <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
//             Découvrir plus
//           </div>
//           <div style={{
//             width: '2px',
//             height: '30px',
//             background: 'white',
//             borderRadius: '1px',
//             position: 'relative',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               width: '100%',
//               height: '10px',
//               background: 'rgba(255,255,255,0.8)',
//               borderRadius: '1px',
//               transform: `translateY(${Math.sin(Date.now() / 500) * 20}px)`,
//             }} />
//           </div>
//         </div>
//       </section>

//       {/* Section fonctionnalités rapides */}
//       <section 
//         id="features-preview"
//         data-animate
//         style={{ 
//           padding: '4rem 2rem',
//           position: 'relative',
//           zIndex: 10,
//           background: 'rgba(255,255,255,0.05)',
//           backdropFilter: 'blur(10px)'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <h2 style={{
//             fontSize: '2.5rem',
//             textAlign: 'center',
//             marginBottom: '3rem',
//             background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             transform: isVisible['features-preview'] ? 'translateY(0)' : 'translateY(50px)',
//             opacity: isVisible['features-preview'] ? 1 : 0,
//             transition: 'all 1s ease'
//           }}>
//             Pourquoi choisir Hostolink ?
//           </h2>

//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
//             gap: '2rem'
//           }}>
//             {[
//               {
//                 icon: '💳',
//                 title: 'Paiements Sécurisés',
//                 desc: 'Payez vos soins via Wave avec une sécurité maximale'
//               },
//               {
//                 icon: '📍',
//                 title: 'Géolocalisation',
//                 desc: 'Trouvez pharmacies et centres de santé près de vous'
//               },
//               {
//                 icon: '👥',
//                 title: 'Communauté Santé',
//                 desc: 'Partagez et échangez avec d\'autres patients'
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 style={{
//                   background: 'rgba(255,255,255,0.1)',
//                   padding: '2rem',
//                   borderRadius: '20px',
//                   textAlign: 'center',
//                   border: '1px solid rgba(255,255,255,0.2)',
//                   transform: isVisible['features-preview'] 
//                     ? 'translateY(0) scale(1)' 
//                     : 'translateY(50px) scale(0.9)',
//                   opacity: isVisible['features-preview'] ? 1 : 0,
//                   transition: `all 1s ease ${index * 0.2}s`,
//                   cursor: 'pointer'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-10px) scale(1.05)';
//                   e.target.style.background = 'rgba(255,255,255,0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0) scale(1)';
//                   e.target.style.background = 'rgba(255,255,255,0.1)';
//                 }}
//               >
//                 <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
//                   {feature.icon}
//                 </div>
//                 <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
//                   {feature.title}
//                 </h3>
//                 <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
//                   {feature.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(180deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HostolinkHomepage;