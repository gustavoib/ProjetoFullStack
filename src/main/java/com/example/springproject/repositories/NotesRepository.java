package com.example.springproject.repositories;

import com.example.springproject.models.NotesModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotesRepository extends JpaRepository<NotesModel, Long> {
    List<NotesModel> findByUser_IdUser(UUID idUser);
    Optional<NotesModel> findByIdNoteAndUser_IdUser(Long idNote, UUID user_idUser);
    List<NotesModel> findByUser_IdUserOrderByDateDesc(UUID idUser);
    List<NotesModel> findByUser_IdUserOrderByDateAsc(UUID idUser);
    List<NotesModel> findByUser_IdUserAndDateBetween(UUID idUser, LocalDateTime startDate, LocalDateTime endDate);

}
