import React from 'react'
// import { getAllStudios } from './lib/api'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavigationBar from './components/common/NavigationBar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import Filter from './components/studios/studiosOther/Filter'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Terms from './components/common/Terms'
import Profile from './components/users/Profile'
import EditUser from './components/users/EditUser'
import { isAuthenticated } from './lib/auth'
import StudioShow from './components/common/StudioShow'
import Cookies from './components/common/Cookies'

function App() {

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await getAllStudios()
  //     console.log(res.data)
  //   }
  //   getData()
  // })

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())


  return (
    <BrowserRouter>
      <NavigationBar loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/studios/:studioId" component={StudioShow} />
        <Route path="/studios" component={Filter} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Register} />
        <Route path="/profile/:userId" component={EditUser} />
        <Route path="/profile" component={Profile} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/terms" component={Terms} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
