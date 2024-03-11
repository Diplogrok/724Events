import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const servicesContainer = screen.getByTestId("services-container");
    expect(servicesContainer).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleList = screen.getAllByRole("listitem");
    expect(peopleList).toHaveLength(5);
  });
  it("a footer is displayed", () => {
    render(<Home />);
    const contactTitle = screen.getByText("Contactez-nous");
    const address = screen.getByText("45 avenue de la République, 75000 Paris");
    const phoneNumber = screen.getByText("01 23 45 67 89");
    const email = screen.getByText("contact@724events.com");
    expect(contactTitle).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
