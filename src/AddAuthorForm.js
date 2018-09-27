import React from 'react';
import './AddAuthorForm.css'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class AuthorForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name:'',
            imageUrl:'',
            books:[],
            bookTemp:[]
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    HandleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }
    handleAddBook(event){
        this.setState({
            books:this.state.books.concat(this.state.bookTemp),
            bookTemp:''
        });
    }
    render(){
        return(
            <form onSubmit={this.HandleSubmit}>
                <div className="AddAuthorForm_input"> 
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className="AddAuthorForm_input"> 
                    <label htmlFor="imageUrl">ImageUrl</label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
                </div>
                <div className="AddAuthorForm_input"> 
                    <label htmlFor="booksTemp">Books</label>
                    {this.state.books.map((book)=><p key={book}>{book}</p>)}
                    <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                    <input type="button" value="add book" onClick={this.handleAddBook}/>
                </div>
                <input type="submit" name="add"/>
            </form>
        );
    };
}

function AddAuthor({match,onAddAuthor}){
    return(
        <div className="AddAuthorForm">
            <h1>Add an Author to the quiz</h1>
            <AuthorForm onAddAuthor={onAddAuthor}/>
        </div>
    );
}

function mapDispatchToProps(dispatch,props){
    return{
        onAddAuthor:(author)=>{
            dispatch({type:'ADD_AUTHOR',author});
            props.history.push('/');
        }
    };
}

export default withRouter(connect(()=>{},mapDispatchToProps)(AddAuthor));