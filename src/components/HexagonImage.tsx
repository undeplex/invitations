// import Image from 'next/image';

// export default function HexagonImage() {
//   return (
//     <div className="hexagon-wrapper">
//       <svg width="0" height="0">
//         <defs>
//           <clipPath id="hexClip" clipPathUnits="objectBoundingBox">
//             <path d="M0.5 0, 1 0.25, 1 0.75, 0.5 1, 0 0.75, 0 0.25z"/>
//           </clipPath>
//         </defs>
//       </svg>
//       <div className="hexagon-image-container">
//         <Image
//           src="/couple-picture-3.webp"
//           alt="Couple picture"
//           width={260}
//           height={260}
//           priority
//           className="hexagon-image"
//         />ffsd
//       </div>
//     </div>
//   );
// }
import Image from 'next/image';

export default function HexagonImage() {
  return (
    <div className="relative w-[310px] h-[310px]">
      {/* Conteneur pour le clip-path */}
      <div className="absolute inset-0 overflow-hidden hexagon-clip">
        <Image
          src="/couple.jpg"
          alt="Couple picture"
          width={260}
          height={260}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Votre SVG pour le contour */}
      <svg
        viewBox="0 0 260 260"
        className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0 pointer-events-none"
      >
        <polygon
          points="130,10 240,65 240,195 130,250 20,195 20,65"
          fill="none"
          stroke="#A4B9A4"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}