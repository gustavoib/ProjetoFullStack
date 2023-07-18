package com.example.springproject.models;

import jakarta.persistence.*;

import java.util.*;

import java.io.Serializable;

@Entity
@Table(name = "TB_USERS")
public class UserModel implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private UUID idUser;
    @Column(name = "NAME")
    private String name;
    @Column(name = "EMAIL", unique = true)
    private String email;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "PHONE", unique = true)
    private String phone;

    public UUID getIdUser() {
        return idUser;
    }

    public void setIdUser(UUID idUser) {
        this.idUser = idUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
