import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loading } from "./components/ui/States";
import { useAuth } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProfilePage } from "./pages/ProfilePage";
import { CollectionPage } from "./pages/CollectionPage";
import { MessagesPage } from "./pages/MessagesPage";
import { MediaPage } from "./pages/MediaPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  const { user, loading } = useAuth();

  // Hold the router until the stored token has been checked, otherwise a
  // signed-in reload flashes the login screen.
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loading label="Checking your session…" />
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="sections/:section" element={<CollectionPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
