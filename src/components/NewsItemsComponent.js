import React, { Component } from "react";

export default class NewsItemsComponent extends Component {
  render() {
    let { title, description, urlToImage, url, author, date, source } = this.props;
    return (
      <div>
        <div className="card my-4">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1"}}>
            {source}
             </span>
          <img
            src={
              urlToImage === null
                ? `${"https://i.ytimg.com/vi/c0bgmUnSBqQ/maxresdefault.j…H8gEyghMA8=&rs=AOn4CLCs9pjlImuP_ouf-jO-HHVtx5FKYg"}`
                : urlToImage
            }
            className="card-img-top"
            alt="..."
            style={{ width: "338px", height: "196px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-danger">
                By {author} on  {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} target="_blank" className="btn btn-primary btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
