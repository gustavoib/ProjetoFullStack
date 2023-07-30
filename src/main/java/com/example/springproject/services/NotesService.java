package com.example.springproject.services;

import com.example.springproject.dtos.NotesRecordDto;
import com.example.springproject.models.NotesModel;
import com.example.springproject.models.UserModel;
import com.example.springproject.repositories.NotesRepository;
import com.example.springproject.repositories.UserRepository;
import com.example.springproject.services.exceptions.UserNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NotesService {
    @Autowired
    private NotesRepository notesRepository;
    @Autowired
    private UserRepository userRepository;

    /* criar uma nota, linkando a nota ao usuário que a criou */
    public NotesModel createNote(NotesRecordDto notesRecordDto, UUID userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

        NotesModel notes = new NotesModel();
        notes.setTitle(notesRecordDto.title());
        notes.setContent(notesRecordDto.content());
        notes.setUser(user);
        notes.setDate(LocalDateTime.now());

        return notesRepository.save(notes);
    }

    /* deletar uma nota */
    public ResponseEntity<Object> deleteNotes(Long idNote, UUID idUser) {
        Optional<NotesModel> note = notesRepository.findByIdNoteAndUser_IdUser(idNote, idUser);
        if(note.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("note not found.");
        }
        notesRepository.delete(note.get());
        return ResponseEntity.status(HttpStatus.OK).body("note deleted successfully.");
    }

    /* apagar todas as notas do usuário */
    public ResponseEntity<Object> deleteAllNotes(UUID userId) {
        Optional<UserModel> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        List<NotesModel> userNotes = notesRepository.findByUser_IdUser(userId);
        if (userNotes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No notes found for this user.");
        }
        notesRepository.deleteAll(userNotes);

        return ResponseEntity.status(HttpStatus.OK).body("All notes deleted successfully for this user.");
    }


    /* editar uma nota */
    public ResponseEntity<Object> editNotes(NotesRecordDto notesRecordDto, Long id) {
        Optional<NotesModel> notes = notesRepository.findById(id);
        if(notes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("note not found.");
        }
        var notesModel = notes.get();
        BeanUtils.copyProperties(notesRecordDto, notesModel);
        return ResponseEntity.status(HttpStatus.OK).body(notesRepository.save(notesModel));
    }

    /* listar todas as notas de um usuário */
    public ResponseEntity<List<NotesModel>> getAllNotesFromUser(UUID idUser) {
        List<NotesModel> notes = notesRepository.findByUser_IdUser(idUser);
        return ResponseEntity.status(HttpStatus.OK).body(notes);
    }

    /* listar uma nota de desejo do usuário */
    public ResponseEntity<Object> getOneNotesFromUser(UUID idUser, Long idNote){
        Optional<NotesModel> note = notesRepository.findByIdNoteAndUser_IdUser(idNote, idUser);
        if (note.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this note not existing for this user.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(note.get());
    }

    /* listar notas por uma data específica */
    public ResponseEntity<Object> listNotesByDate(UUID idUser, LocalDateTime startDate, LocalDateTime endDate){
        List<NotesModel> notes = notesRepository.findByUser_IdUserAndDateBetween(idUser, startDate, endDate);
        if(notes.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not existing notes for the date.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(notes);
    }

    /* listar notas por data (da mais recente para a mais antiga) */
    public ResponseEntity<Object> listNotesByDateDec(UUID idUser){
        List<NotesModel> notes = notesRepository.findByUser_IdUserOrderByDateDesc(idUser);
        return ResponseEntity.status(HttpStatus.OK).body(notes);
    }

    /* listar notas por data (da mais antiga para a mais recente) */
    public ResponseEntity<Object> listNotesByDateAsc(UUID idUser){
        List<NotesModel> notes = notesRepository.findByUser_IdUserOrderByDateAsc(idUser);
        return ResponseEntity.status(HttpStatus.OK).body(notes);
    }

}
