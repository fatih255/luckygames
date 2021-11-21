import React from 'react'
import Image from 'next/image'
export default function HomeSlider() {
    return (
        <div className="mt-12 bg-gradient-to-r py-10  from-blue-800 via-indigo-600 to-indigo-800 h-[550px] relative">
            <div className="flex items-center justify-between mx-16 h-full">
                <div className=" max-w-xl">
                    <h1 className="text-white font-semibold  text-6xl mb-4">LuckyGames ile Sende Kazancını Katla</h1>
                    <p className="text-white">Taş-Kağıt-Makas Oyunu Oynayarak Kaybedenlerin Parasını Kazananlarla Bölüş Kazancını 2x,4x hatta 8x ve 16x e katla</p>
                </div>
                <div className="absolute z-20 right-32 -bottom-28">
                    <Image src="/assets/slider/1.png" height={650} width={750} objectFit="contain" />
                </div>
            </div>

        </div>
    )
}
