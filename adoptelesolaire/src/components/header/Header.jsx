import './header.css'

function Header({openModal}) {
    return ( 
        <header>
            <div className="frontrow">
                <div className="title">
                    <h1>AdopteLeSolaire.fr</h1>
                </div>
                <div className="socials">
                    <p>Rejoignez-nous sur les réseaux : </p>
                    <a href="#"><i className="fa-brands fa-facebook fa-2xl"></i></a>
                    <a href="#"><i className="fa-brands fa-x-twitter fa-2xl"></i></a>
                    <a href="#"><i className="fa-brands fa-instagram fa-2xl"></i></a>
                    <a href="#"><i className="fa-brands fa-youtube fa-2xl"></i></a>
                </div>
            </div>
            <div className='secondrow'>
                <div className='buttons'>
                    <a href="#" className="contact button2" onClick={openModal}>Contactez-nous</a>
                    <a href="#" className="simulator button">Simulateur</a>
                </div>
            </div>
        </header>
     );
}

export default Header;