// Beneath the Surface
// This app reveals hidden environmental costs of everyday products
// It uses a dataset ("HiddenCost") and multiple screens to guide the user experience


// DATA LOADING SECTION

// Using getColumn to get data from the table
// Each array stores a column from the dataset
// All arrays are parallel, meaning index i refers to the same product across all arrays

var productNames = getColumn("HiddenCost", "product_name"); // Stores names of products
var surfaceDescriptions = getColumn("HiddenCost", "surface_description"); // What the product looks like on the surface
var hiddenCosts = getColumn("HiddenCost", "hidden_environmental_cost"); // Hidden environmental cost description
var scores = getColumn("HiddenCost", "overall_hidden_cost_score"); // Numerical score (out of 10)
var riskLevels = getColumn("HiddenCost", "risk_level"); // Risk category (High / Medium / Low)
var impacts = getColumn("HiddenCost", "key_hidden_impacts"); // Semicolon-separated impacts
var alternatives = getColumn("HiddenCost", "eco_friendly_alternative"); // Better eco-friendly options
var actions = getColumn("HiddenCost", "small_user_action"); // Small actions user can take

// Keeps track of which product is currently selected
var selectedIndex = 0;

// INITIAL APP SETUP

// Start app by showing the home screen
setScreen("homeScreen");

// Load dropdown options from the table
// This populates the dropdown with all product names
setProperty("productDropdown_select", "options", productNames);

// HOME SCREEN EVENTS

// When user clicks "Start", go to product selection screen
onEvent("startButton_home", "click", function() {
  setScreen("selectScreen");
});

// When user clicks "About", go to about screen
onEvent("aboutButton_home", "click", function() {
  setScreen("aboutScreen");
});

// SELECT SCREEN EVENTS

// Back button returns to home screen
onEvent("backButton_select", "click", function() {
  setScreen("homeScreen");
});

// Reveal button:
// 1. Gets selected product from dropdown
// 2. Finds its index in the dataset
// 3. Updates result screen with data
// 4. Navigates to result screen
onEvent("revealButton_select", "click", function() {
  var selectedProduct = getText("productDropdown_select"); // Read selected product name
  selectedIndex = findProductIndex(selectedProduct); // Find matching index
  updateResultScreen(); // Populate result screen with data
  setScreen("resultScreen"); // Move to result screen
});

// RESULT SCREEN EVENTS

// Show eco-friendly alternatives screen
onEvent("betterChoiceButton_result", "click", function() {
  updateAlternativeScreen(); // Load alternative data
  setScreen("alternativeScreen");
});

// Let user choose another product
onEvent("chooseAgainButton_result", "click", function() {
  setScreen("selectScreen");
});

// ALTERNATIVE SCREEN EVENTS

// Go to learning screen for more info
onEvent("learnButton_alternative", "click", function() {
  setScreen("learnScreen");
});

// Choose another product again
onEvent("againButton_alternative", "click", function() {
  setScreen("selectScreen");
});

// Return to home screen
onEvent("homeButton_alternative", "click", function() {
  setScreen("homeScreen");
});

// LEARN SCREEN EVENTS

// Go back to result screen
onEvent("backToResultButton_learn", "click", function() {
  setScreen("resultScreen");
});

// Return to home screen
onEvent("homeButton_learn", "click", function() {
  setScreen("homeScreen");
});

// ABOUT SCREEN EVENTS

// Start from about screen
onEvent("startButton_about", "click", function() {
  setScreen("selectScreen");
});

// Return to home screen
onEvent("homeButton_about", "click", function() {
  setScreen("homeScreen");
});

// HELPER FUNCTIONS

// Find the index of the selected product
// Loops through productNames array to match the selected product
function findProductIndex(productName) {
  for (var i = 0; i < productNames.length; i++) {
    // Compare each product name to the selected one
    if (productNames[i] == productName) {
      return i; // Return index when match is found
    }
  }

  // Default to index 0 if no match is found (safety fallback)
  return 0;
}

// SCREEN UPDATE FUNCTIONS

// Update hidden cost report screen
// Displays all main data about the selected product
function updateResultScreen() {
  setText("productNameLabel_result", productNames[selectedIndex]); // Show product name
  setText("surfaceTextLabel_result", surfaceDescriptions[selectedIndex]); // Surface description
  setText("hiddenCostTextLabel_result", hiddenCosts[selectedIndex]); // Hidden cost explanation
  
  // Display score with formatting
  setText("scoreLabel_result", "Hidden Cost Score: " + scores[selectedIndex] + " / 10");
  
  // Display risk level
  setText("riskLabel_result", "Risk Level: " + riskLevels[selectedIndex]);
  
  // Format impacts into bullet points before displaying
  setText("impactListLabel_result", formatImpacts(impacts[selectedIndex]));

  // Apply color styling based on risk level
  styleRiskLabel(riskLevels[selectedIndex]);
}

// Update better choice screen
// Shows eco-friendly alternatives and user actions
function updateAlternativeScreen() {
  setText("selectedProductLabel_alternative", productNames[selectedIndex]); // Current product
  setText("alternativeTextLabel_alternative", alternatives[selectedIndex]); // Alternative suggestion
  setText("actionTextLabel_alternative", actions[selectedIndex]); // Small actionable step
}

// DATA FORMATTING FUNCTIONS

// Turn semicolon-separated impacts into bullet points
function formatImpacts(impactText) {
  var parts = impactText.split(";"); // Split string into array by ";"
  var result = ""; // Store formatted string

  // Loop through each impact and add bullet formatting
  for (var i = 0; i < parts.length; i++) {
    result = result + "• " + parts[i] + "\n";
  }

  return result; // Return formatted bullet list
}

// STYLE FUNCTIONS

// Change risk label color based on risk level
// High → red, Medium → brown/orange, Low → green
function styleRiskLabel(risk) {
  if (risk == "High") {
    setProperty("riskLabel_result", "text-color", "#B94A48"); // Red tone
  } else if (risk == "Medium") {
    setProperty("riskLabel_result", "text-color", "#A47551"); // Neutral tone
  } else {
    setProperty("riskLabel_result", "text-color", "#2F5D50"); // Green tone
  }
}
