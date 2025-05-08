import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../src/components/layout/AdminLayout";
import NotFound from "../pages/NotFound";
import Logout from "../pages/Logout";

// Dashboard imports
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Sevices";
import Inbox from "../pages/Inbox";
import Orders from "../pages/Orders";
import Reports from "../pages/Reports";
import Analytics from "../pages/Reports/Analytics";
import Pricing from "../pages/Pricing";
import Calendar from "../pages/Calendar";
import Tasks from "../pages/Tasks";
import Notifications from "../pages/Notifications";
import Invoice from "../pages/Invoice";
// import InvoiceDetail from "../pages/Invoice/[id]";
import Settings from "../pages/Settings";


const AppRoutes = () => (
     <Routes>
          <Route element={<AdminLayout />}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/services" element={<Services />} />
               <Route path="/inbox" element={<Inbox />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/reports" element={<Reports />} />
               <Route path="/reports/analytics" element={<Analytics />} />
               <Route path="/pricing" element={<Pricing />} />
               <Route path="/calendar" element={<Calendar />} />
               <Route path="/tasks" element={<Tasks />} />
               <Route path="/notifications" element={<Notifications />} />
               <Route path="/invoice" element={<Invoice />} />
               {/* <Route path="/invoice/:id" element={<InvoiceDetail />} /> */}
               <Route path="/settings" element={<Settings />} />
               <Route path="/logout" element={<Logout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
     </Routes>
);

export default AppRoutes;
