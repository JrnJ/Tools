window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Replace this URL with the path to your image
    img.src = 'path/to/your/image.png'; 
  
    img.onload = function() {
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);
  
      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      // Loop through all pixels
      for (let i = 0; i < data.length; i += 4) {
        // Check if the pixel is red (#FF0000)
        if (data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0 && data[i + 3] === 255) {
          // Change the pixel to green (#00FF00)
          data[i] = 0;      // Red component
          data[i + 1] = 255; // Green component
          data[i + 2] = 0;   // Blue component
          data[i + 3] = 255; // Alpha component
        }
      }
  
      // Put the modified image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    };
  };