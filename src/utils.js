const NIVEAUX = ["facile", "moyenne", "difficile"];

/** Note « maison » dérivée de la difficulté — 4.40 à 5.00. */
export const noteDe = (recette) =>
    (5 - Math.max(0, NIVEAUX.indexOf(recette.difficulte)) * 0.3).toFixed(2);

export const moyenneDes = (recettes) =>
    recettes.length
        ? (recettes.reduce((a, r) => a + Number(noteDe(r)), 0) / recettes.length).toFixed(2)
        : "0.00";
