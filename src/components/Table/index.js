import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {sortBy} from 'lodash';
import {Button, Sort} from '../Button/index.js';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortKey:'NONE',
      isSortReverse: false,
    }

    this.onSort = this.onSort.bind(this);
  }
  onSort(sortKey){
  const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
  this.setState({sortKey, isSortReverse})
}
  render(){
    const {list1, removeItem } = this.props;
    const { sortKey, isSortReverse} = this.state;
    const sortedList = SORTS[sortKey](list1);
    const reversedSortedList = isSortReverse?sortedList.reverse():sortedList;
  return(
      <div className="col-sm-10 col-sm-offset-1">
      <div className = "text-center">
        <hr/>
        <Sort
          className = "btn btn-xs btn-default sortBtn"
          sortKey = {'NONE'}
          onSort = {this.onSort}
          activeSortKey ={sortKey}
        >Default</Sort>
        <Sort
          className = "btn btn-xs btn-default sortBtn"
          sortKey = {'TITLE'}
          onSort = {this.onSort}
          activeSortKey ={sortKey}
        >Title</Sort>
        <Sort
          className = "btn btn-xs btn-default sortBtn"
          sortKey = {'AUTHOR'}
          onSort = {this.onSort}
          activeSortKey ={sortKey}
        >Author</Sort>
        <Sort
          className = "btn btn-xs btn-default sortBtn"
          sortKey = {'COMMENTS'}
          onSort = {this.onSort}
          activeSortKey ={sortKey}
        >Comments</Sort>
        <Sort
          className = "btn btn-xs btn-default sortBtn"
          sortKey = {'POINTS'}
          onSort = {this.onSort}
          activeSortKey ={sortKey}
        >Points</Sort>
        <hr/>
      </div>
        {
            reversedSortedList.map((item,index) =>   
              <div key={index}>
                <h1>
                  <a href={ item.url }>
                    { item.title }</a> 
                </h1>
                <h4>

                  { item.author } | { item.num_comments } Comments | { item.points } Points
                
                <Button
                  className="btn btn-xs"
                  type="button"
                  onClick={ () => removeItem(item.objectID+'1') }>
                    Remove
                </Button>

                </h4> <hr />

              </div>
            )
          }
      </div>
    )
  }
}

Table.propTypes = {
  list:PropTypes.arrayOf(
      PropTypes.shape({
        objectID:PropTypes.string.isRequired,
        author:PropTypes.string,
        url: PropTypes.string,
        num_comments:PropTypes.number,
        points:PropTypes.number
      })
    ),
  removeItem:PropTypes.func.isRequired,
}


export default Table;