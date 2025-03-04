import { useState } from "react";
import AdminHeader from "./header";
import AdminSideBar from "./sidebar";
import { Outlet } from "react-router-dom";  


function AdminLayout() {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="flex min-h-screen w-full" >
            {/* admin Sidebar */}
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
               <div className="flex flex-1 flex-col">
            {/* admin Header */}
            <AdminHeader setOpen={setOpenSidebar} />	
                  <main className="flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    < Outlet/>
                  </main>
               </div>	
        </div>
    );
}

export default AdminLayout;