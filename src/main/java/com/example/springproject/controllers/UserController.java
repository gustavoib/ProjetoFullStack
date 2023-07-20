package com.example.springproject.controllers;

import com.example.springproject.dtos.UserRecordDto;
import com.example.springproject.models.UserModel;
import com.example.springproject.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    /* método para registrar um novo usuário */
    @PostMapping("/register")
    public ResponseEntity<UserModel> registerUser(@RequestBody @Valid UserRecordDto userRecordDto) {
        var userModel = userService.registerUser(userRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userModel);
    }

    /* adicionar método para deletar um usuário */
     @DeleteMapping("/{id}/delete")
     public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") UUID id) {
         return userService.deleteUser(id);
     }

     /* possível método para editar um usuário */
    @PutMapping("/{id}/edit")
    public ResponseEntity<Object> editUser(@PathVariable(value = "id") UUID id,
                                           @RequestBody @Valid UserRecordDto userRecordDto) {
        return userService.editUser(userRecordDto, id);
    }

}

