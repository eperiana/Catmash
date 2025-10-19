package fr.catmash.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Handler pour controller les différentes exception et leur code de retour HTTP
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CatNotFoundException.class)
    public ResponseEntity<String> handleCatNotFound(CatNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
