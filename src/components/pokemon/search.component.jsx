import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const SearchPokemon = prop => {
    const [pokemon, setPokemon] = useState({});
    const [scrollNow, setScrollNow] = useState(0);
    const [valueBtnOpen, setValueBtnOpen] = useState('Analizar');
    const [pokeOpen, setPokeOpen] = useState('card-list card col-11 col-sm-11 col-lg-3 col-xl-3 m-auto')
    const [btnScrollTop, setBtnScrollTop] = useState('btn-scroll-top d-none');
    const refSearch = useRef(null)
    const [valueInput, setValueInput] = useState('');
    const HandlerPokemon = async value => {
        const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`),
        pokeRes = await pokeData.data;
        setPokemon(pokeRes);
        document.documentElement.scrollTop = 0;
        return pokeRes;
    },
    HandlerSubmit = e => {
        e.preventDefault();
        HandlerPokemon(valueInput);
    },
    HandlerInput = e => {
        setValueInput(e.target.value)
        HandlerPokemon(e.target.value);
    },
    HandlerScrollTop = e => {
        document.documentElement.scrollTop = 0;
    },
    HandlerOpen = e => {
        if(valueBtnOpen === 'Analizar'){
            setValueBtnOpen('Cerrar')
            setPokeOpen('card-list card card-poke-open col-12 col-sm-12 col-lg-8 col-xl-8 m-auto')
            e.target.classList.toggle('btn-danger')
            e.target.classList.toggle('bg-danger')
            e.target.classList.toggle('btn-close-card')
        }else{
            setValueBtnOpen('Analizar')
            setPokeOpen('card-list card col-11 col-sm-11 col-lg-3 col-xl-3 m-auto')
            e.target.classList.toggle('btn-danger')
            e.target.classList.toggle('bg-danger')
            e.target.classList.toggle('btn-close-card')
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', () => {
            if(document.documentElement.scrollTop > 0){
                setBtnScrollTop('btn-scroll-top')
            }else{
                setBtnScrollTop('btn-scroll-top d-none')
            }if(document.documentElement.scrollTop > scrollNow){
                refSearch.current.classList.add('frmSearchHidde')
                setScrollNow(document.documentElement.scrollTop)
            }else{
                refSearch.current.classList.remove('frmSearchHidde')
            }
        })
    })
    return(
        <>
        <form ref={refSearch} onSubmit={HandlerSubmit} className="frm-search col-8 col-sm-8 col-lg-4 col-xl-4">
            <input onChange={HandlerInput} type="search" placeholder="Buscar pokémon" aria-label="Search" />
            <button className="btn btn-search-frm" type="submit">
                <svg viewBox="0 0 16 16" 
                className="bi bi-search" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" 
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fillRule="evenodd" 
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg>
            </button>
        </form>
        {
            pokemon && pokemon.name ?
            <article className='col-12 p-1'>
                <article className={pokeOpen}>
                    <article className="card-body">
                        <article className='col-6 contain-card-list-img'>
                            <article className='card-img-list col-12' 
                            style={{backgroundImage: pokemon && pokemon.sprites ? `url('${pokemon.sprites.front_default}')` : 'none'}}/>
                            </article>
                        <article className='col-6 description-card-list'>
                            <p className='card-title'>{pokemon.name}</p>
                            <ul className='m-0 p-0'>
                                <li>XP: {pokemon && pokemon.base_experience ? pokemon.base_experience : ''}</li>
                                <li>
                                {
                                    pokemon && pokemon.abilities ? 
                                    `${pokemon.abilities.length} ${pokemon.abilities.length > 1 ? 'hablidades' : 'hablidad'}`
                                    : <small>Sin habilidades</small>
                                }
                                </li>
                                <li>
                                    {
                                        pokemon && pokemon.moves ? 
                                        `${pokemon.moves.length} ${pokemon.moves.length > 1 ? 'movimientos' : 'movimiento'}`
                                        : <small>Sin movimientos</small>
                                    }
                                </li>
                            </ul>
                            <input onClick={HandlerOpen} type="button" className='btn btn-search' value={valueBtnOpen}/>
                        </article>
                    </article>
                </article>
            </article>
            : prop.children
        }
        <button onClick={HandlerScrollTop} type='button' className={btnScrollTop}>
            <svg viewBox="0 0 16 16" 
            className="bi bi-arrow-up-circle-fill" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" 
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
            </svg>
        </button>
        </>
    )
}

export default SearchPokemon;