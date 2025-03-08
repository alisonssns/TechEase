import { useNavigate } from 'react-router-dom'
import styles from '../../styles/SearchBar.module.css'
import { BiSearch as Search } from 'react-icons/bi'
import { useState } from 'react'

export default function SearchBar({type} : {type : string}) {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')

    const handleClick = () => {
        if (searchValue) {
            navigate(`/search?filter=${searchValue}&orderFilter=0`)
            setSearchValue('')
        }
    }

    return (
        <form className={styles[type]} onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
            <input
                type='text'
                className={styles.searchBar}
                placeholder='Pesquisar...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <label className={styles.searchButton} onClick={handleClick}>
                <Search />
            </label>
        </form>
    )
}
