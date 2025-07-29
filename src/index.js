import DataFetcher from "./modules/datafetcher";
import "./styles/styles.css";
import "./styles/fontawesome.min.css";
import "./styles/regular.min.css";
import "./styles/solid.min.css";
import "./webfonts/fa-solid-900.ttf";

const appContainer = document.getElementById("container");

const fetcher = new DataFetcher("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
'Chehour', "7WXVPBFAC4BMBGSURKG4AJBTP", "metric");
const data = await fetcher.collect();
console.log(fetcher.getURL());
console.log(data)

