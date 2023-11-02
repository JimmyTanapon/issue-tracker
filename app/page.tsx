import Pagination from "./components/Pagination";

export default function Home() {
  return (
   <div>
    <h1>Hello</h1>
    <Pagination itemCount={100} pageSize={10} currentPage={10}/>
   </div>
  )
}
