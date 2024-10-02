import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [hourStyle, setHourStyle] = useState({});
  const [minuteStyle, setMinuteStyle] = useState({});
  const [secondStyle, setSecondStyle] = useState({});

  useEffect(() => {
    const affichageHeure = () => {
      const today = new Date();
      const annee = today.getFullYear();

      const listeMois = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      const mois = listeMois[today.getMonth()];

      const jourNUmero = today.getDate();

      const listeJours = [
        "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", 
        "Vendredi", "Samedi"
      ];
      const jourNom = listeJours[today.getDay()];

      const deuxChiffres = (element) => (element < 10 ? `0${element}` : element);

      const heures = deuxChiffres(today.getHours());
      const minutes = deuxChiffres(today.getMinutes());
      const secondes = deuxChiffres(today.getSeconds());

      setTime(`${heures}:${minutes}:${secondes}`);
      setDate(`${jourNom}, ${jourNUmero} ${mois} ${annee}`);

      // Analog Clock rotation
      const hRotation = 30 * today.getHours() + today.getMinutes() / 2;
      const mRotation = 6 * today.getMinutes();
      const sRotation = 6 * today.getSeconds();

      setHourStyle({ transform: `rotate(${hRotation}deg)` });
      setMinuteStyle({ transform: `rotate(${mRotation}deg)` });
      setSecondStyle({ transform: `rotate(${sRotation}deg)` });
    };

    const intervalId = setInterval(affichageHeure, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      {/* Horloge numérique */}
      <div className="horloge">
        <div className="heures">{time}</div>
        <div className="date">{date}</div>
      </div>

      {/* Horloge analogique */}
      <div className="container">
        <div className="clock">
          <div style={{ '--clr': '#ff3d58', '--h': '74px', ...hourStyle }} className="hand" id="hour">
            <i></i>
          </div>
          <div style={{ '--clr': '#00a6ff', '--h': '84px', ...minuteStyle }} className="hand" id="min">
            <i></i>
          </div>
          <div style={{ '--clr': '#000000', '--h': '94px', ...secondStyle }} className="hand" id="sec">
            <i></i>
          </div>

          {[...Array(12)].map((_, i) => (
            <span key={i} style={{ '--i': i + 1 }}>
              <b>{i + 1}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
