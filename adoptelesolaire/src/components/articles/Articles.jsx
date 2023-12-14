import './articles.css'
import image1 from '../../images/image1.png'
import image2 from '../../images/image2.png'
import image3 from '../../images/image3.png'

function Articles() {
    return ( 
        <div className='flexColumn articleContainer'>
            <article className='impair'>
                <div className='flexColumn textContent'>
                    <h3>Lorem ipsum</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur a laoreet dui. Sed et fringilla mauris.
                        Quisque quam orci, tristique ut vehicula ut, porta sit amet erat.
                        Aliquam ac nunc finibus, condimentum leo at, commodo nunc.
                        Maecenas ultricies risus in diam pharetra congue.
                        In dapibus ex convallis enim cursus dictum.
                        </p>
                    <a href="#" className='button'>Lorem ipsum</a>
                </div>
                <div className='imageContent'>
                    <img srcSet={image1} alt="question" />
                </div>
            </article>
            <article className='pair'>
                <div className='imageContent'>
                    <img srcSet={image2} alt="question" />
                </div>
                <div className='flexColumn textContent'>
                    <h3>Lorem ipsum</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur a laoreet dui. Sed et fringilla mauris.
                        Quisque quam orci, tristique ut vehicula ut, porta sit amet erat.
                        Aliquam ac nunc finibus, condimentum leo at, commodo nunc.
                        Maecenas ultricies risus in diam pharetra congue.
                        In dapibus ex convallis enim cursus dictum.
                        </p>
                    <a href="#" className='button flexEnd'>Lorem ipsum</a>
                </div>
            </article>
            <article className='impair'>
                <div className='flexColumn textContent'>
                    <h3>Lorem ipsum</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur a laoreet dui. Sed et fringilla mauris.
                        Quisque quam orci, tristique ut vehicula ut, porta sit amet erat.
                        Aliquam ac nunc finibus, condimentum leo at, commodo nunc.
                        Maecenas ultricies risus in diam pharetra congue.
                        In dapibus ex convallis enim cursus dictum.
                        </p>
                    <a href="#" className='button'>Lorem ipsum</a>
                </div>
                <div className='imageContent'>
                    <img srcSet={image3} alt="question" />
                </div>
            </article>
        </div>
     );
}

export default Articles;