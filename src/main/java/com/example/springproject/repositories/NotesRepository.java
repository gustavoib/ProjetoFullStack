package com.example.springproject.repositories;

import com.example.springproject.models.NotesModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;

public interface NotesRepository extends JpaRepository<NotesModel, Long> {

}
