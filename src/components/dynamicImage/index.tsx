import { JSONData } from "@/utils/definitions";
import Image from "next/image";

const DynamicImage = ({objectFit, objectPosition, href} : JSONData) => {
    console.log(href)
    const imgLoader = ({ src, width, quality }: JSONData) => {
        var key = "medium"
        if (width < 400) key = "thumbnail"
        else if (width < 700) key = "small"
        else if (width < 1024) key = "medium"
        else key = "large"
       
        const url = process.env.NEXT_PUBLIC_IMG_ENDPOINT + href?.data?.attributes?.formats[key]?.url
        return url
    }
    
    return (<Image
        fill
        objectPosition={objectPosition}
        objectFit={objectFit}
        src="/example.png"
        loader={imgLoader}
        alt={"card image of " + href?.data?.attributes?.alternativeText}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />)
} 

export default DynamicImage;