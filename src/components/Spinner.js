import React, { Component } from 'react'
import loading from "./loading.gif.gif"
export default class Spinner extends Component {
  render() {
    return (
      <div>
        <div className='text-center'>
          <img className='my-3' src={loading} alt="Loading"  />
        </div>
      </div>
    )
  }
}
