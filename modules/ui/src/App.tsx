import { Link, Outlet, useLocation } from "react-router-dom";
import "./styles/App.scss";
import "semantic-ui-css/semantic.min.css";
import { CommonModal } from "./components/core/CommonModal";
import classNames from "classnames";
import { useEffect, useState } from "react";
import SearchModal from "./components/SearchModal";

function App() {
  const menus = [
    {
      name: "Entities",
      path: "/entities",
    },
    {
      name: "DB Migration",
      path: "/migrations",
    },
    {
      name: "Scaffolding",
      path: "/scaffolding",
    },
  ];
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleKeyDown = (event: any) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      setModalOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="app">
        <div className="gnb">
          <div className="menu">
            <div className="title">🌲 &nbsp; Sonamu UI</div>
            <div className="menus">
              {menus.map((menu, menuIndex) => (
                <Link
                  key={menuIndex}
                  className={classNames("menu", {
                    selected: location.pathname.includes(menu.path),
                  })}
                  to={menu.path}
                >
                  <div>{menu.name}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="search" onClick={() => setModalOpen(true)}>
            <span>🔍</span>
            <span>Search</span>
            <kbd className="keycap">⌘</kbd>
            <kbd className="keycap">K</kbd>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
      <SearchModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <CommonModal />
    </>
  );
}

export default App;
