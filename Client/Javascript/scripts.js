// Function to display a message in the UI

let allBooksData = [];

function showMessage(message) {
    alert(message);
  }
  
  // Function to get all books from the API
  function getAllBooks() {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data =>{
          allBooksData = data; // Store the fetched data
          displayBooks(data); // Display the books
        })
      .catch(error => showMessage('Error fetching books: ' + error.message));
  }

  function getAllDeletedBooks() {
    fetch('http://localhost:3000/api/deletedBooks')
      .then(response => response.json())
      .then(data => displayDeletedBooks(data))
      .catch(error => showMessage('Error fetching books: ' + error.message));
  }
  
  // Function to display books in the table
  function displayBooks(books) {
    const table = document.getElementById('bookTable');
    table.style.display = 'table';
    
    clearTable(table);
   
    books.forEach(book => {
      const row = table.insertRow(-1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      const cell7 = row.insertCell(6);
  
      cell1.innerHTML = book.id;
      cell2.innerHTML = book.title;
      cell3.innerHTML = book.author;
      cell4.innerHTML = book.year;
      cell5.innerHTML = book.publishedDate;
      cell6.innerHTML = book.publisher;
      cell7.innerHTML = `<button class='getAllBooksBtn' onclick="updateBook('${book.id}')">Update</button>
                        <button class='delete-btn'onclick="deleteBook('${book.id}')">Delete</button>`;
    });
  }

  // function displayBooks(bookData) {
  //   const bookTableBody = document.getElementById('bookTableBody');
  //   // Clear existing rows
  //   bookTableBody.innerHTML = '';
  //   const table = document.getElementById('bookTable');
  //   table.style.display = 'table';
  //   clearTable(table);
  //   bookData.forEach(book => {
  //     const row = document.createElement('tr');
  //     row.innerHTML = `
  //       <td>${book.id}</td>
  //       <td contenteditable>${book.title}</td>
  //       <td contenteditable>${book.author}</td>
  //       <td contenteditable>${book.year}</td>
  //       <td contenteditable>${book.publishedDate}</td>
  //       <td contenteditable>${book.publisher}</td>
  //       <td>
  //         <button onclick="updateBook('${book.id}')">Update</button>
  //         <button onclick="deleteBook('${book.id}')">Delete</button>
  //       </td>
  //     `;
  
  //     bookTableBody.appendChild(row);
  //   });
  // }
  
  // Function to update a book
  // function updateBook(bookId) {
  //   // Assuming each row has a unique identifier (like data-id)
  //   const row = document.querySelector(`#bookTableBody tr[data-id="${bookId}"]`);
  
  //   if (!row) {
  //     console.error(`Row with data-id "${bookId}" not found.`);
  //     return;
  //   }
  
  //   const updatedTitle = row.querySelector('td:nth-child(2) [contenteditable=true]').innerText;
  //   const updatedAuthor = row.querySelector('td:nth-child(3) [contenteditable=true]').innerText;
  //   const updatedYear = row.querySelector('td:nth-child(4) [contenteditable=true]').innerText;
  //   const updatedPublishedDate = row.querySelector('td:nth-child(5) [contenteditable=true]').innerText;
  //   const updatedPublisher = row.querySelector('td:nth-child(6) [contenteditable=true]').innerText;
  
  //   const updatedBook = {
  //     title: updatedTitle,
  //     author: updatedAuthor,
  //     year: parseInt(updatedYear),
  //     publishedDate: updatedPublishedDate,
  //     publisher: updatedPublisher,
  //   };
  
  //   fetch(`http://localhost:3000/api/books/${bookId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedBook),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       showMessage(`Book with ID ${bookId} has been updated.`);
  //       getAllBooks(); // Refresh the book list after updating
  //     })
  //     .catch(error => showMessage(`Error updating book: ${error.message}`));
  // }
  
  


  function displayDeletedBooks(books) {
    const table = document.getElementById('bookTable');
    table.style.display = 'table';
    
    clearTable(table);
   
    books.forEach(book => {
      const row = table.insertRow(-1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      const cell7 = row.insertCell(6);
  
      cell1.innerHTML = book.id;
      cell2.innerHTML = book.title;
      cell3.innerHTML = book.author;
      cell4.innerHTML = book.year;
      cell5.innerHTML = book.publishedDate;
      cell6.innerHTML = book.publisher;
    });
  }



  // Function to clear the table
  function clearTable(table) {
    while (table.rows.length > 1) {
      table.deleteRow(1);
    
    }
  }
  
  // // Function to update a book
  function updateBook(bookId) {
    // For simplicity, let's assume you have a form to update book details
    const currentBook = getBookById(bookId); // Assuming you have a function to get book details by ID
     console.log(currentBook);
    const updatedTitle = prompt('Enter updated title :', currentBook.title) || currentBook.title;
    const updatedAuthor = prompt('Enter updated author:', currentBook.author) || currentBook.author;
    const updatedYear = prompt('Enter updated year:', currentBook.year) || currentBook.year;
    const updatedPublishedDate = prompt('Enter updated published date:', currentBook.publishedDate) || currentBook.publishedDate;
    const updatedPublisher = prompt('Enter updated publisher:', currentBook.publisher) || currentBook.publisher;

    const updatedBook = {
      title: updatedTitle,
      author: updatedAuthor,
      year: parseInt(updatedYear),
      publishedDate: updatedPublishedDate,
      publisher: updatedPublisher,
    };

    fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then(response => response.json())
      .then(data => {
        showMessage(`Book with ID ${bookId} has been updated.`);
        setTimeout(getAllBooks, 500); // Refresh the book list after updating
      })
      .catch(error => showMessage(`Error updating book: ${error.message}`));
}

  
  // Function to delete a book
  function deleteBook(bookId) {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
  
    if (confirmDelete) {
      fetch(`http://localhost:3000/api/books/${bookId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          showMessage(`Book with ID ${bookId} has been deleted.`);
          setTimeout(getAllBooks, 500); // Refresh the book list after deleting
        })
        .catch(error => showMessage(`Error deleting book: ${error.message}`));
    }
  }
  

  // function addBook() {
  //   const title = document.getElementById('title').value;
  //   const author = document.getElementById('author').value;
  //   const year = document.getElementById('year').value;
  //   const publishedDate = document.getElementById('publishedDate').value;
  //   const publisher = document.getElementById('publisher').value;
  
  //   const newBook = {
  //     title,
  //     author,
  //     year: parseInt(year),
  //     publishedDate,
  //     publisher,
  //   };
  
  //   fetch('http://localhost:3000/api/books', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newBook),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data) {
    
  //         setTimeout(() => {
  //           window.location.href = 'index.html';
  //         }, 500);
  //       } else {
  //       //   showMessage('Book not found with the given ID.');
  //       //   bookResult.style.display = 'none';
  //       }
  //     })
  //     .catch(error => showMessage(`Error adding book: ${error.message}`));
  // }
  
  // Function to show a message (you may have this function in your existing code)
  function showMessage(message) {
    alert(message);
  }



  function getBookById(bookId) {
    return allBooksData.find(book => book.id === bookId);
  }


