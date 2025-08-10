import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

function MainLayout({children}) {
  return (
    <div className="h-screen flex ">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout
