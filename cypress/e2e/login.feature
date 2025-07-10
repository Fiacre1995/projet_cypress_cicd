Feature: Login

  Scenario Outline: Successful login with different users
    Given I open the login page
    When I enter user "<userType>"
    Then I should be redirected to the dashboard

        Examples:
      | userType         | 
      | validUser        |
    


  Scenario Outline: Failed login with invalid credentials
    Given I open the login page
    When I enter user "<userType>"
    Then I should see a login error message

    Examples:
      | userType                      | 
      | invalideUsername              |
      | invalidePassword              |
      | invalideUsernameAndPassword   |