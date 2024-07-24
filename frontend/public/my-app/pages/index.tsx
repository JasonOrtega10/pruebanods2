import { useState, useEffect } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Tiempo de actividad de la página:</h1>
      <p>{seconds} segundos</p>
    </div>
  );
}
