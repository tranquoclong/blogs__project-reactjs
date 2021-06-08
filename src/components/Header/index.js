import "./Header.css";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header id="inner-navigation">
      {/* navbar start */}
      <nav className="navbar navbar-default navbar-fixed-top navbar-sticky-function navbar-arrow navbar-sticky-in">
        <div className="container">
          <div className="row">
            <HeaderLogo />
            <div className="col-lg-4">
              <HeaderSearch />
            </div>
            <HeaderMenu />
          </div>
        </div>
      </nav>
      {/* navbar end */}
    </header>
  );
}
