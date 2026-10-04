@inventory @loggedIn
Feature: Product catalogue
  As a logged in shopper
  I want to browse, sort and add products
  So that I can choose what to buy

  @smoke @regression
  Scenario: Adding a product updates the cart badge
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1
    And the "Sauce Labs Backpack" button should change to "Remove"

  @regression
  Scenario: Removing a product from the catalogue clears the cart badge
    Given I add "Sauce Labs Backpack" to the cart
    When I remove "Sauce Labs Backpack" from the products page
    Then the cart badge should not be displayed

  @regression
  Scenario: Adding multiple products
    When I add the following products to the cart
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Onesie       |
    Then the cart badge should show 3

  @regression
  Scenario Outline: Sorting products
    When I sort products by "<sort>"
    Then the products should be sorted by "<sort>"

    Examples:
      | sort                |
      | Name (A to Z)       |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |

  @regression
  Scenario: Product prices match the expected catalogue
    Then every product should display its expected price

  @regression
  Scenario: Product details page shows the selected product
    When I open the details of "Sauce Labs Fleece Jacket"
    Then the product details should show "Sauce Labs Fleece Jacket" priced at 49.99
