import OtherLogins from '../layout/forms/OtherLogins';
import SignUpForm from "../layout/forms/SignUpForm";
import LoginForm from "../layout/forms/LogInForm";
import styles from '../styles/Forms.module.css'
import { useState } from "react";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(false);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <section className={styles.container}>
            {!isLogin ? <SignUpForm switch={handleSwitch} /> : <LoginForm switch={handleSwitch} />}
            <OtherLogins />
        </section>
    );
}

