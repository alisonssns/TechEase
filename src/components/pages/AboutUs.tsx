import { FaQuoteLeft as Left, FaQuoteRight as Right } from 'react-icons/fa6'
import styles from '../styles/AboutUs.module.css'

export default function AboutUs() {
    return (
        <section className={styles.aboutUs}>
            <div className={styles.about}>
                <h1>SOBRE NÓS.</h1>
                <p>Bem-vindo à <b>TechEase</b>, um empreendimento impulsionado pela paixão e inovação de duas mentes criativas. Fundada por <b>Vagner</b> e <b>Alisson</b>, nossa empresa nasceu da determinação de criar periféricos excepcionais que elevam a experiência tecnológica de todos os nossos clientes.Nossa jornada começou com uma visão simples: desenvolver periféricos que não apenas atendam às necessidades práticas dos usuários, mas também inspirem e encantem. Unidos por nossa paixão por tecnologia e design, nós, como fundadores, nos esforçamos para transformar essa visão em realidade.</p>
                <p>O que nos diferencia é nosso compromisso inabalável com a excelência. Cada produto que lançamos é o resultado de extensa pesquisa, desenvolvimento cuidadoso e testes rigorosos. Desde teclados ergonômicos que proporcionam conforto durante longas sessões de trabalho e jogatina até mouses de alta precisão que respondem intuitivamente aos movimentos, cada periférico que sai de nossa empresa é projetado para elevar o desempenho e a eficiência.</p>
            </div>
            <div className={styles.phrase}>
                <div className={styles.quotes}>
                    <Left />
                    <Right />
                </div>
                <h2>Se apagarmos o erro, não tem como o erro existir.</h2>
                <i>Vagner, BackEnd Developer</i>
            </div>
            <div className={styles.info}>
                <div className={styles.images}>
                    <div className={styles.img}>"Vagner"</div>
                    <div className={styles.img}>"Alisson"</div>
                </div>
                <div>
                    <h1>NOSSO TIME.</h1>
                    <p>"No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação , não existe meio-termo. Ou você faz uma coisa bem-feita ou não faz."</p>
                    <div>Nosso time preza pelo foco e o trabalho em equipe para alcançar algum objetivo. O aprendizado nunca para de ser necessário e o esforço nunca é demais, pois acreditamos que é através da dedicação constante que conseguimos superar desafios e evoluir tanto individualmente quanto como grupo. Valorizamos a troca de ideias e a diversidade de pensamentos, reconhecendo que é a colaboração harmoniosa de diferentes perspectivas que nos permite encontrar soluções inovadoras e criativas.
                        Nossa abordagem é pautada na busca incessante pela excelência, sempre buscando aprimorar nossas habilidades e conhecimentos. Acreditamos que cada obstáculo que enfrentamos é uma oportunidade para crescer e desenvolver resiliência, tornando-nos mais preparados para os desafios futuros.</div>
                </div>
            </div>
        </section>
    )
}