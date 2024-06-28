'use client'

import { cn, convertCurrency } from '@/lib/utils'
import { currencyEnum, useCurrencyStore } from '@/store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Currency = ({ value, className }: { value: string, className?: string }) => {
    const { currency } = useCurrencyStore()
    const [convertedValue, setConvertedValue] = useState<string>(value)

    useEffect(() => {
        const updateCurrency = async () => {
            if (currency === currencyEnum.Naira) {
                const result = await convertCurrency(value);
                setConvertedValue(result);
            } else {
                const result = await convertCurrency(value);
                setConvertedValue(result);
            }
        }
        updateCurrency();
    }, [currency, value])

    return (
        <div className={cn(`font-times font-light text-xl ${className}`)}>
            {convertedValue}
        </div>
    )
}

export default Currency
