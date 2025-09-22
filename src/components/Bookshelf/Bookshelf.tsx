import React from 'react';
import './Bookshelf.css';
import { bookshelves } from './booksData';
import { Book } from '@/types/types';



const shelfHeights = ["0%", "20%", "40%", "60%", "80%"];

const BookSpine = ({ book }: { book: Book }) => {
  const handleClick = () => {
    window.open(book.link, '_blank');
  };

  return (
    <div 
      className="book-spine" 
      onClick={handleClick}
      title={`${book.title} by ${book.author} (${book.date})`}
      style={{ height: `${book.height}%`, width: `${book.pages / 12}px` }}
    >
      <div 
        className="book-spine-front"
        style={{
          backgroundColor: book.spineColor,
          color: book.textColor
        }}
      >
        <div className="book-spine-title">
          {book.title}
        </div>
      </div>
    </div>
  );
};

const Bookshelf = () => {
  return (
    <div className="bookshelf">
      <div className="bookshelf-side"></div>
      <div className="bookshelf-front"></div>
      
      {bookshelves.map((books, index) => (
        <div key={index} className="shelf" style={{ bottom: shelfHeights[index] }}>
          {books.map((book) => (
            <BookSpine key={book.id} book={book} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
