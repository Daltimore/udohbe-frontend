'use client'
import React, { useState } from 'react';
import { useStore } from 'zustand'
import { useCartStore } from '@/store/cart';
import Image from 'next/image';
import CandleCard from '../assets/images/candle-card.png';
import { convertSize } from '@/lib/utils';
import { Product } from '@/lib/api';
import Currency from './currency';
import { Button } from './ui/button';

const Checkout = ({ shipping, children }: { shipping: string, children: React.ReactNode, }) => {
    const cartStore = useStore(useCartStore, (state) => state.cart)
    const updateTotal = useStore(useCartStore, (state) => state.updateTotal)
    const updateCartItemQuantity = useStore(useCartStore, (state) => state.updateCartItemQuantity)
    const removeFromCart = useStore(useCartStore, (state) => state.removeFromCart)

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            if (updateCartItemQuantity)
                updateCartItemQuantity(productId, newQuantity);
        }
    };


    const calculateSubtotal = () => {
        return cartStore.reduce((total, item) => {
            return total + (item.product.attributes.amount * item.quantity);
        }, 0);
    };

    function formatCurrency(amount: string | number): number {
        return parseFloat(amount.toString());
    }

    function formatCurrencyDisplay(amount: number): string {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(amount);
    }

    const total = () => {
        const subTotal = formatCurrency(calculateSubtotal().toLocaleString());
        const shippingCost = formatCurrency(shipping);
        const totalAmount = subTotal + shippingCost;
        updateTotal(totalAmount);
        return totalAmount;
    };


    return (
        <div>
            <div className='    '>
                <div className=' font-inria  text-lg flex items-center pl-6 pt-6 pb-5 border-b'>

                    Order Details</div>
                <div className=' max-h-[50dvh] overflow-auto'>
                    {cartStore && cartStore.length > 0 && (
                        cartStore && cartStore.map(({ product, quantity }) => (
                            <div className='mx-6 py-6 border-b font-times ' key={product?.id}>
                                <div className='flex items-center gap-4'>
                                    <div className='lg:w-20 w-12 h-20 bg-[#FAF9F7]'>
                                        <Image src={product?.attributes?.image ?? CandleCard} alt={product?.attributes?.name} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex flex-col gap-y-4 w-full'>
                                        <div>
                                            <div className='text-sm font-medium'>
                                                {product?.attributes?.name}
                                            </div>
                                            <div className='font-inria text-sm'>
                                                Size: {convertSize(product?.attributes as Product['attributes'])}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full ">
                                            <div className='font-inria text-sm flex items-center gap-x-3'>
                                                Qty:
                                                <input
                                                    type="number"
                                                    className='border border-[#D9D9D9] w-10 h-7 text-center outline-none'

                                                    value={quantity}
                                                    min={1}
                                                    max={product?.attributes?.quantity}

                                                    onChange={(e) => {
                                                        const newQuantity = Math.max(1, Math.min(parseInt(e.target.value) || 0, product?.attributes?.quantity));
                                                        handleQuantityChange(product.id, newQuantity);
                                                    }}
                                                />
                                                <span onClick={() => removeFromCart(product.id)} className='text-red-500 cursor-pointer'>
                                                    Remove
                                                </span>
                                            </div>
                                            <Currency className='text-sm font-inria' value={(product?.attributes?.amount)?.toLocaleString()} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='px-6 mt-16'>
                <div className='flex pb-3  items-center font-inria font-medium justify-between text-sm '>
                    <p className=' text-foreground/50'>Subtotal:</p>
                    <div>     <Currency className='text-sm font-inria' value={calculateSubtotal().toLocaleString()} /></div>
                </div>
                <div className='flex pb-5 border-b  items-center font-inria font-medium justify-between text-sm '>
                    <p className=' text-foreground/50'>Shipment cost:</p>
                    <div>     <Currency className='text-sm font-inria' value={shipping} /></div>
                </div>
                <div className='flex py-6   items-center font-inria font-medium justify-between text-sm '>
                    <p className=' text-foreground/50'>Total Amount:</p>
                    <div>     <Currency className='text-sm font-inria' value={total().toLocaleString()} /></div>
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
