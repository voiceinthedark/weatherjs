import AppController from "./modules/appcontroller";
import "./styles/styles.css";
import "./styles/fontawesome.min.css";
import "./styles/regular.min.css";
import "./styles/solid.min.css";

const appContainer = document.getElementById("container");

async function runApp() {
  const app = new AppController(appContainer);
  await app.initialize(); // Wait for the data to be fetched

  const data = app.getData();
  if (data) {
    console.log("Fetched Data:", data);
    // You can now safely use the data
  } else {
    console.log("Data could not be fetched or is not available.");
  }

  app.setDayCard();
  console.log(app.getWeekData())
  console.log(app.getWeek())
}

runApp();

