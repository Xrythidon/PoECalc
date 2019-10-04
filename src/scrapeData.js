import React, {useState} from "react";

const scrapeData = (e) => {
    /*
    get the poe paste
    use regex to scrape each attribute
    set each attribute to state

    fire multiple regex functions in here
    */

    //Flat ES
    const regex = new RegExp(/(?<=Energy Shield: )(\d{1,3})/);
    const match = regex.test(e.target.value)

    const [flatArmor, setFlatArmor] = useState(0)

    let text = "";

    if (match) {
      text = e.target.value.match(regex)[0];
      setFlatArmor(parseInt(text));
    }

   // console.log(flatArmor);
    console.log(text);


  }

  export {scrapeData as default}