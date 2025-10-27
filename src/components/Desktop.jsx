import { useState } from "react";
import Window from "./Window";
import '../styles/desktop.css'


export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [offsetCounter, setOffsetCounter] = useState(0);
  const [showWinMenu, setShowWinMenu] = useState(false);

  function openWindow(icon) {
    const offset = offsetCounter * 30;
    setOffsetCounter(prev => prev + 1);
    const id = Date.now() + Math.random();

    if (offsetCounter >= 10) {
      setOffsetCounter(0);
    }

    setWindows(prev => [
      ...prev,
      {
        id: id,
        title: icon.title,
        content: icon.content,
        x: 100 + offset,
        y: 100 + offset,
        minimized: false,
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

  const icons = [
  {
    title: "About Me",
    img: "/icons/user.png",
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
    )
  },
  {
    title: "Projects",
    img: "/icons/folder.png",
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
    )
  },
  { title: "Resume", img: "/icons/folder.png", content: "Свяжись со мной." },
  ];

  function shutdown() {
    if (window.close) window.close();
    else document.body.innerHTML = "<div style='background:black;color:white;height:100vh;display:flex;align-items:center;justify-content:center;font-size:24px;'>Выключение...</div>";
  }
  
  return (
    <div
    class="desktop"
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

      {windows.map((win) =>
        !win.minimized && win.title === "Resume" ? (
          <Window
            key={win.id}
            title={win.title}
            x={win.x}
            y={win.y}
            width={700} 
            height={900}
            onClose={() => closeWindow(win.id)}
          >
            <iframe
              src="/resume.pdf"
              width="100%"
              height="100%"
              style={{ border: "none", width : "100%" ,height : "100%" }}
              title="Resume"
            ></iframe>
          </Window>
        ) : (
          !win.minimized && (
            <Window
              key={win.id}
              title={win.title}
              x={win.x}
              y={win.y}
              width={500} 
              height={500}
              onClose={() => closeWindow(win.id)}
            >
              {win.content}
            </Window>
          )
        )
      )}


      <div class="taskbar">
        <button onClick={() => setShowWinMenu(prev => !prev)}><img class = "win-icon" src = "/icons/win.png"></img></button>
        {windows.map(win => (
          <button class="tab" key={win.id} onClick={() => toggleMinimize(win.id)}>
            {win.title}
          </button>
        ))}
      </div>

        
      {showWinMenu && (
        <div class="win-menu">
          <button class="close-button" onClick={shutdown}>Завершить работу</button>
        </div>
      )}

    </div>
  );
}
