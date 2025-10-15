package fr.catmash.exception;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CatNotFoundException extends RuntimeException {
    public CatNotFoundException(Long id) {
        super("Cat not found with id: " + id);
        log.error("Cat not found with id : {}", id);
    }
}
