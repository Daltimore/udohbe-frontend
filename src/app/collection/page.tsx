import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Filters from '@/components/Filters'
import Card from '@/components/card'
import { Button } from '@/components/ui/button'
import { getProduct } from '@/lib/api'

const ProductPage = async ({ searchParams }: {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) => {

    const response = await getProduct(searchParams.colour as string, searchParams.sort as string, 'collections')

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
                            <BreadcrumbLink className=' font-spectral'>Collections</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="lg:mt-0 mt-5">
                    <Filters color={searchParams.colour} sort={searchParams.sort} />
                </div>

            </div>
            <div className="lg:container mt-8 mb-32 gap-x-8 gap-y-16 max-w-screen-2xl mx-auto grid lg:grid-cols-3">
                {response.data.map(item => (
                    <Card item={item} key={item?.id} />
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

export default ProductPage
