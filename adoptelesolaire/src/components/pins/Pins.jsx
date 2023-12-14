import './pins.css'

function Pins({openModal}) {
    return (  
        <aside>
            <a href="#" className="roundButton">
                <i className="fa-solid fa-calculator fa-2xl"></i> 
            </a>
            <a href="#" className="roundButton" onClick={openModal}>
                <i className="fa-solid fa-phone-volume fa-2xl"></i> 
            </a>
        </aside>
    );
}

export default Pins;