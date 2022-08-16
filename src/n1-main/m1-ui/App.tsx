import React from 'react';
import './App.css';
import {Header} from './header/Header';
import TestingComponents from "../../n2-features/f0-test/TestingComponents";
import {Route, Routes} from "react-router-dom";
import Login from "../../n2-features/f1-auth/a1-login/Login";
import Register from "../../n2-features/f1-auth/a2-register/Register";
import Profile from "../../n2-features/f1-auth/a3-Profile/Profile";
import Error404 from "../../n2-features/f1-auth/a4-404/Error404";
import PasswordRecovery from "../../n2-features/f1-auth/a5-password-recovery/PasswordRecovery";
import Password from "../../n2-features/f1-auth/a6-password/Password";

function App() {

    // useAppSelector(state => state)
    // useAppDispatch()

    return <div className="App">
                <Header/>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/404' element={<Error404/>}/>
                    <Route path='/password-recovery' element={<PasswordRecovery/>}/>
                    <Route path='/password' element={<Password/>}/>
                    <Route path='*' element={<Error404/>}/>
                </Routes>
                <TestingComponents />
            </div>
}

export default App;
