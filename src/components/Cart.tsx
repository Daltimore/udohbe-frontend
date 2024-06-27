import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { DotLottiePlayer } from '@dotlottie/react-player';
import { useStore } from 'zustand'
import { useCartStore } from '@/store/cart';
import Image from 'next/image';
import CandleCard from '../assets/images/candle-card.png';
import { convertSize } from '@/lib/utils';
import { Product } from '@/lib/api';
import Currency from './currency';

const Cart = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const cartStore = useStore(useCartStore, (state) => state.cart)
    const updateCartItemQuantity = useStore(useCartStore, (state) => state.updateCartItemQuantity)
    const removeFromCart = useStore(useCartStore, (state) => state.removeFromCart)





    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            console.log(newQuantity, 'whats happeningss')
            if (updateCartItemQuantity)
                updateCartItemQuantity(productId, newQuantity);
        }
    };

    return (
        <div>
            <Sheet open={isOpen} onOpenChange={(value: boolean) => setIsOpen(value)}>
                <SheetContent className='h-[80dvh] p-0 m-0'>
                    <SheetHeader className='border-b px-0'>
                        <SheetTitle className='font-times font-light text-base py-4 px-4'>Your shopping bag</SheetTitle>
                    </SheetHeader>

                    {cartStore && cartStore.length === 0 ? (
                        <div className='flex flex-col items-center justify-center w-full h-[80%]'>
                            <div className='w-[200px] h-[200px]'>
                                <DotLottiePlayer
                                    src="https://lottie.host/f5c4775e-ad2f-4337-ac98-9abb20adf377/WfDQbRR1as.lottie"
                                    autoplay
                                    loop
                                />
                            </div>
                            <p className='uppercase font-inria text-sm font-medium'>Empty cart</p>
                        </div>
                    ) : (
                        cartStore && cartStore.map(({ product, quantity }) => (

                            <div className='p-4 font-times' key={product?.id}>

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
                                                    className='border border-[#D9D9D9] w-10 h-7 text-center'

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
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Cart;
