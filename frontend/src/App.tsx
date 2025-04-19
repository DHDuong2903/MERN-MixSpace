import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
          <Route path="/albums/:albumId" element={<AlbumPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
