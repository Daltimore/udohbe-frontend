import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Option {
    name: string
    value: string
}

interface Filter {
    name: string
    options: Option[]
}

const Filters = () => {
    const filters: Filter[] = [
        {
            name: 'Size',
            options: [
                {
                    name: 'S',
                    value: 's'
                },
                {
                    name: 'M',
                    value: 'm'
                },
                {
                    name: 'L',
                    value: 'l'
                },
                {
                    name: 'XL',
                    value: 'xl'
                },
                {
                    name: 'XXL',
                    value: 'xxl'
                },
            ]
        },
        {
            name: 'Type',
            options: [
                {
                    name: 'Candle',
                    value: 'candle'
                },
                {
                    name: 'Wax',
                    value: 'wax'
                },
                {
                    name: 'Wood',
                    value: 'wood'
                },
                {
                    name: 'Metal',
                    value: 'metal'
                },
                {
                    name: 'Glass',
                    value: 'glass'
                },
                {
                    name: 'Other',
                    value: 'other'
                }
            ]
        },
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

    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({})

    return (
        <div>
            <div className="flex items-center gap-x-4">
                <div className="text-sm cursor-pointer flex gap-x-5">
                    {filters.map((filter, index) => (
                        <DropdownMenu key={index}>
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
                                    value={selectedValues[filter.name] || ''}
                                    onValueChange={(value) => setSelectedValues(prev => ({ ...prev, [filter.name]: value }))}
                                >
                                    {filter.options.map((option, index) => (
                                        <DropdownMenuRadioItem key={index} value={option.value}>{option.name}</DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filters
