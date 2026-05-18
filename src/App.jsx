import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store';
import MainLayout from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductCard } from './pages/ProductCard';
import { SubscribePitch } from './pages/SubscribePitch';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Profile } from './pages/Profile';
import { SubDetails } from './pages/SubDetails';
import { HelpCategory } from './pages/HelpCategory';
import { ChannelSelect } from './pages/ChannelSelect';
import { Chat } from './pages/Chat';
import { VideoCall } from './pages/VideoCall';
import { PhoneCall } from './pages/PhoneCall';
import { History } from './pages/History';
import { UpgradeSelect } from './pages/UpgradeSelect';
import { PostGarantia } from './pages/PostGarantia';

export default function App() {
  return (
    <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product" element={<ProductCard />} />
          <Route path="/subscribe-pitch" element={<SubscribePitch />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/subscription" element={<SubDetails />} />
          <Route path="/profile/help" element={<HelpCategory />} />
          <Route path="/profile/channel" element={<ChannelSelect />} />
          <Route path="/profile/chat" element={<Chat />} />
          <Route path="/profile/video" element={<VideoCall />} />
          <Route path="/profile/call" element={<PhoneCall />} />
          <Route path="/profile/history" element={<History />} />
          <Route path="/profile/upgrade" element={<UpgradeSelect />} />
          <Route path="/profile/post-garantia" element={<PostGarantia />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </StoreProvider>
  );
}
