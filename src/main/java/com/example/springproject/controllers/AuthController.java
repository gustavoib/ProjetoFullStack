package com.example.springproject.controllers;

import com.example.springproject.dtos.AuthRecordDto;
import com.example.springproject.dtos.UserRecordDto;
import com.example.springproject.models.UserModel;
import com.example.springproject.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthRecordDto authRecordDto){
        var usernamePassword = new UsernamePasswordAuthenticationToken(authRecordDto.email(), authRecordDto.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid UserRecordDto userRecordDto){
        if(this.userRepository.findByEmail(userRecordDto.email()) != null) return ResponseEntity.badRequest().build();

        var encryptedPassword = new BCryptPasswordEncoder().encode(userRecordDto.password());
        var newUser = new UserModel(userRecordDto.email(), userRecordDto.name(), encryptedPassword, userRecordDto.phone());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
