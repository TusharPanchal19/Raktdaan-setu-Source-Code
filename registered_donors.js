

  <script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
    // Import push and set for writing data
    import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

    // Your web app's Firebase configuration
    // Make sure this matches your project settings exactly!
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      // Add databaseURL if you are not using the default RTDB instance for this config
      // databaseURL: "https://donor-database-644ae-default-rtdb.firebaseio.com" // Your default database URL
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app); // Get the database instance

    const form = document.getElementById('donorForm');
    const resultCard = document.getElementById('resultCard');
    const displayPic = document.getElementById('displayPic');

    // Add a single event listener to the form's submit event
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission (page reload)

      // Get form values using the correct IDs
      const name = document.getElementById('name').value; // Corrected ID
      const age = document.getElementById('age').value;
      const weight = document.getElementById('weight').value;
      const bloodGroup = document.getElementById('group').value;
      const previousDonations = document.getElementById('previous').value;
      const contact = document.getElementById('contact').value;
      const address = document.getElementById('address').value;
      const profileFile = document.getElementById('picture').files[0]; // Get the file object

      // Prepare the data to save to Realtime Database
      const donorData = {
        name: name, // Using 'name' key for consistency
        age: age,
        weight: weight,
        bloodGroup: bloodGroup, // Using 'bloodGroup' key
        previousDonations: previousDonations, // Using 'previousDonations' key
        contact: contact, // Using 'contact' key
        address: address,
        // NOTE: Storing the file content requires Firebase Cloud Storage, not RTDB.
        // We are NOT saving the picture data to RTDB here.
        // If you want to store images, you'll need to integrate Cloud Storage.
      };

      // Use push() to create a new unique key under the 'donors' node
      // This prevents overwriting previous registrations
      const newDonorRef = push(ref(db, 'donors')); // Create a reference with a unique key

      // Set the data at the new unique reference
      set(newDonorRef, donorData)
        .then(() => {
          // Data saved successfully!
          console.log("Data successfully written to Firebase!");

          // --- Display data in the result card ---
          document.getElementById('rName').textContent = name;
          document.getElementById('rAge').textContent = age;
          document.getElementById('rWeight').textContent = weight;
          document.getElementById('rBloodGroup').textContent = bloodGroup;
          document.getElementById('rDonations').textContent = previousDonations;
          document.getElementById('rContact').textContent = contact;
          document.getElementById('rAddress').textContent = address;

          // Handle displaying the profile picture locally
          if (profileFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
              displayPic.src = e.target.result;
            };
            reader.readAsDataURL(profileFile); // Read the file as a data URL for local display
          } else {
              // Clear or set a default image if no picture was uploaded
              displayPic.src = ""; // or displayPic.src = "path/to/default/image.png";
          }

          // Show the result card
          resultCard.classList.remove('hidden');

          // Show the success alert
          alert("Registration Successful!");

          // Optional: Clear the form after successful submission and display
          form.reset();
           // Hide the result card again if you want the form to reappear clean
           // resultCard.classList.add('hidden');
        })
        .catch((error) => {
          // An error occurred while saving the data
          console.error("Error writing data to Firebase: ", error);
          alert("Registration Failed! Please try again."); // Show a failure alert
        });
    });
  </script>
</body>

</html>
