'use client'
import Link from "next/link"
import Logo from "./Logo"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { currencyEnum, useCurrencyStore } from "@/store";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import { useStore } from 'zustand'
import { useCartStore } from "@/store/cart";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"



const Header = () => {
    const pathName = usePathname();
    const { currency, setCurrency } = useCurrencyStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const cartStore = useStore(useCartStore, (state) => state)

    useEffect(() => {
        setIsOpen(false);
        setIsMobileOpen(false);
    }, [pathName]);


    const UKFlag = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z" /><path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z" /><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z" /><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" /></svg>
    )

    const NigerianFlag = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#009A49" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z" /><path fill="#EEE" d="M12 5h12v26H12z" /><path fill="#009A49" d="M32 5h-8v26h8a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z" /></svg>
    )

    const USAFlag = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#B22334" d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z" /><path fill="#EEE" d="M.068 27.679c.017.093.036.186.059.277c.026.101.058.198.092.296c.089.259.197.509.333.743L.555 29h34.89l.002-.004a4.22 4.22 0 0 0 .332-.741a3.75 3.75 0 0 0 .152-.576c.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297a3.78 3.78 0 0 0-.092.297zM18 9h18c0-.233-.028-.459-.069-.68a3.606 3.606 0 0 0-.153-.576A4.21 4.21 0 0 0 35.445 7H18v2z" /><path fill="#3C3B6E" d="M18 5H4a4 4 0 0 0-4 4v10h18V5z" /><path fill="#FFF" d="M2.001 7.726l.618.449l-.236.725L3 8.452l.618.448l-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449l-.236.725l.617-.448l.618.448l-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L5 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449l-.236.725L7 8.452l.618.448l-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448l-.236-.725l.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 11l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448l-.236-.725l.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 15l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 15l-.235.726z" /></svg>
    )

    return (
        <main>

            <div className=' bg-background z-50 w-full border-b text-foreground      !font-gfs'>
                <div className="lg:container  px-4 flex h-[4.5rem]  items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-12">
                            <div className="flex items-center gap-3">
                                <svg onClick={() => setIsMobileOpen(true)} className="lg:hidden " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.99805 3.99839H14.003" stroke="#0E0E0E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.3353 7.99998H1.99805" stroke="#0E0E0E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.99805 12.0017H8.66749" stroke="#0E0E0E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <Link href='/'>
                                    <Logo />
                                </Link>
                            </div>
                            <ul className="lg:flex  text-sm gap-x-8 hidden   ">
                                <li>
                                    <Link className={cn(pathName === '/all-candles' && 'relative flex text-[#958B88]  items-center justify-center w-full  before:absolute before:-bottom-2 before:bg-[#958B88] before:w-[0.3rem] before:h-[0.3rem] before:rounded-full uppercase ')} href='/all-candles'>ALL LUXURY CANDLES</Link>
                                </li>
                                <li>
                                    <Link className={cn(pathName === '/oil-diffusers' && 'relative flex text-[#958B88]  items-center justify-center w-full  before:absolute before:-bottom-2 before:bg-[#958B88] before:w-[0.3rem] before:h-[0.3rem] before:rounded-full ')} href='/oil-diffusers'>OIL DIFFUSERS</Link>
                                </li>
                                <li>
                                    <Link className={cn(pathName === '/collection' && 'relative flex text-[#958B88]  items-center justify-center w-full  before:absolute before:-bottom-2 before:bg-[#958B88] before:w-[0.3rem] before:h-[0.3rem] before:rounded-full uppercase ')} href='/collection'>CANDLE SETS</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center lg:gap-x-4">
                            <div className="text-sm cursor-pointer">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="!font-gfs uppercase font-light flex items-center gap-2">
                                            {currency === currencyEnum.Pounds ? (
                                                <UKFlag />
                                            ) : currency === currencyEnum.Naira ? (
                                                <NigerianFlag />
                                            ) : (
                                                <USAFlag />
                                            )}
                                            {currency}
                                            <svg width="16" height="16" className="-ml-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.6666 5.66675L7.99992 10.3334L3.33325 5.66675" stroke="#4D525F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full !font-gfs">
                                        <DropdownMenuLabel className=" uppercase text-center font-light">Currency</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as currencyEnum)}>
                                            <DropdownMenuRadioItem value={currencyEnum.Pounds}>Pounds</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value={currencyEnum.Naira}>Naira</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value={currencyEnum.Dollars}>Dollars</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="ml-3 lg:ml-5 flex items-center gap-x-4 lg:gap-x-10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 19L15.71 15.71" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <button className="relative bgw" onClick={() => setIsOpen(!isOpen)}>
                                    {cartStore && cartStore?.cart.length > 0 && <div className="absolute ml-2 -mt-[0.4rem] w-4 h-4 text-background rounded-full bg-red-500 text-xs flex items-center justify-center ">{cartStore?.cart.length}</div>}
                                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.5 6V5C5.5 3.067 7.067 1.5 9 1.5V1.5C10.933 1.5 12.5 3.067 12.5 5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Cart isOpen={isOpen} setIsOpen={setIsOpen} />

            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>

                <SheetContent>
                    <SheetHeader>
                        <Link href='/'>
                            <Logo />
                        </Link>
                    </SheetHeader>
                    <ul className="flex-col flex  text-sm gap-x-8  mt-5 gap-y-5 font-gfs  ">
                        <li>
                            <Link className={cn(pathName === '/all-candles' && 'relative text-[#958B88]  ')} href='/all-candles'>ALL LUXURY CANDLES</Link>
                        </li>
                        <li>
                            <Link className={cn(pathName === '/oil-diffusers' && 'relative text-[#958B88] ')} href='/oil-diffusers'>OIL DIFFUSERS</Link>
                        </li>
                        <li>
                            <Link className={cn(pathName === '/collection' && 'relative text-[#958B88]  ')} href='/collection'>CANDLE SETS</Link>
                        </li>
                    </ul>

                </SheetContent>
            </Sheet>

        </main>

    )
}

export default Header