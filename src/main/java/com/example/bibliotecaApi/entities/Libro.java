package com.example.bibliotecaApi.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Libro")
public class Libro{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String categoria;
    private boolean disponible;
    @ManyToOne
    @JoinColumn(name= "autor:id")
    private Autor autor;
}
