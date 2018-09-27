import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({adapter : new Adapter()});

const state ={
  turnData:{
  books:['IT','The shining','Harry Potter and the philosophers stone','David Copperfield','A tale of two cities'],
  author :{
    name:'Charles Dickens',
    imageUrl:'images/authors/charlesdickens.jpg',
    imageSource:'Wikipedia Commons',
    books:['A tale of two cities', 'David Copperfield']
    },
  },
  highLight:''
}

describe("Author Quiz", ()=>{

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  describe('When no answer has been selected',()=>{
    let wrapper;
    beforeAll(()=>{
      wrapper = Enzyme.mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}} />);
    });

    it('Should have no background color',()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(undefined);
    });
  });

  describe('When the wrong answer has been selected',()=>{
    let wrapper;
    beforeAll(()=>{
      wrapper = Enzyme.mount(<AuthorQuiz {...(Object.assign({},state,{highLight:'incorrect'}))} onAnswerSelected={()=>{}} />);
    });

    it('Should have red background color',()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("red");
    });
  });

  describe('When the correct answer has been selected',()=>{
    let wrapper;
    beforeAll(()=>{
      wrapper = Enzyme.mount(<AuthorQuiz {...(Object.assign({},state,{highLight:'correct'}))} onAnswerSelected={()=>{}} />);
    });

    it('Should have green background color',()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("green");
    });
  });

  describe('When the first answer has been selected',()=>{
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(()=>{
      wrapper = Enzyme.mount(
        <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
        wrapper.find('.answer').first().simulate('click');
    });

    it('OnAnswerSelected should be triggerred',()=>{
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it('Should recieve the book titled IT',()=>{
      expect(handleAnswerSelected).toHaveBeenCalledWith('IT');
    });

  });
});

