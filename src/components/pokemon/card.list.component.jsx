import Axios from "axios";
import { useEffect, useState } from "react";

const CardPokemon = prop => {
    const [poke, setPoke] = useState([]);
    const [btnOpen, setBtnOpen] = useState({
        open: true,
        text: ''
    })
    const [language, setLanguage] = useState({});
    const [valueBtnOpen, setValueBtnOpen] = useState({
        close: {
            text: ''
        },
        open: {
            text: ''
        }
    });
    const [pokeOpen, setPokeOpen] = useState('card-list card col-11 col-sm-11 col-lg-3 col-xl-3 m-auto')
    const FetchPoke = async () => {
        const getData = await Axios.get(prop.urlApi);
        const resData = await getData.data;
        setPoke(resData);
    }
    const HandlerOpen = e => {
        if(btnOpen.open){
            setPokeOpen('card-list card card-poke-open col-12 col-sm-12 col-lg-8 col-xl-8 m-auto')
            e.target.classList.toggle('btn-danger')
            e.target.classList.toggle('bg-danger')
            e.target.classList.toggle('btn-close-card')
            setBtnOpen({
                close: true,
                text: valueBtnOpen.close.text
            })
            console.log(btnOpen)
        }else if(btnOpen.close){
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
        FetchPoke()
    }, [])
    useEffect(() => {
        setLanguage(prop.translate)
        if(valueBtnOpen 
            && valueBtnOpen.open.text !== prop.translate.valueBtnOpen.open
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
    })
    return(
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
    )
}

export default CardPokemon;