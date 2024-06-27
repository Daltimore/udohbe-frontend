
'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Option {
    name: string
    value: string
}

interface Filter {
    name: string
    options: Option[]
}

const Filters = ({ color, sort }: { color: string | string[] | undefined, sort: string | string[] | undefined }) => {
    console.log(color, 'kepa')

    const searchParams = useSearchParams()
    const router = useRouter()
    const filters: Filter[] = [
        {
            name: 'Colour',
            options: [
                {
                    name: 'Black',
                    value: 'black'
                },
                {
                    name: 'White',
                    value: 'white'
                },
                {
                    name: 'Blue',
                    value: 'blue'
                },
                {
                    name: 'Green',
                    value: 'green'
                },
                {
                    name: 'Red',
                    value: 'red'
                }
            ]
        },
        {
            name: 'Sort',
            options: [
                {
                    name: 'Newest',
                    value: 'newest'
                },
                {
                    name: 'Oldest',
                    value: 'oldest'
                },
                {
                    name: 'Price: Low to High',
                    value: 'price-low-to-high'
                },
                {
                    name: 'Price: High to Low',
                    value: 'price-high-to-low'
                },
            ]
        }
    ]

    const handleFilterChange = (filterName: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(filterName?.toLowerCase(), value)
        router.push(`?${params.toString()}`)
    }

    const clearFilter = (filterName: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(filterName?.toLowerCase())
        router.push(`?${params.toString()}`)
    }

    return (
        <div>
            <div className="lg:flex items-center gap-x-4">
                <div className="text-sm cursor-pointer flex gap-x-5">
                    {filters.map((filter, index) => (
                        <div key={index}>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <div className="!font-gfs text-[#958B88] uppercase font-light flex items-center gap-2">
                                        {filter.name}
                                        <svg width="16" height="16" className="-ml-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.6666 5.66675L7.99992 10.3334L3.33325 5.66675" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full !font-gfs">
                                    <DropdownMenuLabel className=" uppercase text-center font-light"> {filter.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={searchParams.get(filter?.name?.toLowerCase()) || ''}
                                        onValueChange={(value) => handleFilterChange(filter.name, value)}
                                    >
                                        {filter.options.map((option, index) => (
                                            <DropdownMenuRadioItem key={index} value={option.value}>
                                                {option.name}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
                <div className="lg:mt-0 mt-3 flex items-center gap-4 font-gfs text-[#958B88] uppercase text-sm ">
                    {color && <>
                        <div className=" border px-3  bg-muted flex items-center">
                            Colour: {color}
                            <div>
                                <svg onClick={() => clearFilter('colour' as string)} width="11" className=" transform rotate-45 ml-3 cursor-pointer" height="12" viewBox="0 0 11 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.13773 0.866638V11.1333M0.00439453 5.99997H10.271" stroke="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </>}
                    {sort && <>
                        <div className=" border px-3 bg-muted flex items-center">
                            Sort: {sort}
                            <div>
                                <svg onClick={() => clearFilter('sort' as string)} width="11" className=" transform rotate-45 ml-3 cursor-pointer" height="12" viewBox="0 0 11 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.13773 0.866638V11.1333M0.00439453 5.99997H10.271" stroke="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </>}
                </div>

            </div>
        </div>
    )
}

export default Filters
