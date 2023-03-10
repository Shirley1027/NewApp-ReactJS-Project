import React, {Component} from 'react';
import {FormGroup} from 'react-bootstrap';
import {Button} from '../Button/index.js';

class Search extends Component {
  componentDidMount(){
    this.input.focus();
  }
  render(){
  const { onChange, value, children, onSubmit} = this.props;
  return(
      <form onSubmit = {onSubmit}>
      <FormGroup>
        <h1 style ={{fontWeight:'bold'}}>{children}</h1> 
        <hr style={{border:'2px solid black', width:'100px', margin:'auto'}}/>
        <div className="input-group">
          <input 
            className = "form-control width100 searchForm"
            type="text" 
            onChange={ onChange } 
            value = { value }
            ref = {(node)=> {this.input = node}}
          />
        
          <span>
            <Button
              className = "btn btn-primary searchBtn"
              type="submit"
            >
            Search
            </Button>
          </span>
        </div>
      </FormGroup>
      </form>
    )
  }
}

export default Search;