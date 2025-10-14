package fr.catmash.business;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.catmash.dao.CatDao;
import fr.catmash.dto.CatDto;
import fr.catmash.exception.CatNotFoundException;
import fr.catmash.mapper.CatMapper;
import fr.catmash.model.Cat;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;


/**
 * Service qui gère la logique métier des chats
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CatService {
    private final CatDao catDao;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;
    private final CatMapper catMapper;


    /**
     * Initialisation de la base de données en requetant vers le site https://conseil.latelier.co/data/cats.json
     * @throws Exception Si une erreur apparait
     */
    @PostConstruct
    private void initCats() throws Exception {
        if (catDao.count() == 0) {
            log.info("Requetage vers l'api https://conseil.latelier.co/data/cats.json pour récupérer les chats");
            String jsonResponse = restTemplate.getForObject("https://conseil.latelier.co/data/cats.json", String.class);
            JsonNode root = objectMapper.readTree(jsonResponse);
            for (JsonNode node : root.get("images")) {
                Cat cat = new Cat();
                cat.setUrl(node.get("url").asText());
                catDao.save(cat);
            }
        }
        log.info("Initialisation de la base de données terminée");
    }

    /**
     * Récupère la liste des chats
     * @return la liste des chats ordonnées
     */
    public ResponseEntity<List<CatDto>> getCatsOrderByVotes(){
        final List<Cat> cats = catDao.findAll(Sort.by(Sort.Direction.DESC, "voteCounter"));
        return ResponseEntity.ok(catMapper.toDtos(cats));
    }

    public ResponseEntity<Void> catVote(final Long catId){
        log.info("Vote for cat with id : {}", catId);
        final Cat cat = catDao.findById(catId).orElseThrow(() -> new CatNotFoundException(catId));

        cat.setVoteCounter(cat.getVoteCounter() + 1);
        catDao.save(cat);
        return ResponseEntity.ok().build();
    }
}
