import { Link, Outlet } from "react-router-dom";
const Contact=()=>{
    return(
        <>
          <h2> Contact Us</h2>
          <table className="table">
            <tbody>
                <tr>
                    <td width={200}>
                       <ul>
                          <li> <Link to="noida"> Noida</Link></li>
                          <li> <Link to="delhi"> Delhi</Link></li>
                          <li> <Link to="gurugram"> Gurugram</Link></li>
                       </ul>
                    </td>
                    <td>
                        <Outlet />
                    </td>
                </tr>
            </tbody>
          </table>
        </>
    )
}
export default Contact;