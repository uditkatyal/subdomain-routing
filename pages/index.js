import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import subDomainData from "./data.js";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  // states
  const [wildcard, setWildcard] = useState("loading");
  const [currentDomain, setcurrentDomain] = useState({});
  const [backgroundColor, setBackgroundColor] = useState("#111111");

  const changeBackgroundColor = () => {
    // Generate a random color
    const randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    setBackgroundColor(randomColor);
  };
  //
  const updateDomain = () => {
    changeBackgroundColor();
    const currentURL = window.location.href;
    let domain = currentURL.split("//")[1];
    let subDomain = domain.split(".")[0];
    // console.log("subdomain is:", subDomain);
    setWildcard(subDomain);

    let subDomainInUse;
    subDomainInUse = subDomainData.filter((data) => {
      return data.subdomain === subDomain;
    });
    // console.log(subDomainInUse);
    setcurrentDomain(subDomainInUse);
  };

  useEffect(() => {
    updateDomain();
  }, []);
  // console.log(currentDomain[0]);
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor }}>
      <h1>{wildcard}</h1>
      {currentDomain[0] && (
        <div>
          <h3>{currentDomain[0].content}</h3>
          <img src={currentDomain[0].image} alt="" />
        </div>
      )}
    </div>
  );
};
export default Home;
