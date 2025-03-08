import styles from '../../styles/Address.module.css'

export default function Terms() {
    return (
        <div className={styles.terms}>
            <h2>Termos e condições</h2>
            <div className={styles.termsBox}>
                <p>
                    Antes de prosseguir com o cadastro de seu endereço, pedimos que leia atentamente os seguintes termos e condições. Ao prosseguir com o cadastro, você estará concordando em cumprir e estar vinculado(a) a estes termos. Caso não concorde com alguma parte destes termos, por favor, não continue com o processo de cadastro.
                </p>

                <b>Privacidade e Segurança dos Dados:</b>         1.1. Todas as informações pessoais fornecidas no cadastro, incluindo o endereço, serão tratadas de acordo com nossa Política de Privacidade. Comprometemo-nos a proteger a confidencialidade de seus dados e utilizá-los somente conforme previsto em nossa política.
                <b>Veracidade das Informações:</b>                2.1. O usuário declara que todas as informações fornecidas no cadastro, incluindo o endereço, são verdadeiras, precisas e atualizadas.
                2.2. O usuário é o único responsável por quaisquer informações incorretas ou desatualizadas fornecidas, isentando-nos de quaisquer responsabilidades decorrentes dessas informações.
                <b>Uso do Endereço:</b>                           3.1. O endereço fornecido será utilizado exclusivamente para os fins específicos relacionados aos serviços oferecidos em nosso site, tais como entrega de produtos ou prestação de serviços contratados.
                3.2. O usuário reconhece que é responsável por informar mudanças em seu endereço e concorda em atualizar suas informações no site, caso necessário.
                <b>Cookies e Tecnologias de Rastreamento:</b>     4.1. Ao utilizar nosso site, cookies e outras tecnologias de rastreamento poderão ser utilizados para melhorar sua experiência de navegação e fornecer conteúdo personalizado. Para mais informações, consulte nossa Política de Cookies.
                <b>Responsabilidades do Usuário:</b>              5.1. O usuário concorda em utilizar o site de forma adequada e em conformidade com as leis e regulamentações aplicáveis.
                5.2. O usuário é responsável por manter a confidencialidade de suas informações de login e não compartilhá-las com terceiros. Quaisquer atividades realizadas em sua conta são de sua inteira responsabilidade.
                <b>Alterações nos Termos e Condições:</b>         6.1. Reservamo-nos o direito de modificar estes termos e condições a qualquer momento, sem aviso prévio. As alterações entrarão em vigor imediatamente após serem publicadas no site.
                6.2. O usuário concorda em revisar periodicamente os termos e condições para estar ciente de quaisquer atualizações ou mudanças.
                <b>Contato:</b>                                   7.1. Caso tenha dúvidas ou precise de assistência em relação aos termos e condições ou ao cadastro de endereço, entre em contato conosco através dos canais disponíveis no site.


            </div>
            <label><input type="checkbox" required /><h3>Aceitar Termos e condições</h3></label>
            <input type="submit" value="CADASTRAR" className='input2'/>
        </div >
    )
}