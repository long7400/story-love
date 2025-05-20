import { Switch, Route, useLocation } from "wouter";
import PageTransition from "./PageTransition";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

/**
 * Application router component that handles page transitions
 */
export default function Router() {
  const [location] = useLocation();

  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/postcards" component={() => <div>Postcards Page Coming Soon</div>} />
        <Route path="/love-language" component={() => <div>Love Language Quiz Coming Soon</div>} />
        <Route path="/countdown" component={() => <div>Countdown Timer Coming Soon</div>} />
        <Route path="/map" component={() => <div>Love Map Coming Soon</div>} />
        <Route path="/gallery" component={() => <div>Enhanced Photo Gallery Coming Soon</div>} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}