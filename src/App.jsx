import SideBar from "./components/SideBar";
import { ArticleProvider } from "./context/Article/ArticleContext";
import { ProjectProvider } from "./context/Project/ProjectContext";
import { AuthProvider } from "./context/Auth/AuthContext";
import { AiProvider } from "./context/AI/AiContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Project from "./pages/projects/Project";
import Articles from "./pages/aricles/Articles";
import Article from "./pages/aricles/Article";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Visit from "./pages/home/Visit";
import Profile from "./pages/profile/Profile";

import PrivateRoute from "./routing/PrivateRoute";
import TopBar from "./components/TopBar";
function App() {
  return (
    <Router>
      <AuthProvider>
        <AiProvider>
          <ProjectProvider>
            <ArticleProvider>
              <div className="container">
                <div className="sidebar">
                  <SideBar />
                </div>
                <div className="TopBar">
                  <TopBar />
                </div>
                <div className="Content">
                  <Routes>
                    <Route path="/" element={<PrivateRoute />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:id" element={<Project />} />
                      <Route path="/articles" element={<Articles />} />
                      <Route path="/articles/:id" element={<Article />} />
                      <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/visit" element={<Visit />} />
                  </Routes>
                </div>
              </div>
            </ArticleProvider>
          </ProjectProvider>
        </AiProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
