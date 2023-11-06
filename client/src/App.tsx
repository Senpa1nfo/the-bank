import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Main from "./pages/Main.tsx";
import {useEffect} from "react";
import {useAuthStore} from "./stores/useAuthStore.ts";

function App() {

    const refresh = useAuthStore(state => state.refresh)

    useEffect(() => {
        refresh()
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/:cardNumber' element={<Main/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>
        </>
    )
}

export default App
