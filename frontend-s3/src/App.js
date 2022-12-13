import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "./Profile";
import Video from "./Video";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import VideoPreview from "./VideoPreview";
import Room from "./Room";
import SharePreview from "./SharePreview";
import React from "react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  var homepage;
  if (!isLoading) {
    if (isAuthenticated) {
      homepage = <HomePage />;
    } else {
      homepage = <LoginPage />;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={homepage} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/video:id" element={<Video />} />
        <Route path="/preview:id" element={<VideoPreview />} />
        <Route path="/chat" element={<Room />} />
        <Route path="/SharePreview:video" element={<SharePreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
