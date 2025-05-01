import React from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import lucia from '../lucia';
const Register = () => {
    var email=''
    var name=''
    lucia.pageView("Register");
    const handleSubmit = (event) => {
        if (email !== '') {
        lucia.userInfo(email,{"email":email,"name":name})
        }
      };
      const handleChangeEmail = (event) => {
        email=event.target.value;
      };
      const handleChangeName = (event) => {
        name=event.target.value;
      };

    
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    onChange={handleChangeName}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    onChange={handleChangeEmail}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                            <Link to="/">
                                <button onClick={handleSubmit} class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                                </Link>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register