class Validator {
  // ValidateTaskRequest checks the request method and validates the task request accordingly
  static validateTaskRequest(task, method) {
    switch (method) {
      case "POST": {
        return this.validateCreateRequest(task); // Validate task request during creation
      }
      case "PUT": {
        return this.validateUpdateRequest(task); // Validate task request during update
      }
    }
  }

  // validateCreateRequest checks if all required properties are present and have valid values
  static validateCreateRequest(task) {
    if (
      task.hasOwnProperty("title") && // Check if 'title' property exists
      task.hasOwnProperty("completed") && // Check if 'completed' property exists
      task.hasOwnProperty("description") && // Check if 'description' property exists
      (task.completed == true || task.completed == false) && // Check if 'completed' property has a valid boolean value
      task.title.length != 0 && // Check if 'title' property has a non-empty string value
      task.description.length != 0 // Check if 'description' property has a non-empty string value
    ) {
      return {
        status: true,
        message: "POST Request data is validated successfully",
      };
    } else {
      return {
        status: false,
        message: "Task request is malformed, please provide all the parameters",
      };
    }
  }

  // validateUpdateRequest checks if all required properties are present and have valid values for update
  static validateUpdateRequest(task) {
    if (
      task.hasOwnProperty("title") && // Check if 'title' property exists
      task.hasOwnProperty("completed") && // Check if 'completed' property exists
      task.hasOwnProperty("description") && // Check if 'description' property exists
      task.hasOwnProperty("id") && // Check if 'id' property exists
      (task.completed == true || task.completed == false) && // Check if 'completed' property has a valid boolean value
      task.title.length != 0 && // Check if 'title' property has a non-empty string value
      task.description.length != 0 // Check if 'description' property has a non-empty string value
    ) {
      return {
        status: true,
        message: "PUT request data is validated successfully",
      };
    } else {
      return {
        status: false,
        message: "Task request is malformed, please provide all the parameters",
      };
    }
  }
}
module.exports = Validator;
