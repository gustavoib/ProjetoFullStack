package com.example.springproject.controllers;

import com.example.springproject.dtos.NotesRecordDto;
import com.example.springproject.models.NotesModel;
import com.example.springproject.services.NotesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notes")
public class NotesController {
    @Autowired
    private NotesService notesService;

    /* rota para criar uma nota */
    @PostMapping("/{userId}/register")
    public ResponseEntity<NotesModel> createNote(@RequestBody @Valid NotesRecordDto notesRecordDto,
                                                 @PathVariable(value = "userId") UUID userId) {
        var notes = notesService.createNote(notesRecordDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(notes);
    }

    /* rota para deletar uma nota */
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Object> deleteNotes(@PathVariable(value = "id") Long id) {
        return notesService.deleteNotes(id);
    }

    /* rota para editar uma nota */
    @PutMapping("/{id}/edit")
    public ResponseEntity<Object> editNotes(@PathVariable(value = "id") Long id,
                                            @RequestBody @Valid NotesRecordDto notesRecordDto) {
        return notesService.editNotes(notesRecordDto, id);
    }

    /* rota para listar as notas de um usuário */
    @GetMapping("/{id}/list-notes")
    public ResponseEntity<List<NotesModel>> getAllNotesFromUser(@PathVariable(value = "id") UUID id) {
        return notesService.getAllNotesFromUser(id);
    }

    /* rota para um usuário listar uma nota especifica */
    @GetMapping("/{idUser}/{idNote}/list-note")
    public ResponseEntity<Object> getOneNotesFromUser(@PathVariable(value = "idUser") UUID idUser,
                                                      @PathVariable(value = "idNote") Long idNote) {
        return notesService.getOneNotesFromUser(idUser, idNote);
    }

    /* rota para um usuário visualizar as notas criadas por ele em um dia especifico */
    @GetMapping ("/{id}/{date}/list-by-date")
    public ResponseEntity<Object> listNotesFromUserByDate(@PathVariable(value = "id") UUID id,
                                                          @PathVariable(value = "date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        LocalDateTime startDate = localDate.atStartOfDay();
        LocalDateTime endDate = localDate.atTime(23, 59, 59); // Define o final do dia
        return notesService.listNotesByDate(id, startDate, endDate);
    }

    /* rota para filtrar por data de maneira decrescente */
    @GetMapping ("/{id}/list-by-date-dec")
    public ResponseEntity<Object> listNotesFromUserByDateDec(@PathVariable(value = "id") UUID id) {
        return notesService.listNotesByDateDec(id);
    }

    /* rota para filtrar por data de maneira crescente */
    @GetMapping ("/{idUser}/list-by-date-asc")
    public ResponseEntity<Object> listNotesFromUserByDateAsc(@PathVariable(value = "idUser") UUID idUser) {
        return notesService.listNotesByDateAsc(idUser);
    }


}
