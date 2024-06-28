'use client'
import React, { useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from '@/components/ui/button'
import { getProduct } from '@/lib/api'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import payment from '../../assets/svg/payment.svg'
import Checkout from '@/components/Checkout'
import PayazaCheckout from "@payaza/web-sdk";
import { PayazaCheckoutOptionsInterface } from '@payaza/web-sdk/lib/PayazaCheckoutDataInterface'
import { useStore } from 'zustand'
import { useCartStore } from '@/store/cart'
import { convertCurrency } from '@/lib/utils'

const Cart = () => {
    const total = useStore(useCartStore, (state) => state.total)
    const [shipping, setShipping] = useState('1')
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        post_code: '',
        country: '',
        phone: '',
    })

    const merchantKey = process.env.NEXT_PUBLIC_MARCHANT_KEY as string

    const updateShipping = (value: string) => {
        setShipping(value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const convertAmount = await convertCurrency(total.toLocaleString(), true)
        const fixedAmount = convertAmount.toFixed(2)

        console.log(merchantKey, 'mashant')

        const resonse: PayazaCheckoutOptionsInterface = {
            merchant_key: merchantKey,
            connection_mode: PayazaCheckout.LIVE_CONNECTION_MODE,
            checkout_amount: 5,
            // checkout_amount: Number(fixedAmount),
            email_address: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone,
            transaction_reference: `${data.first_name}-${data.last_name}-${data.email}-${fixedAmount}-${new Date().getTime()}`,
            onClose: function () {
                console.log("Closed")
            },
            callback: function (callbackResponse) {
                console.log(callbackResponse)
            }
        }
        const checkout = new PayazaCheckout(resonse)
        checkout.showPopup()

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="lg:container lg:flex justify-between px-4  lg:h-[4.5rem] max-w-screen-2xl items-center mt-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' font-spectral text-[#958B88]' href="/">Cart</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' font-spectral'>Checkout</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' font-spectral'>Payment</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="lg:container mt-8 mb-5  max-w-screen-2xl mx-auto ">
                <div className="grid lg:grid-cols-11 gap-6 px-4">
                    <div className="lg:col-span-7 gap-y-7 grid lg:mb-[7rem]">
                        <Card className='py-4'>
                            <CardHeader>
                                <CardTitle className=' font-inria  text-lg flex items-center'>
                                    <div className=' bg-foreground rounded-full flex justify-center items-center text-background w-6 h-6 mr-3 text-xs '>
                                        1
                                    </div>
                                    Personal Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid lg:grid-cols-2 lg:gap-5 font-gfs gap-y-5 w-full ">
                                    <div className='w-full'>
                                        <p>First Name</p>
                                        <input
                                            required
                                            value={data.first_name}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, first_name: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 w-full outline-none focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Your first name" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Last Name</p>
                                        <input
                                            required
                                            value={data.last_name}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, last_name: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Your last name" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Phone Number</p>
                                        <input
                                            required
                                            value={data.phone}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, phone: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Your phone number" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Email Address</p>
                                        <input
                                            required
                                            value={data.email}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, email: e.target.value })
                                                }
                                            }
                                            type="email" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Your phone number" />
                                    </div>
                                </div>


                            </CardContent>

                        </Card>
                        <Card className='py-4'>
                            <CardHeader>
                                <CardTitle className=' font-inria  text-lg flex items-center'>
                                    <div className=' bg-foreground rounded-full flex justify-center items-center text-background w-6 h-6 mr-3 text-xs '>
                                        2
                                    </div>
                                    Shipment Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid font-gfs gap-y-5 w-full ">
                                    <div className='w-full'>
                                        <p>Country</p>
                                        <input
                                            value={data.country}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, country: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 w-full outline-none focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Enter Country" />
                                    </div>
                                    <div className='w-full'>
                                        <p>City</p>
                                        <input
                                            value={data.city}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, city: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Enter City" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Post Code</p>
                                        <input
                                            required
                                            value={data.post_code}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, post_code: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Enter Post Code" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Address</p>
                                        <input
                                            required
                                            value={data.address}
                                            onChange={
                                                (e) => {
                                                    setData({ ...data, address: e.target.value })
                                                }
                                            }
                                            type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Enter Address" />
                                    </div>
                                </div>


                            </CardContent>

                        </Card>
                        <Card className='py-4'>
                            <CardHeader>
                                <CardTitle className=' font-inria  text-lg flex items-center'>
                                    <div className=' bg-foreground rounded-full flex justify-center items-center text-background w-6 h-6 mr-3 text-xs '>
                                        3
                                    </div>
                                    Shipment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className=" font-inria  w-full ">
                                    <RadioGroup className='grid gap-y-5' defaultValue={shipping} onValueChange={updateShipping}>
                                        <div className='flex justify-between items-center rounded-md border p-4'>
                                            <div className=" flex items-start space-x-4 ">
                                                <RadioGroupItem value="1" id="free" />
                                                <div className="flex-1 space-y-2">
                                                    <p className="text-sm font-medium leading-none">
                                                        Free Shipping
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        14-30 business days
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=' text-sm'>
                                                £1.00
                                            </div>
                                        </div>
                                        <div className='flex justify-between rounded-md border p-4 items-center'>
                                            <div className=" flex items-start space-x-4 ">
                                                <RadioGroupItem value="10" id="regular" />
                                                <div className="flex-1 space-y-2">
                                                    <p className="text-sm font-medium leading-none">
                                                        Regular Shipping
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        14-30 business days
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=' text-sm'>
                                                £10.00
                                            </div>
                                        </div>
                                        <div>
                                            <div className=" flex items-start space-x-4 rounded-md border bg-[#FFFCF8] border-[#FFB547] p-4">
                                                <RadioGroupItem value="50" id="international" />
                                                <div className="flex-1 space-y-2">
                                                    <p className="text-sm font-medium leading-none">
                                                        International Shipping
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        We’ll be in touch after your order is made
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </RadioGroup>


                                </div>


                            </CardContent>

                        </Card>
                        {/* <Card className='py-4'>
                            <CardHeader>
                                <CardTitle className=' font-inria  text-lg flex items-center'>
                                    <div className=' bg-foreground rounded-full flex justify-center items-center text-background w-6 h-6 mr-3 text-xs '>
                                        4
                                    </div>
                                    Payment Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image src={payment} className='w-[10rem] h-[2rem]' alt='payment-image' />
                                <div className="grid font-gfs gap-y-5 w-full mt-5">
                                    <div className='w-full'>
                                        <p>Credit Card Number</p>
                                        <input type="text" className=" border-b pb-2 w-full outline-none focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Enter card number" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Expiration Date</p>
                                        <input type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="(MM/YY)" />
                                    </div>
                                    <div className='w-full'>
                                        <p>Security Code/CVV</p>
                                        <input type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="Enter 3 digits code behind card here " />
                                    </div>
                                    <div className='w-full'>
                                        <p>Name on Card</p>
                                        <input type="text" className=" border-b pb-2 outline-none w-full focus:outline-none border-gray-300/90    sm:text-sm" placeholder="The full name on your card" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}
                    </div>
                    <div className="lg:col-span-4 ">
                        <div className='bg-[#FAFAFA]'>
                            <Checkout shipping={shipping} >
                                <Button type='submit' className='w-full bg-foreground text-background mb-8  rounded-none  font-inria mt-4  h-[3rem]'>
                                    Pay with Payaza
                                </Button>

                            </Checkout>
                        </div>
                    </div>
                </div>

            </div>

            {/* <div className="flex items-center  justify-center mb-32">
                <Button className=" inline-flex  font-karla h-[3rem] font-light uppercase w-[12rem] bg-background text-foregroun border border-foreground shadow-none rounded-none hover:bg-background/80 hover:text-foreground">
                    VIEW MORE ITEMS
                </Button>
            </div> */}
        </form>
    )
}

export default Cart
