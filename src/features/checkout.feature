@checkout @loggedIn
Feature: Checkout
  As a shopper
  I want to complete my purchase
  So that my order is placed

  @smoke @regression @e2e @INV001
  Scenario: Complete an order end to end
    Given I add the following products to the cart
      | Sauce Labs Backpack     |
      | Sauce Labs Bolt T-Shirt |
    And I open the cart
    When I proceed to checkout
    And I enter valid checkout information
    Then the order overview should list the selected products
    And the order total should equal the item total plus tax
    When I finish the order
    Then I should see the order confirmation "Thank you for your order!"
    And the cart badge should not be displayed

  @negative @regression
  Scenario Outline: Checkout information validation
    Given I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout
    When I submit checkout information with first name "<first>", last name "<last>" and postal code "<zip>"
    Then I should see the checkout error "<error>"

    Examples:
      | first | last | zip   | error                          |
      |       | Doe  | 12345 | Error: First Name is required  |
      | John  |      | 12345 | Error: Last Name is required   |
      | John  | Doe  |       | Error: Postal Code is required |

  @regression
  Scenario: Cancelling checkout returns to the cart
    Given I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout
    When I cancel the checkout information step
    Then I should be on the cart page

  @regression
  Scenario: Item total on the overview equals the sum of product prices
    Given I add the following products to the cart
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    And I open the cart
    And I proceed to checkout
    When I enter valid checkout information
    Then the item total should equal the sum of the selected product prices
