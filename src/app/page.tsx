import Image from "next/image";
import HeroCandle from '../assets/images/hero-candle.png'
import Gradient from '../assets/images/gradient.png'
import Noise from '../assets/images/noise.png'
import CandleOne from '../assets/images/candle1.png'
import { Button } from "@/components/ui/button";
import Card from "@/components/card";
import Logo from "@/components/Logo";
import beach from '../assets/images/beach.png'
import { getUniqueProducts, instance } from "@/lib/api";
import Carousel from "@/components/carousel";
import qs from 'qs'
import Link from "next/link";
export default async function Home() {
  const query = qs.stringify({
    populate: '*',
    fields: '*',
    publicationState: 'live',
    locale: ['en', 'de'],
  }, {
    encodeValuesOnly: true, // prettify url
  });
  const response = await getUniqueProducts()


  return (
    <main className="w-full overflow-hidden" >
      <div className=" relative h-[85dvh] ">
        <Image priority src={HeroCandle} alt="hero candle" className="absolute h-full left-0 w-full  object-cover  " />
        <Image priority src={Noise} alt="hero candle" className="absolute h-full left-0 w-full  object-cover opacity-30 " />
        <Image priority src={Gradient} alt="hero candle" className="absolute h-full left-0 w-full  object-cover " />
        <Image priority src={CandleOne} alt="hero candle" className="absolute h-full left-0 w-full  object-cover " />

        <div className="relative lg:container px-6  max-w-screen-2xl h-full flex  justify-center flex-col">
          <div className="flex flex-col xl:w-[35dvw] lg:w-[55dvw]  gap-y-10">
            <div className="flex items-center  gap-10">
              <div className=" !font-karla text-sm font-light uppercase text-background w-full flex-1 text-nowrap">Udohbe candles</div>
              <div className="lg:w-full w-[50%] lg:mr-0 mr-10 bg-background h-[1px] "></div>
            </div>
            <p className=" font-dream  font-medium  lg:text-8xl text-5xl capitalize text-background">Illuminate your senses right</p>
            <Link href='/all-candles'>
              <Button className=" inline-flex hover:text-background font-karla h-[4rem] font-light uppercase w-[12rem] bg-background text-foreground shadow-none rounded-none">
                shop now
              </Button>
            </Link>
          </div>

        </div>
      </div>

      <div className="relative lg:block hidden  container max-w-screen-2xl">
        <div className="grid grid-cols-4 py-[4.5rem]">
          <div className="lg:px-20 text-center border-r py-4">
            <h2 className=" font-spectral text-center">Express Shipping</h2>
            <p className="mt-3 font-karla leading-7 text-foreground/70 font-light">
              Express shipping on all
              domestic orders.
            </p>
          </div>
          <div className="lg:px-20 text-center py-4">
            <h2 className=" font-spectral text-center">Exchange</h2>
            <p className="mt-3 font-karla leading-7 text-foreground/70 font-light">
              Exchange your bad product or get
              your money back
            </p>
          </div>
          <div className="lg:px-20 text-center py-4 border-r">
            <h2 className=" font-spectral text-center">Return period</h2>
            <p className="mt-3 font-karla leading-7 text-foreground/70 font-light">
              Something you bought isn’t it? Please send it back within 1 day.
            </p>
          </div>
          <div className="lg:px-20 text-center py-4">
            <h2 className=" font-spectral text-center">Money back guarantee</h2>
            <p className="mt-3 font-karla leading-7 text-foreground/70 font-light">
              Get a full refund for all products, no
              questions asked
            </p>
          </div>
        </div>

      </div>

      <div className="lg:hidden block py-12">
        <Carousel />
      </div>


      <div className="mt-[4.5rem] text-center">
        <h1 className=" font-dream lg:text-5xl  text-3xl">Illuminate your senses</h1>
        <p className=" font-karla mt-4 lg:text-2xl  text-lg lg:px-0 px-8  font-light text-foreground/70">Shop some of the classics we have today and get peace of mind</p>
      </div>

      <div className="relative container max-w-screen-2xl grid lg:grid-cols-3 gap-8 lg:mt-20 mt-10">
        {response.data.map(item => (
          <Card key={item?.id} item={item} />
        ))}
      </div>

      <div className="py-[7rem] text-center">
        <Link href='/all-candles'>
          <Button className=" inline-flex font-karla h-[3rem] hover:text-background border border-foreground font-light uppercase w-[12rem] bg-background text-foreground shadow-none rounded-none">
            Shop All Candles
          </Button>
        </Link>
      </div>

      <div className=" bg-foreground lg:py-[8rem] pt-[3rem] pb-[6rem] flex justify-center !lg:px-12 ">
        <div className="grid lg:grid-cols-10 items-center  text-background ">
          <div className="col-span-4 flex justify-end lg:px-24 pl-10 ">
            <Logo className="lg:w-[10rem] lg:h-[10rem] w-[9rem] h-[7rem]" />
          </div>
          <div className="col-span-6 lg:px-24 lg:w-[82%] px-10 leading-10 lg:border-l text-lg font-karla">
            Our brand voice resonates with the essence of opulence, offering a sensory experience that transcends the ordinary. UDOHBÉ speaks the language of grace, sophistication, and refined beauty. In every creation, we weave a narrative of charm and timeless allure.
          </div>
        </div>
      </div>

      <div className="relative   lg:py-[10rem] py-[4rem] bg-[#C2C1A5] ">
        <div className="relative container max-w-screen-2xl">
          <div className="grid lg:grid-cols-12  w-full ">
            <div className="  col-span-8 lg:block hidden">
              <Image src={beach} alt="beach" className="w-full h-[60dvh] object-cover" />
            </div>
            <div className=" col-span-4 bg-white flex items-center  justify-center lg:py-0 py-[6rem]">
              <div className=" flex flex-col items-center justify-center gap-y-5">
                <h2 className=" font-karla font-thin  uppercase  tracking-wider text-sm">Featured Journal</h2>
                <h1 className=" font-spectral lg:text-[1.7rem] text-[1.5rem] leading-[2.1rem] text-center">
                  We explored beaches in <br />
                  search for inspiration
                </h1>
                <Button className=" inline-flex hover:text-background font-karla h-[4rem] font-light uppercase w-[12rem] bg-[#36453B] text-white shadow-none rounded-none">
                  shop now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
