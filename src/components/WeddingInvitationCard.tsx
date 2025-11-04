

'use client'

import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FiAlertTriangle } from 'react-icons/fi'
import { FaArrowDown, FaLanguage } from 'react-icons/fa'
import { Heart } from 'lucide-react'
import Head from 'next/head'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrer ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Participant {
  name: string
  number: string
  tableNumber?: string
}

interface QRData {
  id: string
  participants: Participant[]
  timestamp: number
  isCouple: boolean
  signature: string
  secretCode: string
  validated: boolean
}

const DEFAULT_TABLE_NUMBER = ''

const formatFrenchDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayName} ${day} ${month} ${year}`
}

const formatEnglishDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayName}, ${month} ${day}, ${year}`
}

export const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
  const qrContent = {
    participants: qrData.participants,
    isCouple: qrData.isCouple,
    tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
    validated: qrData.validated,
    timestamp: qrData.timestamp
  }
  const [clickCount, setClickCount] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const [isPulsing, setIsPulsing] = useState(false)

  // Réfs pour les animations
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const invitationRef = useRef<HTMLDivElement>(null)
  const programRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const securityRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  
  // Réfs pour les décorations florales
  const floralTopLeftRef = useRef<HTMLImageElement>(null)
  const floralTopRightRef = useRef<HTMLImageElement>(null)
  const floralWedDayRef = useRef<HTMLImageElement>(null)
  const floralBottomLeftRef = useRef<HTMLImageElement>(null)
  const floralBottomRight1Ref = useRef<HTMLImageElement>(null)
  const floralBottomRight2Ref = useRef<HTMLImageElement>(null)
  const floralBottomRight3Ref = useRef<HTMLImageElement>(null)
  const floralBottomRight4Ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Animation de pulsation pour le QR code
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initialiser les animations GSAP
    const ctx = gsap.context(() => {
      // Animation des décorations florales
      const floralRefs = [
        floralTopLeftRef.current,
        floralTopRightRef.current,
        floralWedDayRef.current,
        floralBottomLeftRef.current,
        floralBottomRight1Ref.current,
        floralBottomRight2Ref.current,
        floralBottomRight3Ref.current,
        floralBottomRight4Ref.current
      ]

      floralRefs.forEach((deco) => {
        if (deco) {
          gsap.fromTo(deco,
            {
              opacity: 0,
              scale: 0.8,
              rotation: -10
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: deco,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      })

      // Animation du titre
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation de la photo
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          {
            scale: 0.5,
            opacity: 0,
            rotationY: 90
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du texte d'invitation
      if (invitationRef.current) {
        gsap.fromTo(invitationRef.current,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: invitationRef.current,
              start: "top 100%",
              end: "bottom 50%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du programme
      if (programRef.current) {
        gsap.fromTo(programRef.current,
          {
            x: -50,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: programRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du lieu
      if (locationRef.current) {
        gsap.fromTo(locationRef.current,
          {
            x: 50,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: locationRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation de l'alerte sécurité
      if (securityRef.current) {
        gsap.fromTo(securityRef.current,
          {
            scale: 0.8,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: securityRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation du QR code
      if (qrRef.current) {
        gsap.fromTo(qrRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.5
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: qrRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animation des éléments de date
      gsap.fromTo(".date-item",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: programRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animation en boucle pour les flèches
      gsap.to(".animate-bounce", {
        y: -10,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr')
  }

  // Contenu en français
  const frenchContent = {
    title: "Vous êtes invités",
    invitationText: [
      "C'est avec une immense joie que nous vous convions à partager le plus beau jour de notre vie, alors que nous unissons nos familles.",
      "La célébration se poursuivra autour d'un repas; Préparez vos sourires, votre joie, et surtout vos pas de danse...",
      "car l'amour sera célébré en musique, jusqu'au bout de la nuit, sous les couleurs vert olive blanc et argenté.",
      "Si vous souhaitez nous honorer, les cadeaux en espèces seront les bienvenus, comme tel est notre souhait."
    ],
    programTitle: "PROGRAMME DE MARIAGE",
    dates: [
      { day: "Vendredi 28 Novembre 2025", time: "à 11h00", event: "Mariage Civil", icon: "/certificate.png" },
      { day: "Samedi 29 Novembre 2025", time: "à 12h30", event: "Mariage Religieux", icon: "/rings.png" },
      { day: "", time: "à 19h00", event: "Reception", icon: "/glass.png" }
    ],
    locationTitle: "Lieu des cérémonies",
    location: "Grand Perchoir (Royal Marquee)",
    address: "Avenue des Chutes coin Kambove",
    reference: "Référence: Cra usine",
    closing: "Avec toute notre joie,",
    families: "La famille",
    securityMessage: "Pour des raisons de sécurité, l'arrivée  des invités commence à 18h00. Veuillez vous présenter à la salle à cette heure.",
    qrInstruction: "PRÉSENTEZ CE CODE QR À L'ENTRÉE ",
    qrDescription: "Ce code QR est votre billet d'entrée. En cas de problème, une assistance sera disponible à l'entrée."
  }

  // Contenu en anglais
  const englishContent = {
    title: "You are invited",
    invitationText: [
      "It is with great joy that we invite you to share the most beautiful day of our lives. As we unite families.",
      "The celebration will continue around a meal; Prepare your smiles, your joy, and especially your dance steps...",
      "Because love will be celebrated in music, until the end of the night, under the colors olive green white and silver.",
      "If you wish to honor us, cash gifts will be welcome, as such is our wish."
    ],
    programTitle: "WEDDING PROGRAM",
    dates: [
      { day: "Friday August 28, 2025", time: "at 11:00 am", event: "Civil Wedding", icon: "/certificate.png" },
      { day: "Saturday August 29, 2025", time: "at 12:30 pm", event: "Religious Wedding", icon: "/rings.png" },
      { day: "", time: "at 6:00 pm", event: "Guest Arrival", icon: "/glass.png" },
      { day: "", time: "at 7:00 pm", event: "Arrival of the Bride and Groom", icon: "/glass.png" }
    ],
    locationTitle: "Ceremony Location",
    location: "Royal Marquee (Chapitau Royal)",
    address: "Avenue des Chutes coin Kambove",
    reference: "Reference: Ministry of Labor Haut-Katanga",
    closing: "With all our joy,",
    families: "The family",
    securityMessage: "For security reasons, guest reception starts at 6:00 PM. Please arrive at the venue at this time.",
    qrInstruction: "PRESENT THIS QR CODE AT ENTRANCE - DO NOT SHARE - YOU CAN TAKE A SCREENSHOT",
    qrDescription: "This QR code is your entry ticket. If you encounter any issues, assistance will be available at the entrance."
  }

  const content = language === 'fr' ? frenchContent : englishContent

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="relative max-w-lg w-full overflow-hidden text-center text-gray-800" style={{ backgroundColor: '#fff' }}>
        {/* Bouton de changement de langue */}
        {/* <button 
          onClick={toggleLanguage}
          className="absolute top-4 right-4 z-50 flex items-center gap-1 border-green-700 border bg-gree-600/20 px-2 py-1 rounded-full shadow-sm hover:bg-white transition-all"
        >
          <FaLanguage className="text-green-700" />
          <span className="text-sm text-green-800">{language === 'fr' ? 'ENGLISH' : 'FRANCAIS'}</span>
        </button> */}

        {/* Floral Decorations */}
        <img 
          
          src="/assets/type.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[367px] md:w-[389px] top-[0px] right-0" 
        />
        <img 
          
          src="/assets/type.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[467px] md:w-[389px] top-[0px] right-0" 
        />
        <img 
          
          src="/assets/type.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[367px] md:w-[389px] top-[700px] right-0" 
        />
        <img 
          
          src="/assets/type.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[267px] md:w-[389px] bottom-[200px] left-0" 
        />
        <img 
          
          src="/assets/type.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[267px] md:w-[389px] top-[500px] left-0" 
        />
        <img 
          
          src="/assets/b.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[157px] md:w-[289px] block top-0 left-o ]" 
        />
        <img 
          
          src="/assets/a.png" 
          alt="Top Left Flower" 
          loading="lazy" 
          className="absolute w-[157px] md:w-[289px] block top-0 right-[0]" 
        />
      
        <img 
          ref={floralWedDayRef}
          src="/wed-day.png" 
          alt="Wedding Day" 
          loading="lazy" 
          className="absolute top-[0%] w-[102px] left-[50%] -translate-x-[50%] -translate-y-[50%]" 
        />
        {/* <img 
          ref={floralBottomLeftRef}
          src="/ecal.webp" 
          alt="Bottom Left Flower" 
          loading="lazy" 
          className="absolute w-[260px] -bottom-[93px] -left-[120px]" 
        /> */}
       
        <img 
          ref={floralBottomRight2Ref}
          src="/assets/c.png" 
          alt="Bottom Right Flower" 
          loading="lazy" 
          className="absolute bottom-0 left-0  w-[113px]" 
        />
        <img 
          ref={floralBottomRight2Ref}
          src="/assets/d.png" 
          alt="Bottom Right Flower" 
          loading="lazy" 
          className="absolute bottom-0 right-0 w-[113px]" 
        />
        {/* <img 
          ref={floralBottomRight2Ref}
          src="/assets/set.png" 
          alt="Bottom Right Flower" 
          loading="lazy" 
          className="absolute top-[1115px] right-[17px] rotate-[-13deg] w-[73px]" 
        />
        <img 
          ref={floralBottomRight3Ref}
          src="/assets/set.png" 
          alt="Bottom Right Flower" 
          loading="lazy" 
          className="absolute top-[130px] right-[17px] w-[53px]" 
        />
        <img 
          src="/assets/t.png" 
          alt="Bottom Right Flower" 
          loading="lazy" 
          className="absolute bottom-[0px] right-[0px] rotate- w-[103px]" 
        /> */}

        {/* Participant Name */}
        <div ref={titleRef} className="mt-20 pt-7">
          {qrData.isCouple && (
            <h1 className="text- font- text-gray-700">
              - Couple -
            </h1>
          )}
          {!qrData.isCouple && (
            <h1 className="text font- text-gray-700">
              {language === 'fr' ? "-Singleton-" : "-Single-"}
            </h1>
          )}
          <h1 className="text-3xl font-bold text-gray-800">
            {qrData.participants[0].name}
          </h1>
          {qrData.isCouple && qrData.participants[1].name && (
            <h1 className="text-3xl font-bold text-gray-800">
              & {qrData.participants[1].name}
            </h1>
          )}
          <p className="text-gray-600 mt-2">
            {content.title}
          </p>
        </div>

       <div ref={photoRef} className="my-6 relative">
  <div className="relative w-[290px] h-[290px] mx-auto">
    <svg
      viewBox="0 0 260 260"
      className="absolute top-0 left-0 w-full h-full z-10"
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="130" cy="130" r="120" />
        </clipPath>
      </defs>
      <image
        href="/couple.jpg"
        width="260"
        height="260"
        clipPath="url(#circleClip)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>

    <svg
      viewBox="0 0 260 260"
      className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0 pointer-events-none"
    >
      <circle
        cx="130"
        cy="130"
        r="120"
        fill="none"
        stroke="#A4B9A4"
        strokeWidth="4"
      />
    </svg>
    <img src="/assets/e.png" alt="Decoration" loading="lazy" className="absolute top-[34%] rotate-[44deg] z-50 translate-y-[-10%] right-[50%] translate-x-[50%] w-[275px]" />
  </div>
</div>

        {/* Invitation Message */}
        <div  className="mt-[50px] px-4 text-lg text-gray-700">
          <div  className="mb-5 flex ocean  mx-auto flex-col w-max font-bold ">
            <h3 className="text-3xl font-semibold text-gray-800">Romain</h3>
            <span className="text-lg font-bold h-[23px] my-1 grid justify-center text-blue-600">
              <Heart className="text-green-700 spain inline-block"/>
              <Heart className="text-green-500 translate-x-[14px] inline-block translate-y-[-23px] rotate-6"/>
            </span>
            <h3 className="text-3xl font-semibold text-gray-800">Eugenie</h3>
          </div>
          <p ref={invitationRef} className="mb-4">{content.invitationText[0]}</p>


        </div>

        <p  className="my-4 px-4 font-bold text-gray-600">
          {content.programTitle}
        </p>

        {/* Date and Venue */}
        <div className="text-center space-y-4 px-2">
          {content.dates.map((date, index) => (
            <div key={index} className="date-item">
              {date.day && <p className="text-xl text-green-800 font-bold ubuntu">{date.day}</p>}
              <div className="flex items-center justify-center gap-2">
                <img src={date.icon} className='size-7 rotate-2' loading="lazy" />
                <p className="text-gray-600 serif text-xl my-2"> {date.time}</p>
              </div>
              <FaArrowDown size={12} className='block c mx-auto animate-bounce text-blue-400' />
              <p className="text-gray-600 text-xl">{date.event}</p>
            </div>
          ))}
        </div>

        {/* Location */}
        <div ref={locationRef} className="text-center px-2 mt-4">
          <p className="text-2xl text-green-800 font-bold">
            {content.locationTitle}
          </p>
          <p className="px-4 text-2xl my-2 font-bold text-animated-color">{content.location}</p>
          <p className="text-gray-600 text-xl">{content.address}</p>
          <p className="text-gray-600 text-xl">{content.reference}</p>
        </div>

        {/* Information de sécurité */}
        <div ref={securityRef} className="mt-8 text-center p-2">
          <div className="border-2 border-red-300 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="text-red-500 block mt-1">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <p className="text-red-700 text-sm font-bold mb-2">
                {language === 'fr' 
                  ? "INFORMATION IMPORTANTE:"
                  : "IMPORTANT INFORMATION:"}
              </p>
              <p className="text-red-700 text-sm mb-2">
                {content.securityMessage}
              </p>
              <p className="text-red-700 text-sm">
                {language === 'fr' 
                  ? "Présentez votre code QR à l'entrée. En cas de souci, une assistance sera disponible."
                  : "Present your QR code at the entrance. Assistance will be available if needed."}
              </p>
            </div>
          </div> 
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-800 text-lg">{content.closing}</p>
          <p className="mt-2 text-gray-700 text-xl">{content.families}</p>
        </div>

        {/* Signature */}
        <p className="text-gray-600 text-sm mt-2">
          {language === 'fr' 
            ? formatFrenchDate(qrData.timestamp)
            : formatEnglishDate(qrData.timestamp)}
        </p>

        {/* QR Code Section */}
        <div ref={qrRef} className="mt-8 mb-8 relative">
          <div className={`mx-auto p-2 blur-xl border-4 rounded-xl w-max relative`}
               >
            <QRCodeSVG
              value={JSON.stringify(qrContent)}
              size={180}
              level="H"
              includeMargin={true}
              fgColor="#000"
            />
          </div>

          {/* Message pour le QR Code */}
          <div className="mt-3 px-4 text-center">
            <p className="text-sm font-bold text-green-700 mb-1">
              {content.qrInstruction}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}