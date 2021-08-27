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
import BookingConfirmation from './components/studios/studiosOther/BookingConfirmation'
import Cookies from './components/common/Cookies'
import ContactUs from './components/common/ContactUs'
import About from './components/common/About'
import UserBookings from './components/users/userOther/UserBookings'
import ScrollTop from './lib/ScrollTop'

function App() {

  const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    bookedStudio: [],
    favouritedStudio: [],
    addedStudio: [],
  }

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  const [user, setUser] = React.useState(initialState)


  return (
    <BrowserRouter>
      <NavigationBar
        loggedIn={loggedIn}
        user={user}
      />
      <ScrollTop />
      <Switch>
        <Route exact path="/">
          <Home
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/studios/new" component={CreateStudio} />
        <Route path="/studios/:studioId/bookings/:bookingId" component={BookingConfirmation} />
        <Route path="/studios/:studioId/edit" component={EditStudio} />
        <Route path="/studios/:studioId">
          <StudioShow
            loggedIn={loggedIn}
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/studios" component={Filter} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Register} />
        <Route path="/profile/:userId/bookings" component={UserBookings} />
        <Route path="/profile/:userId" component={EditUser} />
        <Route path="/profile">
          <Profile
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/terms" component={Terms} />
      </Switch>
      <Footer />
    </BrowserRouter >
  )
}

export default App
