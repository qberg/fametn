
import Image from 'next/image'

const Separator = () => {
    return (
        <Image
            className='ms-2 me-2'
            src="/separator.svg"
            alt="->"
            width={10}
            height={10}
        />
    )
}

export default Separator;