import React from 'react'
// import { getAllStudios } from './lib/api'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavigationBar from './components/common/NavigationBar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import CreateStudio from './components/studios/CreateStudio'
import EditStudio from './components/studios/EditStudio'
import Filter from './components/studios/studiosOther/Filter'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Terms from './components/common/Terms'
import Profile from './components/users/Profile'
import EditUser from './components/users/EditUser'
import { isAuthenticated } from './lib/auth'
import StudioShow from './components/common/StudioShow'
import Cookies from './components/common/Cookies'
import ContactUs from './components/common/ContactUs'
import About from './components/common/About'

function App() {

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())

  



  return (
    <BrowserRouter>
      <NavigationBar loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home 
            setLoggedIn={setLoggedIn}
            // user={user} 
            // setUser={setUser}
          />
        </Route>
        <Route path="/studios/:studioId">
          <StudioShow loggedIn={loggedIn} />
        </Route>
        <Route path="/studios/create" component={CreateStudio} />
        <Route path="/studios" component={Filter} /> 
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Register} />
        <Route path="/profile/:userId" component={EditUser} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/terms" component={Terms} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
