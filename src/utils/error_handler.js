const apiError = require("./api_error");

const buildApiError = (error, fallbackStatusCode = 500, fallbackMessage = "Something went wrong") => {
      if (error instanceof apiError) {
            return error;
      }

      if (error?.name === "SequelizeValidationError") {
            return new apiError(
                  400,
                  "Validation failed",
                  error.errors.map((entry) => ({
                        message: entry.message,
                        field: entry.path,
                        value: entry.value
                  })),
                  error.stack
            );
      }

      if (error?.name === "SequelizeUniqueConstraintError") {
            return new apiError(
                  409,
                  "Resource already exists",
                  error.errors.map((entry) => ({
                        message: entry.message,
                        field: entry.path,
                        value: entry.value
                  })),
                  error.stack
            );
      }

      if (error?.name === "SequelizeForeignKeyConstraintError") {
            return new apiError(400, "Invalid reference provided", [error.message], error.stack);
      }

      if (error?.name === "SequelizeDatabaseError") {
            return new apiError(500, "Database operation failed", [error.message], error.stack);
      }

      return new apiError(
            fallbackStatusCode,
            error?.message || fallbackMessage,
            error ? [error.message || error] : [],
            error?.stack || ""
      );
};

const sendErrorResponse = (res, error, fallbackMessage = "Something went wrong") => {
      const normalizedError = buildApiError(error, 500, fallbackMessage);
      const statusCode = normalizedError.statusCode || normalizedError.statuscode || 500;

      return res.status(statusCode).json({
            success: false,
            message: normalizedError.message || fallbackMessage,
            data: null,
            errors: normalizedError.errors || [],
            stack: process.env.NODE_ENV === "production" ? undefined : normalizedError.stack
      });
};

module.exports = {
      buildApiError,
      sendErrorResponse
};
