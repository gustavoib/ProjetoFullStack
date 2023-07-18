package com.example.springproject.dtos;

import jakarta.validation.constraints.NotBlank;

public record NotesRecordDto(@NotBlank String content) {
}
