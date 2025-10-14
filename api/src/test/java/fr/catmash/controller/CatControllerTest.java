package fr.catmash.controller;

import fr.catmash.business.CatService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CatControllerTest {
    @InjectMocks
    private CatController controller;

    @Mock
    private CatService catService;

    @Test
    void testGetCatsOrderByVotes() {
        controller.getCatsOrderByVotes();
        verify(catService).getCatsOrderByVotes();
    }

    @Test
    void testVoteForCat() {
        controller.voteForCat(1L);
        verify(catService).catVote(1L);
    }
}