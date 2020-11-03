import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const SearchPokemon = prop => {
    const [poke, setPoke] = useState({});
    const [scrollNow, setScrollNow] = useState(0);
    const [btnOpen, setBtnOpen] = useState({
        open: true,
        text: ''
    })
    const [language, setLanguage] = useState({});
    const [placeholderSearch, setPlaceholderSearch] = useState('');
    const [valueBtnOpen, setValueBtnOpen] = useState({
        close: {
            text: ''
        },
        open: {
            text: ''
        }
    });
    const [pokeOpen, setPokeOpen] = useState('card-list card col-11 col-sm-11 col-lg-3 col-xl-3 m-auto')
    const [btnScrollTop, setBtnScrollTop] = useState('btn-scroll-top d-none');
    const refSearch = useRef(null)
    const [valueInput, setValueInput] = useState('');
    const HandlerPokemon = async value => {
        const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`),
        pokeRes = await pokeData.data;
        setPoke(pokeRes);
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
        if(btnOpen && btnOpen.open){
            setPokeOpen('card-list card card-poke-open col-12 col-sm-12 col-lg-8 col-xl-8 m-auto')
            e.target.classList.toggle('btn-danger')
            e.target.classList.toggle('bg-danger')
            e.target.classList.toggle('btn-close-card')
            setBtnOpen({
                close: true,
                text: valueBtnOpen.close.text
            })
            console.log(btnOpen)
        }else if(btnOpen && btnOpen.close){
            setPokeOpen('card-list card col-11 col-sm-11 col-lg-3 col-xl-3 m-auto')
            e.target.classList.toggle('btn-danger')
            e.target.classList.toggle('bg-danger')
            e.target.classList.toggle('btn-close-card')
            setBtnOpen({
                open: true,
                text: valueBtnOpen.open.text
            })
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
    }, [])
    useEffect(() => {
        setLanguage(prop.translate)
        setPlaceholderSearch(prop.translate.placeholder_search)
        if(Object.keys(poke).length !== 0){
            if(valueBtnOpen.open.text !== prop.translate.valueBtnOpen.open
                || valueBtnOpen.close.text !== prop.translate.valueBtnOpen.close){
                setValueBtnOpen({
                    close:{
                        text: prop.translate.valueBtnOpen.close
                    },
                    open: {
                        text: prop.translate.valueBtnOpen.open
                    }
                })
            }
            if(btnOpen.open && btnOpen.text !== prop.translate.valueBtnOpen.open){
                setBtnOpen({
                    open: true,
                    text: prop.translate.valueBtnOpen.open
                })
            }if(btnOpen.close && btnOpen.text !== prop.translate.valueBtnOpen.close){
                setBtnOpen({
                    close: true,
                    text: prop.translate.valueBtnOpen.close
                })
            }
        }else{
            console.log('Vacío')
        }
    })
    return(
        <>
        <form ref={refSearch} onSubmit={HandlerSubmit} className="frm-search col-8 col-sm-8 col-lg-4 col-xl-4">
            <input onChange={HandlerInput} type="search" placeholder={placeholderSearch} aria-label="Search"/>
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
            poke && poke.name ?
            <article className='col-12 p-1'>
                <article className={pokeOpen}>
                    <article className="card-body">
                        <article className='col-6 contain-card-list-img'>
                            <article id={`carouselExampleFade${prop.idPoke}`} className="carousel slide carousel-fade" data-ride="carousel">
                            <article className="carousel-inner">
                                {
                                    poke && poke.sprites ?
                                    Object.values(poke.sprites).map((pokeImg, r) => {
                                        if(pokeImg !== null && typeof pokeImg !== 'object'){
                                            return(
                                                <article key={r} className={`carousel-item ${r === 0 ? 'active' : ''}`}>
                                                    <article className='card-img-list-slide col-12' 
                                                    style={{backgroundImage: `url('${pokeImg}')`}}/>
                                                </article>
                                            )
                                        }
                                    })
                                    : ''
                                }
                            </article>
                            <a className="carousel-control-prev" href={`#carouselExampleFade${prop.idPoke}`} role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href={`#carouselExampleFade${prop.idPoke}`} role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="sr-only">Next</span>
                            </a>
                        </article>
                            <article className='card-img-close col-12' 
                                style={{backgroundImage: poke && poke.sprites ? `url('${poke.sprites.front_default}')` : 'none'}}/>
                        </article>
                        <article className='col-6 description-card-list'>
                            <p className='card-title'>{poke.name}</p>
                            <ul className='m-0 p-0'>
                                <li>XP: {poke && poke.base_experience ? poke.base_experience : ''}<hr/></li>
                                    <li>
                                        <span className='abilities-card-list'>
                                            {
                                                poke && poke.abilities  && language && language.ability ? 
                                                `${poke.abilities.length} ${poke.abilities.length > 1 ? 
                                                    language.ability.true.plural : language.ability.true.singular}`
                                                : <small>
                                                    {
                                                        language && language.ability ?
                                                        language.ability.false
                                                        : ''
                                                    }
                                                    </small>
                                            }
                                        </span>
                                        <p className='abilities-card-open-title'>
                                        {
                                            language && language.ability ?
                                            `${poke && poke.abilities && poke.abilities.length > 1 ? 
                                                language.ability.true.plural : language.ability.true.singular}`
                                            : <small>
                                                {
                                                    language && language.ability ?
                                                    language.ability.false
                                                    : ''
                                                }
                                            </small>
                                        }
                                    </p>
                                    <ol className='abilities-card-open'>
                                        {
                                            poke && poke.abilities ?
                                            poke.abilities.map((abilitiesPoke, p) => (
                                                <li key={p}>{abilitiesPoke.ability.name}</li>
                                            ))
                                            : <small>
                                                {
                                                    language && language.ability ?
                                                    language.ability.false
                                                    : ''
                                                }
                                            </small>
                                        }
                                    </ol>
                                </li><hr/>
                            <li>
                                {
                                    poke && poke.moves && language && language.moves ? 
                                    `${poke.moves.length} ${poke.moves.length > 1 ? 
                                        language.moves.true.plural : language.moves.true.singular}`
                                    : <small>
                                        {
                                            language && language.moves ?
                                            language.moves.false
                                            : ''
                                        }
                                    </small>
                                }
                                <hr/>
                            </li>
                        </ul>
                        <input onClick={HandlerOpen} type="button" className='btn btn-search' value={btnOpen.text}/>
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