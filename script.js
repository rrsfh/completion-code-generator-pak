// Function to get URL parameter
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Function to submit data to Google Sheets automatically
function submitForm(participantID, completionCode) {
    var formData = new FormData();
    formData.append('participantID', participantID);
    formData.append('completionCode', completionCode);

    // Google Sheets URL for form submission
    var googleSheetURL = 'https://script.google.com/macros/s/AKfycbzBXVG5vBH9PARAuVHEu1Y0NycmuONr672DQul40ZFYhH-G2CiYZUmiWpOgE68vVKro/exec';

    // Make the API request to Google Sheets
    return fetch(googleSheetURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Form submitted successfully", data);
    })
    .catch(error => {
        console.error("Error submitting the form", error);
    });
}

// Function to redirect to the study link with the completion token
function goToLink() {
    if (completionToken) {
        var url = `https://research.sc/participant/login/resume/${completionToken}`;
        window.location.href = url; // Redirect to the study page
    } else {
        alert('Completion token is missing!');
    }
}

// Extract and store the participant ID and completion token from the URL
var participantID = getURLParameter('pid');
var completionToken = getURLParameter('completion_token');

// Check if participantID exists and handle the completion code
if (participantID) {
    var n1 = 97580; // The hard-coded number
    var completionCode = n1 * participantID;
    document.getElementById('completionCode').innerHTML = `Your Completion code is: ${completionCode}`;

    // Show the h2 message with instructions
    document.getElementById('completionCodeMessage').style.display = 'block';

    // Submit the participantID and completionCode to Google Sheets automatically
    submitForm(participantID, completionCode);

    // Display the button after 5 seconds
    setTimeout(() => {
        document.getElementById('linkButton').style.display = 'block'; // Show the button
        document.getElementById('linkButton').disabled = false;        // Enable the button
    }, 5000); // 5000 milliseconds = 5 seconds

} else {
    document.getElementById('completionCode').innerHTML = `ERROR: Unable to advance as Participant ID is missing. Please contact BeSample for assistance.`;

    // Hide the h2 message if participantID is missing
    document.getElementById('completionCodeMessage').style.display = 'none';

    // Hide the button if participantID is missing
    document.getElementById('linkButton').style.display = 'none';
}




// Function to show alerts for different tabs
function showAlert(tabName) {
    let message;
    switch (tabName) {
      case 'Home':
        message = "This is your completion code. Please take note of it and press the button to finish the study.";
        break;
      case 'Instructions':
        message = "Instructions: Take note of your completion code and press the button to finish the study.";
        break;
      case 'Contact':
        message = "If you are stuck on this page, please do not worry. Just provide your completion code to BeSample to finish the study";
        break;
      default:
        message = "No information available.";
    }
    alert(message);
}
