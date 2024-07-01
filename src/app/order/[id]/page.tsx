
import { getOrder } from '@/lib/api'
import CandleCard from '../../../assets/images/candle-card.png';
import Image from 'next/image';
import { convertSize } from '@/lib/utils';
import Currency from '@/components/currency';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



const page = async ({ params }: {
    params: {
        id: string
    }
}) => {
    const response = await getOrder(params.id)
    const data = response.data.attributes.items
    const formattedData = data.map((item: any) => {
        return item.product.data.attributes
    })

    console.log(response, 'ishei')




    return (
        <main>
            <div className="lg:container  lg:flex justify-center px-4 lg:max-w-3xl  lg:mx-auto items-center mt-10">
                <div className="flex flex-col items-center justify-center w-full">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M36.4792 0.5H13.5181C5.51654 0.5 0.5 6.16546 0.5 14.1829V35.8171C0.5 43.8345 5.4927 49.5 13.5181 49.5H36.4766C44.5047 49.5 49.5 43.8345 49.5 35.8171V14.1829C49.5 6.16546 44.5047 0.5 36.4792 0.5Z" fill="#5FDB89" />
                        <path d="M14.5 25L21.502 32L35.5 18" stroke="#F8F9FB" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className='  font-inria mt-5 text-xl pb-6'>Order Successful</h1>


                    <div className='w-full border-t'>
                        <p className='pt-8 px-4 pb-3 font-inria'>Your Orders</p>
                        {
                            formattedData && formattedData.map((product: any, index: number) => (
                                <div className='p-4 font-times w-full ' key={product?.product_id}>
                                    <div className='flex items-center gap-4'>
                                        <div className='lg:w-20 w-12 h-20 bg-[#FAF9F7]'>
                                            <Image src={product?.image ?? CandleCard} alt={product?.name} className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex flex-col gap-y-2 w-full'>
                                            <div>
                                                <div className='text-sm font-medium'>
                                                    {product?.name}
                                                </div>
                                                <div className='font-inria text-sm'>
                                                    Size: {convertSize(product)}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full ">
                                                <div className='font-inria text-sm flex items-center gap-x-3'>
                                                    x:
                                                    {data[index].quantity}
                                                </div>
                                                <Currency className='text-sm font-inria' value={(product?.amount)?.toLocaleString()} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-full mt-6 font-inria px-4 mb-5  flex flex-col gap-y-5">
                        <p className=' font-inria'>Shipping Details</p>
                        <div className='flex items-center justify-between text-foreground/70'>
                            <div>Name</div>
                            <div className=''>{response.data.attributes.customer_name}</div>
                        </div>
                        <div className='flex items-start justify-between text-foreground/70'>
                            <div>Address</div>
                            <div className='w-[50%] text-right'>{response.data.attributes.address}</div>
                        </div>
                        <div className='flex items-center justify-between text-foreground/70'>
                            <div>Contact</div>
                            <div>{response.data.attributes.phone_number ?? response.data.attributes.customer_email}</div>
                        </div>

                    </div>

                    <div className='w-full mb-10'>
                        <Link href='/all-candles'>
                            <Button className='w-full bg-foreground text-background  rounded-none  font-inria mt-4 mb-2 h-[3rem]'>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>

        </main>
    )
}

export default page
