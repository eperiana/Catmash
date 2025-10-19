package fr.catmash.dao;

import fr.catmash.model.Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Répository pour les chats
 */
@Repository
public interface CatDao extends JpaRepository<Cat, Long> {
}
