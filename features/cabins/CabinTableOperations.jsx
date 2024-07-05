import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
function CabinTableOperations() {
  return (
    <TableOperations>
          <Filter filterField="discount" options={[{ value: "all", label: "All" }, { value: "no-discount", label: "No Discount" }, { value: "with-discount", label: "With Discount" }]}/>
          <SortBy options={[{ value: "Name-asc", label: "Sort by name(A-Z)" }, { value: "Name-desc", label: "Sort by name(Z-A)" }, { value: "RegularPrice-asc", label: "Sort by price(low first)" }, { value: "RegularPrice-desc", label: "Sort by price(high first)" }, { value: "MaxCapacity-asc", label: "Sort by capacity(low first)" }, { value: "MaxCapacity-desc", label: "Sort by capacity(high first)" }]}/>
    </TableOperations>

  )
}

export default CabinTableOperations