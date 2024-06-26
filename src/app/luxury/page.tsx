'use client'

import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'
import Filters from '@/components/Filters'
import Card from '@/components/card'
import { Button } from '@/components/ui/button'
const page = () => {
    const pathName = usePathname()

    const formatPathname = (pathname: string) => {
        const trimmedPath = pathname.replace(/^\//, '');
        return trimmedPath.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div>
            <div className="lg:container lg:flex justify-between px-4  lg:h-[4.5rem] max-w-screen-2xl items-center mt-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' font-spectral text-[#958B88]' href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className=' font-spectral'>{formatPathname(pathName)}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="lg:mt-0 mt-5">
                    <Filters />
                </div>

            </div>
            <div className="container mt-8 mb-32 gap-x-8 gap-y-16 max-w-screen-2xl mx-auto grid lg:grid-cols-3">
                {Array.from({ length: 9 }, (_, index) => (
                    <Card />
                ))}
            </div>
            <div className="flex items-center  justify-center mb-32">
                <Button className=" inline-flex  font-karla h-[3rem] font-light uppercase w-[12rem] bg-background text-foregroun border border-foreground shadow-none rounded-none hover:bg-background/80 hover:text-foreground">
                    VIEW MORE ITEMS
                </Button>
            </div>
        </div>
    )
}

export default page
