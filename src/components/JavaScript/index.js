import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';
import Table from '../Table/index.js';
import {Button, Loading} from '../Button/index.js';
import Search from '../Search/index.js';

import { 
  DEFAULT_QUERY, DEFAULT_PAGE , DEFAULT_HPP, PATH_BASE,
  PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP
} from '../../constant/index.js';


const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}
              &${PARAM_PAGE}${DEFAULT_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;

//filter the results by search
// function isSearched(searchTerm){
//   return function(item){
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

//higher order component
const withLoading  = (Component)=>({isLoading,...rest}) =>
  isLoading ? <Loading /> : <Component{...rest} />


const updateTopStories = (hits, page) => prevState => {
  const{searchKey, results} = prevState;
  const oldHits = results && results[searchKey]? results[searchKey].hits:[];
  const updateHits = [...oldHits, ...hits];
  return {results:{...results,[searchKey]:{hits:updateHits, page}}, 
    isLoading:false
  }
}

class JavaScript extends Component {
  constructor(props){
    super(props);
    this.state = {
    searchTerm: 'javascript',
    results:null,
    searchKey:'',
    isLoading: false,
    }

    //bind the function to this app component
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
  }
/*
  removeItem(id){
    console.log('remove item');
    function isNotId(item){
      return item.objectID !== id;
    }
    const updatesList = this.state.list1.filter(isNotId);
    this.setState({list1:updatesList})
  }
*/



setTopStories(result){
  const {hits, page} = result;
  this.setState(updateTopStories(hits, page));
  // this.setState(prevState => {
  //   const{searchKey, results} = this.state;
  //   const oldHits = results && results[searchKey]? results[searchKey].hits:[];
  //   const updateHits = [...oldHits, ...hits];
  //   return {results:{...results,[searchKey]:{hits:updateHits, page}}, 
  //     isLoading:false
  //   }
  // });
  
  // this.setState({results:{...results,[searchKey]:{hits:updateHits, page}}, isLoading:false
  // });
}

fetchTopStories(searchTerm,page){
  this.setState({isLoading:true});

  fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
        &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response=>response.json())
    .then(result=>this.setTopStories(result))
    .catch(e=>e);
}

componentDidMount(){
  const {searchKey,searchTerm} = this.state;
  this.setState({searchKey:searchTerm})
  this.fetchTopStories(searchTerm, DEFAULT_PAGE);
}

//on search submit function
onSubmit(event){
  const {searchKey,searchTerm} = this.state;
  this.setState({searchKey:searchTerm})
  if(this.checkTopStoriesSearchTerm(searchTerm)){
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }
  
  event.preventDefault();
}

removeItem(id){
  const { results, searchKey } = this.state;
  const { hits, page } = results[searchKey];
  // const isNotId = item => item.objectID !== id;
  const updatedList = hits.filter(item => item.objectID+'1' !== id);
  // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) });
  this.setState({ results: {...results, [searchKey]: {hits: updatedList, page}}});
 }
//

checkTopStoriesSearchTerm(searchTerm){
  return !this.state.results[searchTerm];
}

searchValue(event){
  this.setState({searchTerm: event.target.value})
}
  render(){
    console.log(this)
    const {results, searchTerm, searchKey, isLoading} = this.state;
    // if(!result){return null;}
    const page = (results && results[searchKey]&&results[searchKey].page) || 0;
    const list = (results && results[searchKey]&&results[searchKey].hits) || [];
    return (
      <div>
        <Container>
          <Row>
            <Table 
            list1 = { list }
            removeItem = {this.removeItem}
          />
          <div className="text-center alert">

              <ButtonWithLoading
                isLoading={ isLoading }
                className="btn btn-success"
                onClick={ () => this.fetchTopStories(searchTerm, page + 1) }>
                Load more
              </ButtonWithLoading>
            
          </div>
          </Row>
        </Container>
      </div>
    );
  }
}




const ButtonWithLoading = withLoading(Button);




export default JavaScript;
