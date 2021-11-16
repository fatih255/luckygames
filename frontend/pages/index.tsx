import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import HomeSlider from '../src/components/HomeSlider'
import Image from 'next/image'

const Home: NextPage = () => {

  return (
    <div >
      <Head>
        <title>Şans Oyunları</title>
        <meta name="description" content="Kripto Şans Oyunları" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      {/*slider section */}

      <HomeSlider />

      {/*Oyuna Girmek Cok Kolay section */}
      <section className="text-center py-20 relative bg-white">
        <div className="flex flex-row justify-around  items-center mx-auto">
          <Image src="/assets/leftimage2.png" width={350} height={350} objectFit="contain" />
          <div className="grid  sm:grid-cols-1 z-10 gap-3 mt-4 flex-[.7] ">
            <h2 className="text-6xl font-semibold tracking-tighter text-blue-700 mb-4 cursor-default">Oyuna Girmek Çok Kolay</h2>
            <div className="bg-white flex px-4 py-4 justify-center items-center md:w-90 rounded-2xl centered-shadow cursor-default transition duration-1000 hover:translate-x-4 hover:z-20">
              <span className="text-blue-600 text-xl">Hesabınıza Oyun Parası Yükleyin</span>
            </div>
            <div className="bg-white flex px-4 py-4 justify-center items-center md:w-90 rounded-2xl centered-shadow cursor-default transition duration-1000 hover:translate-x-4 hover:z-20">
              <span className="text-blue-600 text-xl" >Hesabınızda Bulunan Oyun Parasıyla Oyuna Katılın</span>
            </div>
            <div className="bg-white flex px-4 py-4 justify-center items-center md:w-90 rounded-2xl centered-shadow cursor-default transition duration-1000 hover:translate-x-4 hover:z-20">
              <span className="text-blue-600 text-xl" > Rastgele Gelen Rakibi <b>Taş-Kağıt-Makas</b> Oyunuyla Kazanın</span>
            </div>
            <div className="bg-white  border-box   flex px-4 py-4 justify-center items-center md:w-90 rounded-2xl centered-shadow cursor-default transition duration-1000 hover:translate-x-10 hover:z-20">
              <span className="text-blue-600 text-xl" >Oyun Sonunda Kaybedenlerin Parasını Kazananlara Eşit Olarak Banka Hesabınıza Yatıralım</span>
            </div>
          </div>
        </div>
      </section>
      {/*  Örnek Oyun Section */}
      <section className="pb-12 px-24 bg-white flex border-t-4 border-blue-200 border-opacity-30 border-b-4">
        <h2 className=" z-10 text-6xl font-semibold tracking-tighter w-max pr-8 pl-4 pt-2 pb-2 text-white cursor-default bg-blue-700 text-center rounded-xl mr-4 -mt-12 flex items-center centered-shadow border-b-8 border-blue-400">Örnek Oyun</h2>
        <div className="  z-10  flex justify-start">
          <div>
            <h3 className=" text-4xl font-semibold tracking-tighter text-white mb-4 cursor-default bg-blue-500 w-max py-2 px-2 -mt-8 centered-shadow rounded-md">100 Kişilik Oyun</h3>
            <div>
              <p className="text-lg border-purple-300 border-l-4 pl-4">
                Sistemimize kayıt olduktan sonra sayısı 20 ye yakın odalardan kendisine en uygun olan oyunu seçti.
                Sonrasında oyuna 100 kişinin katıldığını gördü ve odaya katılıp ücreti 0,01 gibi uygun bir fiyattı ve oyundaki para havuzuna kripto cüzdanından oyuna katılım için gerekli olan ücreti gönderdi.

                Tüm oyuncular onaylı ve oda sayısı çift olduğunda (Eğer birisi havuzdan ayrılırsa 99 olur bu yüzden oyuncunun karşısına rakip çıkmaz bundan dolayı çift olacak) oyun başlar
                Oyuna katılan 100 kişi birbirleriyle Taş-Kağıt-Makas oynarlar ve sonuç olarak %50 ihtimal olduğundan oyuncuların yarısı oyunu kaybetmiş olur ve havuzda toplamda 50 kişi kalır
                Oyunu kazanan kişiler 0,01 yi 2x yapmış olurlar çünkü odada 100 kişilik oyun var ve sadece 50 kişi kalmış. Dolayısıyla oyundaki bakiyesinde 2x şeklinde bir uyarı görür
                Çünkü ilk raundu kazanmıştır. İsterse oyundan çekilebilir ve banka hesabına aktarabilir. Bunun için oyunu terkedecek kişilerin toplamı  çift olmalıdır ki geriye açıkta kalmayan oyuncu olmasın
                Karım bana yeter diyerek isterseniz karşılaşmadan ayrılabilir veya kalan 50 oyuncuyla 1 round daha oynayıp parayı 4x'e katlayabilirsiniz.
                Ve oyunumuzun bu bölümünde geriye kalan 25 oyuncu aralarında tekrar oynamak isterse toplam oyuncu sayısı çift olmadığından bir kişi boşta kalıyor.
                Ve oyun burda sona eriyor</p>
            </div>
          </div>
        </div>
      </section>
      {/*  Oyun Çeşitleri */}
      <section className="flex justify-center py-12">
        <div className="text-3xl px-2 py-2 centered-shadow rounded-xl tracking-tighter	font-semibold text-purple-700 ">Tek Oyunculu</div>
        <div className="text-3xl px-2 py-2 centered-shadow rounded-xl tracking-tighter	font-semibold text-purple-700 sx:ml-0 ml-8 ">Çok Oyunculu</div>
      </section>
    </div >
  )
}


/*
Home.getInitialProps = (ctx: NextPageContext) => {
  console.log(ctx.req ? ctx.req.headers.cookie || "" : document.cookie)
  return {}
}

*/


export default Home
