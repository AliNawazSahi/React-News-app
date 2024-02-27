import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  state = {
    progress : 0
  }
  setProgress=(progress)=>{
    this.setState({
      progress : progress
    })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
       
      />
      <div className="container"style={{marginTop:"80px"}}>
        <h1 className='text-center my-4'>Top Headlines</h1>
        </div>
        <Routes>

       <Route exact path='/' element={<NewsComponent setProgress={this.setProgress}   key={"general"} pageSize={6} category = "general" country="us"/>}></Route>
       <Route exact path='/business' element={<NewsComponent setProgress={this.setProgress}   key={"business"} pageSize={6} category = "business" country="us"/>} ></Route>
       <Route exact path='/entertainment' element={<NewsComponent setProgress={this.setProgress}   key={"entertainment"} pageSize={6} category = "entertainment" country="us"/>} ></Route>
       <Route exact path='/general' element={<NewsComponent setProgress={this.setProgress}   key={"general"} pageSize={6} category = "general" country="us"/>} ></Route>
       <Route exact path='/health' element={<NewsComponent setProgress={this.setProgress}   key={"health"} pageSize={6} category = "health" country="us"/>} ></Route>
       <Route exact path='/science' element={<NewsComponent setProgress={this.setProgress}   key={"science"} pageSize={6} category = "science" country="us"/>} ></Route>
       <Route exact path='/sports' element={<NewsComponent setProgress={this.setProgress}   key={"sports"} pageSize={6} category = "sports" country="us"/>} ></Route>
       <Route exact path='/technology' element={<NewsComponent setProgress={this.setProgress}   key={"technology"} pageSize={6} category = "technology" country="us"/>} ></Route>
        
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
