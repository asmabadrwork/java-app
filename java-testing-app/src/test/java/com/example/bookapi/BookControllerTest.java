package com.example.bookapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testIndex() throws Exception {
        mockMvc.perform(get("/api/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is("Welcome to Book API")))
                .andExpect(jsonPath("$.version", is("1.0.0")));
    }

    @Test
    public void testHealth() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("healthy")));
    }

    @Test
    public void testGetAllBooks() throws Exception {
        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.books", hasSize(greaterThanOrEqualTo(3))))
                .andExpect(jsonPath("$.count", greaterThanOrEqualTo(3)));
    }

    @Test
    public void testGetBookExists() throws Exception {
        mockMvc.perform(get("/api/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("The Pragmatic Programmer")));
    }

    @Test
    public void testGetBookNotFound() throws Exception {
        mockMvc.perform(get("/api/books/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error", is("Book not found")));
    }

    @Test
    public void testCreateBook() throws Exception {
        Book newBook = new Book(null, "New Test Book", "Test Author", "1234567890", 2024);
        
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newBook)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title", is("New Test Book")))
                .andExpect(jsonPath("$.id", notNullValue()));
    }

    @Test
    public void testCreateBookWithoutTitle() throws Exception {
        Book invalidBook = new Book(null, "", "Test Author", "1234567890", 2024);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidBook)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("Title is required")));
    }

    @Test
    public void testDeleteBookExists() throws Exception {
        mockMvc.perform(delete("/api/books/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is("Book deleted successfully")));
    }

    @Test
    public void testDeleteBookNotFound() throws Exception {
        mockMvc.perform(delete("/api/books/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error", is("Book not found")));
    }
}
