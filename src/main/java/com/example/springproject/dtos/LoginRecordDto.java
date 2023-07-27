package com.example.springproject.dtos;


import org.springframework.security.core.userdetails.UserDetails;

public record LoginRecordDto(String token, UserDetails user) {
}
