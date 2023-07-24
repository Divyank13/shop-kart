import { useContext, useState } from 'react'
import './signupPage.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export const SignupPage = () => {
    const navigate = useNavigate();

    const [signupInputData, setSignupInputData] = useState({ email: '', password: '', confirmPass: '', name: '' })
    const [isValid, setIsValid] = useState({ isEmail: false, isPassword: false, isPassAndConfirmPassEqual: false, isName: false })
    const [showErrors, setShowErrors] = useState(false);

    const { signUp, isLoggedIn } = useContext(AuthContext)

    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(email);

    const validateForm = (event) => {
        if (event.target.id === 'email') {
            setIsValid({ ...isValid, isEmail: isEmail(event.target.value) })
        }
        if (event.target.id === 'pass') {
            setIsValid({ ...isValid, isPassword: (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(event.target.value)) })
        }
        if (event.target.id === 'confirmPass') {
            setIsValid({ ...isValid, isPassAndConfirmPassEqual: signupInputData?.password === event?.target?.value })
        }
        if (event.target.id === 'name') {
            setIsValid({ ...isValid, isName: event.target.value.length >= 2 })
        }
    }

    const mailChangeHandler = (event) => {
        setSignupInputData({ ...signupInputData, email: event.target.value })
    }

    const passwordChangeHandler = (event) => {
        setSignupInputData({ ...signupInputData, password: event.target.value })
    }

    const confirmPasswordChangeHandler = (event) => {
        setSignupInputData({ ...signupInputData, confirmPass: event.target.value })
    }

    const signUpClickHandler = () => {
        setShowErrors(true)
        signUp(signupInputData, isValid)
    }
    if (isLoggedIn) {
        navigate('/')
    } else {
        return (
            <div className="signup-page">
                <div className="signup-modal">
                    <p className="signup-heading">
                        Sign Up
                    </p>
                    <form action="submit" className="signup" onChange={validateForm}>
                        <div className="input-field-container">
                            <label className="name">
                                <span className="input-title">Name: </span>
                                <input type="text" name="" id="name"
                                    onChange={(event) => setSignupInputData({ ...signupInputData, name: event.target.value })}
                                />
                                {showErrors && !isValid?.isName && <p className="name-error error">name should be at least two letters long</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="email">
                                <span className="input-title">Email: </span>
                                <input type="email" name="" id="email"
                                    onChange={mailChangeHandler}
                                />
                                {showErrors && !isValid?.isEmail && <p className="email-error error">Please enter a valid email address.</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="password">
                                <span className="input-title">Password: </span>
                                <input type="password" name="" id="pass"
                                    onChange={passwordChangeHandler}
                                />
                                {showErrors && !isValid?.isPassword && <p className="password-error error">password should be between 8 to 20 characters long and should contain at least one special character</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="confirm-password">
                                <span className="input-title">Confirm Password: </span>
                                <input type="password" name="" id="confirmPass"
                                    onChange={confirmPasswordChangeHandler}
                                />
                                {showErrors && !isValid?.isPassAndConfirmPassEqual && <p className="password-not-equal-error error">password and confirm password fields do not match</p>}
                            </label>
                        </div>
                    </form>
                    <button className="signup-btn" onClick={signUpClickHandler}>
                        Sign Up
                    </button>
                </div>
            </div>
        )
    }
}
