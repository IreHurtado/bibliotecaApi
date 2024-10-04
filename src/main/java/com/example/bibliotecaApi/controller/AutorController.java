package com.example.bibliotecaApi.controller;


import com.example.bibliotecaApi.entities.Autor;
import com.example.bibliotecaApi.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/autores")
@RestController
public class AutorController {

    @Autowired
    private AutorService autorService;
    @GetMapping
    public List<Autor> getAllAutores(){
        return autorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autor> getAutorByID(@PathVariable Long id){
        return autorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Autor crearAutor(@RequestBody Autor autor){
        return autorService.save(autor);
    }
}