Feature: Creer Employeur

  @PROJ-32
  Scenario Outline: Creation avec succes
    Given je me connecte avec un compte valide "<userType>"
    When J'accede à la page PIM
    And je remplir le formulaire remplir et je valide
    Then je suis rediriger vers la page Information Employe

    Examples:
      | userType     |
      | validUser    | 

  Scenario Outline: Creation avec tous les champs vides
    Given je me connecte avec un compte valide "<userType>"
    When J'accede à la page PIM
    And je valide un formulaire vide
    Then je reste sur la page du formulaire avec des messages d'erreur 

   Examples:
      | userType     |
      | validUser    | 