
import Item from '@/components/Item'
import { getProductById } from '@/lib/api'

const page = async ({ params }: {
    params: {
        id: string
    }
}) => {
    const response = await getProductById(params.id)
    const data = response.data

    return (
        <Item data={data} name='Oil Diffusers' />
    )
}

export default page
