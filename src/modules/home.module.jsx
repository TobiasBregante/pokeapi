import { useEffect, useState } from 'react';
import Body from '../components/body.component';
import PokemonAll from '../components/pokemon/all.component';
import Translate from '../components/pokemon/translate.storage.component';

const HomeModule = () => { // home module 
    const [language, setLanguage] = useState({});
    useEffect(() => {
        setLanguage(Translate.Es) // setting spanish language as default
    }, [])
    const HandlerLanguage = e => { // language handler switch
        if(e.target.value === 'en'){
            setLanguage(Translate.En);
        }else{
            setLanguage(Translate.Es);
        }
    }
    return(
        <>
        <Body>
            <select onChange={HandlerLanguage} className='form-control languages-header'>
                <option value='es'>🇪🇸 Es-es</option>
                <option value='en'>🇬🇧 En-en</option>
            </select>
            <PokemonAll translate={language}/>
        </Body>
        </>
    )
}

export default HomeModule;