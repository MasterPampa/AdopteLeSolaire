import './header.css'
import { Link } from 'react-router-dom';

function Header({ openModal }) {

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const handleScroll = () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
};

window.addEventListener('scroll', handleScroll);

return (
  <header>
    <div className="frontrow">
      <div className="title">
        <Link className='link' to="/#"><h1>AdopteLeSolaire.fr</h1></Link>
      </div>
      <div className='secondrow'>
        <div className='buttons'>
          <div className="contact button2" onClick={openModal}>Contactez-nous</div>
          <div onClick={scrollToTop} className="simulator button">Simulateur</div>
        </div>
      </div>
    </div>
  </header>
);
}

export default Header;