// document.addEventListener("DOMContentLoaded", function () {
//     const getBookForm = document.getElementById("getBookForm");
//     const bookResult = document.getElementById("bookResult");
//     const bookDetails = document.getElementById("bookDetails");
  
//     getBookForm.addEventListener("submit", function (e) {
//       e.preventDefault(); // Prevent the default form submission
//       getBookById();
//     });
  
//     function getBookById() {
//       const bookId = document.getElementById('bookId').value;
  
//       fetch(`http://localhost:3000/api/books/${bookId}`)
//         .then(response => response.json())
//         .then(data => {
//           if (data) {
//             // Display book details
//             bookDetails.innerText = `Title: ${data.title}, Author: ${data.author}, Year: ${data.year}, Published Date: ${data.publishedDate}, Publisher: ${data.publisher}`;
//             bookResult.style.display = 'block';
             
//             // Schedule redirection after 10 seconds
//             setTimeout(() => {
//               window.location.href = 'index.html';
//             }, 10000);
//           } else {
//             showMessage('Book not found with the given ID.');
//             bookResult.style.display = 'none';
//           }
//         })
//         .catch(error => showMessage(`Error getting book: ${error.message}`));
//     }
  
//     function showMessage(message) {
//       alert(message);
//     }
//   });
  



document.addEventListener("DOMContentLoaded", function () {
  const getBookForm = document.getElementById("getBookForm");
  const bookResult = document.getElementById("bookResult");
  const bookDetails = document.getElementById("bookDetails");

  getBookForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    getBookById();
  });

  function getBookById() {
    const bookId = document.getElementById('bookId').value;


    fetch(`http://localhost:3000/api/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
          if (Object.keys(data).length !== 0) {
            // Display book details
            bookDetails.innerText = `Title: ${data.title}, Author: ${data.author}, Year: ${data.year}, Published Date: ${data.publishedDate}, Publisher: ${data.publisher}`;
            bookResult.style.display = 'block';
            console.log(data);
            // Schedule redirection after 10 seconds
            setTimeout(() => {
              window.location.href = 'index.html';
            }, 10000);
          } else {
            showMessage('Book not found with the given ID.');
            bookResult.style.display = 'none';
          }
        
        })
        .catch(error => showMessage(`Error getting book: ${error.message}`));
    }
   

    

  function showMessage(message) {
    alert(message);
  }
});
