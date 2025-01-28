import styles from '../../styles/Header.module.css'
import { BiSearch as Search } from 'react-icons/bi'

function SearchBar() {
    return (
        <form className={styles.searchBarHolder}>
            <input type='text' className={styles.searchBar} placeholder='Pesquisar...' />
            <label className={styles.searchButton}>
                <input type="submit" className='hide'/>
                <Search />
            </label>
        </form>
    )
}

export default SearchBar