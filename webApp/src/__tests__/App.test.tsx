import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/header/headerContainer";
import { Provider } from "mobx-react";
import { RootStore } from "../store/rootStore";

test("Header present", () => {
  const rootStore: RootStore = new RootStore();
  render(
    <Provider {...rootStore}>
      <Header />
    </Provider>
  );
  const linkElement = screen.getByText(/title\.apptitle/i);
  expect(linkElement).toBeInTheDocument();
});
