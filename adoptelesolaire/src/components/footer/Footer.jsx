import './footer.css'

function Footer() {
    return ( 
        <footer>
            <div className="leftSide flexColumn">
                <h3>AdopteLeSolaire.fr</h3>
                <div className="links flexColumn">
                    <a href='#'>Mentions légales</a>
                    <a href='#'>Politique de confidentialité</a>
                </div>
            </div>
            <div className="rightSide">
                <div className="socials">
                    <p>Rejoignez-nous sur les réseaux : </p>
                    <span>
                        <a href="#"><i className="fa-brands fa-facebook fa-2xl"></i></a>
                        <a href="#"><i className="fa-brands fa-x-twitter fa-2xl"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram fa-2xl"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube fa-2xl"></i></a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;