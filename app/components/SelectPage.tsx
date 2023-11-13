"use client"
import { Select } from '@radix-ui/themes'



interface Props {
    changePage:(page:number)=>void
    currentPage:number
    pageSize:number
}

const SelectPage = ({changePage,currentPage,pageSize}:Props) => {
    return (
    <Select.Root
      value={currentPage.toString()}
    onValueChange={(pageindex) =>{
      changePage(parseInt(pageindex) )
  
    } }
  >
    <Select.Trigger placeholder={currentPage.toString()} />
    <Select.Content>
      <Select.Group>
        <Select.Label>
          page
        </Select.Label>

        {[...Array(pageSize)].map((page, index) => {
          return <Select.Item key={index} value={(index + 1).toString()} >{index + 1}</Select.Item>
        })}


      </Select.Group>
    </Select.Content>
  </Select.Root>
  )

}
// export const dynamicParams =false
export default SelectPage