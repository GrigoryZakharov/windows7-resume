import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import '../styles/desktop.css';
import userIcon from '../assets/icons/user.png';
import folderIcon from '../assets/icons/folder.png';
import resume from '../assets/resume.pdf';
import winIcon from '../assets/icons/win.png';
import wallpaper from '../assets/wallpaper.jpg';
import nfsIcon from '../assets/icons/nfs.png';
import errIcon from '../assets/icons/error.png';
import errSound from '../assets/sounds/err-sound.mp3';
import startUpSound from '../assets/sounds/startUp.mp3';
import openSound from '../assets/sounds/open.mp3';
import txtIcon from '../assets/icons/txt.png';
import pdfIcon from '../assets/icons/pdf.png';
import turnTheTide from '../assets/music/Sylver-Turn the tide.mp3';
import getAway from '../assets/music/Maxx-Get_A_Way.mp3';
import harderTheyFall from '../assets/music/Kosheen-Harder They Fall.mp3';
import mp3Icon from '../assets/icons/mp3.ico';


export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [offsetCounter, setOffsetCounter] = useState(0);
  const [showWinMenu, setShowWinMenu] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const startupSound = new Audio(startUpSound);
    startupSound.volume = 0.5;
    let didPlay = false;
    startupSound.play().then(() => {
      didPlay = true;
    }).catch(() => {
      const onFirstInteraction = () => {
        startupSound.play().catch(() => {});
        window.removeEventListener('pointerdown', onFirstInteraction);
      };
      window.addEventListener('pointerdown', onFirstInteraction, { once: true });
    });

    return () => {
      try {
        startupSound.pause();
        startupSound.currentTime = 0;
      } catch (e) {}
    };
  }, []);

  function openWindow(icon) {
    const offset = offsetCounter * 30;
    setOffsetCounter(prev => prev + 1);
    const id = Date.now() + Math.random();

    if (icon.title === "NFSMW.exe") {
    const sound = new Audio(errSound); 
    sound.play();
    } else {
    const sound = new Audio(openSound); 
    sound.play();
    }

    if (offsetCounter >= 10) {
      setOffsetCounter(0);
    }

    setWindows(prev => [
      ...prev,
      {
        id: id,
        title: icon.title,
        content: icon.content,
        img: icon.img,
        x: 100 + offset,
        y: 100 + offset,
        minimized: false,
        width: icon.width || 400,
        height: icon.height || 300,
      },
    ]);
  }

  function closeWindow(id) {
    setWindows((prev) => prev.filter((win) => win.id !== id));
  }

  function toggleMinimize(id) {
    setWindows(prev =>
      prev.map(win => win.id === id ? { ...win, minimized: !win.minimized } : win)
    );
  }
  function minimizeWindows() {
    setWindows(prev =>
      prev.map(win => ({ ...win, minimized: true }))
    );
  }

  const songs = [
    { title: "Sylver - Turn The Tide", src: turnTheTide },
    { title: "Maxx - Get A Way", src: getAway },
    { title: "Kosheen - Harder They Fall", src: harderTheyFall },
  ];

  const icons = [
  {
    title: "About Me.exe",
    img: userIcon,
    content: (
      <div style={{ padding: "10px", lineHeight: 1.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>Григорий Захаров</h2>
        <h4>FullStack Developer</h4>
        <p>Ульяновск, Россия 🇷🇺</p>
        <p>Я не просто fullstack, я fullгалактика: фронт, бэк и звёзды кода 🌌</p>
        <p>Возраст: 19, Опыт: 1+ год, Проектов: 3+</p>
        <p>Любимые фреймворки: React, Node, FastAPI</p>
        <div style={{ marginTop: "10px" }}>
          <a 
            href="https://grigoryzakharov.github.io/resume/" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: "inline-block", 
              padding: "6px 12px", 
              background: "rgba(0,120,215,0.7)", 
              color: "white", 
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Перейти к полному резюме
          </a>
        </div>
      </div>
    ),
    width: 500, height: 400
  },
  {
    title: "Projects.txt",
    img: txtIcon,
    content: (
      <div style={{ padding: "10px", lineHeight: 1.5 }}>
        <h2>Мои проекты</h2>

        <div style={{ marginBottom: "10px" }}>
          <h3>Resume</h3>
          <p>Моя персональная страница резюме на GitHub Pages.</p>
          <p>Tech: HTML, CSS, JS, React</p>
          <a href="https://grigoryzakharov.github.io/resume/" target="_blank" rel="noreferrer">
            Посмотреть проект
          </a>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Todo API</h3>
          <p>Full-stack приложение для управления задачами с фильтрацией и пагинацией.</p>
          <p>Tech: Python 3.11, FastAPI, PostgreSQL, SQLAlchemy, Pydantic, Docker, Pytest</p>
          <a href="https://github.com/GrigoryZakharov/todo_api" target="_blank" rel="noreferrer">
            GitHub репозиторий
          </a>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Gallery Front</h3>
          <p>Frontend проекта галереи изображений.</p>
          <p>Tech: React, TailwindCSS, JS</p>
          <a href="https://grigoryzakharov.github.io/gallery-front/" target="_blank" rel="noreferrer">
            Посмотреть проект
          </a>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>WeatherHub Project</h3>
          <p>Масштабируемый API для получения погодных данных с настройкой Celery и Redis.</p>
          <p>Tech: Python, FastAPI, PostgreSQL, SQLAlchemy, Redis, Celery, Docker</p>
          <a href="https://github.com/GrigoryZakharov/weatherhub" target="_blank" rel="noreferrer">
            GitHub репозиторий
          </a>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Blog Platform</h3>
          <p>Fullstack блог с JWT аутентификацией, SPA на React и интеграцией с FastAPI.</p>
          <p>Tech: Python, FastAPI, React, PostgreSQL, SQLAlchemy, JWT, Docker</p>
          <a href="https://github.com/GrigoryZakharov/Blog_API" target="_blank" rel="noreferrer">
            GitHub репозиторий
          </a>
        </div>
      </div>
    ),
    width: 700, height: 500
  },
  { title: "Resume.pdf", img: pdfIcon, content: "Свяжись со мной.", width: 800, height: 800 },
  { title: "NFSMW.exe", img: nfsIcon, content: 
  (<div class = "error-content">
    <img src = {errIcon} className = "errIcon" alt="error"></img>
    <p>Ошибка при запуске приложения (0х000007b).</p>
  </div>
  ), width: 350, height: 150 },
  {
      title: "Music",
      img: folderIcon,
      content: (
        <div style={{ color: "black", padding: "10px" }}>
          <h2>🎵 Моя музыка</h2>
          <p>Дважды кликните по песне, чтобы открыть проигрыватель.</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {songs.map((song, i) => (
              <li
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onDoubleClick={() =>
                  setCurrentTrack(song) ||
                  openWindow({
                    title: song.title,
                    img: mp3Icon,
                    width: 400,
                    height: 180,
                    content: (
                      <div style={{ padding: "10px", color: "black" }}>
                        <h3 style={{ marginBottom: "10px" }}>🎧 {song.title}</h3>
                        <audio
                          src={song.src}
                          controls
                          autoPlay
                          style={{ width: "100%" }}
                        ></audio>
                      </div>
                    ),
                  })
                }
                onMouseOver={(e) => (e.currentTarget.style.background = "#d0e7ff")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <img
                  src={mp3Icon}
                  alt="mp3"
                  style={{ width: "24px", marginRight: "10px" }}
                />
                {song.title}
              </li>
            ))}
          </ul>
        </div>
      ),
      width: 400,
      height: 300,
    }
  ];

  function shutdown() {
    if (window.close) window.close();
    else document.body.innerHTML = "<div style='background:black;color:white;height:100vh;display:flex;align-items:center;justify-content:center;font-size:24px;'>Выключение...</div>";
  }
  
  return (
    <div
    class="desktop"
    style={{
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      padding: '20px',
      gap: '20px'
    }}
    >
      {icons.map ((icon) => (
      <div 
      key = {icon.title}
      class="icon"
      onDoubleClick = {() => openWindow(icon)}
      >
        <img src={icon.img} alt={icon.title} />
        <span>{icon.title}</span>
      </div>
      ))}

      {windows.map((win) => (
        <Window
          key={win.id}
          title={win.title}
          x={win.x}
          y={win.y}
          width={win.width}
          height={win.height}
          minimized={win.minimized}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
        >
          {win.title === "Resume.pdf" ? (
            <iframe
              src={resume}
              width="100%"
              height="100%"
              style={{ border: "none", width: "100%", height: "100%" }}
              title="Resume"
            ></iframe>
          ) : (
            win.content
          )}
        </Window>
      ))}


      <div class="taskbar">
        <div class="taskbar-left">
          <button onClick={() => setShowWinMenu(prev => !prev)}><img class = "win-icon" src = {winIcon}></img></button>
          {windows.map(win => (
            <button class="tab" key={win.id} onClick={() => toggleMinimize(win.id)}>
              {win.img && <img src={win.img} alt={win.title} class="tab-icon" />}
            </button>
          ))}
        </div>
        <button class="tab-key" onClick={minimizeWindows}></button>
      </div>

        
      {showWinMenu && (
        <div class="win-menu">
          <button class="close-button" onClick={shutdown}>Завершить работу</button>
        </div>
      )}

    </div>
  );
}
