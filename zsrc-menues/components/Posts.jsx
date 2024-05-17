import useGetData from "./custom_hook/GetData";
const Posts=()=>{
    const posts=useGetData("https://jsonplaceholder.typicode.com/posts");
    return(
        <>
          <h3> Fetch Jsonplaceholder API Posts</h3>
          {posts?.map(post=> 
          <div key={post.id}>
                 <h5> {post.title} </h5>
                 <p> {post.body} </p>
                 <hr/>
          </div>)}
        </>
    )
}
export default Posts;