'use client'
import Image from 'next/image'
import React from 'react'
import CandleCard from '../assets/images/candle-card.png'
import Currency from './currency'
import Link from 'next/link'
import { Product, types } from '@/lib/api'
import { cn, convertSize } from '@/lib/utils'
import { useStore } from 'zustand'
import { useCartStore } from '@/store/cart'

const Card = ({ item }: { item: Product }) => {
    const cartStore = useStore(useCartStore, (state) => state.cart)
    const addToCart = useStore(useCartStore, (state) => state.addToCart)

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(item, 1)
    }

    const isDisabled = cartStore.some((cart) => cart.product.id === item.id);
    return (
        <main>
            <div className=' bg-[#FAF9F7] lg:mx-0 mx-4'>
                <Image src={item?.attributes?.image ?? CandleCard} alt="candle card" className="w-full lg:h-[33rem] h-[30rem] object-contain " />
            </div>
            <div className="lg:px-6 px-4 lg:mt-10 mt-4">
                <h2 className=' font-times text-xl font-thin'>{item?.attributes?.name}</h2>
                <p className=' font-karla text-sm font-light mt-1  text-foreground/70'>{item?.attributes?.title}</p>
                <div className="mt-7">
                    <div className='flex items-center justify-between'>
                        <div>
                            <Currency value={item?.attributes?.amount?.toLocaleString()} />
                            <p className=' font-roboto text-xs font-light mt-1  text-foreground/70'>{convertSize(item?.attributes)}</p>
                        </div>
                        <button disabled={isDisabled} onClick={submit} className='flex items-center gap-x-3'>
                            <svg width="50" height="50" viewBox="0 0 50 50"
                                className={cn(
                                    "transition-colors duration-200",
                                    isDisabled
                                        ? "text-background !fill-[#958B88]"
                                        : "text-foreground/50 ",
                                    "hover:text-background hover:fill-[#958B88] fill-transparent"
                                )}
                                fillRule="evenodd">
                                <rect x="0.75" y="0.75" width="48.5" height="48.5" rx="24.25" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M20.9999 16L18.8899 19.777" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M28 16L30.3 19.777" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M29 34.0001C26.239 34.0001 24 31.7611 24 29.0001C24 26.2391 26.239 24.0001 29 24.0001C31.762 24.0001 34 26.2391 34 29.0001C34 31.7611 31.762 34.0001 29 34.0001" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M29 27.25V30.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M30.75 29.0001H27.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M32.441 25.375L33.144 22.129C33.406 20.92 32.487 19.777 31.248 19.777H17.94C16.704 19.777 15.783 20.92 16.044 22.129L17.515 28.921C17.707 29.814 18.497 30.45 19.411 30.45H24.215" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {isDisabled && <p className=' font-roboto text-xs font-light mt-1  text-foreground/70'>In cart</p>}

                        </button>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Card
