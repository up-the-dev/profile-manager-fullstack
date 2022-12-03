export const Home = () => {
    const data = [
        { name: "Anom", age: 19, gender: "Male" },
        { name: "Megha", age: 19, gender: "Female" },
        { name: "Subham", age: 25, gender: "Male" },
    ]
    return (
        <div className=" bg-white  mt-0 p-0 h-screen ">
            <div className="bg-slate-100 h-1/2 p-5 mt-10 mx-10 shadow-xl shadow-gray-400 rounded ">
                <h1 className=" text-xl font-light">User management</h1>
                <button className=" bg-sky-800 px-4 py-1 rounded-md text-white mt-2">New</button>
                <form className="float-right mt-10 mb-1">
                    <input type="text" className="border-2 rounded-md text-sm px-3 py-1" placeholder="Search" />
                    <button type="submit" className="border bg-sky-800 text-white px-2 py-0.5 rounded-md ml-1">Search</button>
                </form>
                <div>
                    <table className="table-fixed w-full h-fit border-2 text-center bg-slate-50">
                        <thead>
                            <tr className="bg-sky-800 text-white border-2 text-sm">
                                <th className="p-2">AVATAR</th>
                                <th>FIRSTNAME</th>
                                <th>LASTNAME</th>
                                <th>PHONE</th>
                                <th>E-MAIL</th>
                                <th>ROLE</th>
                                <th>ACTIONS</th>

                            </tr>
                        </thead>

                        <tbody className="font-extralight text-base">
                            {data.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td className="p-1">{val.name}</td>
                                        <td>{val.age}</td>
                                        <td>{val.gender}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}