package com.example.springproject.services.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String userNotFound) {
    }
}
