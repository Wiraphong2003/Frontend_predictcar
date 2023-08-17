document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const convertButton = document.getElementById("convertButton");
    // const base64Output = document.getElementById("base64Output");
    const imagePreview = document.getElementById("imagePreview"); // Add this line
    const predictcar = document.getElementById("predictcar");
    const textPerview = document.getElementById('textPerview');

    convertButton.addEventListener("click", () => {
        const selectedFile = imageInput.files[0];
        if (selectedFile) {
            convertToBase64AndSend(selectedFile); 
        } else {
            alert("Please select an image file.");
        }
    });

    function convertToBase64AndSend(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          
            
            // // Display the image preview
            imagePreview.src = reader.result;
            const base64Data = reader.result.split(',')[1]; // Extract base64 data
            const fileType = file.type.split('/')[1]; // Get the file extension
            const base64String = `data:${fileType};base64,${base64Data}`;
            // base64Output.value = base64Data;

            // Send the base64 data to the API
            // console.log(base64Data);
            sendToAPI(base64String);
            // console.log(base64String);
        };
    }

   // Inside the sendToAPI function

   function sendToAPI(base64Data) {
    const apiUrl = 'http://localhost/api/carbrand';
    const requestData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "img": base64Data }),
    };

    fetch(apiUrl, requestData)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data.predict);
            predictcar.textContent = data.predict;
            imagePreview.style.opacity = "100%";
            textPerview.style.opacity =  "100%";
        })

        .catch(error => {
            console.error("Error sending data to API:", error);
        });
    }
});
