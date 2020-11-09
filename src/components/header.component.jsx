import { useEffect, useRef, useState } from "react";

const Header = prop => {
    const refHeader = useRef(null);
    const [scrollNow, setScrollNow] = useState(0);
    useEffect(() => {
        document.addEventListener('scroll', () => {
            if(document.documentElement.scrollTop > scrollNow){
                refHeader.current.classList.add('navbar-hidde')
                setScrollNow(document.documentElement.scrollTop)
            }else{
                refHeader.current.classList.remove('navbar-hidde')
            }
        })
    })
    return(
        <>
        <header className="row">
            <nav ref={refHeader} className="navbar navbar-expand-lg navbar-dark col-11 m-auto">
                <a className="navbar-brand" href="/">
                    <img src="img/logo.png" alt="Pokémon" className='img-brand'/>
                </a>
                <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <svg viewBox="0 0 16 16" 
                    className="bi bi-list" 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" 
                        d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
                <article className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link home-link" href="/">
                                <svg viewBox="0 0 16 16" 
                                className="bi bi-house-door-fill" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                                    <path fillRule="evenodd" 
                                    d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                </svg>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" 
                                href="https://github.com/tobiasbregante/pokeapi" 
                                target='_blank'>
                                <img src="img/github.png" alt="Github"/>
                            </a>
                        </li>
                        <li className="nav-item active linkedin">
                            <a className="nav-link" 
                                href="https://www.linkedin.com/in/tobías-nazareno-bregante-603304167" 
                                target='_blank'>
                                <img src="img/in.png" alt="Linkedin"/>
                            </a>
                        </li>
                    </ul>
                </article>
            </nav>
        </header>
        </>
    )
}

export default Header;