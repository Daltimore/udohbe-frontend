'use client'

import { cn } from '@/lib/utils'
import { currencyEnum, useCurrencyStore } from '@/store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Currency = ({ value, className }: { value: string, className?: string }) => {
    const { currency } = useCurrencyStore()
    const [convertedValue, setConvertedValue] = useState<string>(value)
    const api = process.env.NEXT_PUBLIC_API_KEY

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                let rate = 1;
                let currencyCode = 'GBP';

                if (currency !== currencyEnum.Pounds) {
                    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${api}/pair/GBP/${currency.toUpperCase()}`)
                    rate = response.data.conversion_rate
                    currencyCode = currency.toUpperCase()
                }

                const converted = parseFloat(value) * rate

                setConvertedValue(new Intl.NumberFormat(
                    currency === currencyEnum.Naira ? 'en-NG' :
                        currency === currencyEnum.Dollars ? 'en-US' : 'en-GB',
                    {
                        style: 'currency',
                        currency: currencyCode
                    }
                ).format(converted))

            } catch (error) {
                console.error('Error fetching exchange rate:', error)
                setConvertedValue(new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP'
                }).format(parseFloat(value)))
            }
        }

        fetchExchangeRate()
    }, [currency, value, api])

    return (
        <div className={cn(`font-times font-light text-xl ${className}`)}>
            {convertedValue}
        </div>
    )
}

export default Currency