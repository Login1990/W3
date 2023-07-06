async function deleteRequest() {
    try {
      const response = await fetch('/user/'+document.getElementById("todo-name").innerText, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        // Request was successful
        console.log('DELETE request successful');
      } else {
        // Request failed
        console.error('DELETE request failed');
      }
    } catch (error) {
      console.error('Error occurred during DELETE request:', error);
    }
  }