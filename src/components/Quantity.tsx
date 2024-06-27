'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

const Quantity = ({ quantity, setQuantity }: { quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>> }) => {

    return (
        <div>
            <h2 className=' font-karla  text-base  font-light uppercase'>QTY</h2>
            <div className='inline-flex items-center gap-x-2 mt-3 border-b border-foreground pb-3'>
                <button className={cn(quantity <= 1 && 'cursor-not-allowed')} disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)} >
                    <svg width="11" height="24" viewBox="0 0 11 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.00439453 12H10.271" stroke="#6E6F6F" />
                    </svg>
                </button>
                <div className=' font-karla w-16 text-center'>
                    {quantity}
                </div>
                <button onClick={() => setQuantity(quantity + 1)}>
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.13773 0.866638V11.1333M0.00439453 5.99997H10.271" stroke="black" />
                    </svg>
                </button>


            </div>
        </div>
    )
}

export default Quantity