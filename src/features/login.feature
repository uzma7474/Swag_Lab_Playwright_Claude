@login
Feature: Login to Swag Labs
  As a shopper
  I want to authenticate with my credentials
  So that I can access the product catalogue

  Background:
    Given I am on the Swag Labs login page

  @smoke @regression
  Scenario: Standard user logs in successfully
    When I login as "standard_user"
    Then I should land on the products page
    And the products page should list 6 products

  @negative @regression
  Scenario: Locked out user cannot log in
    When I login as "locked_out_user"
    Then I should see the login error "Epic sadface: Sorry, this user has been locked out."

  @negative @regression
  Scenario Outline: Invalid login attempts show validation errors
    When I login with username "<username>" and password "<password>"
    Then I should see the login error "<error>"

    Examples:
      | username      | password     | error                                                                      |
      | standard_user | wrong_pass   | Epic sadface: Username and password do not match any user in our service   |
      | invalid_user  | secret_sauce | Epic sadface: Username and password do not match any user in our service   |
      |               | secret_sauce | Epic sadface: Username is required                                         |
      | standard_user |              | Epic sadface: Password is required                                         |

  @regression
  Scenario Outline: Every non-locked demo user can log in
    When I login as "<user>"
    Then I should land on the products page

    Examples:
      | user                    |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |

  @smoke @regression
  Scenario: Logged in user can log out
    Given I am logged in as "standard_user"
    When I logout
    Then I should be returned to the login page

  @negative @regression
  Scenario: Direct access to the inventory without logging in is blocked
    When I open the inventory page directly without logging in
    Then I should see the login error "Epic sadface: You can only access '/inventory.html' when you are logged in."
