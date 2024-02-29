import { getMonth } from "./index";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    // Test : la fonction retourne 'janvier' pour la date 2022-01-01
    it("the function returns 'janvier' for 2022-01-01 as date", () => {
      // Création d'une date pour le 1er janvier 2022
      const date = new Date("2022-01-01");
      // Vérification que getMonth retourne 'janvier' pour cette date
      expect(getMonth(date)).toEqual("janvier");
    });
    it("the function returns 'juillet' for 2022-07-08 as date", () => {
      const date = new Date("2022-07-08");
      expect(getMonth(date)).toEqual("juillet");
    });
  });
});
