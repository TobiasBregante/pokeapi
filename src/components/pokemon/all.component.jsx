import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import CardPokemon from './card.list.component';
import CounterPoke from './counter.poke.component';
import SearchPokemon from './search.component';

let dataPoke = [],
count = 0;
const PokemonAll = prop => {
    const refSection = useRef(null);
    const [pokemon, setPokemon] = useState([])
    const [language, setLanguage] = useState({})
    const [page, setPage] = useState(0)
    const HandlerListPokemon = async () => {
        const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=5`),
        pokeRes = await pokeData.data;
        pokeRes.results.forEach(obj => dataPoke.push(obj))
        setPokemon(dataPoke);
        return pokeRes;
    }
    useEffect(() => {
        HandlerListPokemon()
        setInterval(() => {
            if((document.documentElement.scrollTop + 900) >= document.documentElement.scrollHeight){
                count += 5
                HandlerListPokemon()
                setPage(count)
            }
        }, 1500)
    }, [])
    useEffect(() => {
        setLanguage(prop.translate)
    })
    return(
        <>
        <section ref={refSection} className="row">
            <CounterPoke translate={language} results={page}/>
            <SearchPokemon translate={language}>
                {
                    pokemon.map((obj, i) =>(
                        <CardPokemon translate={language} key={i} idPoke={i} urlApi={obj.url}/>
                    ))
                }
            </SearchPokemon>
            <img src="img/ave.gif" alt="Ave" className='ave-home'/>
            <img src="img/pikachu.gif" alt="Pikachu" className='pikachu-home'/>
        </section>
        </>
    )
}

export default PokemonAll;