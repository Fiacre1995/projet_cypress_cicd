Feature: Creer Employeur

  Scenario Outline: Creation avec succes
    Given je me connecte avec un compte valide : "<username>" et "<password>"
    When J'accede à la page PIM
    And je remplir le formulaire et je valide : "<prenom>" et "<nom>"
    Then je suis rediriger vers la page Information Employe

    Examples:
      | username | password | prenom     | nom     |
      | Admin    | admin123 | testPrenom | testNom |

  Scenario Outline: Creation avec KO
    Given je me connecte avec un compte valide : "<username>" et "<password>"
    When J'accede à la page PIM
    And je remplir le formulaire et je valide
    #Then I should be redirected to the dashboard

    Examples:
      | username | password | 
      | Admin    | admin123 | 