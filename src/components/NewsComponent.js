import React, { Component } from 'react';
import NewsItemsComponent from './NewsItemsComponent';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export default class NewsComponent extends Component {


    static defaultProps = {
        country: "us",
        pageSize: 9,
        category: "general"
    }
    static propsType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            page: 1,
            totalResults: 0,
            loading: true

        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} -  Apna News `
    }

    async updateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a44cfc0257c741c2a9f8713f2b0872d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        // console.log(parseData);
        this.setState({
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }
    async componentDidMount() {
       this.updateNews()
    }
    fetchMoreData = async () => {
        if (this.state.article.length >= this.state.totalResults) {
            this.setState({ hasMore: false });
            return;
          }
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a44cfc0257c741c2a9f8713f2b0872d9&page=${nextPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            article: this.state.article.concat(parseData.articles),
            totalResults: parseData.totalResults,
            page: nextPage
        });
    }
    

    render() {
        return (
            <>
                {this.state.loading && <Spinner />}
                <div className='container my-4'>
                <InfiniteScroll
                     dataLength={this.state.article.length}
                  next={this.fetchMoreData}
                     hasMore={this.state.article.length !== this.state.totalResults}
                   loader={<Spinner/>}
                   endMessage={
                    !this.state.loading && this.state.article.length > 0 ? (
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    ) : null
                }>
                    <div className="container">
                    <div className="row">
                        {this.state.article.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItemsComponent
                                        title={element.title.length >= 50 ? `${element.title.slice(0, 55) + "..."}` : element.title}
                                        description={element.description === null ? "Click on read more for more information" : `${element.description.slice(0, 88)}`}
                                        urlToImage={element.urlToImage}
                                        url={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
                </div>
            </>
        );
    }
}
