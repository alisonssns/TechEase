import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Header.module.css'
import { BiSearch as Search } from 'react-icons/bi'
import { useState } from 'react'

function SearchBar() {
    const navigation = useNavigate()
    const [searchValue, setSearchValue] = useState('')

    const handleClick = () => {
        if (searchValue) {
            navigation(`/home/${searchValue}`)
            window.location.reload();
        }
    }

    return (
        <form className={styles.searchBarHolder} onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
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

export default SearchBar
