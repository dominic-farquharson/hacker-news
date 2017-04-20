import React, {Component} from 'react';
import axios from 'axios';

class Articles extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Loading',
            article: {}
        }
    }

    componentDidMount() {

    }

    printName = (articleId) => {
        // console.log(articleId)
        const url = `https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`;
        axios.get(url)
            .then( (response)=> {
                this.setState({title: response.data.title, article: response.data});
            }) 
        // axios.get
    }
    render() {
        return (
            <li>
                {/*{this.props.title}*/}
                {this.printName(this.props.title)}
                <h1 onClick={()=>this.props.openArticle(this.state.article)}>{this.state.title}</h1>
            </li>
        )
    }
}

export default Articles;