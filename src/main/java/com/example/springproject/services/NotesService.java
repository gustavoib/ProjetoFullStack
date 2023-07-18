package com.example.springproject.services;

import com.example.springproject.dtos.NotesRecordDto;
import com.example.springproject.models.NotesModel;
import com.example.springproject.repositories.NotesRepository;
import com.example.springproject.repositories.UserRepository;
import com.example.springproject.services.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class NotesService {
    private final NotesRepository notesRepository;
    private final UserRepository userRepository;

    public NotesService(NotesRepository notesRepository, UserRepository userRepository) {
        this.notesRepository = notesRepository;
        this.userRepository = userRepository;
    }

    /* criar uma nota, linkando a nota ao usuário que a criou */
    public NotesModel createNote(NotesRecordDto notesRecordDto, UUID userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

        NotesModel notes = new NotesModel();
        notes.setContent(notesRecordDto.content());
        notes.setUser(user);
        notes.setDate(LocalDateTime.now());

        return notesRepository.save(notes);
    }
}
