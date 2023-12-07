
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'books.json');
const deletedFilePath = path.join(__dirname, '..', 'data', 'deletedBooks.json');

let books = loadBooks();
let deletedBooks = loadDeletedBooks();

function loadBooks() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file please do check the :', error.message);
    return [];
  }
}

function loadDeletedBooks() {
  try {
    const data = fs.readFileSync(deletedFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('No Deleted Records found yet !!');
    return [];
  }
}

function saveBooks() {
  try {
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync(dataFilePath, data, 'utf-8');
  } catch (error) {
    console.error('Error writing data file:', error.message);
  }
}

function saveDeletedBooks() {
  try {
    const data = JSON.stringify(deletedBooks, null, 2);
    fs.writeFileSync(deletedFilePath, data, 'utf-8');
  } catch (error) {
    console.error('Error writing deleted books file:', error.message);
  }
}



// const createBook = (newBook) => {
//     const existingBook = books.find((b) => b.title === newBook.title && b.author === newBook.author);
  
//     if (existingBook) {
//       throw new Error('Duplicate entry. This book already exists in the library.');
//     }
  
//     const deletedBookIndex = deletedBooks.findIndex((b) => b.title === newBook.title && b.author === newBook.author);
  
//     if (deletedBookIndex !== -1) {
//       // If a deleted book with the same title and author exists, remove it from deletedBooks
//       const restoredBook = deletedBooks.splice(deletedBookIndex, 1)[0];
//       books.push(restoredBook);
//       saveBooks();
//       saveDeletedBooks();
//       return { message: `Book '${restoredBook.title}' by ${restoredBook.author} has been restored.`,book:restoredBook,val:true ,success: true};
//     }
  
//     books.push(newBook);
//     saveBooks();
//     return newBook;
//   };
  

const createBook = (newBook) => {
  // Generate ID based on first letters of book name, author name, and last two digits of the year
  const id = generateBookId(newBook.title, newBook.author, newBook.year);

  // Check if the book with the generated ID already exists
  const existingBook = books.find((b) => b.id === id);

  if (existingBook) {
      throw new Error('Duplicate entry. This book already exists in the library.');
  }

  // Check if a deleted book with the same title and author exists
  const deletedBookIndex = deletedBooks.findIndex((b) => b.title === newBook.title && b.author === newBook.author);

  if (deletedBookIndex !== -1) {
      // If a deleted book with the same title and author exists, remove it from deletedBooks
      const restoredBook = deletedBooks.splice(deletedBookIndex, 1)[0];
      restoredBook.id = id; // Assign the generated ID
      books.push(restoredBook);
      saveBooks();
      saveDeletedBooks();
      return {
          message: `Book '${restoredBook.title}' by ${restoredBook.author} has been restored.`,
          book: restoredBook,
          val: true,
          success: true
      };
  }

  // Assign the generated ID to the new book
  newBook.id = id;
  books.push(newBook);
  saveBooks();
  return newBook;
};

// Function to generate a book ID
// const generateBookId = (title, author, year) => {
//   const titleInitial = title.charAt(0).toUpperCase();
//   const authorInitial = author.charAt(0).toUpperCase();
//   const lastTwoDigitsOfYear = year.toString().slice(-2);
//   return `${titleInitial}${authorInitial}${lastTwoDigitsOfYear}`;
// };

const generateBookId = (title, author, year) => {
  const titleWords = title.split(' ');
  const authorWords = author.split(' ');

  // Take the first letter of each word in the title and author
  const titleInitials = titleWords.map(word => word.charAt(0).toUpperCase()).join('');
  const authorInitials = authorWords.map(word => word.charAt(0).toUpperCase()).join('');

  // Take the last two digits of the year
  const lastTwoDigitsOfYear = year.toString().slice(-2);

  // Concatenate the generated parts to form the ID
  return `${titleInitials}${authorInitials}${lastTwoDigitsOfYear}`;
};

const getBooks = () => {
  return books;
};

const getDeletedBooks=()=>{
  return deletedBooks;
}

// const getBookById = (bookId) => {
//   return books.find((b) => b.id === bookId);
// };

const getBookById = (bookId) => {
  const foundBook = books.find((b) => b.id === bookId);
  return foundBook || null; // Return null if book is not found
};

const updateBook = (bookId, updatedBook) => {
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    saveBooks();
    return books[index];
  } else {
    throw new Error('Book not found. Cannot update a non-existing book.');
  }
};

const deleteBook = (bookId) => {
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    const deletedBook = books.splice(index, 1)[0];
    deletedBooks.push(deletedBook);
    saveBooks();
    saveDeletedBooks();
  } else {
    throw new Error('Book not found. Cannot delete a non-existing book.');
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getDeletedBooks,
};
