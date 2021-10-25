import "./App.css";
import React, { useContext } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/authContext';
import BuyerLogin from "./Components/Pages/BuyerLogin";
import BuyerSignUp from "./Components/Pages/BuyerSignUp";
import BuyerSuccess from "./Components/Pages/BuyerSuccess";
import ConfirmEmail from "./Components/Pages/ConfirmEmail";
import BuyerHome from "./Components/Pages/BuyerHome";
import BuyerDetails from "./Components/Pages/BuyerDetails";

function App() {
    return (
        <AuthProvider>
            <Switch>
                <Route exact path="/" component={BuyerLogin} />
                <Route path="/buyer-sign-up" component={BuyerSignUp} />
                <Route path="/buyer-success" component={BuyerSuccess} />
                <Route path="/verify" component={ConfirmEmail} />
                <UserRoute>
                    {/* <Route path="/dashboard" component={DashBoard} /> */}
                    <Route exact path="/home" component={BuyerHome} />
                    <Route exact path="/tweet-details/:_id" component={BuyerDetails} />
                </UserRoute>
            </Switch>
        </AuthProvider>
    );
}

const UserRoute = ({ children, ...rest }: any) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={() => 
          isAuthenticated() ? (
            [children]
          ) : (
            <Redirect to='/' />
          )
        }
      >
      </Route>
    )
  }

export default App;
