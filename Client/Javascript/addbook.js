// document.addEventListener("DOMContentLoaded", function () {
//     const addBookForm = document.getElementById("addBookForm");
  
//     addBookForm.addEventListener("submit", function (e) {
//         e.preventDefault(); // Prevent the default form submission
  
//         // Call your custom function here or handle form submission logic
//        addNewBook();
//     });
  
    
      
//         function addNewBook() {
//             const title = document.getElementById('title').value;
//             const author = document.getElementById('author').value;
//             const year = document.getElementById('year').value;
//             const publishedDate = document.getElementById('publishedDate').value;
//             const publisher = document.getElementById('publisher').value;
          
//             const newBook = {
//               title,
//               author,
//               year: parseInt(year),
//               publishedDate,
//               publisher,
//             };
          
//             fetch('http://localhost:3000/api/books', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(newBook),
//             })
//               .then(response => response.json())
//               .then(data => {
//                 if (data) {
//                     console.log("in");
//                     // setTimeout(function() {
//                     //     window.location.href = 'index.html';
//                     // }, 2000);
//                    }
//               })
//               .catch(error => showMessage(`Error adding book: ${error.message}`));
//           }
    
    
    
    
//   });
  
 


document.addEventListener("DOMContentLoaded", function () {
  const addBookForm = document.getElementById("addBookForm");

  addBookForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Call your custom function here or handle form submission logic
    addNewBook();
  });

  function addNewBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const publisher = document.getElementById('publisher').value;

    const newBook = {
      title,
      author,
      year: parseInt(year),
      publishedDate,
      publisher,
    };

    fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        console.log("Book added successfully");
        // You can show a success message to the user or redirect them
        window.location.href = 'index.html';
      } else {
        // Show an error message if the server returns success: false
        showMessage(`Error adding book: ${data.message}`);
      }
    })
    .catch(error => {
      showMessage(`Error adding book: ${error.message}`);
    });
  }

  function showMessage(message) {
    // You can implement your own logic to display the message to the user
    // For simplicity, let's log it to the console for now
    alert(message);
  }
});
