Feature: Create order

Scenario: Create order with valid data
    Given I have an order data
    When I create the order
    When I should get the order