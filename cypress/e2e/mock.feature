Feature: Creer Employeur

  Scenario Outline: Creation avec succes
    Given je me connecte avec un compte valide "<userType>"
    When J'accede à la page PIM Mockée

    Examples:
      | userType     |
      | validUser    | 