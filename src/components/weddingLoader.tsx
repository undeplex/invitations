
"use client";

import Image from "next/image";
import { Heart, Loader2 } from "lucide-react";

export default function WeddingLoader() {
  return (
    <div className="relative w-full h-screen bg-stone-50 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Fleur en coin bas-gauche */}
      <Image
        src="/assets/fl.png"
        alt="fleur eucalyptus"
        width={348}
        height={340}
        className="absolute   top-[48%] left-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-none"
      />

      {/* Fleur en coin haut-droit (mirroir) */}
     
     
<div className="absolute top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">

      <Loader2 className="animate-spin  text-green-700 w-6 h-6" />
</div>
    </div>
  );
}
