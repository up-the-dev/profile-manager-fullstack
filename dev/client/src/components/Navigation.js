import { Link } from "react-router-dom"

export const Navigation = () => {

    return (
        <nav className="bg-navy  h-full w-1/6 fixed overflow-auto m-0 p-0 text-white " >
            <div className="flex flex-col items-center ml-5 text-white shadow-inner font-medium py-2 rounded-3xl mt-10 w-4/5">
                <h1>
                    User Management
                </h1>
                <h1 >
                    Application
                </h1>
            </div>
            <div className="flex flex-col w-5/6 gap-5 mt-10">
                <Link to='/' className="flex gap-5 items-center ml-7 focus:bg-gray-700 focus:ring-1 focus:rounded-2xl focus:ring-amber-50" >
                    <img src="usersLogo.png" className="p-2 h-7 " alt="UsersLogo" />
                    <h1>Users</h1>
                </Link>
                <Link to='/profile' className="flex gap-5 items-center ml-7 focus:bg-gray-700 focus:ring-1 focus:rounded-2xl focus:ring-amber-50">
                    <img src="profile.png" className="p-2 h-7" alt="ProfileLogo" />
                    <h1 className="">My Profile</h1>
                </Link>
                <Link to='/logout' className="flex gap-5 items-center ml-6 focus:bg-gray-700 focus:ring-1 focus:rounded-2xl focus:ring-amber-50">
                    <img src="logOut.png" className="p-2 h-8" alt="logoutLogo" />
                    <h1 className="">Logout</h1>
                </Link>
            </div>
        </nav>
    )
}