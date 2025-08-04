"use client";

import Image from "next/image";
import { Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WeddingLoader() {
  return (
    <div className="relative w-full h-screen bg-stone-50 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Fleur en coin bas-gauche */}
      <Image
        src="/fleure.png"
        alt="fleur eucalyptus"
        width={348}
        height={340}
        className="absolute  rotate-[33deg] top-[62%] left-[48%] translate-x-[-50%] translate-y-[-50%] pointer-events-none"
      />

      {/* Fleur en coin haut-droit (mirroir) */}
     

    
        <Heart className="text-green-700"/>
        <Heart className="text-green-500 translate-x-[14px] translate-y-[-23px] rotate-6"/>
      

      <h1 className="text-3xl serifo md:text-5xl font-serif text-green-900 mb-2 tracking-wide">
        Vuci & Christelle 
      </h1>
      <p className="text-sm md:text-lg text-green-600 mb-6">
        Une journée d’amour se prépare...
      </p>

      <Loader2 className="animate-spin text-green-700 w-6 h-6" />
    </div>
  );
}
