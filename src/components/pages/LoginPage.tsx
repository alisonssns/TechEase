import OtherLogins from '../layout/forms/OtherLogins';
import SignUpForm from "../layout/forms/SignUpForm";
import LoginForm from "../layout/forms/LogInForm";
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
