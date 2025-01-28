import OtherLogins from '../layout/Forms/OtherLogins';
import SignUpForm from "../layout/Forms/SignUpForm";
import LoginForm from "../layout/Forms/LogInForm";
import { useState } from "react";

function LoginPage() {
    const [isLogin, setIsLogin] = useState(false);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            {!isLogin ? <SignUpForm switch={handleSwitch} /> : <LoginForm switch={handleSwitch} />}
            <OtherLogins />
        </>
    );
}

export default LoginPage;
