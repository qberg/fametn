
import Image from 'next/image'

const Separator = () => {
    return (
        <Image
            style = {{
                marginLeft : "10px",
                marginRight : "10px"
            }}
            src="/separator.svg"
            alt="->"
            width={10}
            height={10}
        />
    )
}

export default Separator;