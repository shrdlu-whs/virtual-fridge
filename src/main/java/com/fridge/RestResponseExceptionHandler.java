package com.fridge;

//import io.github.resilience4j.bulkhead.BulkheadFullException;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class RestResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {NoSuchElementException.class})
    protected ResponseEntity<Object> handleNoSuchElementException(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = ex.getMessage();
        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {EmptyResultDataAccessException.class})
    protected ResponseEntity<Object> handleEmptyResultDataAccessException(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "Element could not be deleted";
        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {IllegalArgumentException.class})
    protected ResponseEntity<Object> handleIllegalArgumentException(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "Element could not be updated";
        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {NullPointerException.class})
    protected ResponseEntity<Object> handleNullPointerException(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "Bad Request";
        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {AuthenticationException.class})
    protected ResponseEntity<Object> handleBadCredentialsException(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "This is forbidden" + ex.getMessage();
        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

//    @ExceptionHandler(value = {BulkheadFullException.class})
//    protected ResponseEntity<Object> handleBulkheadFullException(
//            RuntimeException ex, WebRequest request) {
//        String bodyOfResponse = "Bulkhead is full and does not permit further requests";
//        return handleExceptionInternal(ex, bodyOfResponse,
//                new HttpHeaders(), HttpStatus.TOO_MANY_REQUESTS, request);
//    }
}
