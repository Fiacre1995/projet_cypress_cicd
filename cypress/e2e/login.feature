Feature: Login

  Scenario Outline: Successful login with different users
    Given I open the login page
    When I enter email "<email>" and password "<password>"
    Then I should be redirected to the dashboard

    Examples:
      | email             | password     |
      | Admin             | admin123     |
      | Admin             | admin123     |


  Scenario Outline: Failed login with invalid credentials
    Given I open the login page
    When I enter email "<email>" and password "<password>"
    Then I should see a login error message

    Examples:
      | email               | password     |
      | Admin               | passwordIncorrect   |
      | AdminIncorrect      | admin123     |
      | AdminIncorrect      | passwordIncorrect   |