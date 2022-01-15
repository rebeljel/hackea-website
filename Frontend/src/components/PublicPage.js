import React, { Component } from "react";
import '../layout/login/css/style.css';
import pic from '../layout/login/pics/tarvahack.jpg'
import LoginButton from '../components/Buttons/LoginButton'
import { connect } from "react-redux";

class PublicPage extends Component {

    render() {

        console.log("PUBLIC PAGE USER: " + this.props.user)
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="collapse navbar-collapse bg-light" fixed="top" style={{top: '60px', fontSize: '13px', zIndex: "1000"}} id="navbarNav">
                    <ul className="navbar-nav mx-auto my-2">
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Wohnzimmer <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Schlafzimmer</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Küche</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Badezimmer</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Homeoffice</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Designer Hacks</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Kinderzimmer</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Designer Hacks</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Haustiere</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Deko & Wohnaccessoires</a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">Outdoors</a>
                    </li>
                    </ul>
                </div>
                </nav>
                <div className="jumbotron jumbotron-fluid mt-4">
                    <div className="container white-container" >
                        <h2>IKEA DIY Hacks</h2>
                        <p className="lead">Teile deine eigenen DIY und Upcycling Projekte und Anleitungen.</p>
                    </div>
                </div>
                <div className="container-fluid my-featurette-container mb-2">
                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading"><span className="text-muted">Weg von der Massenware, hin zum Individuellen: </span>Werde Teil der IKEA-Upcycling Community.</h2>
                            <p className="lead">Teile deine Hacks, DIY-Ideen und Upcycling-Projekte mit IKEA-Möbeln und lade Fotos und Step-By-Step-Anleitungen hoch. Oder lass dich einfach von kreativen Designs inspirieren.</p>
                            <LoginButton/>                            
                            <button className="btn btn-dark text-dark btn-lg btn-reg rounded-pill" type="button" style={{margin: '12px'}}>Registriere dich</button>
                            
                        </div> 
                        <div className="col-md-5 order-md-1 p-2">
                            <img className="featurette-image img-responsive center-block w-100" src={pic} alt="Generic placeholder image"/>
                        </div>
                    </div>
                </div>

                <div className="container-fluid p-3" style={{backgroundColor: 'rgb(112, 146, 190)'}}>
                    <div className="container-fluid p-4" style={{textAlign: 'center'}}>
                    <h1>Warum HACKEA?</h1>
                    </div>
                    <div className="row mx-auto align-self-baseline" style={{textAlign: 'center'}}>
                    <div className="col col-lg-3 p-2 mx-auto px-3">
                        <h2>Eine kreative Community</h2>
                        <p>Hackea bietet einen Ort für Kreative, um einander zu inspirieren und zu motivieren.
                        </p>
                    </div>
                    <div className="col col-lg-3 p-2 mx-auto px-3">
                        <h2>Beitrag zur Umwelt</h2>
                        <p>Die Wiederverwertung oder Nachnutzung von bereits vorhandenem Material reduziert die Verwendung von Rohstoffen.</p>
                    </div>
                    <div className="col col-lg-3 p-2 mx-auto px-3">
                        <h2>Step-by-Step Anleitungen</h2>
                        <p>Detaillierte Beschreibungen von Projekten helfen bei der Umsetzung eigener Ideen. 
                        </p>
                    </div>
                    </div>
                </div>
                


                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
    
            </div>
        
        )
    }
}

const mapStateToProps = state => {
    return state
  }

export default connect(mapStateToProps)(PublicPage)