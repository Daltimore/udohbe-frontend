import React from 'react'
import { Button } from './ui/button'

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <div className=' bg-foreground text-background h-[90dvh] py-[15rem] '>
            <div className="relative container max-w-screen-2xl !font-karla">
                <div className="grid grid-cols-4">
                    <div>
                        <p className=' tracking-wider text-lg'>PAYMENT</p>
                        <div className=' text-xs border inline-flex px-2 py-1 rounded-sm mt-7'>
                            <p>Powered by PAYAZA</p>
                        </div>
                    </div>
                    <div>
                        <p className=' tracking-wider text-lg'>SHOP</p>
                        <div className=' text-xs text-background/60 w-[65%] h-[5rem]  mt-5  leading-5'>
                            Discover carefully refined clothing made in
                            Turkish traditions & inspired by cultures
                            from all over the world.
                        </div>
                        <div className="mt-10">
                            <a className=' uppercase text-sm  font-light' href="#">View shop</a>
                        </div>
                    </div>
                    <div>
                        <p className=' tracking-wider text-lg'>ABOUT</p>
                        <div className=' text-xs text-background/60 w-[65%] h-[5rem]  mt-5  leading-5'>
                            We got the idea to make the finest fashion
                            pieces when our friend group visited  Costa Rica
                        </div>
                        <div className="mt-10">
                            <a className=' uppercase text-sm  font-light' href="#">View about</a>
                        </div>
                    </div>
                    <div>
                        <p className=' tracking-wider text-lg'>JOURNAL</p>
                        <div className=' text-xs text-background/60 w-[65%] h-[5rem]  mt-5  leading-5'>
                            See latest updates in the fashion world &
                            behind the scenes of how we design every
                        </div>
                        <div className="mt-10">
                            <a className=' uppercase text-sm  font-light' href="#">View Journal</a>
                        </div>
                    </div>
                    <div className=' col-start-2 col-span-3 mt-[7rem] flex items-cente '>
                        <input type="text" className=' font-karla bg-transparent border-b w-full outline-none pl-10' placeholder='Enter your email to get latest news' />
                        <Button className=" inline-flex  font-karla h-[5rem] font-light uppercase w-[12rem] bg-background text-foreground shadow-none rounded-none hover:bg-background/80 hover:text-foreground">
                            subscribe
                        </Button>
                    </div>
                    <div className="col-start-2  col-span-3 items-center grid justify-end w-full mt-16">
                        <div className="flex gap-8 text-sm font-light">
                            <a href="">Tiktok</a>
                            <a href="">Facebook</a>
                            <a href="">Twitter</a>
                            <a href="">Instagram</a>
                        </div>
                    </div>
                    <div className="col-start-2  col-span-3 items-center grid justify-end w-full mt-16">
                        <div className="flex gap-5 text-sm font-light">
                            <a href=""><span className=' text-[#636363]'>
                                © {date} Udohbe</span> <span className='ml-1 text-[#C2C1A5]'>Copyright</span></a>
                            <a href="">
                                <span className='text-[#636363]'>Powered by</span>
                                <span className='ml-1 text-[#C2C1A5]'>Payaza </span>
                            </a>
                            <a className='text-[#636363]' href="">Contact</a>
                            <a className='text-[#C2C1A5]' href="">Support</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
