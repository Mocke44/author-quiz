import React from 'react';
import './App.css';
import './bootstrap.min.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Hero (){
  return(
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>
          Select the book written by the author shown in the picture.
        </p>
      </div>
    </div>
  );
};

function Book ({title,onClick}){
  return (
    <div className="answer"onClick={()=>{onClick(title);}}>
      <h4>{title}</h4>
    </div>
  );
};

function Turn ({author, books,highLight, onAnswerSelected}){
  function highLightToBgColor(highLight){
    const mapping ={
      'none': '',
      'correct':'green',
      'incorrect':'red'
    };
    return mapping[highLight]
  };
  return(
    <div className="row turn" style={{backgroundColor:highLightToBgColor(highLight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorImage" alt="author"/>
      </div>
      <div className="col-6">
        {books.map((title)=><Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  );
};

Turn.propTypes={
  author:PropTypes.shape({
    name:PropTypes.string.isRequired,
    imageUrl:PropTypes.string.isRequired,
    books:PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books:PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected:PropTypes.func.isRequired,
  highLight:PropTypes.string.isRequired
}

function Continue ({show,onContinue}){
  return(
    <div className="row">
      {show?
      <div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
      </div>
      :null}
    </div>
  );
};

function Footer(){
  return(
    <div id="Footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All images are from <a href="www.wikipedia.com">Wikipedia Commons</a> and are in the public domain.</p>
      </div>
    </div>
  );
}

function mapStateToProps(state){
  return{
    turnData:state.turnData,
    highLight:state.highLight
  };
}

function mapDispatchToProps(dispatch){
  return{
    onAnswerSelected:(answer)=>{
      dispatch({type:'ANSWER_SELECTED',answer});
    },
    onContinue:()=>{
      dispatch({type:'CONTINUE'});
    }
  };
}

const AuthorQuiz = connect(mapStateToProps,mapDispatchToProps)(function ({turnData,highLight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero/>
        <Turn {...turnData} highLight={highLight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highLight==='correct'} onContinue={onContinue}/>
        <p>
          <Link to='/add'>
            Add a new author
          </Link>
        </p>
        <Footer/>
      </div>
    );
  })


export default AuthorQuiz;
