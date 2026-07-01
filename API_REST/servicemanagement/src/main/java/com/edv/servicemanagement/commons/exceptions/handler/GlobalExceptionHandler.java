package com.edv.servicemanagement.commons.exceptions.handler;

import com.edv.servicemanagement.commons.ApiResponse;
import com.edv.servicemanagement.commons.ResponseUtil;
import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.commons.exceptions.UniqueFieldValueAlreadyExistsException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UniqueFieldValueAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Void>> handleUniqueFieldValueAlreadyExistsException(
            HttpServletRequest request, UniqueFieldValueAlreadyExistsException exception
    ){
        ApiResponse<Void> response = ResponseUtil.error(exception.getMessage(),
                exception.getValidationFields(), request.getRequestURI());
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            HttpServletRequest request, ResourceNotFoundException exception
    ){
        ApiResponse<Void> response = ResponseUtil.error(exception.getMessage(),null,
                request.getRequestURI());
        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            HttpServletRequest request, Exception ex
    ){
        ApiResponse<Void> response = ResponseUtil.error("Invalid user credentials",null,
                request.getRequestURI());
        return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
    }
}
