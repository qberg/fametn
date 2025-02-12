// import { JSONData } from "@/utils/definitions";
// import SearchIcon from '@mui/icons-material/Search';
// import { useRouter } from "next/router";
// import { useState } from "react";

// const strings = {
//     search: {
//         en: "Search",
//         ta: "தேடு"
//     }
// }

// const SearchBox = ({ handleSearch, placeholder }: JSONData) => {
//     const { locale } = useRouter();
//     const placeholderText: string = placeholder || strings.search[locale as keyof typeof strings.search] || strings.search.en;
//     const [value, setValue] = useState("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value);
//         handleSearch(e.target.value);
//     }

//     return (
//         <div className="bordersearch">
//             <SearchIcon />
//             <input
//                 value={value}
//                 type="text"
//                 placeholder={placeholderText}
//                 className="search me-1"
//                 onChange={handleChange}
//             />
//         </div>)
// }

// export default SearchBox