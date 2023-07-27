package com.example.springproject.controllers;

import com.example.springproject.dtos.AuthRecordDto;
import com.example.springproject.dtos.LoginRecordDto;
import com.example.springproject.dtos.UserRecordDto;
import com.example.springproject.models.UserModel;
import com.example.springproject.repositories.UserRepository;
import com.example.springproject.services.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthRecordDto authRecordDto){
        var usernamePassword = new UsernamePasswordAuthenticationToken(authRecordDto.email(), authRecordDto.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var user = userRepository.findByEmail(authRecordDto.email());

        var token = tokenService.generateToken((UserModel) auth.getPrincipal());

        return ResponseEntity.ok(new LoginRecordDto(token, user));

        //return ResponseEntity.status(HttpStatus.OK).body("usuário logado com sucesso!");
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid UserRecordDto userRecordDto){
        if(this.userRepository.findByEmail(userRecordDto.email()) != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("email ou senha já existem.");
        }
        var encryptedPassword = new BCryptPasswordEncoder().encode(userRecordDto.password());
        var newUser = new UserModel(userRecordDto.email(), userRecordDto.name(), encryptedPassword, userRecordDto.phone());
        this.userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.OK).body(newUser);
    }
}
