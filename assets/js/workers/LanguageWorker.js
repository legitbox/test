self.onmessage = function (event) {
  if (event.data !== undefined && event.data !== null) {
    //### interface changes ###
    const interfaceList = [
      "home_button",
      "search",
      "settings_title",
      "select_your_language_title",
    ];
    const jsonDataParsed = JSON.parse(event.data);
    console.log(jsonDataParsed);
    // home button
    for (let interfaceItem of interfaceList) {
      try {
        if (interfaceItem !== "search") {
          document.getElementById(interfaceItem).innerHTML =
            jsonDataParsed[interfaceItem];
        } else {
          document.getElementById(interfaceItem).placeholder =
            jsonDataParsed[interfaceItem];
        }
      } catch (error) {
        console.warn(`didn't find the specific element, skipping: ${error}`);
      }
    }
  } else {
    console.warn("the language data is empty!");
  }
};
