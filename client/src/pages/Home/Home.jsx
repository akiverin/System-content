import React from "react";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Добро пожаловать в System Content</h1>
          <p className="hero-subtitle">
            Платформа для обучения, развития и прокачки навыков.
          </p>
          <a href="/auth" className="hero-button">
            Начать сейчас
          </a>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>Курсы</h2>
          <p>Углубляйтесь в полезные материалы и развивайтесь без границ.</p>
        </div>
        <div className="feature-card">
          <h2>Видео</h2>
          <p>Смотрите экспертные видео и учитесь по ним.</p>
        </div>
        <div className="feature-card">
          <h2>Профиль</h2>
          <p>Ваш личный кабинет для управления аккаунтом.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
