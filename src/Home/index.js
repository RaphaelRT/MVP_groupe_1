import React, { useEffect, useRef, useState } from "react";
import Card from "../Card";
import ServiceCard from "../ServiceCard";
import './index.css';
import Schema from "../imgs/schema_black.svg"
import ExpertiseCard from "../ExpertiseCard";
import TeamCard from "../TeamCard";
import Proposal from "../imgs/proposal.svg"
import Adaptability from "../imgs/adaptability.svg"
import Fiability from "../imgs/fiability.svg"
import Madeinfrance from "../imgs/madeinfrance.svg"
import Bastien from "../imgs/bastien.png"
import Jb from "../imgs/jb.png"
import Zhifeng from "../imgs/zhifeng.jpg"
import Etienne from "../imgs/etienne.png"
import Laura from "../imgs/laura.png"
import Leo from "../imgs/leo.png"
import Raphael from "../imgs/raphael.png"
import ContactForm from "../ContactForm";
import Bdd from "../imgs/bdd.svg"
import Advice from "../imgs/advice.svg"
import Ai from "../imgs/ai.svg"
import Annotation from "../imgs/annotation.svg"
import logo from "../imgs/logo_white.svg";
import SmartMob from "../imgs/smart_mob.svg";
import SmarterPl from "../imgs/smarterplan.svg";
import Disney from "../imgs/disney.svg";


export default function Home() {
    const card_style_1 = { 
        transform: `rotate(-10deg) translate(10vw, 0vw)` 
    };
    const card_style_2 = { 
        transform: `rotate(0deg) translate(-3vw, 0vw)` 
    };
    const schemaRef = useRef()
    const [heightService, setHeightService] = useState("100%")

    useEffect(()=> {
        if (schemaRef.current && heightService === "100%"){
            setHeightService(schemaRef.current.offsetHeight+"px")
        }
    }, [])
    
    return (
    <div className="home">
        <div className="logo_container">
            <img src={logo}></img>
            <div className="logo_text">
                <h1>IMAGO</h1>
                <span>Spécialiste de la Data, IA et Data Labelling</span>
            </div>

        </div>
        <main>
            <div className="content_container">
                <h2>Nous sommes Imago, une agence spécialisée offrant des prestations <b>sur mesure</b> dans la <br></br>gestion et l'exploration de la data en vue d'une construction de <b>base de données</b> <br></br> ou <b>d'intelligence artificielle</b></h2>
                <h3><b>Peu importe votre niveau d'avancement,<br></br> nous nous adaptons à vos besoins et à vos projets</b></h3>
                <div className="ctaContainer">
                    <button>Planifier une visio</button>
                    <button>Appelez-moi</button>
                </div>
                <div className="valeur_container">
                    <div className="valeur_card">
                        <img src={Bdd}></img>
                        <span>Création de base<br></br> de données</span>
                    </div>
                    <div className="valeur_card">
                        <img src={Annotation}></img>
                        <span>Data<br></br> labelling</span>
                    </div>
                    <div className="valeur_card">
                        <img src={Ai}></img>
                        <span>Intelligence<br></br> artificielle</span>
                    </div>
                    <div className="valeur_card">
                        <img src={Advice}></img>
                        <span>Conseil et<br></br> coaching</span>
                    </div>

                </div>
            </div>
        </main>
        <div className="services_container">
            <h4>Services</h4>
            <div className="services_container_bloc">
                <div className="services_container_bloc-service">
                    <ServiceCard title="Collecte de données" content="Vous souhaitez avoir une \n base d’images labellisées \n mais vous n’avez pas les \n ressources pour procéder au \n data labeling ?" subcontent="Nous nous chargeons de collecter des contenus fiables et de qualité pour vous."></ServiceCard>
                    <ServiceCard title="Data Labelling" content="La labellisation est une tâche \n chronophage sujette aux \n erreurs surtout si elles \n sont délocalisées à l’autre bout du \n monde." subcontent="Notre équipe experte labellise de façon efficace et granulaire vos contenus."></ServiceCard>
                    <ServiceCard title="Construction d’IA" content="Peu importe votre secteur \n d’activité, les intelligences \n artificielles peuvent faciliter \n votre gestion, contribuer à la \n sécurité, améliorer votre \n chiffre d’affaires." subcontent="Dès lors que l’IA est construite et entraînée de façon efficiente. Notre équipe se charge d'entraîner et de construire des intelligences artificielles selon vos besoins."></ServiceCard>
                    <ServiceCard title="Conseil" content="Que ce soit pour apprendre, \n progresser ou rafraîchir \n votre mémoire" subcontent="Nous proposons des formations à la carte pour éduquer vos équipes et les épauler dans leurs projets data et IA."></ServiceCard>
                </div>
            </div>
        </div>
        <div className="expertise_container">
            <h4>L’Expertise Imago</h4>
            <div className="expertiseCard_container">
                <ExpertiseCard
                    img={Fiability}
                    title="Fiabilité"
                    content="Vérification manuelle par notre équipe experte pour des bases de données fiables et sans erreurs."
                ></ExpertiseCard>
                <ExpertiseCard
                    img={Proposal}
                    title="Proposition"
                    content="Un data labelling ultra ultra granulaire pour vous permettre de segmenter et d'accroître la finesse d’apprentissage de vos IA."
                ></ExpertiseCard>
            </div>
            <div className="expertiseCard_container">
                <ExpertiseCard
                    img={Adaptability}
                    title="Adaptabibilié"
                    content="Nous prenons en charge tout type de projet, que vous soyez à un stade avancé comme la construction d’une IA ou à l’étape de collecte de données."
                ></ExpertiseCard>
                <ExpertiseCard
                    img={Madeinfrance}
                    title="Made in France"
                    content="Pour des raisons éthiques, nous n'externalisons pas le traitement de données à l’autre bout du monde. Nous portons à coeur de valoriser l'expertise française dans l'IA"
                ></ExpertiseCard>

            </div>
        </div>
        <div className="confidence_container">
            <h4>Il nous font confiance</h4>
            <div className="confidence_container_imgs">
                <div>
                    <img src={Disney}></img>
                </div>
                <div>
                    <img src={SmartMob}></img>
                </div>
                <div>
                    <img src={SmarterPl}></img>
                </div>

            </div>


        </div>
        <div className="team_container">
            <h4>L’équipe</h4>
            <div className="teamCard_list">
                <TeamCard name="Bastien Toiron" jobTitle="Data Marketer" img={Bastien}></TeamCard>
                <TeamCard name="Jean-Baptiste Laurent" jobTitle="Data Marketer" img={Jb}></TeamCard>
            </div>
            
            <div className="teamCard_list">
                <TeamCard name="Raphaël Robert" jobTitle="Ingénieur Data" img={Raphael}></TeamCard>
                <TeamCard name="Zhifeng Liang" jobTitle="Ingénieur Data" img={Zhifeng}></TeamCard>
                <TeamCard name="Etienne Roseau" jobTitle="Data Scientist"img={Etienne}></TeamCard>
                <TeamCard name="Laura Bento" jobTitle="Data Scientist" img={Laura}></TeamCard>
                <TeamCard name="Léo Sablong" jobTitle="Analyste data" img={Leo}></TeamCard>
            </div>
        </div>
        <div className="contact_container">
            <h4>Contact</h4>
            <ContactForm></ContactForm>
        </div>
    </div>
    );
}