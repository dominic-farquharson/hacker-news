import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Articles from './components/Articles';

/*const ViewArticle = (props) => {
  return(
    <article>
      <h1>{props.name}</h1>
    </article>
  )
}*/

class ViewArticle extends Component{
  constructor() {
    super();
    this.state = {
      title: '',
      author: ''
    }
  }

  render() {
    if(this.props.url !== 'Click on an article to view It'){
      return (
        <article id="iframeContainer">
          <iframe src={this.props.url}></iframe>
        </article>
      )
    }
    else {
      return (
        <div>{this.state.url}</div>
      )
    }
  }
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      articleIds: [],
      viewArticle: 'non',
      url:'Click on an article to view It'
    }
  }

  componentDidMount() {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    axios.get(url)
      .then( (response)=> {
          this.setState({articleIds: response.data})
      })
  }

  printArticles = () => {
    const articles = this.state.articleIds;
    return (articles.map( (x, y)=> {
        return <Articles key={y} title={x} viewArticle={this.state.viewArticle} openArticle={(article)=>this.viewArticle(article)}  />
      })
    )
  }

  viewArticle = (article) => {
    this.setState({url: article.url});
  }

  render() {
    return (
      <div className="App">
        <ul id="articleList"> {/*style={{position: 'absolute', width: '50%', height: '100%', overflow: 'scroll'}}>*/}
          {this.printArticles()}
        </ul>
        <section id="articleView">
          <ViewArticle url={this.state.url} />
        </section>
      </div>
    );
 
  }
}

export default App;
