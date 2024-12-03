Feature: get order
  
Scenario: Get order with valid data
    Given order by ID
    When the response body should be a valid order
    When I should get the order