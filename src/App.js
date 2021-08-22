import React from 'react'
// import { getAllStudios } from './lib/api'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavigationBar from './components/common/NavigationBar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import Filter from './components/studios/studiosOther/Filter'

function App() {

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await getAllStudios()
  //     console.log(res.data)
  //   }
  //   getData()
  // })


  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/studios" component={Filter} />
        <Route />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
