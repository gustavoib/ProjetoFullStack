package com.example.springproject.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_NOTES")
public class NotesModel implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long idNote;
    @ManyToOne
    @JoinColumn(name = "ID_USERNOTE")
    private UserModel user;
    @Column(name = "CONTENT")
    private String content;
    @Column(name = "DATE")
    private LocalDateTime date;

    /*testar a situação do id atuando como o numero da note,
     ele deve ser uma espécie de contator de notes para o usuário*/

    public Long getIdNote() {
        return idNote;
    }

    public void setIdNote(Long idNote) {
        this.idNote = idNote;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
