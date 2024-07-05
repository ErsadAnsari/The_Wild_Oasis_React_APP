import { Outlet } from "react-router-dom"
import { styled } from "styled-components";
import { CabinProvider } from "../Context/CabinContext";
import Header from "./Header"
import Sidebar from "./Sidebar"
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
const AppLayout = () => {
  return (
    <StyledAppLayout>
      <CabinProvider>
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
      </CabinProvider>
    </StyledAppLayout>
  );
}

export default AppLayout