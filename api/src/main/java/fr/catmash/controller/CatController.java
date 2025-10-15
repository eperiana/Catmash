package fr.catmash.controller;

import fr.catmash.business.CatService;
import fr.catmash.dto.CatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller pour récupérer tous les chats ordonné par nombre de vote et pour voter
 */
@RestController
@RequestMapping("/api/cats")
@RequiredArgsConstructor
public class CatController {

    private final CatService catService;

    /**
     * Récupères tous les chats ordonnés par nombre de votes
     * @return la liste des chats ordonnée
     */
    @GetMapping()
    public ResponseEntity<List<CatDto>> getCatsOrderByVotes(){
        return catService.getCatsOrderByVotes();
    }

    @PostMapping(value = "/vote/{id}")
    public ResponseEntity<Void> voteForCat(@PathVariable("id") Long id){
        return catService.catVote(id);
    }

}
