 import ProtectedRoute from '@/components/ProtectedRoute'
 import Link from 'next/link'

 export default function Home() {
   return (
     <ProtectedRoute>
       <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
         <div>
             <img className='size-[129px] bg-pink-100 p-4 mx-auto rounded-full' src="/logo.svg"/>
           </div>
         <h1 className="text-4xl serifo font-bold my-5 text-center text-slate-600 mb-8">
           Dan & Falone Wedding
         </h1>
          <div className="text-gray-600">
            
          </div>

          {/* Couple Photo */}
        <div className="my-6 relative">
          <div className="inline-block overflow-hidden">
            <div className="relative w-64 h-64 mx-auto">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/couple.png')",
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)"
                }}
              />
              <div
                className="absolute inset-0 border-4"
                style={{
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  borderColor: "#f3cfc9"
                }}
              />
            </div>
          </div>
          <img src="/image-photo.png" alt="Bottom Right Flower" className="absolute top-[50%] translate-y-[-10%] right-[50%] translate-x-[50%] w-[200px]" />
        </div>
        
         <div className="grid rounded-full gap-4 w-full max-w-md">
        
           <Link 
             href="/admin" 
             className="bg-black text-xl hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full text-center transition duration-200"
           >
             Accès Admin
           </Link>
          
        
         </div>

         <div className="mt-12 text-center text-gray-600">
      
         </div>
       </div>
     </ProtectedRoute>
   )
 }


