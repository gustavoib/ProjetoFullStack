package com.example.springproject.controllers;

import com.example.springproject.dtos.UserRecordDto;
import com.example.springproject.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

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

