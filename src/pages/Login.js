import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { postLogin } from "../features/auth/authSlice";


const Login = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, error, user } = useSelector(state => state.auth)
    // local states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // navigation
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        };
        dispatch(postLogin(data));
    }
    useEffect(() => {
        if (user?.id) {
            navigate("/");
        }
    }, [navigate, user])
    return (
        <>
            {
                (isLoading) ? <Loader /> : null
            }
            <div className="bg-gradient-primary d-flex align-items-center" style={{ minHeight: '100vh' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-8">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                </div>
                                                <form onSubmit={submitHandler} className="user">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Enter Email Address..." />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-user"
                                                            id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                            <label className="custom-control-label" htmlFor="customCheck">Remember
                                                                Me</label>
                                                        </div>
                                                    </div>
                                                    <button disabled={isLoading} type="submit" className="btn btn-primary btn-user btn-block">
                                                        Login
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login