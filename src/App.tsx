function App() {
  return (
    <>
    <header className="header">
        <h1 className="header__logo logo">Movie Buff</h1>
      </header>

      <main className="main">
        <nav className="main-navigation">
          <div className="main-navigation__items">
            <a href="#all" className="main-navigation__item main-navigation__item--active">All movies</a>
            <a href="#watchlist" className="main-navigation__item">Watchlist <span className="main-navigation__item-count">0</span></a>
            <a href="#history" className="main-navigation__item">History <span className="main-navigation__item-count">0</span></a>
            <a href="#favorites" className="main-navigation__item">Favorites <span className="main-navigation__item-count">0</span></a>
          </div>
          <a href="#stats" className="main-navigation__additional">Stats</a>
        </nav>

        <section className="films">
          <section className="films-list">
            <h2 className="films-list__title">There are no movies in our database</h2>
          </section>
        </section>
      </main>


      <footer className="footer">
        <section className="footer__logo logo logo--smaller">Movie Buff</section>
        <section className="footer__statistics">
          <p>0 movies inside</p>
        </section>
      </footer>
    </>
  );
}

export default App;
