import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthor from './AddAuthorForm'
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import AddAuthorForm from './AddAuthorForm';


const authors =[
    {
        name:'Mark Twain',
        imageUrl:'images/authors/marktwain.jpg',
        imageSource:'Wikipedia Commons',
        books:['The adventures of huckleberry finn']
    },
    {
        name:'Joseph Conrad',
        imageUrl:'images/authors/josephconrad.jpg',
        imageSource:'Wikipedia Commons',
        books:['Heart of darkness']
    },
    {
        name:'J.K. Rowling',
        imageUrl:'images/authors/jkrowling.jpg',
        imageSource:'Wikipedia Commons',
        books:['Harry Potter and the Sorcerers stone']
    },
    {
        name:'Stephen King',
        imageUrl:'images/authors/stephanking.jpg',
        imageSource:'Wikipedia Commons',
        books:['The shining', 'IT']
    },
    {
        name:'William Shakespear',
        imageUrl:'images/authors/williamshakespeak.jpg',
        imageSource:'Wikipedia Commons',
        books:['Hamlet', 'Macbeth','Romeo and Juliet']
    },
    {
        name:'Charles Dickens',
        imageUrl:'images/authors/charlesdickens.jpg',
        imageSource:'Wikipedia Commons',
        books:['A tale of two cities', 'David Copperfield']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    },[]);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);
    
    return{
        books:fourRandomBooks,
        author:authors.find((author)=> 
        author.books.some((title)=>
        title===answer)),
        answer : sample(fourRandomBooks)
    };
};

// function resetState(){
//     return {
//         turnData: getTurnData(authors),
//         highLight:'',
//     };
// };

function reducer(state={authors,turnData:getTurnData(authors),highLight:''}, action){
    switch(action.type){
        case 'ANSWER_SELECTED':
        const isCorrect=  state.turnData.author.books.some((book)=>book ===action.answer);
        return Object.assign(
            {},
            state,{
             highLight:isCorrect?'correct':'incorrect'
    });
    case 'CONTINUE':
    return Object.assign({},state,{
        highLight:'',
        turnData:getTurnData(state.authors)
    });
    case 'ADD_AUTHOR':
    return Object.assign({},state,{
        authors:state.authors.concat(action.author)
    });
    default : return state;
}
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
// let state = resetState();
 

// function onAnswerSelected(answer){
//     const correct = state.turnData.author.books.some((book)=>book ===answer);
//     state.highLight = correct?'correct':'incorrect';
//     render();
// };


// function App(){
//     return(
//             <AuthorQuiz />
//     );
// };

// const AuthorWrapper= withRouter(({history})=>
//     <AddAuthor onAddAuthor={(author)=>{
//             authors.push(author);
//             history.push('/'); 
//         }}/>
// );

//function render(){
    ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path='/'component={AuthorQuiz} />
                <Route path='/add' component={AddAuthor}/>
            </React.Fragment>
            </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();