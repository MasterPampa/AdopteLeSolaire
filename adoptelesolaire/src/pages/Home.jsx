import Header from "../components/header/Header";
import Pins from "../components/pins/Pins"; 
import Form from "../components/form/Form"
import Articles from "../components/articles/Articles";
import Footer from "../components/footer/Footer";

function Home() {
    return ( 
        <div>
            <Header />
            <Pins />
            <main>
                <Form />
                <Articles />
            </main>
            <Footer />
        </div>
     );
}

export default Home;