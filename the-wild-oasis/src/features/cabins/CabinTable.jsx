import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const sortedCabins = useMemo(() => {
    const [field, direction] = sortBy.split("-");

    const modifier = direction === "asc" ? 1 : -1;

    let filteredCabins = [];
    if (cabins) {
      if (filterValue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      } else if (filterValue === "with-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      } else {
        filteredCabins = cabins;
      }
    }

    return filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  }, [filterValue, cabins, sortBy]);

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          items={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
