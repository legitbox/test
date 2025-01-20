async function languageSelectionHandler() {
  const oldData = localStorage.getItem("selectedInterfaceLanguage");
  if (oldData !== undefined && oldData !== null) {
    document.getElementById("language_selector").value =
      JSON.parse(oldData)["language"];
  }
  const elementSelect = document.getElementById("language_selector");

  elementSelect.addEventListener("change", async () => {
    const selectedValue = elementSelect.value;
    await fetch(
      `/assets/language_files/interface_languages/${selectedValue}.json`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load language file");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("selectedInterfaceLanguage", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
    await swapLanguageHandler();
  });
}

function swapLanguageHandler() {
  const jsonDataUnparsed = localStorage.getItem("selectedInterfaceLanguage");
  if (jsonDataUnparsed == null) {
    document.documentElement.setAttribute("lang", "en");
  }
  if (jsonDataUnparsed !== undefined && jsonDataUnparsed !== null) {
    //### interface changes ###
    const interfaceList = [
      "home_button",
      "search",
      "settings_title",
      "select_your_language_title",
    ];
    const jsonDataParsed = JSON.parse(jsonDataUnparsed);
    document.documentElement.setAttribute(
      "lang",
      jsonDataParsed["language"].split("_")[0],
    );
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
      } catch (error) {}
    }
  } else {
    console.warn("the language data is empty!");
  }
}

swapLanguageHandler();
