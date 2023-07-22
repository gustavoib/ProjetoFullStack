package com.example.springproject.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRecordDto(@Email String email, @NotBlank String password) {
}
