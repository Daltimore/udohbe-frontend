'use client'
import { Product } from '@/lib/api'

import React, { useState } from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CandleCard from '../assets/images/candle-card.png'
import Image from 'next/image'
import Currency from '@/components/currency'
import Quantity from '@/components/Quantity'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { convertSize } from '@/lib/utils'
import useCartStore from '@/store/cart'

const Item = ({ data }: { data: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        addToCart(data, quantity)
    }


    return (
        <div>
            <div className="lg:container lg:flex justify-between px-4  lg:h-[4.5rem] max-w-screen-2xl items-center mt-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='font-spectral text-[#958B88]' href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='font-spectral text-[#958B88]' href="/all-candles">All Candles</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='font-spectral'>{data.attributes.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

            </div>
            <div className="lg:container lg:flex lg:px-[8rem] lg:gap-[5rem] justify-between px-4  max-w-screen-2xl items-center mt-5">
                <div className="mt-5 lg:flex-1">
                    <div className=' bg-[#FAF9F7] border-[#F1EFEF]'>
                        <Image src={data.attributes.image ?? CandleCard} alt="candle card" className="w-full lg:h-[45rem] h-[30rem] object-contain" />
                    </div>
                </div>
                <div className='  lg:flex-1'>
                    <div className='px-4 mt-5'>
                        <h2 className=' font-times lg:text-2xl text-lg font-thin'>{data.attributes.name}</h2>
                        <p className=' font-karla text-sm lg:text-base font-light mt-1  text-foreground/70'>{data.attributes.title}</p>
                        <div className='block lg:hidden'>
                            <div className="mt-7">
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <Currency value={(data.attributes.amount * quantity).toLocaleString()} />
                                        <p className=' font-roboto text-xs font-light mt-1  text-foreground/70'>{convertSize(data.attributes)}</p>
                                    </div>
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.75" y="0.75" width="48.5" height="48.5" rx="24.25" stroke="#BDBDBD" strokeWidth="1.5" />
                                        <path d="M20.9999 16L18.8899 19.777" stroke="#828282" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M28 16L30.3 19.777" stroke="#828282" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M29 34.0001C26.239 34.0001 24 31.7611 24 29.0001C24 26.2391 26.239 24.0001 29 24.0001C31.762 24.0001 34 26.2391 34 29.0001C34 31.7611 31.762 34.0001 29 34.0001" stroke="#828282" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M29 27.25V30.75" stroke="#828282" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M30.75 29.0001H27.25" stroke="#828282" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M32.441 25.375L33.144 22.129C33.406 20.92 32.487 19.777 31.248 19.777H17.94C16.704 19.777 15.783 20.92 16.044 22.129L17.515 28.921C17.707 29.814 18.497 30.45 19.411 30.45H24.215" stroke="#828282" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                            </div>
                            <div className='mt-10'>
                                <h2 className=' font-karla  text-base  font-light uppercase'>Available Sizes</h2>
                                <div className='flex gap-4 mt-3'>
                                    <div className=' flex flex-col items-center justify-center border border-foreground/40'>
                                        <Image src={CandleCard} alt="candle card" className="w-full h-[6rem] object-contain" />
                                        <p className='-mt-2 font-karla text-sm mb-2'>{convertSize(data.attributes)}</p>
                                    </div>
                                    <div>
                                        <div className='  cursor-not-allowed flex flex-col items-center justify-center'>
                                            <Image src={CandleCard} alt="candle card" className="w-full  h-[6rem] object-contain" />
                                            <p className='-mt-2 opacity-40 font-karla text-center text-sm mb-2'>{convertSize({ ...data.attributes, size: 227 })}  (sold out)</p>

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='mt-10'>
                                <Quantity quantity={quantity} setQuantity={setQuantity} />
                            </div>
                            <div className='mt-8'>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className=' !no-underline text-base font-karla font-light opacity-50'>DESCRIPTION</AccordionTrigger>
                                        <AccordionContent className=' font-inria opacity-70'>
                                            Introducing our stunning Black Elegance Dress - a timeless piece that exudes sophistication and versatility. Crafted with meticulous attention to detail, this black dress is a must-have addition to your wardrobe.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className=' !no-underline text-base font-karla font-light opacity-50'>PRODUCT DETAILS</AccordionTrigger>
                                        <AccordionContent className=' font-inria opacity-70'>
                                            Introducing our stunning Black Elegance Dress - a timeless piece that exudes sophistication and versatility. Crafted with meticulous attention to detail, this black dress is a must-have addition to your wardrobe.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>

                        <div className=' hidden lg:block'>
                            <div className='mt-8'>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className=' !no-underline text-base font-karla font-light opacity-50'>DESCRIPTION</AccordionTrigger>
                                        <AccordionContent className=' font-inria opacity-70 '>
                                            {data.attributes.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className=' !no-underline text-base font-karla font-light opacity-50'>PRODUCT DETAILS</AccordionTrigger>
                                        <AccordionContent className=' font-inria opacity-70'>
                                            {data.attributes.details}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <div className='mt-10'>
                                <h2 className=' font-karla  text-base  font-light uppercase'>Available Sizes</h2>
                                <div className='flex gap-4 mt-3'>
                                    <div className=' flex flex-col items-center justify-center border border-foreground/40'>
                                        <Image src={CandleCard} alt="candle card" className="w-full h-[6rem] object-contain" />
                                        <p className='-mt-2 font-karla text-sm mb-2'>{convertSize(data.attributes)}</p>
                                    </div>
                                    <div>
                                        <div className='  cursor-not-allowed flex flex-col items-center justify-center'>
                                            <Image src={CandleCard} alt="candle card" className="w-full  h-[6rem] object-contain" />
                                            <p className='-mt-2 opacity-40 font-karla text-center text-sm mb-2'>{convertSize({ ...data.attributes, size: 227 })} (sold out)</p>

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-10'>
                                <Quantity quantity={quantity} setQuantity={setQuantity} />
                                <div>
                                    <h2 className=' font-karla  text-base  font-light uppercase'>Price</h2>
                                    <Currency value={(data.attributes.amount * quantity).toLocaleString()} className='text-3xl mt-2' />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='lg:px-4 lg:py-10'>
                        <Button onClick={handleAddToCart} className='w-full bg-foreground text-background  rounded-none font-spectral mt-12 mb-5 h-[3rem]'>
                            ADD TO CART
                        </Button>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default Item