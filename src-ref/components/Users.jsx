import useGetData from "./custom_hook/GetData";
const Users=()=>{
   const users=useGetData("https://jsonplaceholder.typicode.com/users");
    return(
        <>
          <h3> Fetch Jsonplaceholder API Users Details</h3>
          <ul>
              {users?.map(user=> 
               <li key={user.id}> {user.username}----{user.email} </li>
              )}
          </ul>
        </>
    )
}
export default Users;