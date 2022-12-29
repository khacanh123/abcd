import { useEffect, useState } from "react";
import MathJax from "./MathJax";
import "./styles.css";

export default function App() {
  const [isMathJaxLoading, setIsMathJaxLoading] = useState(true);

  useEffect(() => {
    loadMathJax();
    // eslint-disable-next-line
  }, []);

  const loadMathJax = () => {
    if (window.MathJax || !isMathJaxLoading) {
      return setIsMathJaxLoading(false);
    }

    const mathJaxConfigScript = document.createElement("script");
    mathJaxConfigScript.type = "text/x-mathjax-config";
    const mathJaxConfig = `MathJax.Hub.Config({
        jax: ['input/TeX', 'input/MathML', 'input/AsciiMath', 'output/SVG'],
        menuSettings: {
          explorer: true
        },
        explorer: {
          speech: true,
          background: 'yellow',
          foreground: 'white'
        },
        showMathMenu: false,
        styles: {
          '#MathJax_Message': {
            display: 'none'
          }
        }
      });
      MathJax.Hub.processSectionDelay = 0;
      MathJax.Hub.processUpdateDelay = 0;`;

    mathJaxConfigScript[window.opera ? "innerHTML" : "text"] = mathJaxConfig;
    document.body.appendChild(mathJaxConfigScript);

    const mathJaxScript = document.createElement("script");
    mathJaxScript.id = "mathJaxScript";
    mathJaxScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_SVG";
    mathJaxScript.onload = () => {
      setIsMathJaxLoading(false);
    };
    document.body.appendChild(mathJaxScript);
  };

  if (isMathJaxLoading) return null;

  return <MathJax />;
}
