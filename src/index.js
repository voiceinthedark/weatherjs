import "./styles/styles.css";
import "./styles/fontawesome.min.css";
import "./styles/regular.min.css";
import "./styles/solid.min.css";
import "./webfonts/fa-solid-900.ttf";

const appContainer = document.getElementById("container");

fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Chehour?unitGroup=metric&key=7WXVPBFAC4BMBGSURKG4AJBTP&contentType=json", {
  "method": "GET",
  "headers": {
  }
})
  .then(response => {
    return response.json()
  })
  .then(res => console.log(res))
  .catch(err => {
    console.error(err);
  });

