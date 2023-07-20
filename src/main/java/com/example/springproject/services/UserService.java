package com.example.springproject.services;

import com.example.springproject.dtos.UserRecordDto;
import com.example.springproject.models.UserModel;
import com.example.springproject.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /* registrar um usuário -> dar ao usuário a opção de se cadastrar na aplicação */
    public UserModel registerUser(UserRecordDto userRecordDto) {
        UserModel userModel = new UserModel();
        BeanUtils.copyProperties(userRecordDto, userModel);
        return userRepository.save(userModel);
    }

    /* deletar um usuário -> dar ao usuário a opção de apagar sua conta */
    public ResponseEntity<Object> deleteUser(UUID id) {
        Optional<UserModel> user = userRepository.findById(id);
        if(user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found.");
        }
        userRepository.delete(user.get());
        return ResponseEntity.status(HttpStatus.OK).body("user deleted successfully.");
    }

    /* editar um dados de um usuário -> dar ao usuário a opção de editar seus dados */
    public ResponseEntity<Object> editUser(UserRecordDto userRecordDto, UUID id) {
        Optional<UserModel> user = userRepository.findById(id);
        if(user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found.");
        }
        var userModel = user.get();
        BeanUtils.copyProperties(userRecordDto, userModel);
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(userModel));
    }
}
