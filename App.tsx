import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";
import AboutUs from "@/pages/AboutUs";
import Sustainability from "@/pages/Sustainability";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import LiveChatSupport from "@/components/LiveChatSupport";
import AIAssistant from "@/components/AIAssistant";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/about" component={AboutUs} />
      <Route path="/sustainability" component={Sustainability} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <div style={{ position: 'relative' }}>
        <Toaster />
        <Router />
        <LiveChatSupport />
        <AIAssistant />
      </div>
    </TooltipProvider>
  );
}

export default App;
