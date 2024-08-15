import { JSONData } from "@/utils/definitions";
import Image from "next/image";
import { useState } from "react";
import type { ImageLoaderProps } from 'next/image';

interface DynamicImageProps {
    objectFit?: string;
    objectPosition?: string;
    src: JSONData; // You might want to define a more specific type based on your data structure
    altname?: string;
}

const DynamicImage: React.FC<DynamicImageProps> = ({ objectFit, objectPosition, src, altname }) => {
    const imgLoader = ({width }: ImageLoaderProps) => {
        let key = "medium";
        if (width <= 500) key = "small";
        else if (width <= 750) key = "medium";
        else key = "large";

        let url: string | null = null;

        if (src?.data?.attributes?.formats != null) {
            const path = src?.data?.attributes?.formats[key]?.url;
            if (path !== undefined && path !== null)
                url = process.env.NEXT_PUBLIC_IMG_ENDPOINT + path;
        } else if (src?.data?.attributes?.url != null) {
            url = process.env.NEXT_PUBLIC_IMG_ENDPOINT + src?.data?.attributes?.url;
        }

        if (url !== null && url !== "null" && url !== "undefined")
            return url;
        else
            return "#";
    };

    // const [op, setOp] = useState(1);

    return (
        <Image
            fill
            objectPosition={objectPosition}
            objectFit={objectFit}
            src="/example.png"
            loader={imgLoader}
            alt={altname || "image of " + (src?.data?.attributes?.alternativeText || "unknown image")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    );
};

export default DynamicImage;
