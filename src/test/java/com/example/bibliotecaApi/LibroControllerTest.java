package com.example.bibliotecaApi;


import com.example.bibliotecaApi.controller.LibroController;
import com.example.bibliotecaApi.entities.Autor;
import com.example.bibliotecaApi.entities.Libro;
import com.example.bibliotecaApi.service.LibroService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LibroControllerTest {

    @InjectMocks
    private LibroController libroController;

    @Mock
    private LibroService libroService;

    //Para controlar que siempre inicien vacios
    @BeforeEach
    public void setUp(){

    }

    @Test
    public void testGetAllLibros(){
        Autor autor1 = new Autor(1L, "NOMBRE 1", "PAIS1");
        List<Libro> libros = new ArrayList<>();
        libros.add(new Libro(1L, "TITULO 1", "CATEGORIA 1", true, autor1));
        libros.add(new Libro(2L, "TITULO 2", "CATEGORIA 2", true, autor1));

        when(libroService.findAll()).thenReturn(libros);

        List<Libro> resultado = libroController.getAllLibros();

        assertEquals(2, resultado.size());
        verify(libroService, times(1)).findAll();

    }
}