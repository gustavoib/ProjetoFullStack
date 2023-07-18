package com.example.springproject.controllers;

import com.example.springproject.dtos.NotesRecordDto;
import com.example.springproject.models.NotesModel;
import com.example.springproject.services.NotesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/notes")
public class NotesController {
    @Autowired
    private NotesService notesService;

    @PostMapping("/{userId}/register")
    public ResponseEntity<NotesModel> createNote(@RequestBody @Valid NotesRecordDto notesRecordDto,
                                                 @PathVariable(value = "userId") UUID userId) {
        var notes = notesService.createNote(notesRecordDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(notes);
    }
}
