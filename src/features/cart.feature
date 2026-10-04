@cart @loggedIn
Feature: Shopping cart
  As a shopper
  I want to review and edit my cart
  So that I only buy what I need

  @smoke @regression
  Scenario: Cart lists the products I added
    Given I add the following products to the cart
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    When I open the cart
    Then the cart should contain the following products
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |

  @regression
  Scenario: Removing an item from the cart
    Given I add the following products to the cart
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    And I open the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should contain the following products
      | Sauce Labs Bike Light |
    And the cart badge should show 1

  @regression
  Scenario: Continue shopping returns to the catalogue
    Given I open the cart
    When I continue shopping
    Then I should land on the products page

  @regression
  Scenario: Cart persists after navigating back to the catalogue
    Given I add "Sauce Labs Onesie" to the cart
    And I open the cart
    When I continue shopping
    Then the cart badge should show 1
