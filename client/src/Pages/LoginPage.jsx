import LoginImage from './LoginImage';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import "./LoginPage.css";
import "../tailwind.css";


const LoginPage = ({enteredValues,setEnteredValues,edited, setEdited}) => {



    const [moveImage, setMoveImage] = useState(0);
    const [signUpButton, setSignUpButton] = useState(false);
    const [loginMove, setLoginMove] = useState(0);

 



    return (

        <div id="tab-content-root">
            {/* Rest of the content */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex w-[1400px] h-[1024px] rounded-lg overflow-hidden bg-white shadow-xl">

                    {signUpButton ? (
                        <SignUpForm
                            setLoginMove={setLoginMove}
                            loginMove={loginMove}
                            setMoveImage={setMoveImage}
                            setSignUpButton={setSignUpButton}
                        />
                    ) : (
                        <LoginForm
                            loginMove={loginMove}
                            setLoginMove={setLoginMove}
                            setSignUpButton={setSignUpButton}
                            setMoveImage={setMoveImage}
                            enteredValues={enteredValues}
                            setEnteredValues={setEnteredValues}
                            edited={edited}
                            setEdited={setEdited}
                        />
                    )}

                    <LoginImage className="login-image" image={moveImage} />
                </div>
            </div>
        </div>





    );
};

export default LoginPage;
