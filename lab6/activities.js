// 0 < a < 90 acute, a = 90 right angle, 90 < a < 180 obtuse, a = 180 straight, 180 < a < 360 reflex, a = 360 full
function identifyAngleType(angle) {
    if (angle <= 0 || angle > 360) {
        return "Invalid Angle"
    } else if (angle > 0 && angle < 90) {
        return "Acute Angle";
    } else if (angle == 90) {
        return "Right Angle";
    } else if (angle > 90 && angle < 180) {
        return "Obtuse Angle";
    } else if (angle == 180) {
        return "Straight Angle";
    } else if (angle > 180 && angle < 360) {
        return "Reflex Angle";
    } else if (angle == 360) {
        return "Full Angle";
    }
}

function caesarCipher(str, shift=1) {
    var output = "";
     
    // Loop through each character in the input string
    for (var i = 0; i < str.length; i++) {
      var ascii = str[i].charCodeAt();
       
      // Check if the character is a letter
      if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
        // Shift the letter by the shift amount, wrapping around the alphabet if necessary
        ascii += shift;
        if ((ascii > 90 && str[i] <= 'Z') || ascii > 122) {
          ascii -= 26;
        }
      }
       
      // Add the new character to the output string
      output += String.fromCharCode(ascii);
    }
     
    // Return the output string
    return output;
  }

function longestString(str_array) {
    longest = "";
    for (let i = 0; i < str_array.length; i++) {
        if (str_array[i].length > longest.length) {
            longest = str_array[i];
        }
    }

    return longest;
}