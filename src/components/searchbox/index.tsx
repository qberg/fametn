import { JSONData } from "@/utils/definitions";
import SearchIcon from '@mui/icons-material/Search';


const SearchBox = ({ handleSearch, placeholder }: JSONData) => {
    const placeholderText: string = placeholder || "Search";
    return (
        <div className="bordersearch">
            <SearchIcon />
            <input
                type="text"
                placeholder={placeholderText}
                className="search"
                style={{ marginRight: '5px' }}
                onChange={handleSearch} // Call handleSearch on input change
            />
        </div>)
}

export default SearchBox