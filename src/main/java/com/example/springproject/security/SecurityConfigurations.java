package com.example.springproject.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        /* autorizações para login e cadastro de usuário */
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        /* autorizações para deletar e editar um usuário */
                        .requestMatchers(HttpMethod.DELETE, "/user/{id}/delete").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/user/{id}/edit").authenticated()
                        /* autorizações para o CRUD das notes */
                        .requestMatchers(HttpMethod.POST, "/notes/{id}/register").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/notes/{id}/delete").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/notes/{idUser}/delete-all-notes").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/notes/{id}/edit").authenticated()
                        /* autorizações para realização dos diversos métodos de listagem de notes (READ do C(R)UD) */
                        .requestMatchers(HttpMethod.GET, "/notes/{id}/list-notes").authenticated()
                        .requestMatchers(HttpMethod.GET, "notes/{idUser}/{idNote}/list-note").authenticated()
                        .requestMatchers(HttpMethod.GET, "/notes/{id}/{date}/list-by-date").authenticated()
                        .requestMatchers(HttpMethod.GET, "/notes/{id}/list-by-date-dec").authenticated()
                        .requestMatchers(HttpMethod.GET, "/notes/{id}/list-by-date-asc").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
