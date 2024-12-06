Feature: AppService methods
  As a developer
  I want to ensure the AppService methods work as expected
  So that the application functions correctly

  Scenario: Create a new order
    Given a valid order payload
    When the create method is called
    Then a new order should be created and returned

  Scenario: Find all orders
    Given the database has orders
    When the findAll method is called
    Then all orders should be returned

  Scenario: Find an order by ID
    Given the database has an order with ID 1
    When the findOne method is called with ID 1
    Then the order with ID 1 should be returned

  Scenario: Update an order
    Given an order with ID 1 exists
    And a valid update payload
    When the update method is called with ID 1
    Then the order should be updated

  Scenario: Remove an order
    Given an order with ID 1 exists
    When the remove method is called with ID 1
    Then the order should be deleted
