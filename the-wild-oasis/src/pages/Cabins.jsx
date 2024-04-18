import styled from "styled-components";
import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  const AlignButton = styled.div`
    display: flex;
    justify-content: flex-end;
  `;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <AlignButton>
          <AddCabin />
        </AlignButton>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
